#!/usr/bin/env python3
"""Slide-style explainer video renderer.

Usage: python video/render.py video/<slug> <out_dir>
Reads <slug>/scenes.json, makes TTS per line (edge-tts), Ken Burns zoom per image,
card/caption overlays (Pillow), burned-in Korean subtitles (ASS), fade transitions.
Runs on GitHub Actions (ubuntu) with ffmpeg + fonts-noto-cjk installed.
"""
import json, math, os, subprocess, sys, time

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, FPS = 1920, 1080, 30
SR = 48000
LEAD, GAP, TAIL = 0.5, 0.32, 0.7
FONT_DIR = os.environ.get("FONT_DIR", "/usr/share/fonts/opentype/noto")
if os.path.exists(os.path.join(FONT_DIR, "NotoSansCJKkr-Bold.otf")):
    FONT_BOLD = os.path.join(FONT_DIR, "NotoSansCJKkr-Bold.otf")
    FONT_REG = os.path.join(FONT_DIR, "NotoSansCJKkr-Regular.otf")
    KR = 0
else:
    FONT_BOLD = os.path.join(FONT_DIR, "NotoSansCJK-Bold.ttc")
    FONT_REG = os.path.join(FONT_DIR, "NotoSansCJK-Regular.ttc")
    KR = 1  # Korean face index inside the Noto CJK collections


def font(size, bold=True):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size, index=KR)


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(" ".join(cmd)[:500])
        print(r.stderr[-3000:])
        raise SystemExit(r.returncode)
    return r.stdout


def duration(path):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                      "-of", "default=nw=1:nk=1", path]).strip())


def tts(text, voice, rate, out_mp3):
    for attempt in range(5):
        r = subprocess.run(["edge-tts", "--voice", voice, f"--rate={rate}", "--text", text,
                            "--write-media", out_mp3], capture_output=True, text=True)
        if r.returncode == 0 and os.path.exists(out_mp3) and os.path.getsize(out_mp3) > 1000:
            return
        print("tts retry", attempt, r.stderr[-300:])
        time.sleep(3 + attempt * 3)
    raise SystemExit("tts failed: " + text)


def silence(sec, out):
    run(["ffmpeg", "-y", "-f", "lavfi", "-i", f"anullsrc=r={SR}:cl=mono", "-t", f"{sec:.3f}",
         "-c:a", "pcm_s16le", out])


def to_wav(src, out):
    run(["ffmpeg", "-y", "-i", src, "-ar", str(SR), "-ac", "1", "-c:a", "pcm_s16le", out])


def cover(img, w, h):
    iw, ih = img.size
    s = max(w / iw, h / ih)
    img = img.resize((math.ceil(iw * s), math.ceil(ih * s)), Image.LANCZOS)
    x, y = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((x, y, x + w, y + h))


def text_w(draw, t, f):
    b = draw.textbbox((0, 0), t, font=f)
    return b[2] - b[0]


