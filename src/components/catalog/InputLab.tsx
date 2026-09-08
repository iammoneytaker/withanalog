"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./catalog.module.css";

type Mode = "input" | "kps" | "rapid";
type Entry = {
	readonly code: string;
	readonly action: string;
	readonly time: number;
};
export function InputLab({ mode }: { readonly mode: Mode }) {
	const [active, setActive] = useState(false);
	const [pressed, setPressed] = useState<readonly string[]>([]);
	const [seen, setSeen] = useState<readonly string[]>([]);
	const [count, setCount] = useState(0);
	const [max, setMax] = useState(0);
	const [elapsed, setElapsed] = useState(0);
	const [entries, setEntries] = useState<readonly Entry[]>([]);
	const [status, setStatus] = useState(
		"시작 버튼을 누른 다음 키보드를 입력하세요.",
	);
	const down = useRef(new Set<string>());
	const start = useRef<number | null>(null);
	const area = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!active) return;
		function stop(message: string) {
			setActive(false);
			down.current.clear();
			setPressed([]);
			setStatus(message);
		}
		function onDown(event: KeyboardEvent) {
			if (event.code === "Escape") {
				stop("중단했습니다. 다시 시작하면 새 기록으로 측정합니다.");
				return;
			}
			if (
				event.code === "Tab" ||
				event.metaKey ||
				event.altKey ||
				event.ctrlKey
			)
				return;
			event.preventDefault();
			if (event.repeat || down.current.has(event.code)) return;
			const now = performance.now();
			if (start.current === null) start.current = now;
			if (mode === "kps" && now - start.current >= 10000) return;
			down.current.add(event.code);
			setPressed(Array.from(down.current));
			setSeen((previous) => Array.from(new Set([...previous, event.code])));
			setCount((previous) => previous + 1);
			setMax((previous) => Math.max(previous, down.current.size));
			setEntries((previous) =>
				[
					{
						code: event.code,
						action: "DOWN",
						time: now - (start.current ?? now),
					},
					...previous,
				].slice(0, 60),
			);
			setStatus(
				mode === "kps"
					? "10초 동안 새로 누른 키를 셉니다."
					: "눌림·해제 기록 중. Esc로 중지합니다.",
			);
		}
		function onUp(event: KeyboardEvent) {
			if (!down.current.has(event.code)) return;
			down.current.delete(event.code);
			setPressed(Array.from(down.current));
			const now = performance.now();
			setEntries((previous) =>
				[
					{
						code: event.code,
						action: "UP",
						time: now - (start.current ?? now),
					},
					...previous,
				].slice(0, 60),
			);
		}
		function blur() {
			stop(
				"포커스를 잃어 중단했습니다. 기록은 보존되지만 완료 결과가 아닙니다.",
			);
		}
		function visibility() {
			if (document.hidden) blur();
		}
		const timer = window.setInterval(() => {
			if (start.current === null) return;
			const time = (performance.now() - start.current) / 1000;
			setElapsed(mode === "kps" ? Math.min(time, 10) : time);
			if (mode === "kps" && time >= 10)
				stop("10초 측정 완료. KPS는 총 입력 ÷ 10초입니다.");
		}, 50);
		const element = area.current;
		element?.addEventListener("keydown", onDown);
		element?.addEventListener("keyup", onUp);
		element?.addEventListener("blur", blur);
		window.addEventListener("blur", blur);
		document.addEventListener("visibilitychange", visibility);
		return () => {
			clearInterval(timer);
			element?.removeEventListener("keydown", onDown);
			element?.removeEventListener("keyup", onUp);
			element?.removeEventListener("blur", blur);
			window.removeEventListener("blur", blur);
			document.removeEventListener("visibilitychange", visibility);
		};
	}, [active, mode]);
	function begin() {
		down.current.clear();
		start.current = null;
		setPressed([]);
		setSeen([]);
		setCount(0);
		setMax(0);
		setElapsed(0);
		setEntries([]);
		setActive(true);
		setStatus("준비됐습니다. 첫 키 입력부터 기록합니다.");
		area.current?.focus();
	}
	return (
		<section className={styles.section}>
			<div className={styles.actions}>
				<button className={styles.button} onClick={begin}>
					{active ? "다시 시작" : "테스트 시작"}
				</button>
				<button
					className={styles.secondary}
					disabled={!active}
					onClick={() => {
						setActive(false);
						down.current.clear();
						setPressed([]);
						setStatus("중단했습니다.");
					}}
				>
					중지
				</button>
			</div>
			<p role="status" className={styles.note}>
				{status}
			</p>
			<div
				ref={area}
				tabIndex={0}
				role="group"
				aria-label="키보드 입력 영역"
				className={styles.card}
			>
				<p>
					이 영역에 포커스를 두고 입력하세요. Esc·Tab·시스템 단축키는 측정에서
					제외합니다.
				</p>
				<div className={styles.stats}>
					<div>
						<strong>{count}</strong>
						<span>총 입력</span>
					</div>
					<div>
						<strong>
							{mode === "kps"
								? elapsed >= 10
									? (count / 10).toFixed(2)
									: "—"
								: max}
						</strong>
						<span>
							{mode === "kps" ? "완료 KPS / CPS" : "관찰한 최대 동시입력"}
						</span>
					</div>
					<div>
						<strong>{elapsed.toFixed(1)}s</strong>
						<span>첫 입력부터 경과</span>
					</div>
				</div>
				<h2>지금 누른 키</h2>
				<div className={styles.liveKeys}>
					{pressed.length ? (
						pressed.map((code) => (
							<span
								key={code}
								className={`${styles.liveKey} ${styles.pressed}`}
							>
								{code}
							</span>
						))
					) : (
						<span>눌린 키 없음</span>
					)}
				</div>
				<h3 style={{ marginTop: 24 }}>확인한 키 · {seen.length}</h3>
				<div className={styles.liveKeys}>
					{seen.map((code) => (
						<span key={code} className={styles.liveKey}>
							{code}
						</span>
					))}
				</div>
				{mode === "rapid" && (
					<>
						<h3 style={{ marginTop: 24 }}>이벤트 기록 · 최근 60개</h3>
						<div className={styles.log}>
							{entries.map((entry, i) => (
								<div key={i}>
									{entry.time.toFixed(1)}ms · {entry.code} · {entry.action}
								</div>
							))}
						</div>
					</>
				)}
			</div>
			<p className={styles.meta}>
				키 입력은 이 페이지 안에서만 처리하며 서버로 전송하지 않습니다. 탭을
				전환하거나 입력 영역을 벗어나면 측정을 중단합니다. 기기 자체의
				지연·작동거리·NKRO 인증 결과가 아닙니다.
			</p>
		</section>
	);
}
