/**
 * Atelier Créatif
 * 3 ateliers: Canvas de dessin, Écriture créative, Mosaïque d'émotions
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush, PenTool, Grid3X3, ArrowLeft } from 'lucide-react';
import CanvasDessin from '@/components/creatif/CanvasDessin';
import EcritureCreative from '@/components/creatif/EcritureCreative';
import MosaiqueEmotions from '@/components/creatif/MosaiqueEmotions';

const ateliers = [
  {
    id: 'dessin',
    title: 'Canvas de Dessin',
    description: 'Dessine librement avec une palette de couleurs apaisantes. Exporte ton œuvre en PNG.',
    icon: Paintbrush,
    color: 'bg-cream-gold',
  },
  {
    id: 'ecriture',
    title: 'Écriture Créative',
    description: 'Laisse les mots couler avec des prompts inspirants. Mode plein écran disponible.',
    icon: PenTool,
    color: 'bg-green-light',
  },
  {
    id: 'mosaique',
    title: 'Mosaïque d\'Émotions',
    description: 'Compose ta mosaïque avec 20 émotions colorées. Découvre ton bilan émotionnel.',
    icon: Grid3X3,
    color: 'bg-blue-mist',
  },
];

export default function Creatif() {
  const [activeAtelier, setActiveAtelier] = useState<string | null>(null);

  if (activeAtelier) {
    return (
      <div className="bg-bg-main">
        <div className="container py-8">
          <button
            onClick={() => setActiveAtelier(null)}
            className="mb-6 inline-flex items-center gap-2 text-text-main hover:text-green-deep transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux ateliers</span>
          </button>
          {activeAtelier === 'dessin' && <CanvasDessin />}
          {activeAtelier === 'ecriture' && <EcritureCreative />}
          {activeAtelier === 'mosaique' && <MosaiqueEmotions />}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-main">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Atelier Créatif
          </h1>
          <p className="text-lg text-text-muted">
            L'art comme voie de guérison. Pas besoin de talent, juste d'envie de s'exprimer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {ateliers.map((atelier) => {
            const Icon = atelier.icon;
            return (
              <button
                key={atelier.id}
                onClick={() => setActiveAtelier(atelier.id)}
                className="dalal-card p-8 text-left hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-full ${atelier.color}/30 flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-text-main" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
                  {atelier.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{atelier.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
