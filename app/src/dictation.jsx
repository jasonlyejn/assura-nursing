import React, { useEffect, useState } from 'react';

// Voice-to-Text Clinical Dictation Helper
export function createSpeechRecognizer({ onResult, onError, onStart, onEnd, lang = 'en-MY' }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return {
      supported: false,
      start: () => alert('Speech recognition is not supported on this browser. Use Chrome, Edge, or Safari.'),
      stop: () => {},
    };
  }

  const rec = new SpeechRecognition();
  rec.continuous = true;
  rec.interimResults = true;
  rec.lang = lang;

  rec.onstart = () => { if (onStart) onStart(); };
  rec.onend = () => { if (onEnd) onEnd(); };
  rec.onerror = (e) => { if (onError) onError(e); };

  rec.onresult = (evt) => {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = evt.resultIndex; i < evt.results.length; ++i) {
      if (evt.results[i].isFinal) {
        finalTranscript += evt.results[i][0].transcript;
      } else {
        interimTranscript += evt.results[i][0].transcript;
      }
    }

    if (onResult) {
      onResult(finalTranscript, interimTranscript);
    }
  };

  return {
    supported: true,
    start: () => {
      try { rec.start(); } catch (_) {}
    },
    stop: () => {
      try { rec.stop(); } catch (_) {}
    },
    setLang: (newLang) => { rec.lang = newLang; },
  };
}

export function DictationButton({ targetText, onUpdate, placeholder = 'Dictate...', lang = 'en-MY' }) {
  const [isListening, setIsListening] = useState(false);
  const [recognizer, setRecognizer] = useState(null);

  useEffect(() => {
    const r = createSpeechRecognizer({
      lang,
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      onResult: (finalText) => {
        if (finalText) {
          const updated = (targetText ? targetText + ' ' : '') + finalText.trim();
          onUpdate(updated);
        }
      },
    });
    setRecognizer(r);
    return () => { if (r) r.stop(); };
  }, [targetText, lang]);

  if (!recognizer || !recognizer.supported) return null;

  return (
    <button
      type="button"
      onClick={() => {
        if (isListening) recognizer.stop();
        else recognizer.start();
      }}
      className={isListening ? 'danger sm' : 'ghost sm'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        margin: '0',
        padding: '3px 8px',
        fontSize: '0.75rem',
        borderRadius: '6px',
        fontWeight: 700,
      }}
      title="Click to dictate voice notes (English/Malay/中文)"
    >
      <span>{isListening ? '🔴 Recording… (Tap to stop)' : '🎙️ Voice Dictate (语音输入)'}</span>
    </button>
  );
}
