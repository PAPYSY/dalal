/**
 * Navigation Mobile - Menu Hamburger
 * Réutilisable dans toutes les pages
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from 'wouter';
import { Menu, X, Heart, Wind, Palette, BookOpen, Users, AlertCircle, BarChart3, Compass, Phone } from 'lucide-react';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '/', label: 'Accueil', icon: Heart },
  { href: '/expression', label: 'Expression', icon: Heart },
  { href: '/exercices', label: 'Exercices', icon: Wind },
  { href: '/creatif', label: 'Atelier Créatif', icon: Palette },
  { href: '/cas-de-vie', label: 'Cas de Vie', icon: Compass },
  { href: '/bibliotheque', label: 'Bibliothèque', icon: BookOpen },
  { href: '/annuaire', label: 'Annuaire', icon: Phone },
  { href: '/communaute', label: 'Communauté', icon: Users },
  { href: '/suivi', label: 'Mon Suivi', icon: BarChart3 },
  { href: '/urgence', label: 'Urgence', icon: AlertCircle, urgent: true },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const dialogId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Move focus into the dialog when opening
  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-xl hover:bg-green-light/20 transition"
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-controls={dialogId}
      >
        {isOpen ? <X className="w-6 h-6 text-text-main" /> : <Menu className="w-6 h-6 text-text-main" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              aria-hidden="true"
            />

            <motion.div
              id={dialogId}
              role="dialog"
              aria-modal="true"
              className="fixed top-0 right-0 h-full w-72 bg-bg-main z-50 md:hidden"
              style={{ boxShadow: '-4px 0 20px rgba(0,0,0,0.1)' }}
              initial={prefersReducedMotion ? false : { x: 32, opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { x: 32, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Logo size="sm" />
                  <button
                    ref={closeBtnRef}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-green-light/20 transition"
                    aria-label="Fermer le menu"
                  >
                    <X className="w-5 h-5 text-text-main" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {NAV_ITEMS.map(item => {
                    const Icon = item.icon;
                    const isActive = location === item.href;
                    return (
                      <Link key={item.href} href={item.href}>
                        <span
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                            item.urgent
                              ? 'bg-lavender/10 text-text-main hover:bg-lavender/20 border border-lavender/30'
                              : isActive
                              ? 'bg-green-deep/10 text-green-deep font-semibold'
                              : 'text-text-main hover:bg-green-light/10'
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">{item.label}</span>
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-8 p-4 rounded-xl bg-green-light/10 border border-green-light/20">
                  <p className="text-xs text-text-muted text-center">
                    Dalal — Calme-toi. Tu es en sécurité.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
