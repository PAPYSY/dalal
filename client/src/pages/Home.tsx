/**
 * Home Page - Dalal
 * Design: Minimalisme Organique Africain
 */

import { Button } from '@/components/ui/button';
import WelcomeModal from '@/components/WelcomeModal';
import { Link } from 'wouter';
import { Heart, Lightbulb, Palette, BookOpen, Users, AlertCircle, Compass, BarChart3, Phone } from 'lucide-react';

const MODULES = [
  { href: '/expression', icon: Heart, title: 'Expression', desc: 'Écris ce que tu ressens sans jugement. Ton espace privé, anonyme, toujours là pour toi.', color: 'bg-green-light/30', iconColor: 'text-green-deep' },
  { href: '/exercices', icon: Lightbulb, title: 'Exercices', desc: 'Respiration guidée, ancrage, gratitude. Des outils simples et efficaces pour te calmer.', color: 'bg-blue-mist/30', iconColor: 'text-blue-slate' },
  { href: '/creatif', icon: Palette, title: 'Atelier Créatif', desc: "Dessine, écris, exprime-toi. L'art comme voie de guérison et d'expression.", color: 'bg-cream-gold/30', iconColor: 'text-cream-gold' },
  { href: '/cas-de-vie', icon: Compass, title: 'Cas de Vie', desc: '10 situations spécifiques avec exercices adaptés: dépression, trauma, deuil, addiction...', color: 'bg-green-deep/10', iconColor: 'text-green-deep' },
  { href: '/bibliotheque', icon: BookOpen, title: 'Ressources', desc: 'Articles, conseils et témoignages pour mieux comprendre ce que tu traverses.', color: 'bg-green-light/30', iconColor: 'text-green-deep' },
  { href: '/annuaire', icon: Phone, title: 'Annuaire', desc: "Professionnels de santé mentale au Sénégal. Trouve de l'aide près de chez toi.", color: 'bg-blue-mist/30', iconColor: 'text-blue-slate' },
  { href: '/communaute', icon: Users, title: 'Communauté', desc: "Partage anonymement, écoute les autres. Tu n'es pas seul(e).", color: 'bg-blue-mist/30', iconColor: 'text-blue-slate' },
  { href: '/suivi', icon: BarChart3, title: 'Mon Suivi', desc: 'Suis ton humeur, ta progression et tes activités au quotidien.', color: 'bg-cream-gold/30', iconColor: 'text-cream-gold' },
];

export default function Home() {
  return (
    <div className="bg-bg-main">
      <WelcomeModal />

      {/* Crisis Banner */}
      <div className="bg-lavender/20 border-b border-lavender/30 px-4 py-3">
        <div className="container flex items-center gap-3 text-sm text-text-main">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>En crise? <Link href="/urgence" className="font-semibold underline">Accès immédiat à l'aide</Link></span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663506951607/fmzV34XsabvRaGpwazGuUm/dalal-hero-background-o55327Xd4pETQwjQEZmz7Z.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main/30 to-bg-main/70 z-10" />

        <div className="container relative z-20 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-text-main mb-6" style={{ fontFamily: "'Lora', serif" }}>
              Calme-toi.<br />Tu es en sécurité.
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed">
              Dalal est un espace anonyme, gratuit et bienveillant pour exprimer ce que tu ressens, trouver des outils pour aller mieux, et être guidé vers un vrai soutien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/expression">
                <Button className="dalal-button-primary w-full sm:w-auto">
                  Commencer maintenant
                </Button>
              </Link>
              <Link href="/cas-de-vie">
                <Button className="dalal-button-secondary w-full sm:w-auto">
                  Explorer les cas de vie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="dalal-section bg-bg-main">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16 dalal-heading">
            Explore les espaces de Dalal
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map(mod => {
              const Icon = mod.icon;
              return (
                <Link key={mod.href} href={mod.href}>
                  <div className="dalal-card p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.03] h-full">
                    <div className={`w-12 h-12 rounded-full ${mod.color} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${mod.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
                      {mod.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Urgence Card */}
          <div className="mt-6">
            <Link href="/urgence">
              <div className="dalal-card p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border-2 border-lavender flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-lavender/30 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main" style={{ fontFamily: "'Lora', serif" }}>
                    Espace Urgence
                  </h3>
                  <p className="text-sm text-text-muted">
                    En crise? Respiration guidée, numéros d'urgence et ressources d'aide immédiate au Sénégal.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="dalal-section bg-bg-card">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 dalal-heading">
            Les principes de Dalal
          </h2>
          <div className="space-y-8">
            {[
              { num: '1', title: 'Anonymat total', desc: 'Aucun compte requis. Tes données ne quittent jamais ton appareil. Dalal ne sait pas qui tu es.' },
              { num: '2', title: 'Gratuit et accessible', desc: 'Fonctionne même avec une connexion 2G. Aucun coût, jamais. Pour tous les jeunes.' },
              { num: '3', title: 'Culturellement adapté', desc: 'Conçu pour la réalité africaine. Pas de stigmatisation. Respect des croyances et traditions.' },
              { num: '4', title: 'Bienveillant et sans jugement', desc: "Ton espace sûr. Aucune critique. Juste de l'écoute et du soutien." },
            ].map(v => (
              <div key={v.num} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-green-deep/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-deep font-bold">{v.num}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
                    {v.title}
                  </h3>
                  <p className="text-text-muted">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
