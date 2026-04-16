/**
 * Ancrage Sensoriel — Technique 5-4-3-2-1
 * 5 choses que tu vois, 4 que tu touches, 3 que tu entends, 2 que tu sens, 1 que tu goûtes
 * Barre de progression, message final encourageant
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Hand, Ear, Wind, Cookie } from 'lucide-react';

const STEPS = [
  {
    count: 5,
    sense: 'la vue',
    icon: Eye,
    prompt: 'Nomme 5 choses que tu peux VOIR autour de toi',
    placeholder: 'Ex: le mur, une lampe, mes mains...',
    color: '#4A7C6F',
  },
  {
    count: 4,
    sense: 'le toucher',
    icon: Hand,
    prompt: 'Nomme 4 choses que tu peux TOUCHER',
    placeholder: 'Ex: le tissu de mon vêtement, la table...',
    color: '#5C7A99',
  },
  {
    count: 3,
    sense: 'l\'ouïe',
    icon: Ear,
    prompt: 'Nomme 3 choses que tu peux ENTENDRE',
    placeholder: 'Ex: le vent, ma respiration...',
    color: '#D4B896',
  },
  {
    count: 2,
    sense: 'l\'odorat',
    icon: Wind,
    prompt: 'Nomme 2 choses que tu peux SENTIR',
    placeholder: 'Ex: l\'air frais, du parfum...',
    color: '#B8CBBF',
  },
  {
    count: 1,
    sense: 'le goût',
    icon: Cookie,
    prompt: 'Nomme 1 chose que tu peux GOÛTER',
    placeholder: 'Ex: le goût de l\'eau, du thé...',
    color: '#C4B8D4',
  },
];

export default function AncrageExercice() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([[], [], [], [], []]);
  const [currentInput, setCurrentInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const step = STEPS[stepIndex];
  const currentAnswers = answers[stepIndex];
  const totalItems = 5 + 4 + 3 + 2 + 1; // 15
  const completedItems = answers.reduce((sum, arr) => sum + arr.length, 0);
  const progress = (completedItems / totalItems) * 100;

  const addAnswer = () => {
    if (!currentInput.trim()) return;
    const newAnswers = [...answers];
    newAnswers[stepIndex] = [...newAnswers[stepIndex], currentInput.trim()];
    setAnswers(newAnswers);
    setCurrentInput('');

    // Check if step is complete
    if (newAnswers[stepIndex].length >= step.count) {
      if (stepIndex < 4) {
        setTimeout(() => setStepIndex(stepIndex + 1), 500);
      } else {
        setIsComplete(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAnswer();
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-green-light mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">🌍</span>
        </div>
        <h2 className="text-3xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
          Tu es ancré(e) dans le présent
        </h2>
        <p className="text-text-muted mb-4">
          Tu as identifié {completedItems} éléments autour de toi. Tu es ici, maintenant, en sécurité.
        </p>
        <p className="text-text-muted mb-8 italic" style={{ fontFamily: "'Lora', serif" }}>
          "Quand l'esprit s'agite, les sens nous ramènent à la terre."
        </p>
        <Button onClick={() => { setStepIndex(0); setAnswers([[], [], [], [], []]); setIsComplete(false); }} className="dalal-button-primary">
          Recommencer
        </Button>
      </div>
    );
  }

  const Icon = step.icon;

  return (
    <div className="max-w-lg mx-auto py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
        Ancrage Sensoriel
      </h2>
      <p className="text-text-muted mb-8 text-center">Technique 5-4-3-2-1 — Reconnecte-toi au présent</p>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-green-light/30 mb-8">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: step.color }}
        />
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center gap-3 mb-8">
        {STEPS.map((s, i) => {
          const StepIcon = s.icon;
          return (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                i < stepIndex ? 'bg-green-deep' : i === stepIndex ? 'ring-2 ring-green-deep' : 'bg-green-light/30'
              }`}
              style={i === stepIndex ? { backgroundColor: step.color + '30' } : {}}
            >
              <StepIcon className={`w-5 h-5 ${i <= stepIndex ? 'text-text-main' : 'text-text-muted'}`} />
            </div>
          );
        })}
      </div>

      {/* Current Step */}
      <div className="dalal-card p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: step.color + '30' }}>
            <Icon className="w-6 h-6" style={{ color: step.color }} />
          </div>
          <div>
            <span className="text-sm text-text-muted">Étape {stepIndex + 1}/5 — {step.sense}</span>
            <h3 className="text-lg font-bold text-text-main">{step.prompt}</h3>
          </div>
        </div>

        {/* Answers */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
          {currentAnswers.map((answer, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: step.color }}
            >
              {answer}
            </span>
          ))}
          {currentAnswers.length < step.count && (
            <span className="px-3 py-1 rounded-full text-sm border-2 border-dashed text-text-muted" style={{ borderColor: step.color + '50' }}>
              {step.count - currentAnswers.length} restant(s)
            </span>
          )}
        </div>

        {/* Input */}
        {currentAnswers.length < step.count && (
          <div className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={step.placeholder}
              className="flex-1 px-4 py-2 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep"
              autoFocus
            />
            <Button onClick={addAnswer} className="dalal-button-primary" disabled={!currentInput.trim()}>
              Ajouter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
