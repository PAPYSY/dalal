/**
 * 10 Cas de Vie
 * Liste des cas + vue détaillée avec exercices dédiés
 */

import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, Clock, ChevronDown, ChevronUp, AlertCircle, Phone } from 'lucide-react';
import { CAS_DE_VIE, type CasDeVie as CasDeVieType, type CasExercise } from '@/data/casDeVie';

export default function CasDeVie() {
  const params = useParams<{ id?: string }>();
  const selectedCas = params.id ? CAS_DE_VIE.find(c => c.id === params.id) : null;

  if (selectedCas) {
    return <CasDetail cas={selectedCas} />;
  }

  return (
    <div className="bg-bg-main">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Cas de Vie
          </h1>
          <p className="text-lg text-text-muted">
            Chaque situation est unique. Trouve celle qui te parle et découvre des exercices adaptés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {CAS_DE_VIE.map(cas => (
            <Link key={cas.id} href={`/cas-de-vie/${cas.id}`}>
              <div
                className="dalal-card p-5 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ borderLeft: `4px solid ${cas.color}` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{cas.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-text-main" style={{ fontFamily: "'Lora', serif" }}>
                      {cas.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">{cas.subtitle}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Emergency note */}
        <div className="max-w-xl mx-auto mt-10">
          <div className="dalal-card p-5 border-2 border-lavender">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-lavender" />
              <span className="font-bold text-text-main">En situation d'urgence?</span>
            </div>
            <p className="text-sm text-text-muted mb-3">
              Si tu es en danger ou si tu penses au suicide, contacte immédiatement:
            </p>
            <div className="space-y-1">
              <a href="tel:+221338255022" className="flex items-center gap-2 text-sm text-green-deep hover:underline">
                <Phone className="w-4 h-4" /> Hôpital de Fann: +221 33 825 50 22
              </a>
              <a href="tel:+221338891515" className="flex items-center gap-2 text-sm text-green-deep hover:underline">
                <Phone className="w-4 h-4" /> SOS Médecins: +221 33 889 15 15 (24h/24)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CasDetail({ cas }: { cas: CasDeVieType }) {
  const [openExercise, setOpenExercise] = useState<number | null>(null);

  return (
    <div className="bg-bg-main">
      <div className="container py-12 max-w-2xl mx-auto">
        <Link href="/cas-de-vie">
          <span className="mb-6 inline-flex items-center gap-2 text-text-main hover:text-green-deep transition cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            Retour aux cas de vie
          </span>
        </Link>
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">{cas.emoji}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
            {cas.title}
          </h1>
          <p className="text-lg italic text-text-muted" style={{ fontFamily: "'Lora', serif" }}>
            {cas.subtitle}
          </p>
        </div>

        {/* Emergency Note */}
        {cas.emergencyNote && (
          <div className="dalal-card p-4 mb-6 border-2 border-lavender">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-lavender flex-shrink-0 mt-0.5" />
              <p className="text-sm text-text-main">{cas.emergencyNote}</p>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="dalal-card p-6 mb-6">
          <p className="text-text-main leading-relaxed">{cas.description}</p>
        </div>

        {/* Signs */}
        <div className="dalal-card p-6 mb-6">
          <h2 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Tu te reconnais?
          </h2>
          <ul className="space-y-2">
            {cas.signs.map((sign, i) => (
              <li key={i} className="flex items-start gap-2 text-text-muted">
                <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: cas.color }} />
                {sign}
              </li>
            ))}
          </ul>
        </div>

        {/* Exercises */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Exercices pour toi
          </h2>
          <div className="space-y-3">
            {cas.exercises.map((exercise, i) => (
              <ExerciseCard
                key={i}
                exercise={exercise}
                isOpen={openExercise === i}
                onToggle={() => setOpenExercise(openExercise === i ? null : i)}
                color={cas.color}
              />
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="dalal-card p-6">
          <h2 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Ressources professionnelles
          </h2>
          <ul className="space-y-2">
            {cas.resources.map((resource, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                <Phone className="w-4 h-4 text-green-deep flex-shrink-0" />
                <span>{resource}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/annuaire">
              <span className="text-sm text-green-deep hover:underline cursor-pointer">
                Voir l'annuaire complet →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, isOpen, onToggle, color }: { exercise: CasExercise; isOpen: boolean; onToggle: () => void; color: string }) {
  return (
    <div className="dalal-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <div>
            <h3 className="font-bold text-text-main">{exercise.title}</h3>
            <p className="text-sm text-text-muted">{exercise.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock className="w-3 h-3" /> {exercise.duration}
          </span>
          {isOpen ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-green-light/20 pt-4">
          <ol className="space-y-3">
            {exercise.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-muted">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: color + '30', color: color }}>
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
