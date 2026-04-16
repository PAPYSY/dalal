/**
 * Page de Bascule
 * Affichée quand le Care Engine détecte un signal de détresse
 * 3 choix: exercice, parler à quelqu'un, contacter un professionnel
 * + PHQ-2, contact de confiance
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Heart, Phone, Wind, ArrowLeft, MessageCircle, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHQ2_QUESTIONS, PHQ2_OPTIONS, evaluatePHQ2, type PHQ2Result } from '@/lib/careEngine';

interface TrustedContact {
  name: string;
  phone: string;
}

function getStoredContact(): TrustedContact | null {
  try {
    const data = localStorage.getItem('dalal_trusted_contact');
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

function storeContact(contact: TrustedContact) {
  localStorage.setItem('dalal_trusted_contact', JSON.stringify(contact));
}

export default function Bascule() {
  const [, setLocation] = useLocation();
  const [showPHQ2, setShowPHQ2] = useState(false);
  const [phq2Answers, setPhq2Answers] = useState<number[]>([]);
  const [phq2Result, setPhq2Result] = useState<PHQ2Result | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [contact, setContact] = useState<TrustedContact | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    setContact(getStoredContact());
  }, []);

  const handlePHQ2Answer = (questionIndex: number, value: number) => {
    const newAnswers = [...phq2Answers];
    newAnswers[questionIndex] = value;
    setPhq2Answers(newAnswers);

    if (newAnswers.length === 2 && newAnswers.every(a => a !== undefined)) {
      setPhq2Result(evaluatePHQ2(newAnswers));
    }
  };

  const handleSaveContact = () => {
    if (contactName.trim() && contactPhone.trim()) {
      const newContact = { name: contactName.trim(), phone: contactPhone.trim() };
      storeContact(newContact);
      setContact(newContact);
      setShowContact(false);
    }
  };

  const predefinedMessage = encodeURIComponent(
    "Salut, j'ai besoin de parler. Je ne me sens pas bien en ce moment. Tu es disponible?"
  );

  return (
    <div className="bg-bg-main">
      <div className="container py-12 max-w-xl mx-auto">
        <Link href="/">
          <span className="mb-6 inline-flex items-center gap-2 text-text-main hover:text-green-deep transition cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            Retour
          </span>
        </Link>
        {/* Gentle reminder */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" style={{ color: '#8B6BAE' }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-3" style={{ fontFamily: "'Lora', serif" }}>
            Dalal est là pour toi
          </h1>
          <p className="text-lg text-text-muted">
            Ce que tu ressens est important. Tu mérites de l'aide.
          </p>
        </div>

        {/* 3 Choices */}
        <div className="space-y-4 mb-8">
          {/* Choice 1: Exercise */}
          <button
            onClick={() => setLocation('/exercices')}
            className="w-full dalal-card p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] text-left"
          >
            <div className="w-12 h-12 rounded-full bg-green-light/30 flex items-center justify-center flex-shrink-0">
              <Wind className="w-6 h-6 text-green-deep" />
            </div>
            <div>
              <h3 className="font-bold text-text-main">Je veux me calmer maintenant</h3>
              <p className="text-sm text-text-muted">Exercices de respiration et d'ancrage pour retrouver le calme</p>
            </div>
          </button>

          {/* Choice 2: Talk to someone */}
          <div className="dalal-card p-5">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-mist/30 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-blue-slate" />
              </div>
              <div>
                <h3 className="font-bold text-text-main">Je veux parler à quelqu'un</h3>
                <p className="text-sm text-text-muted">Envoie un message à une personne de confiance</p>
              </div>
            </div>

            {contact ? (
              <div className="ml-16 space-y-2">
                <div className="flex items-center justify-between bg-bg-main rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-text-main">{contact.name}</p>
                    <p className="text-xs text-text-muted">{contact.phone}</p>
                  </div>
                  <button onClick={() => setShowContact(true)} className="text-xs text-green-deep hover:underline">
                    Modifier
                  </button>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${contact.phone.replace(/\s/g, '')}?text=${predefinedMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-lg bg-green-deep text-white text-sm font-medium hover:bg-green-deep/90 transition"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex-1 text-center py-2 rounded-lg bg-blue-mist text-text-main text-sm font-medium hover:bg-blue-mist/80 transition"
                  >
                    Appeler
                  </a>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowContact(true)}
                className="ml-16 text-sm text-green-deep hover:underline"
              >
                + Ajouter un contact de confiance
              </button>
            )}
          </div>

          {/* Choice 3: Professional */}
          <button
            onClick={() => setLocation('/urgence')}
            className="w-full dalal-card p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] text-left border-2 border-lavender"
          >
            <div className="w-12 h-12 rounded-full bg-lavender/30 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" style={{ color: '#8B6BAE' }} />
            </div>
            <div>
              <h3 className="font-bold text-text-main">Je veux parler à un professionnel</h3>
              <p className="text-sm text-text-muted">Numéros d'urgence et ressources professionnelles</p>
            </div>
          </button>
        </div>

        {/* PHQ-2 */}
        <div className="dalal-card p-6 mb-6">
          <button
            onClick={() => setShowPHQ2(!showPHQ2)}
            className="flex items-center gap-2 text-text-main hover:text-green-deep transition w-full text-left"
          >
            <Shield className="w-5 h-5" />
            <span className="font-bold">Auto-évaluation rapide (PHQ-2)</span>
          </button>

          {showPHQ2 && (
            <div className="mt-4 space-y-6">
              <p className="text-sm text-text-muted">
                Ce questionnaire n'est pas un diagnostic. Il peut t'aider à mieux comprendre ce que tu ressens.
              </p>

              {PHQ2_QUESTIONS.map((question, qi) => (
                <div key={qi}>
                  <p className="text-sm text-text-main mb-3">{question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PHQ2_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handlePHQ2Answer(qi, option.value)}
                        className={`p-2 rounded-lg text-sm transition ${
                          phq2Answers[qi] === option.value
                            ? 'bg-green-deep text-white'
                            : 'bg-bg-main text-text-muted hover:bg-green-light/20'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {phq2Result && (
                <div className={`p-4 rounded-xl ${phq2Result.isPositive ? 'bg-lavender/20' : 'bg-green-light/20'}`}>
                  <p className="text-sm font-medium text-text-main mb-1">
                    Score: {phq2Result.score}/6
                  </p>
                  <p className="text-sm text-text-muted">{phq2Result.message}</p>
                  {phq2Result.isPositive && (
                    <Link href="/annuaire">
                      <span className="inline-block mt-2 text-sm text-green-deep hover:underline cursor-pointer">
                        Voir l'annuaire professionnel →
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reminder */}
        <div className="text-center text-sm text-text-muted">
          <p>Rappelle-toi: demander de l'aide est un acte de courage, pas de faiblesse.</p>
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-main" style={{ fontFamily: "'Lora', serif" }}>
                Contact de confiance
              </h3>
              <button onClick={() => setShowContact(false)}>
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <p className="text-sm text-text-muted mb-4">
              Cette personne pourra recevoir un message prédéfini de ta part en un clic. Stocké uniquement sur ton appareil.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nom (ex: Maman, Fatou, Ibra)"
                className="w-full p-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep text-sm"
              />
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Numéro (ex: +221 77 123 45 67)"
                className="w-full p-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep text-sm"
              />
              <Button
                onClick={handleSaveContact}
                disabled={!contactName.trim() || !contactPhone.trim()}
                className="w-full bg-green-deep text-white hover:bg-green-deep/90 rounded-xl"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
