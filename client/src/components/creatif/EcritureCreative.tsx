/**
 * Écriture Créative Guidée
 * 20+ prompts rotatifs, mode plein écran, export .txt, sauvegarde locale
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, Download, Maximize2, Minimize2, Save } from 'lucide-react';

const PROMPTS = [
  'Écris une lettre à ton futur toi dans 5 ans...',
  'Si ta douleur pouvait parler, que dirait-elle?',
  'Décris un lieu où tu te sens en paix...',
  'Écris un poème sur ce que tu ressens maintenant...',
  'Si tu pouvais dire une chose à quelqu\'un sans conséquence...',
  'Raconte un souvenir d\'enfance qui te fait sourire...',
  'Écris comme si personne ne te lisait jamais...',
  'Décris ta journée idéale, du réveil au coucher...',
  'Si ta tristesse était une couleur, laquelle serait-elle?',
  'Écris un dialogue entre toi et ta peur...',
  'Qu\'est-ce que tu dirais à un(e) ami(e) qui traverse la même chose?',
  'Décris le son de la pluie et ce qu\'il te fait ressentir...',
  'Écris sur quelque chose que tu n\'as jamais dit à personne...',
  'Si tu pouvais recommencer une journée, laquelle choisirais-tu?',
  'Écris une liste de choses qui te rendent vivant(e)...',
  'Décris comment tu te sens en utilisant uniquement des métaphores...',
  'Écris une lettre de pardon — à toi-même ou à quelqu\'un d\'autre...',
  'Si ton cœur était un paysage, à quoi ressemblerait-il?',
  'Raconte l\'histoire de ta cicatrice la plus profonde (visible ou invisible)...',
  'Écris ce que tu voudrais entendre de la personne qui te manque le plus...',
  'Décris un acte de courage que tu as fait, même petit...',
  'Si tu pouvais envoyer un message au monde entier...',
  'Écris sur ce qui te fait te sentir fort(e)...',
  'Imagine que tu es un arbre. Raconte ta vie...',
];

interface SavedText {
  id: string;
  date: string;
  prompt: string;
  text: string;
}

export default function EcritureCreative() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [text, setText] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [saved, setSaved] = useState<SavedText[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dalal_ecriture');
    if (stored) setSaved(JSON.parse(stored));
    shufflePrompt();
  }, []);

  const shufflePrompt = () => {
    const random = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    setCurrentPrompt(random);
    setText('');
  };

  const saveText = () => {
    if (!text.trim()) return;
    const entry: SavedText = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      prompt: currentPrompt,
      text: text.trim(),
    };
    const newSaved = [entry, ...saved];
    setSaved(newSaved);
    localStorage.setItem('dalal_ecriture', JSON.stringify(newSaved));
  };

  const exportTxt = () => {
    const content = `Prompt: ${currentPrompt}\n\n${text}\n\n---\nÉcrit sur Dalal le ${new Date().toLocaleDateString('fr-FR')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.download = `dalal-ecriture-${Date.now()}.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-bg-main flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-light/20">
          <p className="text-text-muted italic text-sm max-w-xl" style={{ fontFamily: "'Lora', serif" }}>
            {currentPrompt}
          </p>
          <button onClick={() => setIsFullscreen(false)} className="p-2 rounded-lg hover:bg-green-light/20">
            <Minimize2 className="w-5 h-5 text-text-muted" />
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-8 py-6 bg-bg-main text-text-main text-lg leading-relaxed resize-none focus:outline-none"
          style={{ fontFamily: "'Lora', serif" }}
          placeholder="Commence à écrire..."
          autoFocus
        />
        <div className="flex items-center justify-between px-6 py-3 border-t border-green-light/20">
          <span className="text-sm text-text-muted">{text.length} caractères</span>
          <div className="flex gap-2">
            <Button onClick={saveText} className="dalal-button-secondary" disabled={!text.trim()}>
              <Save className="w-4 h-4 mr-2" /> Sauvegarder
            </Button>
            <Button onClick={exportTxt} className="dalal-button-primary" disabled={!text.trim()}>
              <Download className="w-4 h-4 mr-2" /> Exporter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
        Écriture Créative
      </h2>
      <p className="text-text-muted mb-8 text-center">
        Laisse les mots couler. Pas de règles, pas de jugement.
      </p>

      {/* Prompt */}
      <div className="dalal-card p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-lg text-text-main italic flex-1" style={{ fontFamily: "'Lora', serif" }}>
            "{currentPrompt}"
          </p>
          <button onClick={shufflePrompt} className="p-2 rounded-lg hover:bg-green-light/20 flex-shrink-0" title="Nouveau prompt">
            <Shuffle className="w-5 h-5 text-text-muted" />
          </button>
        </div>
      </div>

      {/* Writing Area */}
      <div className="dalal-card p-6 mb-6">
        <div className="flex justify-end mb-2">
          <button onClick={() => setIsFullscreen(true)} className="p-1 rounded hover:bg-green-light/20" title="Plein écran">
            <Maximize2 className="w-4 h-4 text-text-muted" />
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep resize-none"
          style={{ fontFamily: "'Lora', serif", minHeight: '250px' }}
          placeholder="Commence à écrire ici..."
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-text-muted">{text.length} caractères</span>
          <div className="flex gap-2">
            <Button onClick={saveText} className="dalal-button-secondary" disabled={!text.trim()}>
              <Save className="w-4 h-4 mr-2" /> Sauvegarder
            </Button>
            <Button onClick={exportTxt} className="dalal-button-primary" disabled={!text.trim()}>
              <Download className="w-4 h-4 mr-2" /> Exporter .txt
            </Button>
          </div>
        </div>
      </div>

      {/* Saved Texts */}
      {saved.length > 0 && (
        <div>
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="text-sm text-green-deep font-medium mb-3 hover:underline"
          >
            {showSaved ? 'Masquer' : 'Voir'} mes textes sauvegardés ({saved.length})
          </button>
          {showSaved && (
            <div className="space-y-3">
              {saved.map(s => (
                <div key={s.id} className="dalal-card p-4">
                  <p className="text-xs text-text-muted mb-1">
                    {new Date(s.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} — "{s.prompt}"
                  </p>
                  <p className="text-text-main text-sm leading-relaxed line-clamp-3">{s.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
