/**
 * Logo Component - Dalal
 * 
 * Design Philosophy: Minimalisme Organique Africain
 * - Ligne ondulante unique symbolisant la respiration
 * - Transition progressive de la détresse vers le calme
 * - Couleur: vert sauge profond (#4A7C6F)
 */

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Logo({ size = 'md', animated = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex items-center gap-3">
      <svg
        className={`${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ligne ondulante de respiration */}
        <path
          d="M 5 20 Q 15 10, 25 20 T 45 20 T 65 20 T 85 20 Q 95 20, 95 20"
          stroke="#4A7C6F"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Cercles subtils aux extrémités */}
        <circle cx="5" cy="20" r="2" fill="#4A7C6F" opacity="0.5" />
        <circle cx="95" cy="20" r="2" fill="#4A7C6F" opacity="0.5" />
      </svg>

      <div className="flex flex-col">
        <span className={`font-bold text-green-deep ${textSizeClasses[size]}`} style={{ fontFamily: "'Lora', serif" }}>
          DALAL
        </span>
        {size !== 'sm' && (
          <span className="text-xs text-text-muted" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Calme-toi
          </span>
        )}
      </div>
    </div>
  );
}
