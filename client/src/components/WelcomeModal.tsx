/**
 * Modal de Bienvenue - Première visite
 * Affiché une seule fois, stocké dans localStorage
 */

import { useState } from 'react';
import { X, Heart, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div
        className="bg-bg-main rounded-3xl max-w-md w-full p-8 relative"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-green-light/20 transition"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="text-center mb-6">
          {/* Breathing animation */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-deep/10 flex items-center justify-center animate-pulse">
            <Heart className="w-8 h-8 text-green-deep" />
          </div>
          <h2 className="text-2xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
            Bienvenue sur Dallaal
          </h2>
          <p className="text-sm text-text-muted italic" style={{ fontFamily: "'Lora', serif" }}>
            "Dallaal" signifie "calme-toi" en wolof
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-light/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-green-deep" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-main">Anonymat total</p>
              <p className="text-xs text-text-muted">Ici, tu n'existes que pour toi. Aucune trace, aucun compte, aucun regard.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-mist/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Heart className="w-4 h-4 text-blue-slate" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-main">Sans jugement</p>
              <p className="text-xs text-text-muted">Ce que tu ressens est vrai. Même si tu ne trouves pas les mots. Même si ça ne fait pas sens.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-cream-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Globe className="w-4 h-4 text-cream-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-main">Né d'ici</p>
              <p className="text-xs text-text-muted">Fait pour toi, par des gens qui comprennent d'où tu viens et ce que tu portes.</p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleClose}
          className="w-full bg-green-deep text-white hover:bg-green-deep/90 rounded-full py-3"
        >
          Commencer
        </Button>

        <p className="text-center text-xs text-text-muted mt-4">
          Calme-toi. Tu es en sécurité.
        </p>
      </div>
    </div>
  );
}
