'use client';

import { KeyboardSoundPlayer } from '@/components/KeyboardSoundPlayer';

export default function KeyboardSoundTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            키보드 사운드 테스트
          </h1>
          <p className="text-gray-400 text-lg">
            실제 키보드 스위치의 타건음을 들어보세요
          </p>
        </div>

        <div className="mb-8">
          <KeyboardSoundPlayer showControls={true} />
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">ℹ️</span>
            사용 방법
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">🎵 실제 사운드</h3>
              <ul className="space-y-1 text-sm">
                <li>• <span className="text-blue-400">청축</span>: 명확한 클릭음과 촉각 피드백</li>
                <li>• <span className="text-red-400">적축</span>: 부드럽고 조용한 선형 스위치</li>
                <li>• <span className="text-orange-400">갈축</span>: 적당한 택틸감과 소음의 균형</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-400 mb-2">⚙️ 컨트롤</h3>
              <ul className="space-y-1 text-sm">
                <li>• 볼륨 슬라이더로 음량 조절</li>
                <li>• ON/OFF 버튼으로 사운드 토글</li>
                <li>• 스위치 선택으로 즉시 미리듣기</li>
                <li>• <span className="text-yellow-400">키보드 입력 시 실시간 재생</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
            <div className="text-blue-400 font-semibold mb-2">🎮 키보드 성능 테스트</div>
            <div className="text-gray-300">이 사운드들을 키보드 성능 테스트에서도 사용할 수 있습니다</div>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-green-400 font-semibold mb-2">🔊 실제 오디오</div>
            <div className="text-gray-300">합성 사운드가 아닌 실제 키보드 타건음입니다</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-purple-400 font-semibold mb-2">⚡ 실시간</div>
            <div className="text-gray-300">타이핑하는 즉시 선택한 스위치 사운드가 재생됩니다</div>
          </div>
        </div>
      </div>
    </div>
  );
}