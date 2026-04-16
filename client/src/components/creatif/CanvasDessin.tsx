/**
 * Canvas de Dessin HTML5
 * Palette terracotta/sauge, pinceaux, gomme, export PNG
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, Download, Trash2, Minus, Plus } from 'lucide-react';

const COLORS = [
  { name: 'Noir', hex: '#2A2A2A' },
  { name: 'Vert sauge', hex: '#4A7C6F' },
  { name: 'Vert clair', hex: '#B8CBBF' },
  { name: 'Bleu brume', hex: '#C5D5E8' },
  { name: 'Bleu ardoise', hex: '#5C7A99' },
  { name: 'Crème or', hex: '#D4B896' },
  { name: 'Terracotta', hex: '#C67B5C' },
  { name: 'Lavande', hex: '#C4B8D4' },
  { name: 'Rose doux', hex: '#E8B4B8' },
  { name: 'Blanc', hex: '#FFFFFF' },
];

export default function CanvasDessin() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2A2A2A');
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    
    // Fill white background
    ctx.fillStyle = '#F8F6F2';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    lastPosRef.current = getPos(e);
  }, [getPos]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !lastPosRef.current) return;

    const pos = getPos(e);
    
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? '#F8F6F2' : color;
    ctx.lineWidth = isEraser ? brushSize * 3 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    lastPosRef.current = pos;
  }, [isDrawing, color, brushSize, isEraser, getPos]);

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
    lastPosRef.current = null;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#F8F6F2';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  const exportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `dalal-dessin-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-text-main mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
        Canvas de Dessin
      </h2>
      <p className="text-text-muted mb-6 text-center">
        Dessine librement. Pas besoin de talent, juste d'expression.
      </p>

      {/* Toolbar */}
      <div className="dalal-card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Colors */}
          <div className="flex gap-1">
            {COLORS.map(c => (
              <button
                key={c.hex}
                onClick={() => { setColor(c.hex); setIsEraser(false); }}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  color === c.hex && !isEraser ? 'ring-2 ring-green-deep scale-110' : 'border-green-light/30'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Separator */}
          <div className="w-px h-8 bg-green-light/30" />

          {/* Brush Size */}
          <div className="flex items-center gap-2">
            <button onClick={() => setBrushSize(Math.max(1, brushSize - 1))} className="p-1 rounded hover:bg-green-light/20">
              <Minus className="w-4 h-4 text-text-muted" />
            </button>
            <div className="flex items-center justify-center w-8">
              <div className="rounded-full bg-text-main" style={{ width: brushSize * 2, height: brushSize * 2 }} />
            </div>
            <button onClick={() => setBrushSize(Math.min(20, brushSize + 1))} className="p-1 rounded hover:bg-green-light/20">
              <Plus className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-8 bg-green-light/30" />

          {/* Tools */}
          <button
            onClick={() => setIsEraser(!isEraser)}
            className={`p-2 rounded-lg transition ${isEraser ? 'bg-green-deep text-white' : 'hover:bg-green-light/20 text-text-muted'}`}
            title="Gomme"
          >
            <Eraser className="w-5 h-5" />
          </button>
          <button onClick={clearCanvas} className="p-2 rounded-lg hover:bg-green-light/20 text-text-muted" title="Effacer tout">
            <Trash2 className="w-5 h-5" />
          </button>
          <button onClick={exportPNG} className="p-2 rounded-lg hover:bg-green-light/20 text-text-muted" title="Exporter PNG">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="dalal-card overflow-hidden" style={{ cursor: isEraser ? 'cell' : 'crosshair' }}>
        <canvas
          ref={canvasRef}
          className="w-full touch-none"
          style={{ height: '500px' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      </div>
    </div>
  );
}
