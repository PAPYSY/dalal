/**
 * Urgence Page - Dalal
 * 
 * Design Philosophy: Minimalisme Organique Africain
 * - Fond lavande doux, jamais alarmant
 * - Respiration guidée automatique
 * - Ressources d'aide réelles au Sénégal
 * - Bouton "Quitter rapidement"
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Link } from 'wouter';
import { Phone, MessageSquare, AlertCircle, Heart } from 'lucide-react';

const RESOURCES = [
  {
    name: 'Hôpital de Fann',
    specialty: 'Psychiatrie & Urgences',
    phone: '+221 33 869 19 19',
    description: 'Service de psychiatrie et d\'urgences 24h/24',
    type: 'hospital',
  },
  {
    name: 'SOS Médecins Sénégal',
    specialty: 'Urgences Médicales',
    phone: '+221 33 889 15 15',
    description: 'Aide médicale d\'urgence 24h/24',
    type: 'emergency',
  },
  {
    name: 'Croix-Rouge Sénégal',
    specialty: 'Aide Psychosociale',
    phone: '+221 33 821 00 00',
    description: 'Soutien psychosocial et premiers secours',
    type: 'support',
  },
  {
    name: 'ASBEF (Association Sénégalaise)',
    specialty: 'Violence & Trauma',
    phone: '+221 33 824 82 82',
    description: 'Aide aux victimes de violence',
    type: 'support',
  },
];

const BREATHING_EXERCISE = {
  phases: [
    { name: 'Inspire', duration: 4, instruction: 'Inspire lentement par le nez' },
    { name: 'Retiens', duration: 4, instruction: 'Retiens ton souffle' },
    { name: 'Expire', duration: 4, instruction: 'Expire lentement par la bouche' },
    { name: 'Pause', duration: 2, instruction: 'Pause avant de recommencer' },
  ],
};

export default function Urgence() {
  const [breathingActive, setBreathingActive] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BREATHING_EXERCISE.phases[0].duration);

  // Breathing exercise timer
  useEffect(() => {
    if (!breathingActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextPhase = (currentPhase + 1) % BREATHING_EXERCISE.phases.length;
          setCurrentPhase(nextPhase);
          return BREATHING_EXERCISE.phases[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathingActive, currentPhase]);

  const phase = BREATHING_EXERCISE.phases[currentPhase];

  return (
    <div className="min-h-screen bg-lavender/30">
      {/* Quick Exit Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => window.location.href = 'https://www.google.com'}
          className="px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-main transition"
          title="Appuyez deux fois sur Échap pour quitter rapidement"
        >
          ✕ Quitter
        </button>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-lavender/20 backdrop-blur-sm border-b border-lavender/30">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8 md:py-12">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Tu n'es pas seul(e)
          </h1>
          <p className="text-lg text-text-muted">
            Si tu traverses une crise, il existe une aide réelle. Respire d'abord, puis contacte quelqu'un.
          </p>
        </div>

        {/* Breathing Exercise */}
        {breathingActive && (
          <div className="max-w-md mx-auto mb-10 md:mb-16 text-center">
            <div className="dalal-card p-6 sm:p-8 md:p-12 bg-lavender/10">
              <h2 className="text-2xl font-bold text-text-main mb-8" style={{ fontFamily: "'Lora', serif" }}>
                Respiration Guidée
              </h2>

              {/* Breathing Circle */}
              <div className="mb-8 flex justify-center">
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-lavender/40 to-blue-mist/40 flex items-center justify-center transition-all duration-1000"
                  style={{
                    transform: `scale(${1 + (timeLeft / phase.duration) * 0.3})`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-5xl font-bold text-lavender">{timeLeft}</div>
                    <div className="text-sm text-text-muted mt-2">{phase.name}</div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <p className="text-text-muted mb-8">{phase.instruction}</p>

              {/* Cycles Counter */}
              <div className="text-sm text-text-muted mb-8">
                Cycle {Math.floor(currentPhase / 4) + 1}
              </div>

              {/* Stop Button */}
              <Button
                onClick={() => setBreathingActive(false)}
                variant="outline"
                className="w-full"
              >
                Arrêter
              </Button>
            </div>
          </div>
        )}

        {/* Resources Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-main mb-8 text-center" style={{ fontFamily: "'Lora', serif" }}>
            Ressources d'aide au Sénégal
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {RESOURCES.map((resource, idx) => (
              <div key={idx} className="dalal-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-lavender/30 flex items-center justify-center flex-shrink-0">
                    {resource.type === 'hospital' && <AlertCircle className="w-5 h-5 text-lavender" />}
                    {resource.type === 'emergency' && <Phone className="w-5 h-5 text-lavender" />}
                    {resource.type === 'support' && <Heart className="w-5 h-5 text-lavender" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-main" style={{ fontFamily: "'Lora', serif" }}>
                      {resource.name}
                    </h3>
                    <p className="text-xs text-text-muted">{resource.specialty}</p>
                  </div>
                </div>

                <p className="text-sm text-text-muted mb-4">{resource.description}</p>

                <div className="flex gap-2">
                  <a
                    href={`tel:${resource.phone.replace(/\s/g, '')}`}
                    className="flex-1"
                  >
                    <Button className="dalal-button-primary w-full text-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${resource.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="dalal-button-secondary w-full text-sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Important Messages */}
          <div className="space-y-6 mb-12">
            <div className="p-6 rounded-2xl bg-green-light/10 border border-green-light/30">
              <h3 className="font-bold text-text-main mb-3" style={{ fontFamily: "'Lora', serif" }}>
                Ce que tu dois savoir
              </h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>✓ Ce que tu dis est confidentiel</li>
                <li>✓ Les professionnels sont formés pour t'écouter</li>
                <li>✓ Il n'y a pas de jugement</li>
                <li>✓ Tu peux appeler ou envoyer un message</li>
                <li>✓ L'aide est gratuite</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-blue-mist/10 border border-blue-mist/30">
              <h3 className="font-bold text-text-main mb-3" style={{ fontFamily: "'Lora', serif" }}>
                Si tu n'oses pas appeler
              </h3>
              <p className="text-sm text-text-muted mb-4">
                C'est normal d'avoir peur. Voici ce que tu peux faire:
              </p>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>• Envoie un message WhatsApp à la place</li>
                <li>• Demande à quelqu'un de confiance de t'accompagner</li>
                <li>• Écris d'abord ce que tu veux dire</li>
                <li>• Rappelle-toi: tu n'es pas seul(e)</li>
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/">
              <Button className="dalal-button-secondary">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
