import { useEffect, useRef, useState } from 'react';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef(null);
  const lastToneRef = useRef(0);

  useEffect(() => {
    if (!enabled) return undefined;
    const onClick = () => {
      if (Date.now() - lastToneRef.current < 180) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const context = audioRef.current || new AudioContext();
      audioRef.current = context;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = 420;
      oscillator.type = 'sine';
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.025, context.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.08);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.09);
      lastToneRef.current = Date.now();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((value) => !value)}
      className="fixed bottom-20 left-4 z-50 flex h-9 items-center gap-2 rounded-full border border-white/10 bg-nebula px-3 text-xs text-stardust transition-colors hover:border-aurora sm:bottom-6 sm:left-6"
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute interface sounds' : 'Enable interface sounds'}
      title="Optional interface sounds"
    >
      <span aria-hidden="true">{enabled ? '◉' : '○'}</span>
      <span className="hidden sm:inline">Sound {enabled ? 'on' : 'off'}</span>
    </button>
  );
}
