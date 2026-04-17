/**
 * Expression Page - Dalal
 * Espace d'expression anonyme avec Care Engine intégré
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { Trash2, Save, AlertCircle, Heart } from 'lucide-react';
import { analyzeText, type DetectionResult } from '@/lib/careEngine';
import { toast } from 'sonner';

const MOOD_OPTIONS = [
  { emoji: '😢', label: 'Triste', color: 'bg-blue-mist/30', value: 'sad' },
  { emoji: '😰', label: 'Anxieux', color: 'bg-lavender/30', value: 'anxious' },
  { emoji: '😤', label: 'Frustré', color: 'bg-cream-gold/30', value: 'frustrated' },
  { emoji: '😔', label: 'Découragé', color: 'bg-green-light/30', value: 'discouraged' },
  { emoji: '😞', label: 'Déprimé', color: 'bg-blue-slate/20', value: 'depressed' },
];

export default function Expression() {
  const [, setLocation] = useLocation();
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [savedEntries, setSavedEntries] = useState<any[]>([]);
  const [detection, setDetection] = useState<DetectionResult | null>(null);

  useEffect(() => {
    try {
      const entries = localStorage.getItem('dalal_entries');
      if (entries) setSavedEntries(JSON.parse(entries));
    } catch {}
  }, []);

  // Care Engine analysis
  useEffect(() => {
    if (text.length > 10) {
      const result = analyzeText(text);
      setDetection(result);
    } else {
      setDetection(null);
    }
  }, [text]);

  const handleSave = () => {
    if (!text.trim()) return;
    const entry = {
      id: Date.now(),
      text,
      mood: selectedMood,
      timestamp: new Date().toISOString(),
    };
    const entries = [...savedEntries, entry];
    localStorage.setItem('dalal_entries', JSON.stringify(entries));
    setSavedEntries(entries);

    // Log activity
    try {
      const activities = JSON.parse(localStorage.getItem('dalal_activities') || '[]');
      activities.push({ date: new Date().toISOString(), type: 'expression', label: 'Expression écrite' });
      localStorage.setItem('dalal_activities', JSON.stringify(activities));
    } catch {}

    setText('');
    setSelectedMood(null);
    toast.success('Ton message est sauvegardé en sécurité sur ton appareil.');
  };

  const handleRelease = () => {
    if (!text.trim()) return;
    setText('');
    setSelectedMood(null);
    toast('Tu as lâché prise. C\'est courageux.', { icon: '🕊️' });
  };

  return (
    <div className="bg-bg-main">
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Écris ce que tu ressens
            </h1>
            <p className="text-lg text-text-muted">
              Cet espace est entièrement anonyme. Personne ne te juge ici. Tout ce que tu écris reste sur ton appareil.
            </p>
          </div>

          {/* Mood Selector */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-text-main mb-4">
              Comment te sens-tu en ce moment?
            </label>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {MOOD_OPTIONS.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-2 sm:p-4 rounded-2xl transition-all duration-300 ${
                    selectedMood === mood.value
                      ? `${mood.color} ring-2 ring-green-deep scale-110`
                      : `${mood.color} hover:scale-105`
                  }`}
                >
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{mood.emoji}</div>
                  <div className="text-xs font-medium text-text-main leading-tight">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Écris ce que tu ressens... personne ne te juge ici"
              className="w-full h-64 p-6 rounded-3xl bg-bg-card border-2 border-green-light/30 focus:border-green-deep focus:outline-none resize-none text-text-main placeholder-text-muted"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              maxLength={2000}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-text-muted">{text.length}/2000</span>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                </svg>
                Cet espace est privé
              </div>
            </div>
          </div>

          {/* Care Engine Alert - Gentle */}
          {detection && detection.level === 'low' && (
            <div className="mb-6 p-4 rounded-2xl bg-green-light/10 border border-green-light/30">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-green-deep flex-shrink-0" />
                <p className="text-sm text-text-muted">{detection.message}</p>
              </div>
            </div>
          )}

          {/* Care Engine Alert - Medium */}
          {detection && detection.level === 'medium' && (
            <div className="mb-6 p-5 rounded-2xl bg-blue-mist/20 border border-blue-mist/40">
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-blue-slate flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-text-main mb-2">{detection.message}</p>
                  {detection.suggestedCas && (
                    <Link href={`/cas-de-vie/${detection.suggestedCas}`}>
                      <span className="text-sm text-green-deep hover:underline cursor-pointer">
                        Voir des exercices adaptés →
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Care Engine Alert - High/Critical */}
          {detection && (detection.level === 'high' || detection.level === 'critical') && (
            <div className="mb-6 p-5 rounded-2xl bg-lavender/20 border-2 border-lavender/50">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#8B6BAE' }} />
                <div>
                  <h3 className="font-bold text-text-main mb-1">Tu traverses une période très difficile</h3>
                  <p className="text-sm text-text-muted mb-3">{detection.message}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setLocation('/basculer')}
                      className="bg-lavender text-text-main hover:bg-lavender/80 rounded-full text-sm px-4 py-2"
                    >
                      Obtenir de l'aide
                    </Button>
                    {detection.level === 'critical' && (
                      <a href="tel:+221338255022">
                        <Button className="bg-green-deep text-white hover:bg-green-deep/90 rounded-full text-sm px-4 py-2">
                          Appeler maintenant
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={handleSave}
              disabled={!text.trim()}
              className="dalal-button-primary flex-1 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Garder pour moi
            </Button>
            <Button
              onClick={handleRelease}
              disabled={!text.trim()}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Lâcher prise
            </Button>
          </div>

          {/* Info Box */}
          <div className="p-6 rounded-2xl bg-green-light/10 border border-green-light/30">
            <h3 className="font-bold text-text-main mb-3" style={{ fontFamily: "'Lora', serif" }}>
              Comment fonctionne cet espace?
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-center gap-2"><span className="text-green-deep">✓</span> Aucun compte requis — tu restes anonyme</li>
              <li className="flex items-center gap-2"><span className="text-green-deep">✓</span> Tout est sauvegardé localement sur ton appareil</li>
              <li className="flex items-center gap-2"><span className="text-green-deep">✓</span> Personne ne peut lire ce que tu écris</li>
              <li className="flex items-center gap-2"><span className="text-green-deep">✓</span> Tu peux revenir quand tu veux</li>
              <li className="flex items-center gap-2"><span className="text-green-deep">✓</span> Pas de jugement, jamais</li>
            </ul>
          </div>

          {/* Saved Entries */}
          {savedEntries.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-text-main mb-6" style={{ fontFamily: "'Lora', serif" }}>
                Tes entrées récentes ({savedEntries.length})
              </h2>
              <div className="space-y-4">
                {savedEntries.slice(-3).reverse().map((entry) => (
                  <div key={entry.id} className="dalal-card p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">
                        {MOOD_OPTIONS.find(m => m.value === entry.mood)?.emoji}
                      </span>
                      <span className="text-xs text-text-muted">
                        {new Date(entry.timestamp).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-text-main line-clamp-3">{entry.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
