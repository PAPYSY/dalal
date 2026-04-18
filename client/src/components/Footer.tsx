/**
 * Footer réutilisable pour toutes les pages
 */

import { Link } from 'wouter';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-text-main/5 border-t border-green-light/20 py-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <Logo size="md" />
            <p className="text-text-muted mt-4 text-sm">
              Une plateforme de bien-être mental pour la jeunesse sénégalaise et ouest-africaine.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-4">Outils</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/expression" className="text-text-muted hover:text-green-deep">Expression</Link></li>
              <li><Link href="/exercices" className="text-text-muted hover:text-green-deep">Exercices</Link></li>
              <li><Link href="/creatif" className="text-text-muted hover:text-green-deep">Atelier Créatif</Link></li>
              <li><Link href="/suivi" className="text-text-muted hover:text-green-deep">Mon Suivi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cas-de-vie" className="text-text-muted hover:text-green-deep">Cas de Vie</Link></li>
              <li><Link href="/bibliotheque" className="text-text-muted hover:text-green-deep">Bibliothèque</Link></li>
              <li><Link href="/annuaire" className="text-text-muted hover:text-green-deep">Annuaire</Link></li>
              <li><Link href="/communaute" className="text-text-muted hover:text-green-deep">Communauté</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-4">Aide</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ecoute-ia" className="text-text-muted hover:text-green-deep">Compagnon IA</Link></li>
              <li><Link href="/chat" className="text-text-muted hover:text-green-deep">Chat pair-aidant</Link></li>
              <li><Link href="/urgence" className="text-text-muted hover:text-green-deep">Urgence</Link></li>
              <li><Link href="/basculer" className="text-text-muted hover:text-green-deep">Obtenir de l'aide</Link></li>
              <li><Link href="/confidentialite" className="text-text-muted hover:text-green-deep">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-light/20 pt-8 text-center text-text-muted text-sm">
          <p>
            Dallaal © 2026 by{' '}
            <a
              href="https://niaare-app.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-deep underline underline-offset-4"
            >
              Niaaré-apps
            </a>{' '}
            — Calme-toi. Tu es en sécurité.
          </p>
        </div>
      </div>
    </footer>
  );
}
