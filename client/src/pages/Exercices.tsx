/**
 * Exercices Psychologiques Guidés
 * 5 exercices complets: Respiration, Ancrage 5-4-3-2-1, Scan Corporel, Gratitude, TCC
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wind, Eye, Heart, BookOpen, Brain, ArrowLeft } from 'lucide-react';
import RespirationExercice from '@/components/exercices/Respiration';
import AncrageExercice from '@/components/exercices/Ancrage';
import ScanCorporelExercice from '@/components/exercices/ScanCorporel';
import GratitudeExercice from '@/components/exercices/Gratitude';
import TCCExercice from '@/components/exercices/TCC';

const exercices = [
  {
    id: 'respiration',
    title: 'Respiration Guidée',
    subtitle: 'Box Breathing — 4 temps',
    description: 'Inspire, retiens, expire, retiens. Un cycle simple pour calmer ton système nerveux.',
    icon: Wind,
    color: 'bg-blue-mist',
    iconColor: 'text-blue-slate',
  },
  {
    id: 'ancrage',
    title: 'Ancrage Sensoriel',
    subtitle: 'Technique 5-4-3-2-1',
    description: 'Reconnecte-toi au présent en identifiant ce que tes sens perçoivent autour de toi.',
    icon: Eye,
    color: 'bg-green-light',
    iconColor: 'text-green-deep',
  },
  {
    id: 'scan',
    title: 'Scan Corporel',
    subtitle: 'Écoute ton corps',
    description: 'Parcours chaque partie de ton corps pour identifier les tensions et les relâcher.',
    icon: Heart,
    color: 'bg-cream-gold',
    iconColor: 'text-text-main',
  },
  {
    id: 'gratitude',
    title: 'Journal de Gratitude',
    subtitle: '3 choses positives',
    description: 'Note chaque jour 3 choses pour lesquelles tu es reconnaissant(e). Transforme ta perspective.',
    icon: BookOpen,
    color: 'bg-green-light',
    iconColor: 'text-green-deep',
  },
  {
    id: 'tcc',
    title: 'Pensées Automatiques',
    subtitle: 'Technique TCC',
    description: 'Identifie tes pensées négatives automatiques, questionne-les, et reformule-les.',
    icon: Brain,
    color: 'bg-blue-mist',
    iconColor: 'text-blue-slate',
  },
];

export default function Exercices() {
  const [activeExercice, setActiveExercice] = useState<string | null>(null);

  if (activeExercice) {
    return (
      <div className="bg-bg-main">
        <div className="container py-8">
          <button
            onClick={() => setActiveExercice(null)}
            className="mb-6 inline-flex items-center gap-2 text-text-main hover:text-green-deep transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux exercices</span>
          </button>
          {activeExercice === 'respiration' && <RespirationExercice />}
          {activeExercice === 'ancrage' && <AncrageExercice />}
          {activeExercice === 'scan' && <ScanCorporelExercice />}
          {activeExercice === 'gratitude' && <GratitudeExercice />}
          {activeExercice === 'tcc' && <TCCExercice />}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-main">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Exercices Psychologiques Guidés
          </h1>
          <p className="text-lg text-text-muted">
            Des outils simples, validés par la science, pour t'aider à te sentir mieux. Choisis celui qui te parle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {exercices.map((ex) => {
            const Icon = ex.icon;
            return (
              <button
                key={ex.id}
                onClick={() => setActiveExercice(ex.id)}
                className="dalal-card p-6 text-left hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-full ${ex.color}/30 flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${ex.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-1" style={{ fontFamily: "'Lora', serif" }}>
                  {ex.title}
                </h3>
                <p className="text-sm text-green-deep font-medium mb-2">{ex.subtitle}</p>
                <p className="text-text-muted text-sm leading-relaxed">{ex.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
