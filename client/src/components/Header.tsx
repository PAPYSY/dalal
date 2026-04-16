/**
 * Header réutilisable avec navigation desktop et mobile
 */

import { Link, useLocation } from 'wouter';
import Logo from './Logo';
import MobileNav from './MobileNav';

interface HeaderProps {
  activeLink?: string;
}

const DESKTOP_NAV = [
  { href: '/expression', label: 'Expression' },
  { href: '/exercices', label: 'Exercices' },
  { href: '/cas-de-vie', label: 'Cas de vie' },
  { href: '/bibliotheque', label: 'Ressources' },
  { href: '/communaute', label: 'Communauté' },
  { href: '/urgence', label: 'Urgence' },
];

export default function Header({ activeLink }: HeaderProps) {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-bg-main/95 backdrop-blur-sm border-b border-green-light/20">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <Logo size="md" />
        </Link>
        <nav className="hidden md:flex gap-6">
          {DESKTOP_NAV.map(item => {
            const isActive = activeLink === item.href || location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition text-sm ${
                  isActive
                    ? 'text-green-deep font-semibold'
                    : 'text-text-main hover:text-green-deep'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
