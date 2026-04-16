/**
 * Suivi Personnel
 * Tableau de bord personnel avec humeur, streak, progression
 * Données stockées localement (localStorage)
 */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import { Calendar, TrendingUp, Heart, Star, ArrowLeft } from 'lucide-react';

interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: number; // 1-5
  note?: string;
}

interface ActivityLog {
  date: string;
  type: string; // 'respiration' | 'ancrage' | 'gratitude' | 'tcc' | 'scan' | 'expression' | 'dessin' | 'ecriture'
  label: string;
}

const MOOD_LEVELS = [
  { value: 1, emoji: '😢', label: 'Très mal', color: '#C4B8D4' },
  { value: 2, emoji: '😔', label: 'Pas bien', color: '#C5D5E8' },
  { value: 3, emoji: '😐', label: 'Neutre', color: '#D4B896' },
  { value: 4, emoji: '🙂', label: 'Bien', color: '#B8CBBF' },
  { value: 5, emoji: '😊', label: 'Très bien', color: '#4A7C6F' },
];

function getStoredMoods(): MoodEntry[] {
  try {
    return JSON.parse(localStorage.getItem('dalal_moods') || '[]');
  } catch { return []; }
}

function storeMood(entry: MoodEntry) {
  const moods = getStoredMoods();
  const existing = moods.findIndex(m => m.date === entry.date);
  if (existing >= 0) {
    moods[existing] = entry;
  } else {
    moods.push(entry);
  }
  localStorage.setItem('dalal_moods', JSON.stringify(moods));
}

function getStoredActivities(): ActivityLog[] {
  try {
    return JSON.parse(localStorage.getItem('dalal_activities') || '[]');
  } catch { return []; }
}

export default function Suivi() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [todayNote, setTodayNote] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const stored = getStoredMoods();
    setMoods(stored);
    const todayEntry = stored.find(m => m.date === today);
    if (todayEntry) {
      setTodayMood(todayEntry.mood);
      setTodayNote(todayEntry.note || '');
    }
    setActivities(getStoredActivities());
  }, [today]);

  const handleMoodSelect = (mood: number) => {
    setTodayMood(mood);
    const entry: MoodEntry = { date: today, mood, note: todayNote };
    storeMood(entry);
    setMoods(getStoredMoods());
  };

  const handleNoteChange = (note: string) => {
    setTodayNote(note);
    if (todayMood) {
      storeMood({ date: today, mood: todayMood, note });
      setMoods(getStoredMoods());
    }
  };

  // Calculate streak
  const streak = useMemo(() => {
    let count = 0;
    const d = new Date();
    while (true) {
      const dateStr = d.toISOString().split('T')[0];
      if (moods.find(m => m.date === dateStr)) {
        count++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [moods]);

  // Last 30 days mood data
  const last30Days = useMemo(() => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const entry = moods.find(m => m.date === dateStr);
      days.push({
        date: dateStr,
        day: d.getDate(),
        mood: entry?.mood || null,
        dayName: d.toLocaleDateString('fr-FR', { weekday: 'short' }),
      });
    }
    return days;
  }, [moods]);

  // Average mood
  const avgMood = useMemo(() => {
    const recent = moods.filter(m => {
      const d = new Date(m.date);
      return d >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    });
    if (recent.length === 0) return null;
    return (recent.reduce((sum, m) => sum + m.mood, 0) / recent.length).toFixed(1);
  }, [moods]);

  // Recent activities
  const recentActivities = useMemo(() => {
    return activities
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 10);
  }, [activities]);

  return (
    <div className="bg-bg-main">
      <div className="container py-12 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Mon Suivi
          </h1>
          <p className="text-lg text-text-muted">
            Ton parcours personnel. Tout reste sur ton appareil.
          </p>
        </div>

        {/* Today's Mood */}
        <div className="dalal-card p-6 mb-6">
          <h2 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Comment te sens-tu aujourd'hui?
          </h2>
          <div className="flex justify-center gap-4 mb-4">
            {MOOD_LEVELS.map(level => (
              <button
                key={level.value}
                onClick={() => handleMoodSelect(level.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  todayMood === level.value
                    ? 'bg-green-deep/10 scale-110 ring-2 ring-green-deep'
                    : 'hover:bg-bg-card'
                }`}
              >
                <span className="text-3xl">{level.emoji}</span>
                <span className="text-xs text-text-muted">{level.label}</span>
              </button>
            ))}
          </div>
          {todayMood && (
            <textarea
              value={todayNote}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Un mot sur ta journée? (optionnel)"
              className="w-full p-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep resize-none text-sm"
              rows={2}
            />
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="dalal-card p-4 text-center">
            <Star className="w-6 h-6 mx-auto mb-2 text-cream-gold" />
            <div className="text-2xl font-bold text-text-main">{streak}</div>
            <div className="text-xs text-text-muted">jours de suite</div>
          </div>
          <div className="dalal-card p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-deep" />
            <div className="text-2xl font-bold text-text-main">{avgMood || '-'}</div>
            <div className="text-xs text-text-muted">humeur moyenne</div>
          </div>
          <div className="dalal-card p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-slate" />
            <div className="text-2xl font-bold text-text-main">{moods.length}</div>
            <div className="text-xs text-text-muted">jours enregistrés</div>
          </div>
        </div>

        {/* 30-Day Calendar */}
        <div className="dalal-card p-6 mb-6">
          <h2 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Derniers 30 jours
          </h2>
          <div className="grid grid-cols-10 gap-2">
            {last30Days.map(day => (
              <div
                key={day.date}
                className="flex flex-col items-center"
                title={`${day.date}: ${day.mood ? MOOD_LEVELS[day.mood - 1]?.label : 'Non enregistré'}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: day.mood ? MOOD_LEVELS[day.mood - 1]?.color + '40' : '#f0f0f0',
                    border: day.date === today ? '2px solid #4A7C6F' : 'none',
                  }}
                >
                  {day.mood ? MOOD_LEVELS[day.mood - 1]?.emoji : day.day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="dalal-card p-6">
          <h2 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Activités récentes
          </h2>
          {recentActivities.length === 0 ? (
            <div className="text-center py-6">
              <Heart className="w-8 h-8 text-text-muted/30 mx-auto mb-2" />
              <p className="text-text-muted text-sm">
                Tes activités apparaîtront ici au fur et à mesure que tu utilises Dalal.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Link href="/exercices">
                  <span className="px-3 py-1.5 rounded-full bg-green-light/20 text-sm text-green-deep cursor-pointer hover:bg-green-light/30 transition">
                    Exercices
                  </span>
                </Link>
                <Link href="/expression">
                  <span className="px-3 py-1.5 rounded-full bg-blue-mist/20 text-sm text-blue-slate cursor-pointer hover:bg-blue-mist/30 transition">
                    Expression
                  </span>
                </Link>
                <Link href="/creatif">
                  <span className="px-3 py-1.5 rounded-full bg-cream-gold/20 text-sm text-text-main cursor-pointer hover:bg-cream-gold/30 transition">
                    Atelier Créatif
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-green-light/10 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-green-deep" />
                  <span className="text-sm text-text-main">{act.label}</span>
                  <span className="text-xs text-text-muted ml-auto">
                    {new Date(act.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
