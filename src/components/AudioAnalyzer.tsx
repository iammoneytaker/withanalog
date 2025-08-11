'use client';

interface AudioAnalysisResult {
  dominantFrequency: number;
  clickFrequency: number;
  thockFrequency: number;
  attackTime: number;
  releaseTime: number;
  volume: number;
  hasClick: boolean;
  spectralCentroid: number;
  rms: number;
}

interface SwitchAudioData {
  cherry_blue: AudioAnalysisResult;
  cherry_red: AudioAnalysisResult;
  cherry_brown: AudioAnalysisResult;
}

class WAVAnalyzer {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  async analyzeWAVFile(audioFilePath: string): Promise<AudioAnalysisResult> {
    try {
      // WAV 파일 로드
      const response = await fetch(audioFilePath);
      const arrayBuffer = await response.arrayBuffer();
      
      // 오디오 디코딩
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      // 오디오 데이터 분석
      return this.analyzeAudioBuffer(audioBuffer);
    } catch (error) {
      console.error('WAV 파일 분석 실패:', error);
      // 기본값 반환
      return this.getDefaultAnalysisResult();
    }
  }

  private analyzeAudioBuffer(audioBuffer: AudioBuffer): AudioAnalysisResult {
    const channelData = audioBuffer.getChannelData(0); // 첫 번째 채널 사용
    const sampleRate = audioBuffer.sampleRate;
    const length = channelData.length;

    // 1. RMS (Root Mean Square) 계산 - 전체적인 음량
    let sumSquares = 0;
    for (let i = 0; i < length; i++) {
      sumSquares += channelData[i] * channelData[i];
    }
    const rms = Math.sqrt(sumSquares / length);

    // 2. 엔벨로프 분석 (Attack, Release)
    const envelope = this.calculateEnvelope(channelData, sampleRate);
    
    // 3. FFT를 통한 주파수 분석
    const frequencyAnalysis = this.performFFTAnalysis(channelData, sampleRate);

    // 4. 클릭 소리 감지
    const hasClick = this.detectClickSound(channelData, sampleRate);

    // 5. 스펙트럴 중심 계산
    const spectralCentroid = this.calculateSpectralCentroid(frequencyAnalysis);

    return {
      dominantFrequency: frequencyAnalysis.dominantFreq,
      clickFrequency: hasClick ? frequencyAnalysis.highFreqPeak : 0,
      thockFrequency: frequencyAnalysis.lowFreqPeak,
      attackTime: envelope.attackTime,
      releaseTime: envelope.releaseTime,
      volume: Math.min(rms * 10, 1.0), // 0-1 범위로 정규화
      hasClick,
      spectralCentroid,
      rms
    };
  }

  private calculateEnvelope(data: Float32Array, sampleRate: number) {
    const windowSize = Math.floor(sampleRate * 0.005); // 5ms 윈도우
    const smoothedData: number[] = [];

    // 이동 평균으로 엔벨로프 계산
    for (let i = 0; i < data.length; i += windowSize) {
      let sum = 0;
      const end = Math.min(i + windowSize, data.length);
      for (let j = i; j < end; j++) {
        sum += Math.abs(data[j]);
      }
      smoothedData.push(sum / (end - i));
    }

    // Attack time 찾기 (최대값의 90%에 도달하는 시간)
    const maxValue = Math.max(...smoothedData);
    const attackThreshold = maxValue * 0.9;
    let attackTime = 0;
    
    for (let i = 0; i < smoothedData.length; i++) {
      if (smoothedData[i] >= attackThreshold) {
        attackTime = (i * windowSize) / sampleRate * 1000; // ms로 변환
        break;
      }
    }

    // Release time 찾기 (최대값에서 10%로 떨어지는 시간)
    const releaseThreshold = maxValue * 0.1;
    let releaseTime = 100; // 기본값
    
    const maxIndex = smoothedData.indexOf(maxValue);
    for (let i = maxIndex; i < smoothedData.length; i++) {
      if (smoothedData[i] <= releaseThreshold) {
        releaseTime = ((i - maxIndex) * windowSize) / sampleRate * 1000;
        break;
      }
    }

    return {
      attackTime: Math.max(5, Math.min(attackTime, 50)), // 5-50ms
      releaseTime: Math.max(50, Math.min(releaseTime, 300)) // 50-300ms
    };
  }

