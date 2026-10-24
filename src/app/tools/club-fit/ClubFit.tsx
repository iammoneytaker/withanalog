'use client';
import { useState } from 'react';

type Gender = 'men' | 'women';

function recommend(height: number, gender: Gender) {
  // 일반적인 가이드: 키에 따라 81~86cm (규정상 최대 86cm), 무게는 체력·성별에 따라.
  let len: [number, number];
  if (height < 150) len = [81, 82];
  else if (height < 158) len = [82, 83];
  else if (height < 165) len = [83, 84];
  else if (height < 172) len = [84, 85];
  else if (height < 180) len = [85, 86];
  else len = [86, 86];
  const weight: [number, number] = gender === 'women' ? [490, 540] : [530, 590];
  return { len, weight };
}

export default function ClubFit() {
  const [gender, setGender] = useState<Gender>('men');
  const [height, setHeight] = useState('168');
  const h = Number(height);
  const ok = h >= 120 && h <= 210;
  const r = ok ? recommend(h, gender) : null;
  return (
    <div className="calc">
      <div className="field">
        <label>성별</label>
        <div className="seg">
          <button type="button" aria-pressed={gender === 'men'} onClick={() => setGender('men')}>남성</button>
          <button type="button" aria-pressed={gender === 'women'} onClick={() => setGender('women')}>여성</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="h">키 (cm)</label>
        <input id="h" type="number" inputMode="numeric" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      {r ? (
        <div className="calc-result" aria-live="polite">
          <p>추천 길이 <strong>{r.len[0] === r.len[1] ? `${r.len[0]}cm` : `${r.len[0]}~${r.len[1]}cm`}</strong></p>
          <p>추천 무게 <strong>{r.weight[0]}~{r.weight[1]}g</strong></p>
          <p className="note">규정상 클럽 길이는 86cm 이하, 무게는 600g 이하입니다. 손목·어깨가 약하거나 오래 걸으신다면 무게는 아래쪽 값부터 시작해 보세요. 실제로는 매장에서 한 번 쥐어 보시는 것이 가장 정확합니다.</p>
        </div>
      ) : (
        <p className="note">키를 120~210 사이 숫자로 입력해 주세요.</p>
      )}
    </div>
  );
}
