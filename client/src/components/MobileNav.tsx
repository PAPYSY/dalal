import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from 'wouter';
import { Menu, X, Heart, Wind, Palette, BookOpen, Users, AlertCircle, BarChart3, Compass, Phone, Home, Bot, MessagesSquare } from 'lucide-react';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/expression', label: 'Expression', icon: Heart },
  { href: '/exercices', label: 'Exercices', icon: Wind },
  { href: '/creatif', label: 'Atelier Créatif', icon: Palette },
  { href: '/cas-de-vie', label: 'Cas de Vie', icon: Compass },
  { href: '/bibliotheque', label: 'Bibliothèque', icon: BookOpen },
  { href: '/annuaire', label: 'Annuaire', icon: Phone },
  { href: '/communaute', label: 'Communauté', icon: Users },
  { href: '/suivi', label: 'Mon Suivi', icon: BarChart3 },
  { href: '/ecoute-ia', label: 'Compagnon IA', icon: Bot },
  { href: '/chat', label: 'Chat pair-aidant', icon: MessagesSquare },
  { href: '/urgence', label: 'Urgence', icon: AlertCircle, urgent: true },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const dialogId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  const menu = isOpen ? createPortal(
    <>
      {/* Overlay — rendu sur body, échappe le stacking context du header */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0,
          zIndex: 9998,
          backgroundColor: 'rgba(0,0,0,0.72)',
        }}
      />

      {/* Panneau */}
      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: 'min(320px, calc(100vw - 16px))',
          zIndex: 9999,
          backgroundColor: '#2D4A43',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
          overflowY: 'auto',
        }}
      >
        {/* En-tête */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}>
          <Logo size="sm" />
          <button
            ref={closeBtnRef}
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le menu"
            style={{
              padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center',
            }}
          >
            <X style={{ width: 20, height: 20, color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '12px 16px', flex: 1, overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = location === item.href;

            const bg = item.urgent
              ? 'rgba(196,184,212,0.2)'
              : isActive
              ? 'rgba(255,255,255,0.18)'
              : 'rgba(255,255,255,0.07)';

            const border = item.urgent
              ? '1.5px solid rgba(196,184,212,0.55)'
              : isActive
              ? '1.5px solid rgba(255,255,255,0.28)'
              : '1.5px solid transparent';

            const color = item.urgent ? '#D4C4E8' : '#FFFFFF';
            const iconColor = item.urgent ? '#C4B8D4' : isActive ? '#B8CBBF' : 'rgba(255,255,255,0.7)';

            return (
              <Link key={item.href} href={item.href}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '13px 16px', marginBottom: '6px',
                  borderRadius: '14px',
                  backgroundColor: bg,
                  border,
                  cursor: 'pointer',
                }}>
                  <Icon style={{ width: 21, height: 21, color: iconColor, flexShrink: 0 }} />
                  <span style={{
                    fontSize: '16px',
                    fontWeight: isActive ? 600 : 400,
                    color,
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Pied */}
        <div style={{
          padding: '14px 20px', flexShrink: 0,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
            Dallaal — Calme-toi. Tu es en sécurité.
          </p>
        </div>
      </div>
    </>,
    document.body
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden"
        style={{ padding: '8px', borderRadius: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }}
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
        aria-controls={dialogId}
      >
        <Menu style={{ width: 26, height: 26, color: '#2A2A2A' }} />
      </button>

      {menu}
    </>
  );
}
