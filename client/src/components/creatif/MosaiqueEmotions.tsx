/**
 * Mosaïque d'Émotions
 * 20 tuiles colorées, bilan émotionnel, sauvegarde image
 */

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw } from 'lucide-react';

const EMOTIONS = [
  { id: 'joie', label: 'Joie', color: '#F7DC6F', emoji: '😊' },
  { id: 'paix', label: 'Paix', color: '#B8CBBF', emoji: '🕊️' },
  { id: 'amour', label: 'Amour', color: '#E8B4B8', emoji: '💕' },
  { id: 'espoir', label: 'Espoir', color: '#AED6F1', emoji: '🌅' },
  { id: 'gratitude', label: 'Gratitude', color: '#D4B896', emoji: '🙏' },
  { id: 'fierte', label: 'Fierté', color: '#F5CBA7', emoji: '💪' },
  { id: 'curiosite', label: 'Curiosité', color: '#D2B4DE', emoji: '🔍' },
  { id: 'courage', label: 'Courage', color: '#F1948A', emoji: '🦁' },
  { id: 'tristesse', label: 'Tristesse', color: '#85C1E9', emoji: '😢' },
  { id: 'colere', label: 'Colère', color: '#E74C3C', emoji: '😤' },
  { id: 'peur', label: 'Peur', color: '#95A5A6', emoji: '😰' },
  { id: 'anxiete', label: 'Anxiété', color: '#C4B8D4', emoji: '😟' },
  { id: 'solitude', label: 'Solitude', color: '#5C7A99', emoji: '🌙' },
  { id: 'confusion', label: 'Confusion', color: '#D5DBDB', emoji: '🌀' },
  { id: 'fatigue', label: 'Fatigue', color: '#BDC3C7', emoji: '😴' },
  { id: 'nostalgie', label: 'Nostalgie', color: '#EDBB99', emoji: '🍂' },
  { id: 'honte', label: 'Honte', color: '#D7BDE2', emoji: '😳' },
  { id: 'frustration', label: 'Frustration', color: '#E59866', emoji: '😤' },
  { id: 'vide', label: 'Vide', color: '#F2F3F4', emoji: '🫥' },
  { id: 'liberation', label: 'Libération', color: '#82E0AA', emoji: '🦋' },
];

