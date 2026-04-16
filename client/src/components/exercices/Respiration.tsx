/**
 * Respiration Guidée — Box Breathing
 * 4 phases: Inspire (4s), Retiens (4s), Expire (4s), Retiens (4s)
 * Sphère animée, compteur de cycles, messages encourageants
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const PHASES = [
  { label: 'Inspire...', duration: 4, instruction: 'Remplis tes poumons doucement' },
  { label: 'Retiens...', duration: 4, instruction: 'Garde l\'air en toi' },
  { label: 'Expire...', duration: 4, instruction: 'Laisse tout partir' },
  { label: 'Retiens...', duration: 4, instruction: 'Reste dans le calme' },
];

const ENCOURAGEMENTS = [
  'Tu fais très bien.',
  'Chaque respiration te rapproche du calme.',
  'Tu es en sécurité ici.',
  'Continue, tu es courageux(se).',
  'Ton corps te remercie.',
  'La paix est en toi.',
];

export default function RespirationExercice() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timer, setTimer] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [targetCycles, setTargetCycles] = useState(4);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase = PHASES[phaseIndex];

  const stop = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setPhaseIndex((pi) => {
            const next = (pi + 1) % 4;
            if (next === 0) {
              setCycles((c) => {
                const newC = c + 1;
                if (newC >= targetCycles) {
                  setIsComplete(true);
                  stop();
                }
                return newC;
              });
            }
            return next;
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, targetCycles, stop]);

  const start = () => {
    setIsActive(true);
    setPhaseIndex(0);
    setTimer(4);
    setCycles(0);
    setIsComplete(false);
  };

  const reset = () => {
    stop();
    setPhaseIndex(0);
    setTimer(4);
    setCycles(0);
    setIsComplete(false);
  };

  // Sphere scale based on phase
  const getScale = () => {
    if (!isActive) return 1;
    if (phaseIndex === 0) return 1 + ((4 - timer) / 4) * 0.4; // Growing
    if (phaseIndex === 1) return 1.4; // Full
    if (phaseIndex === 2) return 1.4 - ((4 - timer) / 4) * 0.4; // Shrinking
    return 1; // Empty
  };

  if (isComplete) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-green-light mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">🌿</span>
        </div>
        <h2 className="text-3xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
          Bravo, tu as terminé !
        </h2>
        <p className="text-text-muted mb-2">
          {targetCycles} cycles de respiration complétés.
        </p>
        <p className="text-text-muted mb-8 italic" style={{ fontFamily: "'Lora', serif" }}>
          "{ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]}"
        </p>
        <Button onClick={reset} className="dalal-button-primary">
          Recommencer
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
        Respiration Guidée
      </h2>
      <p className="text-text-muted mb-8">Box Breathing — 4 temps de 4 secondes</p>

      {/* Sphere */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <div
          className="absolute inset-0 rounded-full transition-transform duration-1000 ease-in-out"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #C5D5E8, #4A7C6F)',
            transform: `scale(${getScale()})`,
            boxShadow: isActive ? '0 0 40px rgba(74, 124, 111, 0.3)' : '0 0 20px rgba(74, 124, 111, 0.15)',
          }}
        />
        {isActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="text-4xl font-bold text-white drop-shadow-lg">{timer}</span>
          </div>
        )}
      </div>

      {/* Phase Label */}
      {isActive && (
        <div className="mb-6">
          <p className="text-2xl font-bold text-green-deep mb-1" style={{ fontFamily: "'Lora', serif" }}>
            {currentPhase.label}
          </p>
          <p className="text-text-muted text-sm">{currentPhase.instruction}</p>
        </div>
      )}

      {/* Cycle Counter */}
      {isActive && (
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: targetCycles }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i < cycles ? 'bg-green-deep' : 'bg-green-light'
              }`}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      {!isActive ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <label className="text-text-muted text-sm">Nombre de cycles:</label>
            <select
              value={targetCycles}
              onChange={(e) => setTargetCycles(Number(e.target.value))}
              className="rounded-lg border border-green-light px-3 py-1 bg-bg-main text-text-main"
            >
              {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>{n} cycles</option>
              ))}
            </select>
          </div>
          <Button onClick={start} className="dalal-button-primary">
            Commencer la respiration
          </Button>
        </div>
      ) : (
        <Button onClick={stop} className="dalal-button-secondary">
          Arrêter
        </Button>
      )}
    </div>
  );
}
