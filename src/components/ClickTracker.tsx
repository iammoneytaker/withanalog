'use client';
import { useEffect } from 'react';

/** 제휴 링크 클릭만 기록합니다. 링크 주소는 바꾸지 않습니다. */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[data-pid]') as HTMLAnchorElement | null;
      if (!a) return;
      const body = JSON.stringify({ pid: a.dataset.pid, path: location.pathname });
      try {
        navigator.sendBeacon('/api/click', new Blob([body], { type: 'application/json' }));
      } catch {
        /* 기록 실패는 무시 */
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
