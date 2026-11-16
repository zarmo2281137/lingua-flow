// High-Quality Voice Synthesis & Recognition: Neural Studio & Natural Voices

export interface SpeechRecognitionHookOptions {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
  language?: string;
}

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  isNatural: boolean;
  accentLabel: string;
}

export interface HumanVoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  description: string;
  isStudio: boolean;
}

// Top-tier Studio & Neural Human Voices
export const HUMAN_VOICES: HumanVoiceOption[] = [
  {
    id: 'Puck',
    name: 'Puck — Чоловічий Studio (US)',
    gender: 'male',
    accent: 'American US',
    description: 'Природний, живий та теплий тембр',
    isStudio: true,
  },
  {
    id: 'Kore',
    name: 'Kore — Жіночий Studio (US)',
    gender: 'female',
    accent: 'American US',
    description: 'Мʼякий, мелодійний жіночий голос',
    isStudio: true,
  },
  {
    id: 'Aoede',
    name: 'Aoede — Жіночий Studio (US)',
    gender: 'female',
    accent: 'American US',
    description: 'Виразний та дружній жіночий голос',
    isStudio: true,
  },
  {
    id: 'Charon',
    name: 'Charon — Чоловічий Studio (US)',
    gender: 'male',
    accent: 'American US',
    description: 'Глибокий, солідний тембр викладача',
    isStudio: true,
  },
  {
    id: 'Fenrir',
    name: 'Fenrir — Чоловічий Studio (US)',
    gender: 'male',
    accent: 'American US',
    description: 'Впевнений, чіткий діловий тон',
    isStudio: true,
  },
  {
    id: 'Google-UK',
    name: 'Sonia — Жіночий Studio (UK)',
    gender: 'female',
    accent: 'British UK',
    description: 'Еталонна оксфордська вимова',
    isStudio: true,
  },
  {
    id: 'British-Male',
    name: 'Ryan — Чоловічий Studio (UK)',
    gender: 'male',
    accent: 'British UK',
    description: 'Класичний британський чоловічий голос',
    isStudio: true,
  },
  {
    id: 'Google-US',
    name: 'Michelle — Жіночий Studio (US)',
    gender: 'female',
    accent: 'American US',
    description: 'Чиста американська вимова',
    isStudio: true,
  },
  {
    id: 'Google-AU',
    name: 'Natasha — Жіночий Studio (AU)',
    gender: 'female',
    accent: 'Australian AU',
    description: 'Природна австралійська вимова',
    isStudio: true,
  },
];

let globalAudioElement: HTMLAudioElement | null = null;

export interface PlayAudioOptions {
  voice?: string;
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export const stopHumanAudio = (): void => {
  if (globalAudioElement) {
    try {
      globalAudioElement.pause();
      globalAudioElement.currentTime = 0;
      globalAudioElement.src = '';
    } catch (e) {
      // ignore
    }
    globalAudioElement = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
};

export const stopSpeech = stopHumanAudio;

// Play ultra-realistic human speech streamed from server neural TTS
export const playHumanAudio = (
  text: string,
  options?: PlayAudioOptions
): (() => void) => {
  stopHumanAudio();

  const cleanText = text
    .replace(/[*_#`~]/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return () => {};

  const voice = options?.voice || 'Puck';
  const url = `/api/tts?text=${encodeURIComponent(cleanText)}&voice=${encodeURIComponent(voice)}`;

  const audio = new Audio(url);
  globalAudioElement = audio;

  if (options?.rate) {
    audio.playbackRate = Math.max(0.7, Math.min(1.4, options.rate));
  }

  audio.onplay = () => {
    if (options?.onStart) options.onStart();
  };

  audio.onended = () => {
    if (globalAudioElement === audio) {
      globalAudioElement = null;
    }
    if (options?.onEnd) options.onEnd();
  };

  audio.onerror = (e) => {
    console.warn('Human audio streaming error:', e);
    if (globalAudioElement === audio) {
      globalAudioElement = null;
    }
    if (options?.onError) {
      options.onError(e);
    }
  };

  audio.play().catch((err) => {
    if (err.name === 'AbortError') {
      // User paused or interrupted audio intentionally, do not error or fallback
      return;
    }
    console.warn('Audio play autoplay restriction or error:', err);
    if (globalAudioElement === audio) {
      globalAudioElement = null;
    }
    if (options?.onError) {
      options.onError(err);
    }
  });

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
};

export const isSpeechRecognitionSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

export const isSpeechSynthesisSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
};

// Fallback browser speech synthesis
export const speakEnglishText = (
  text: string,
  rate = 1.0,
  onStart?: () => void,
  onEnd?: () => void,
  preferredVoiceName?: string
): void => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis is not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/[*_#`~]/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = Math.max(0.7, Math.min(1.3, rate));
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(
    (v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (voice) {
    utterance.voice = voice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

// Speech Recognition Class
export class SpeechRecognizer {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor(private options: SpeechRecognitionHookOptions) {
    if (typeof window !== 'undefined' && isSpeechRecognitionSupported()) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = options.language || 'en-US';
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            finalTranscript += res[0].transcript;
          } else {
            interimTranscript += res[0].transcript;
          }
        }

        const text = (finalTranscript + ' ' + interimTranscript).trim();
        const hasFinal = finalTranscript.length > 0;
        this.options.onResult(text, hasFinal);
      };

      this.recognition.onerror = (event: any) => {
        let msg = 'Помилка розпізнавання голосу';
        if (event.error === 'not-allowed') {
          msg = 'Доступ до мікрофона заблоковано в браузері. Будь ласка, дозвольте доступ біля адресного рядка.';
        } else if (event.error === 'no-speech') {
          msg = 'Голос не виявлено. Говоріть ближче до мікрофона чіткою англійською.';
        } else if (event.error === 'network') {
          msg = 'Помилка мережі при розпізнаванні. Перевірте зʼєднання з інтернетом.';
        }
        this.options.onError(msg);
        this.isListening = false;
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.options.onEnd();
      };
    }
  }

  public start() {
    if (!this.recognition) {
      this.options.onError('Ваш браузер не підтримує розпізнавання мови. Рекомендуємо Google Chrome або Microsoft Edge.');
      return;
    }
    if (this.isListening) return;

    try {
      this.isListening = true;
      this.recognition.start();
    } catch (e) {
      console.warn('Recognition start exception:', e);
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }

  public abort() {
    if (this.recognition) {
      this.isListening = false;
      try {
        this.recognition.abort();
      } catch (e) {
        // ignore
      }
    }
  }
}
