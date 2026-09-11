// Lightweight environmental events for the Works planetary system.
// Events are intentionally sparse so atmosphere never competes with projects.
import { useEffect, useState } from 'react';

const EVENT_WINDOWS = {
  meteor: { min: 18000, max: 34000, duration: 3200 },
  flare: { min: 36000, max: 56000, duration: 3600 },
  comet: { min: 46000, max: 76000, duration: 6200 },
};

function randomBetween(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

export function useStellarEvents(enabled = true) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!enabled || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      return undefined;

    let stopped = false;
    let scheduleTimer;
    let clearTimer;

    const schedule = () => {
      const types = Object.keys(EVENT_WINDOWS);
      const type = types[Math.floor(Math.random() * types.length)];
      const eventWindow = EVENT_WINDOWS[type];
      scheduleTimer = window.setTimeout(
        () => {
          if (stopped) return;
          setEvent({ type, id: Date.now() });
          clearTimer = window.setTimeout(() => {
            setEvent(null);
            schedule();
          }, eventWindow.duration);
        },
        randomBetween(eventWindow.min, eventWindow.max),
      );
    };

    schedule();
    return () => {
      stopped = true;
      window.clearTimeout(scheduleTimer);
      window.clearTimeout(clearTimer);
    };
  }, [enabled]);

  return event;
}

function MeteorShower() {
  return (
    <div className="stellar-event stellar-event--meteor" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((meteor) => (
        <span key={meteor} style={{ '--meteor-index': meteor }} />
      ))}
    </div>
  );
}

function SolarFlare() {
  return (
    <div className="stellar-event stellar-event--flare" aria-hidden="true">
      <span />
      <i>ENERGY WAVE</i>
    </div>
  );
}

function DistantComet() {
  return (
    <div className="stellar-event stellar-event--comet" aria-hidden="true">
      <span />
      <i>EXPLORING</i>
    </div>
  );
}

export default function StellarEvents({ event }) {
  if (!event) return null;
  if (event.type === 'meteor') return <MeteorShower key={event.id} />;
  if (event.type === 'flare') return <SolarFlare key={event.id} />;
  return <DistantComet key={event.id} />;
}