def overlay_png(scene, out):
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    # small site mark, top right
    fm = font(30, bold=False)
    mark = "withanalog.com"
    d.text((W - 70 - text_w(d, mark, fm), 52), mark, font=fm, fill=(255, 255, 255, 190))
    card = scene.get("card")
    if card:
        dark = Image.new("RGBA", (W, H), (8, 10, 14, 165))
        ov = Image.alpha_composite(dark, ov)
        d = ImageDraw.Draw(ov)
        ft, fl = font(84), font(54, bold=False)
        lines = card.get("lines", [])
        lh = 82
        block = 110 + lh * len(lines)
        y = max(120, (H - block) // 2 - 60)
        t = card["title"]
        while text_w(d, t, ft) > W - 240 and ft.size > 50:
            ft = font(ft.size - 4)
        d.text(((W - text_w(d, t, ft)) // 2, y), t, font=ft, fill=(255, 236, 170, 255))
        y += 130
        d.line([(W // 2 - 90, y - 22), (W // 2 + 90, y - 22)], fill=(255, 236, 170, 200), width=4)
        for ln in lines:
            f = fl
            while text_w(d, ln, f) > W - 240 and f.size > 34:
                f = font(f.size - 3, bold=False)
            d.text(((W - text_w(d, ln, f)) // 2, y), ln, font=f, fill=(255, 255, 255, 245))
            y += lh
    cap = scene.get("caption")
    if cap:
        f = font(46)
        while text_w(d, cap, f) > W - 420 and f.size > 30:
            f = font(f.size - 2)
        tw = text_w(d, cap, f)
        bx, by, px, py = 70, 60, 30, 16
        hgt = f.size + py * 2 + 10
        d.rounded_rectangle([bx, by, bx + tw + px * 2, by + hgt], radius=14, fill=(0, 0, 0, 165))
        d.rectangle([bx, by, bx + 8, by + hgt], fill=(255, 205, 80, 255))
        d.text((bx + px + 4, by + py - 4), cap, font=f, fill=(255, 255, 255, 255))
    ov.save(out)


def ass_time(t):
    cs = int(round(t * 100))
    h, cs = divmod(cs, 360000)
    m, cs = divmod(cs, 6000)
    s, cs = divmod(cs, 100)
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"


def ass_escape(t):
    return t.replace("\\", "\\\\").replace("{", "(").replace("}", ")")


def main():
    src, out_dir = sys.argv[1], sys.argv[2]
    slug = os.path.basename(os.path.normpath(src))
    cfg = json.load(open(os.path.join(src, "scenes.json"), encoding="utf-8"))
    voice, rate = cfg.get("voice", "ko-KR-SunHiNeural"), cfg.get("rate", "-6%")
    work = os.path.join(out_dir, "work")
    os.makedirs(work, exist_ok=True)
    silence(GAP, f"{work}/gap.wav")

    events, clips, auds = [], [], []
    t0 = 0.0
    for i, sc in enumerate(cfg["scenes"]):
        pieces, local = [], []
        lines = sc.get("lines", [])
        if lines:
            silence(LEAD, f"{work}/s{i}_lead.wav")
            pieces.append(f"{work}/s{i}_lead.wav")
            t = LEAD
            for j, ln in enumerate(lines):
                mp3, wav = f"{work}/s{i}_{j}.mp3", f"{work}/s{i}_{j}.wav"
                tts(ln.get("say", ln["text"]), voice, rate, mp3)
                to_wav(mp3, wav)
                dur = duration(wav)
                local.append((t, t + dur, ln["text"]))
                pieces.append(wav)
                t += dur
                if j < len(lines) - 1:
                    pieces.append(f"{work}/gap.wav")
                    t += GAP
            raw = t + TAIL
        else:
            raw = float(sc.get("hold", 3))
        frames = math.ceil(raw * FPS)
        D = frames / FPS
        # scene audio, padded to exactly D seconds
        sa = f"{work}/scene{i}.wav"
        if pieces:
            lst = f"{work}/s{i}.txt"
            open(lst, "w").write("".join(f"file '{os.path.abspath(p)}'\n" for p in pieces))
            run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-af",
                 f"apad=whole_dur={D:.4f},atrim=0:{D:.4f}", "-ar", str(SR), "-ac", "1",
                 "-c:a", "pcm_s16le", sa])
        else:
            silence(D, sa)
        auds.append(sa)
        for a, b, txt in local:
            events.append((t0 + a, t0 + b + 0.12, txt))

        # visuals: Ken Burns background + static overlay
        bg = cover(Image.open(os.path.join(src, "images", sc["image"])).convert("RGB"), W * 2, H * 2)
        bg.save(f"{work}/bg{i}.jpg", quality=92)
        overlay_png(sc, f"{work}/ov{i}.png")
        z = 0.07
        zexpr = f"1+{z}*on/{frames}" if i % 2 == 0 else f"{1 + z}-{z}*on/{frames}"
        xexpr = "iw/2-(iw/zoom/2)"
        yexpr = "ih/2-(ih/zoom/2)" if i % 3 else "ih*0.45-(ih/zoom/2)"
        fo = max(0.0, D - 0.4)
        vf = (f"[0:v]zoompan=z='{zexpr}':x='{xexpr}':y='max(0,{yexpr})':d={frames}:s={W}x{H}:fps={FPS}[bg];"
              f"[bg][1:v]overlay=0:0:eof_action=repeat,fade=t=in:st=0:d=0.4,fade=t=out:st={fo:.3f}:d=0.4,format=yuv420p[v]")
        clip = f"{work}/clip{i}.mp4"
        run(["ffmpeg", "-y", "-i", f"{work}/bg{i}.jpg", "-i", f"{work}/ov{i}.png", "-filter_complex", vf,
             "-map", "[v]", "-frames:v", str(frames), "-r", str(FPS), "-c:v", "libx264", "-preset", "veryfast",
             "-crf", "16", clip])
        clips.append(clip)
        print(f"scene {i}: {D:.2f}s ({len(lines)} lines)", flush=True)
        t0 += D

    # subtitles
    ass = f"{work}/subs.ass"
    with open(ass, "w", encoding="utf-8") as f:
        f.write("[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\nWrapStyle: 0\n\n"
                "[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, "
                "Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, "
                "Alignment, MarginL, MarginR, MarginV, Encoding\n"
                "Style: Default,Noto Sans CJK KR,58,&H00FFFFFF,&H00FFFFFF,&H96000000,&H96000000,1,0,0,0,100,100,0,0,3,14,0,"
                "2,170,170,64,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n")
        for k, (a, b, txt) in enumerate(events):
            if k + 1 < len(events):
                b = min(b, events[k + 1][0])
            f.write(f"Dialogue: 0,{ass_time(a)},{ass_time(b)},Default,,0,0,0,,{ass_escape(txt)}\n")

    vl, al = f"{work}/clips.txt", f"{work}/auds.txt"
    open(vl, "w").write("".join(f"file '{os.path.abspath(c)}'\n" for c in clips))
    open(al, "w").write("".join(f"file '{os.path.abspath(a)}'\n" for a in auds))
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", vl, "-c", "copy", f"{work}/video.mp4"])
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", al, "-c:a", "pcm_s16le", f"{work}/audio.wav"])
    out = os.path.join(out_dir, f"{slug}.mp4")
    run(["ffmpeg", "-y", "-i", f"{work}/video.mp4", "-i", f"{work}/audio.wav",
         "-vf", f"subtitles={ass}:fontsdir={FONT_DIR}", "-map", "0:v", "-map", "1:a",
         "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "192k", "-af", "loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000",
         "-movflags", "+faststart", "-shortest", out])
    import shutil
    shutil.copy(ass, os.path.join(out_dir, f"{slug}.ass"))
    print(f"done {out} {duration(out):.1f}s {os.path.getsize(out)/1e6:.1f}MB")


if __name__ == "__main__":
    main()
