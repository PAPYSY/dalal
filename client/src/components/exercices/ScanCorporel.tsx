/**
 * Scan Corporel — Écoute ton corps
 * Silhouette SVG cliquable, suggestions par zone, sauvegarde locale
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const BODY_ZONES = [
  { id: 'head', label: 'Tête', y: 8, suggestion: 'Masse doucement tes tempes en cercles. Ferme les yeux et relâche les muscles de ton visage.' },
  { id: 'neck', label: 'Cou & Épaules', y: 22, suggestion: 'Roule lentement tes épaules vers l\'arrière 5 fois. Penche doucement la tête de chaque côté.' },
  { id: 'chest', label: 'Poitrine', y: 32, suggestion: 'Place ta main sur ton cœur. Respire profondément 3 fois en sentant ta poitrine se soulever.' },
  { id: 'stomach', label: 'Ventre', y: 42, suggestion: 'Pose tes mains sur ton ventre. Respire en gonflant le ventre comme un ballon, puis dégonfle lentement.' },
  { id: 'back', label: 'Dos', y: 38, suggestion: 'Assieds-toi droit, puis arrondis lentement le dos comme un chat. Reviens à la position droite.' },
  { id: 'hands', label: 'Mains & Bras', y: 50, suggestion: 'Serre les poings très fort pendant 5 secondes, puis relâche complètement. Sens la différence.' },
  { id: 'legs', label: 'Jambes', y: 65, suggestion: 'Contracte les muscles de tes cuisses pendant 5 secondes, puis relâche. Secoue doucement tes jambes.' },
  { id: 'feet', label: 'Pieds', y: 85, suggestion: 'Appuie tes pieds fermement au sol. Sens le contact. Remue tes orteils lentement.' },
];

export default function ScanCorporelExercice() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [scannedZones, setScannedZones] = useState<Set<string>>(new Set());
  const [tensions, setTensions] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const zone = BODY_ZONES.find(z => z.id === selectedZone);

  const markTension = (zoneId: string, level: number) => {
    setTensions(prev => ({ ...prev, [zoneId]: level }));
    setScannedZones(prev => {
      const newSet = new Set(prev);
      newSet.add(zoneId);
      if (newSet.size === BODY_ZONES.length) {
        setTimeout(() => setIsComplete(true), 500);
      }
      return newSet;
    });
  };

  const getTensionColor = (level: number) => {
    if (level <= 2) return '#B8CBBF'; // green light
    if (level <= 4) return '#D4B896'; // cream gold
    if (level <= 6) return '#C5D5E8'; // blue mist
    if (level <= 8) return '#C4B8D4'; // lavender
    return '#e57373'; // red-ish
  };

  if (isComplete) {
    const avgTension = Object.values(tensions).reduce((a, b) => a + b, 0) / Object.values(tensions).length;
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-green-light mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">🧘</span>
        </div>
        <h2 className="text-3xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
          Scan terminé
        </h2>
        <p className="text-text-muted mb-4">
          Tension moyenne: {avgTension.toFixed(1)}/10
        </p>
        <p className="text-text-muted mb-8 italic" style={{ fontFamily: "'Lora', serif" }}>
          {avgTension < 4 ? '"Ton corps est plutôt détendu. Continue à prendre soin de toi."' :
           avgTension < 7 ? '"Quelques tensions détectées. Prends le temps de faire les exercices suggérés."' :
           '"Beaucoup de tension. Sois doux(ce) avec toi-même. Essaie la respiration guidée."'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => { setScannedZones(new Set()); setTensions({}); setSelectedZone(null); setIsComplete(false); }} className="dalal-button-primary">
            Recommencer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
        Scan Corporel
      </h2>
      <p className="text-text-muted mb-8 text-center">
        Clique sur chaque zone de ton corps pour évaluer ta tension ({scannedZones.size}/{BODY_ZONES.length})
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Body Silhouette */}
        <div className="relative bg-bg-card rounded-3xl p-6 flex items-center justify-center" style={{ minHeight: '400px' }}>
          <svg viewBox="0 0 100 100" className="w-full max-w-[200px]">
            {/* Simple body silhouette */}
            {/* Head */}
            <circle cx="50" cy="10" r="8" fill={tensions.head ? getTensionColor(tensions.head) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('head')} />
            {/* Neck */}
            <rect x="47" y="18" width="6" height="6" rx="2" fill={tensions.neck ? getTensionColor(tensions.neck) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('neck')} />
            {/* Torso */}
            <rect x="35" y="24" width="30" height="22" rx="6" fill={tensions.chest ? getTensionColor(tensions.chest) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('chest')} />
            {/* Stomach */}
            <rect x="37" y="38" width="26" height="14" rx="6" fill={tensions.stomach ? getTensionColor(tensions.stomach) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('stomach')} />
            {/* Left Arm */}
            <rect x="22" y="26" width="12" height="28" rx="5" fill={tensions.hands ? getTensionColor(tensions.hands) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('hands')} />
            {/* Right Arm */}
            <rect x="66" y="26" width="12" height="28" rx="5" fill={tensions.hands ? getTensionColor(tensions.hands) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('hands')} />
            {/* Left Leg */}
            <rect x="37" y="53" width="11" height="30" rx="5" fill={tensions.legs ? getTensionColor(tensions.legs) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('legs')} />
            {/* Right Leg */}
            <rect x="52" y="53" width="11" height="30" rx="5" fill={tensions.legs ? getTensionColor(tensions.legs) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('legs')} />
            {/* Left Foot */}
            <ellipse cx="42" cy="86" rx="7" ry="4" fill={tensions.feet ? getTensionColor(tensions.feet) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('feet')} />
            {/* Right Foot */}
            <ellipse cx="58" cy="86" rx="7" ry="4" fill={tensions.feet ? getTensionColor(tensions.feet) : '#E8E0D0'} stroke="#4A7C6F" strokeWidth="0.5" className="cursor-pointer hover:opacity-80 transition" onClick={() => setSelectedZone('feet')} />
            {/* Scanned indicators */}
            {BODY_ZONES.map(z => scannedZones.has(z.id) && (
              <text key={z.id} x="92" y={z.y + 2} fontSize="4" fill="#4A7C6F">✓</text>
            ))}
          </svg>
        </div>

        {/* Zone Detail */}
        <div>
          {zone ? (
            <div className="dalal-card p-6">
              <h3 className="text-xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                {zone.label}
              </h3>
              
              <p className="text-text-muted mb-4 text-sm">
                Évalue ta tension dans cette zone (1 = détendu, 10 = très tendu)
              </p>

              <div className="flex gap-1 mb-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => markTension(zone.id, i + 1)}
                    className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all ${
                      tensions[zone.id] === i + 1
                        ? 'ring-2 ring-green-deep scale-110'
                        : ''
                    }`}
                    style={{
                      backgroundColor: getTensionColor(i + 1),
                      color: i > 6 ? 'white' : '#2A2A2A',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {tensions[zone.id] && (
                <div className="p-4 rounded-xl bg-bg-main">
                  <p className="text-sm font-semibold text-green-deep mb-2">Suggestion:</p>
                  <p className="text-text-muted text-sm leading-relaxed">{zone.suggestion}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="dalal-card p-6 text-center">
              <p className="text-text-muted italic" style={{ fontFamily: "'Lora', serif" }}>
                Clique sur une zone du corps pour commencer le scan
              </p>
              <div className="mt-4 space-y-2">
                {BODY_ZONES.map(z => (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZone(z.id)}
                    className={`block w-full text-left px-4 py-2 rounded-xl text-sm transition ${
                      scannedZones.has(z.id) ? 'bg-green-light/20 text-green-deep' : 'hover:bg-bg-main text-text-muted'
                    }`}
                  >
                    {scannedZones.has(z.id) ? '✓ ' : '○ '}{z.label}
                    {tensions[z.id] && <span className="float-right">{tensions[z.id]}/10</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
