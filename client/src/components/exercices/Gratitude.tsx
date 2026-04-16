/**
 * Journal de Gratitude
 * 3 prompts rotatifs, calendrier 30 jours, streak, sauvegarde localStorage
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const PROMPTS = [
  'Quelle petite chose t\'a fait sourire aujourd\'hui?',
  'Qui est une personne pour laquelle tu es reconnaissant(e)?',
  'Quel moment de ta journée voudrais-tu revivre?',
  'Qu\'est-ce que ton corps t\'a permis de faire aujourd\'hui?',
  'Quel son, odeur ou goût t\'a apporté du réconfort?',
  'Quelle difficulté t\'a rendu plus fort(e)?',
  'Qu\'est-ce que tu apprécies dans l\'endroit où tu vis?',
  'Quel talent ou qualité apprécies-tu chez toi?',
  'Quelle leçon as-tu apprise récemment?',
  'Qu\'est-ce qui te donne de l\'espoir pour demain?',
  'Quel acte de gentillesse as-tu reçu ou donné?',
  'Quelle partie de ta culture te rend fier(ère)?',
  'Quel rêve te motive à avancer?',
  'Qu\'est-ce que tu as accompli cette semaine, même petit?',
  'Quel souvenir heureux te réchauffe le cœur?',
  'Quelle nourriture as-tu savourée récemment?',
  'Quel ami(e) ou proche t\'a soutenu(e)?',
  'Qu\'est-ce qui te rend unique et spécial(e)?',
  'Quel endroit dans la nature t\'apaise?',
  'Quelle chanson ou musique te met de bonne humeur?',
];

interface GratitudeEntry {
  date: string;
  items: string[];
  prompts: string[];
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getStreak(entries: GratitudeEntry[]): number {
  if (entries.length === 0) return 0;
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    if (sorted.find(e => e.date === dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

function getLast30Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

export default function GratitudeExercice() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [todayPrompts, setTodayPrompts] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [todayDone, setTodayDone] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dalal_gratitude');
    if (stored) {
      const parsed = JSON.parse(stored) as GratitudeEntry[];
      setEntries(parsed);
      const todayEntry = parsed.find(e => e.date === getToday());
      if (todayEntry) {
        setTodayDone(true);
        setAnswers(todayEntry.items);
        setTodayPrompts(todayEntry.prompts);
      }
    }
    
    if (!todayDone) {
      // Pick 3 random prompts
      const shuffled = [...PROMPTS].sort(() => Math.random() - 0.5);
      setTodayPrompts(shuffled.slice(0, 3));
    }
  }, []);

  const save = () => {
    if (answers.some(a => !a.trim())) return;
    
    const entry: GratitudeEntry = {
      date: getToday(),
      items: answers.map(a => a.trim()),
      prompts: todayPrompts,
    };
    
    const newEntries = entries.filter(e => e.date !== getToday());
    newEntries.push(entry);
    setEntries(newEntries);
    localStorage.setItem('dalal_gratitude', JSON.stringify(newEntries));
    setTodayDone(true);
  };

  const streak = getStreak(entries);
  const last30 = getLast30Days();
  const entryDates = new Set(entries.map(e => e.date));

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
        Journal de Gratitude
      </h2>
      <p className="text-text-muted mb-8 text-center">
        3 choses positives chaque jour transforment ta perspective
      </p>

      {/* Streak */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="dalal-card px-6 py-3 text-center">
          <span className="text-2xl font-bold text-green-deep">{streak}</span>
          <span className="text-sm text-text-muted ml-2">jour{streak > 1 ? 's' : ''} consécutif{streak > 1 ? 's' : ''}</span>
        </div>
        <div className="dalal-card px-6 py-3 text-center">
          <span className="text-2xl font-bold text-green-deep">{entries.length}</span>
          <span className="text-sm text-text-muted ml-2">entrée{entries.length > 1 ? 's' : ''} total</span>
        </div>
      </div>

      {/* Calendar 30 days */}
      <div className="dalal-card p-4 mb-8">
        <p className="text-sm text-text-muted mb-3 text-center">30 derniers jours</p>
        <div className="grid grid-cols-10 gap-1">
          {last30.map(day => (
            <div
              key={day}
              className={`w-full aspect-square rounded-md transition-all ${
                entryDates.has(day) ? 'bg-green-deep' : day === getToday() ? 'ring-2 ring-green-deep bg-green-light/30' : 'bg-green-light/10'
              }`}
              title={day}
            />
          ))}
        </div>
      </div>

      {/* Today's Entry */}
      {todayDone ? (
        <div className="dalal-card p-6 text-center">
          <span className="text-3xl mb-4 block">🌻</span>
          <h3 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Tu as déjà écrit aujourd'hui !
          </h3>
          <div className="space-y-3 text-left">
            {answers.map((a, i) => (
              <div key={i} className="p-3 rounded-xl bg-bg-main">
                <p className="text-xs text-text-muted mb-1">{todayPrompts[i]}</p>
                <p className="text-text-main">{a}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {todayPrompts.map((prompt, i) => (
            <div key={i} className="dalal-card p-5">
              <label className="block text-sm font-medium text-green-deep mb-2">
                {i + 1}. {prompt}
              </label>
              <textarea
                value={answers[i]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[i] = e.target.value;
                  setAnswers(newAnswers);
                }}
                placeholder="Écris ta réponse ici..."
                className="w-full px-4 py-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep resize-none"
                rows={2}
              />
            </div>
          ))}
          <div className="text-center">
            <Button
              onClick={save}
              className="dalal-button-primary"
              disabled={answers.some(a => !a.trim())}
            >
              Sauvegarder mes gratitudes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
