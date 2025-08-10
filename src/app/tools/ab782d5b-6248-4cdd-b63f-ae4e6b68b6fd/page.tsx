'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioData {
  frequency: number[];
  volume: number;
  duration: number;
  timestamp: number;
}

interface KeySoundData {
  key: string;
  audioData: AudioData[];
  averageVolume: number;
  dominantFrequency: number;
}

export default function KeyboardSoundTestPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentKey, setCurrentKey] = useState<string>('');
  const [keySounds, setKeySounds] = useState<KeySoundData[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const analyser = context.createAnalyser();
      const source = context.createMediaStreamSource(stream);
      
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioContext(context);
      setIsSetupComplete(true);
    } catch (error) {
      console.error('오디오 초기화 실패:', error);
      alert('마이크 권한이 필요합니다. 브라우저 설정에서 마이크 접근을 허용해주세요.');
    }
  };

  const analyzeAudio = (): AudioData => {
    if (!analyserRef.current) return { frequency: [], volume: 0, duration: 0, timestamp: Date.now() };

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // Volume calculation (RMS)
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const volume = Math.sqrt(sum / bufferLength);

    // Convert to frequency array (simplified)
    const frequency = Array.from(dataArray).slice(0, 100); // First 100 bins

    return {
      frequency,
      volume,
      duration: 100, // 100ms sample
      timestamp: Date.now()
    };
  };

  const startRecording = (key: string) => {
    if (!isSetupComplete || isRecording) return;

    setIsRecording(true);
    setCurrentKey(key);

    const audioSamples: AudioData[] = [];
    
    const sampleInterval = setInterval(() => {
      const sample = analyzeAudio();
      if (sample.volume > 10) { // Only record if there's significant volume
        audioSamples.push(sample);
      }
    }, 50); // Sample every 50ms

    // Stop recording after 500ms
    recordingTimeoutRef.current = setTimeout(() => {
      clearInterval(sampleInterval);
      setIsRecording(false);
      
      if (audioSamples.length > 0) {
        const averageVolume = audioSamples.reduce((sum, sample) => sum + sample.volume, 0) / audioSamples.length;
        
        // Find dominant frequency
        const allFrequencies = audioSamples.flatMap(sample => sample.frequency);
        const maxFreqIndex = allFrequencies.indexOf(Math.max(...allFrequencies));
        const dominantFrequency = maxFreqIndex * (audioContext?.sampleRate || 44100) / 2048;

        const keyData: KeySoundData = {
          key,
          audioData: audioSamples,
          averageVolume,
          dominantFrequency
        };

        setKeySounds(prev => {
          const filtered = prev.filter(k => k.key !== key);
          return [...filtered, keyData];
        });
      }
      
      setCurrentKey('');
    }, 500);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (isRecording || !isSetupComplete) return;
    
    e.preventDefault();
    const key = e.code;
    startRecording(key);
  };

  useEffect(() => {
    if (isSetupComplete) {
      document.addEventListener('keydown', handleKeyPress);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
    };
  }, [isSetupComplete, isRecording]);

  const resetData = () => {
    setKeySounds([]);
  };

  const getKeyDisplayName = (keyCode: string) => {
    const keyMap: Record<string, string> = {
      'Space': 'Space',
      'Enter': 'Enter',
      'ShiftLeft': 'Left Shift',
      'ShiftRight': 'Right Shift',
      'ControlLeft': 'Left Ctrl',
      'ControlRight': 'Right Ctrl',
      'AltLeft': 'Left Alt',
      'AltRight': 'Right Alt',
    };
    
    if (keyMap[keyCode]) return keyMap[keyCode];
    if (keyCode.startsWith('Key')) return keyCode.replace('Key', '');
    if (keyCode.startsWith('Digit')) return keyCode.replace('Digit', '');
    
    return keyCode;
  };

  const getVolumeCategory = (volume: number) => {
    if (volume > 80) return { level: 'Very Loud', color: 'text-red-400' };
    if (volume > 60) return { level: 'Loud', color: 'text-orange-400' };
    if (volume > 40) return { level: 'Medium', color: 'text-yellow-400' };
    if (volume > 20) return { level: 'Quiet', color: 'text-green-400' };
    return { level: 'Very Quiet', color: 'text-blue-400' };
  };

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            키보드 사운드 테스트
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            각 키의 사운드를 녹음하고 분석하여 키보드의 음향 특성을 파악합니다
          </p>
        </motion.div>

        {/* Setup Section */}
        {!isSetupComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-8 mb-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">마이크 설정</h2>
            <p className="text-gray-400 mb-6">
              키보드 사운드를 분석하기 위해 마이크 접근 권한이 필요합니다.
            </p>
            <button
              onClick={initializeAudio}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              마이크 활성화
            </button>
          </motion.div>
        )}

        {/* Recording Status */}
        {isSetupComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-8 mb-8"
          >
            <div className="text-center">
              {isRecording ? (
                <div className="text-red-400">
                  <div className="text-3xl font-bold mb-2">🎙️ 녹음 중...</div>
                  <div className="text-xl">"{getKeyDisplayName(currentKey)}" 키 분석 중</div>
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse mx-auto mt-4"></div>
                </div>
              ) : (
                <div className="text-green-400">
                  <div className="text-3xl font-bold mb-2">⌨️ 준비 완료</div>
                  <div className="text-xl">키보드의 아무 키나 눌러보세요</div>
                  <div className="text-gray-400 text-sm mt-2">
                    각 키를 눌러서 사운드를 분석할 수 있습니다
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Statistics */}
        {keySounds.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-400">{keySounds.length}</div>
              <div className="text-gray-400">분석된 키</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">
                {Math.round(keySounds.reduce((sum, k) => sum + k.averageVolume, 0) / keySounds.length)}
              </div>
              <div className="text-gray-400">평균 볼륨</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-400">
                {Math.round(keySounds.reduce((sum, k) => sum + k.dominantFrequency, 0) / keySounds.length)}Hz
              </div>
              <div className="text-gray-400">평균 주파수</div>
            </div>
          </motion.div>
        )}

        {/* Results Table */}
        {keySounds.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-8 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">분석 결과</h2>
              <button
                onClick={resetData}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                데이터 초기화
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-gray-400">키</th>
                    <th className="py-3 px-4 text-gray-400">볼륨</th>
                    <th className="py-3 px-4 text-gray-400">볼륨 레벨</th>
                    <th className="py-3 px-4 text-gray-400">주파수</th>
                    <th className="py-3 px-4 text-gray-400">샘플 수</th>
                  </tr>
                </thead>
                <tbody>
                  {keySounds.map((keyData, index) => {
                    const volumeCategory = getVolumeCategory(keyData.averageVolume);
                    return (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-white font-semibold">
                          {getKeyDisplayName(keyData.key)}
                        </td>
                        <td className="py-3 px-4 text-blue-400 font-semibold">
                          {Math.round(keyData.averageVolume)}
                        </td>
                        <td className={`py-3 px-4 font-semibold ${volumeCategory.color}`}>
                          {volumeCategory.level}
                        </td>
                        <td className="py-3 px-4 text-purple-400 font-semibold">
                          {Math.round(keyData.dominantFrequency)}Hz
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {keyData.audioData.length}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">사용 방법</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">🎯 측정 팁</h3>
              <ul className="space-y-2 text-sm">
                <li>• 조용한 환경에서 테스트하세요</li>
                <li>• 일정한 힘으로 키를 눌러주세요</li>
                <li>• 각 키를 여러 번 눌러 평균값을 확인하세요</li>
                <li>• 마이크를 키보드 가까이 위치시키세요</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">📊 분석 데이터</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>볼륨:</strong> 키 사운드의 크기 측정</li>
                <li>• <strong>주파수:</strong> 음의 높낮이 분석</li>
                <li>• <strong>샘플 수:</strong> 녹음된 데이터 포인트</li>
                <li>• <strong>볼륨 레벨:</strong> 상대적 소음 수준</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}