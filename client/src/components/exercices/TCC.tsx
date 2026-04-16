/**
 * Pensées Automatiques — Technique TCC
 * Tableau 3 colonnes: Situation, Pensée automatique, Pensée alternative
 * Historique local, exemples guidés
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface TCCEntry {
  id: string;
  date: string;
  situation: string;
  penseeAuto: string;
  distortion: string;
  penseeAlternative: string;
}

const DISTORTIONS = [
  { id: 'catastrophisation', label: 'Catastrophisation', desc: 'Imaginer le pire scénario possible' },
  { id: 'generalisation', label: 'Généralisation', desc: 'Tirer une conclusion générale d\'un seul événement' },
  { id: 'lecture_pensee', label: 'Lecture de pensée', desc: 'Croire savoir ce que les autres pensent' },
  { id: 'filtre_mental', label: 'Filtre mental', desc: 'Ne voir que le négatif en ignorant le positif' },
  { id: 'personnalisation', label: 'Personnalisation', desc: 'Se sentir responsable de tout' },
  { id: 'tout_ou_rien', label: 'Tout ou rien', desc: 'Voir les choses en noir ou blanc' },
  { id: 'etiquetage', label: 'Étiquetage', desc: 'Se coller une étiquette négative' },
  { id: 'raisonnement_emotionnel', label: 'Raisonnement émotionnel', desc: 'Croire que ses émotions sont la réalité' },
];

const EXAMPLES = [
  {
    situation: 'Mon ami n\'a pas répondu à mon message depuis 2 jours',
    penseeAuto: 'Il ne m\'aime plus, je suis ennuyeux(se)',
    distortion: 'lecture_pensee',
    penseeAlternative: 'Il est peut-être occupé. Je peux lui envoyer un autre message ou l\'appeler.',
  },
  {
    situation: 'J\'ai eu une mauvaise note à l\'examen',
    penseeAuto: 'Je suis nul(le), je ne réussirai jamais',
    distortion: 'generalisation',
    penseeAlternative: 'Une mauvaise note ne définit pas mon intelligence. Je peux étudier différemment la prochaine fois.',
  },
  {
    situation: 'Mes parents se disputent',
    penseeAuto: 'C\'est de ma faute, si j\'étais meilleur(e) ils ne se disputeraient pas',
    distortion: 'personnalisation',
    penseeAlternative: 'Les disputes de mes parents ne sont pas causées par moi. Les adultes ont leurs propres problèmes.',
  },
];

export default function TCCExercice() {
  const [entries, setEntries] = useState<TCCEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const [form, setForm] = useState({
    situation: '',
    penseeAuto: '',
    distortion: '',
    penseeAlternative: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('dalal_tcc');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const saveEntry = () => {
    if (!form.situation.trim() || !form.penseeAuto.trim() || !form.penseeAlternative.trim()) return;
    
    const entry: TCCEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...form,
    };
    
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    localStorage.setItem('dalal_tcc', JSON.stringify(newEntries));
    setForm({ situation: '', penseeAuto: '', distortion: '', penseeAlternative: '' });
    setShowForm(false);
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(e => e.id !== id);
    setEntries(newEntries);
    localStorage.setItem('dalal_tcc', JSON.stringify(newEntries));
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
        Pensées Automatiques
      </h2>
      <p className="text-text-muted mb-8 text-center">
        Identifie tes pensées négatives, questionne-les, et reformule-les
      </p>

      {/* Examples */}
      <div className="dalal-card p-4 mb-6">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-semibold text-green-deep">Exemples pour comprendre</span>
          {showExamples ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
        </button>
        
        {showExamples && (
          <div className="mt-4 space-y-3">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="p-3 rounded-xl bg-bg-main text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <span className="text-xs font-semibold text-text-muted block mb-1">Situation</span>
                    <p className="text-text-main">{ex.situation}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text-muted block mb-1">Pensée automatique</span>
                    <p className="text-text-main" style={{ color: '#c0392b' }}>{ex.penseeAuto}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text-muted block mb-1">Pensée alternative</span>
                    <p className="text-green-deep">{ex.penseeAlternative}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New */}
      {!showForm ? (
        <div className="text-center mb-6">
          <Button onClick={() => setShowForm(true)} className="dalal-button-primary">
            <Plus className="w-4 h-4 mr-2" /> Nouvelle entrée
          </Button>
        </div>
      ) : (
        <div className="dalal-card p-6 mb-6">
          <h3 className="text-lg font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Nouvelle entrée
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                1. Quelle est la situation?
              </label>
              <textarea
                value={form.situation}
                onChange={(e) => setForm({ ...form, situation: e.target.value })}
                placeholder="Décris brièvement ce qui s'est passé..."
                className="w-full px-4 py-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep resize-none"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                2. Quelle pensée automatique as-tu eue?
              </label>
              <textarea
                value={form.penseeAuto}
                onChange={(e) => setForm({ ...form, penseeAuto: e.target.value })}
                placeholder="Qu'est-ce que tu t'es dit spontanément?"
                className="w-full px-4 py-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep resize-none"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                3. Quel type de distorsion cognitive? (optionnel)
              </label>
              <select
                value={form.distortion}
                onChange={(e) => setForm({ ...form, distortion: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-green-light bg-bg-main text-text-main focus:outline-none focus:ring-2 focus:ring-green-deep"
              >
                <option value="">Choisis une distorsion...</option>
                {DISTORTIONS.map(d => (
                  <option key={d.id} value={d.id}>{d.label} — {d.desc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                4. Quelle pensée alternative plus réaliste?
              </label>
              <textarea
                value={form.penseeAlternative}
                onChange={(e) => setForm({ ...form, penseeAlternative: e.target.value })}
                placeholder="Comment pourrais-tu voir les choses autrement?"
                className="w-full px-4 py-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep resize-none"
                rows={2}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={saveEntry} className="dalal-button-primary" disabled={!form.situation.trim() || !form.penseeAuto.trim() || !form.penseeAlternative.trim()}>
                Sauvegarder
              </Button>
              <Button onClick={() => setShowForm(false)} className="dalal-button-secondary">
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {entries.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Historique ({entries.length} entrée{entries.length > 1 ? 's' : ''})
          </h3>
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="dalal-card p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs text-text-muted">
                    {new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <button onClick={() => deleteEntry(entry.id)} className="text-text-muted hover:text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-2 rounded-lg bg-bg-main">
                    <span className="text-xs font-semibold text-text-muted block mb-1">Situation</span>
                    <p className="text-text-main">{entry.situation}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-bg-main">
                    <span className="text-xs font-semibold text-text-muted block mb-1">Pensée automatique</span>
                    <p style={{ color: '#c0392b' }}>{entry.penseeAuto}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-bg-main">
                    <span className="text-xs font-semibold text-text-muted block mb-1">Pensée alternative</span>
                    <p className="text-green-deep">{entry.penseeAlternative}</p>
                  </div>
                </div>
                {entry.distortion && (
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-mist/30 text-blue-slate">
                      {DISTORTIONS.find(d => d.id === entry.distortion)?.label || entry.distortion}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