  private performFFTAnalysis(data: Float32Array, sampleRate: number) {
    // 간단한 주파수 분석 (실제 구현에서는 더 정교한 FFT 사용)
    const fftSize = 2048;
    const halfSize = fftSize / 2;
    
    // 주파수 빈 계산
    const frequencyBins: number[] = new Array(halfSize).fill(0);
    
    // 간소화된 주파수 분석 (실제로는 복잡한 FFT 알고리즘 필요)
    for (let i = 0; i < Math.min(data.length, fftSize); i++) {
      const sample = data[i];
      // 주파수별 에너지 근사 계산
      for (let f = 0; f < halfSize; f++) {
        const freq = (f * sampleRate) / fftSize;
        const weight = Math.exp(-(freq - 1000) * (freq - 1000) / (2 * 500 * 500));
        frequencyBins[f] += Math.abs(sample) * weight;
      }
    }

    // 도미넌트 주파수 찾기
    let maxEnergy = 0;
    let dominantFreq = 800;
    
    for (let i = 0; i < halfSize; i++) {
      if (frequencyBins[i] > maxEnergy) {
        maxEnergy = frequencyBins[i];
        dominantFreq = (i * sampleRate) / fftSize;
      }
    }

    // 고주파 피크 (클릭음)
    let highFreqPeak = 2000;
    let maxHighEnergy = 0;
    for (let i = Math.floor(halfSize * 0.3); i < halfSize; i++) {
      if (frequencyBins[i] > maxHighEnergy) {
        maxHighEnergy = frequencyBins[i];
        highFreqPeak = (i * sampleRate) / fftSize;
      }
    }

    // 저주파 피크 (thock)
    let lowFreqPeak = 150;
    let maxLowEnergy = 0;
    for (let i = 0; i < Math.floor(halfSize * 0.2); i++) {
      if (frequencyBins[i] > maxLowEnergy) {
        maxLowEnergy = frequencyBins[i];
        lowFreqPeak = (i * sampleRate) / fftSize;
      }
    }

    return {
      dominantFreq: Math.max(200, Math.min(dominantFreq, 8000)),
      highFreqPeak: Math.max(1500, Math.min(highFreqPeak, 5000)),
      lowFreqPeak: Math.max(80, Math.min(lowFreqPeak, 400)),
      frequencyBins
    };
  }

  private detectClickSound(data: Float32Array, sampleRate: number): boolean {
    // 클릭 소리 특징: 급격한 어택과 고주파 성분
    const windowSize = Math.floor(sampleRate * 0.001); // 1ms 윈도우
    
    let maxDerivative = 0;
    for (let i = windowSize; i < Math.min(data.length, sampleRate * 0.1); i++) {
      const current = Math.abs(data[i]);
      const previous = Math.abs(data[i - windowSize]);
      const derivative = (current - previous) / windowSize;
      maxDerivative = Math.max(maxDerivative, derivative);
    }

    // 임계값을 넘으면 클릭 소리로 판단
    return maxDerivative > 0.1;
  }

  private calculateSpectralCentroid(frequencyAnalysis: any): number {
    const bins = frequencyAnalysis.frequencyBins;
    let weightedSum = 0;
    let totalEnergy = 0;

    for (let i = 0; i < bins.length; i++) {
      const frequency = i * 22050 / bins.length; // 대략적인 주파수
      weightedSum += frequency * bins[i];
      totalEnergy += bins[i];
    }

    return totalEnergy > 0 ? weightedSum / totalEnergy : 1000;
  }

  private getDefaultAnalysisResult(): AudioAnalysisResult {
    return {
      dominantFrequency: 800,
      clickFrequency: 2000,
      thockFrequency: 150,
      attackTime: 10,
      releaseTime: 100,
      volume: 0.5,
      hasClick: false,
      spectralCentroid: 1000,
      rms: 0.1
    };
  }
}

export { WAVAnalyzer };
export type { AudioAnalysisResult, SwitchAudioData };