export default function MosaiqueEmotions() {
  const [grid, setGrid] = useState<(string | null)[]>(Array(16).fill(null));
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const placeEmotion = (index: number) => {
    if (!selectedEmotion) return;
    const newGrid = [...grid];
    newGrid[index] = selectedEmotion;
    setGrid(newGrid);
  };

  const removeEmotion = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = null;
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(Array(16).fill(null));
  };

  const getEmotionById = (id: string) => EMOTIONS.find(e => e.id === id);

  const filledCount = grid.filter(Boolean).length;
  
  // Bilan émotionnel
  const getBilan = () => {
    const counts: Record<string, number> = {};
    grid.forEach(id => {
      if (id) counts[id] = (counts[id] || 0) + 1;
    });
    
    const positives = ['joie', 'paix', 'amour', 'espoir', 'gratitude', 'fierte', 'curiosite', 'courage', 'liberation'];
    const negatives = ['tristesse', 'colere', 'peur', 'anxiete', 'solitude', 'honte', 'frustration', 'vide'];
    
    let posCount = 0, negCount = 0;
    Object.entries(counts).forEach(([id, count]) => {
      if (positives.includes(id)) posCount += count;
      if (negatives.includes(id)) negCount += count;
    });
    
    return { counts, posCount, negCount, total: filledCount };
  };

  const exportImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#F8F6F2';
    ctx.fillRect(0, 0, 800, 900);

    // Title
    ctx.fillStyle = '#2A2A2A';
    ctx.font = 'bold 28px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Ma Mosaïque d\'Émotions', 400, 50);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#6B6B6B';
    ctx.fillText(new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), 400, 75);

    // Grid
    const cellSize = 160;
    const padding = 40;
    grid.forEach((emotionId, i) => {
      const row = Math.floor(i / 4);
      const col = i % 4;
      const x = padding + col * (cellSize + 10);
      const y = 100 + row * (cellSize + 10);

      if (emotionId) {
        const emotion = getEmotionById(emotionId);
        if (emotion) {
          ctx.fillStyle = emotion.color;
          ctx.beginPath();
          ctx.roundRect(x, y, cellSize, cellSize, 12);
          ctx.fill();
          ctx.font = '40px serif';
          ctx.textAlign = 'center';
          ctx.fillText(emotion.emoji, x + cellSize / 2, y + cellSize / 2 + 5);
          ctx.font = '14px sans-serif';
          ctx.fillStyle = '#2A2A2A';
          ctx.fillText(emotion.label, x + cellSize / 2, y + cellSize - 15);
        }
      } else {
        ctx.strokeStyle = '#E8E0D0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, cellSize, cellSize, 12);
        ctx.stroke();
      }
    });

    // Bilan
    const bilan = getBilan();
    ctx.fillStyle = '#2A2A2A';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Bilan: ${bilan.posCount} positives, ${bilan.negCount} négatives sur ${bilan.total} émotions`, 400, 830);
    ctx.font = 'italic 14px serif';
    ctx.fillStyle = '#6B6B6B';
    ctx.fillText('Créé sur Dalal — Calme-toi. Tu es en sécurité.', 400, 860);

    const link = document.createElement('a');
    link.download = `dalal-mosaique-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const bilan = getBilan();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
        Mosaïque d'Émotions
      </h2>
      <p className="text-text-muted mb-8 text-center">
        Choisis une émotion, puis clique sur une case pour la placer. Crée ta mosaïque.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Emotion Palette */}
        <div className="dalal-card p-4">
          <p className="text-sm font-semibold text-text-main mb-3">Choisis une émotion:</p>
          <div className="grid grid-cols-4 gap-2">
            {EMOTIONS.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedEmotion(e.id)}
                className={`p-2 rounded-xl text-center transition-all ${
                  selectedEmotion === e.id ? 'ring-2 ring-green-deep scale-105' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: e.color + '40' }}
                title={e.label}
              >
                <span className="text-lg block">{e.emoji}</span>
                <span className="text-[10px] text-text-main block leading-tight">{e.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="md:col-span-2">
          <div ref={gridRef} className="grid grid-cols-4 gap-2 mb-4">
            {grid.map((emotionId, i) => {
              const emotion = emotionId ? getEmotionById(emotionId) : null;
              return (
                <button
                  key={i}
                  onClick={() => emotionId ? removeEmotion(i) : placeEmotion(i)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                    emotion ? 'hover:opacity-80' : 'border-2 border-dashed border-green-light/30 hover:border-green-deep/50'
                  }`}
                  style={emotion ? { backgroundColor: emotion.color } : {}}
                >
                  {emotion ? (
                    <>
                      <span className="text-2xl mb-1">{emotion.emoji}</span>
                      <span className="text-xs text-text-main font-medium">{emotion.label}</span>
                    </>
                  ) : (
                    <span className="text-text-muted/30 text-2xl">+</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bilan */}
          {filledCount > 0 && (
            <div className="dalal-card p-4 mb-4">
              <p className="text-sm font-semibold text-text-main mb-2">Ton bilan émotionnel:</p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-deep">{bilan.posCount} positive{bilan.posCount > 1 ? 's' : ''}</span>
                <span className="text-text-muted">•</span>
                <span style={{ color: '#c0392b' }}>{bilan.negCount} négative{bilan.negCount > 1 ? 's' : ''}</span>
                <span className="text-text-muted">•</span>
                <span className="text-text-muted">{bilan.total - bilan.posCount - bilan.negCount} neutre{(bilan.total - bilan.posCount - bilan.negCount) > 1 ? 's' : ''}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={clearGrid} className="dalal-button-secondary">
              <RotateCcw className="w-4 h-4 mr-2" /> Recommencer
            </Button>
            <Button onClick={exportImage} className="dalal-button-primary" disabled={filledCount === 0}>
              <Download className="w-4 h-4 mr-2" /> Exporter en image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
