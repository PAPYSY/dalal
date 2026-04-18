/**
 * Home Page - Dallaal
 * Design: Minimalisme Organique Africain
 */

import { Button } from '@/components/ui/button';
import WelcomeModal from '@/components/WelcomeModal';
import { Link } from 'wouter';
import { Heart, Lightbulb, Palette, BookOpen, Users, AlertCircle, Compass, BarChart3, Phone, Bot, MessagesSquare } from 'lucide-react';

const MODULES = [
  { href: '/expression', icon: Heart, title: 'Expression', desc: "Les mots qu'on garde en soi finissent par peser. Pose-les ici. Personne ne regarde. Juste toi et le silence qui écoute.", color: 'bg-green-light/30', iconColor: 'text-green-deep' },
  { href: '/exercices', icon: Lightbulb, title: 'Exercices', desc: "Quand le monde devient trop lourd, reviens dans ton souffle. Un cycle à la fois, ton corps retrouve le chemin du calme.", color: 'bg-blue-mist/30', iconColor: 'text-blue-slate' },
  { href: '/creatif', icon: Palette, title: 'Atelier Créatif', desc: "Tout ce qui ne peut pas se dire peut peut-être se dessiner, se colorier, s'écrire autrement. L'art connaît des chemins que les mots ignorent.", color: 'bg-cream-gold/30', iconColor: 'text-cream-gold' },
  { href: '/cas-de-vie', icon: Compass, title: 'Cas de Vie', desc: "Tu n'es pas le premier à traverser ça. D'autres sont passés par là et ont trouvé un chemin. Voici ce qui les a aidés.", color: 'bg-green-deep/10', iconColor: 'text-green-deep' },
  { href: '/bibliotheque', icon: BookOpen, title: 'Ressources', desc: "Des voix qui ont vécu, des mots qui éclairent. Pour mieux comprendre ce qui se passe en toi — sans te juger.", color: 'bg-green-light/30', iconColor: 'text-green-deep' },
  { href: '/annuaire', icon: Phone, title: 'Annuaire', desc: "Parfois on a besoin d'une main humaine. Ces personnes sont formées pour tendre la leur — sans condition.", color: 'bg-blue-mist/30', iconColor: 'text-blue-slate' },
  { href: '/communaute', icon: Users, title: 'Communauté', desc: "Quelque part, quelqu'un traverse la même nuit que toi. Ici, vous pouvez vous reconnaître sans vous connaître.", color: 'bg-blue-mist/30', iconColor: 'text-blue-slate' },
  { href: '/suivi', icon: BarChart3, title: 'Mon Suivi', desc: "Chaque jour est un pas. Même les petits. Trace ton chemin pour voir jusqu'où tu es déjà arrivé.", color: 'bg-cream-gold/30', iconColor: 'text-cream-gold' },
  { href: '/ecoute-ia', icon: Bot, title: 'Compagnon IA', desc: "Une présence douce, disponible à toute heure. Dis ce que tu as sur le coeur — sans te presser, sans te juger.", color: 'bg-green-deep/10', iconColor: 'text-green-deep' },
  { href: '/chat', icon: MessagesSquare, title: 'Chat pair-aidant', desc: "Des salons anonymes pour parler à d'autres qui traversent la même nuit. Vous pouvez vous reconnaître sans vous connaître.", color: 'bg-blue-mist/30', iconColor: 'text-blue-slate' },
];

const VALUES = [
  { num: '1', title: 'Anonymat total', desc: "Ici, tu n'as pas de nom. Pas d'identité. Juste ta vérité — protégée, intouchable, entièrement à toi." },
  { num: '2', title: 'Gratuit et accessible', desc: "Le bien-être ne devrait pas avoir de prix. Dallaal fonctionne même là où le réseau fait défaut — pour tous." },
  { num: '3', title: "Né d'ici", desc: "Parce que nos douleurs ont nos visages, nos langues, nos silences. Dallaal est né de cette terre." },
  { num: '4', title: 'Bienveillant et sans jugement', desc: "Pas un oeil qui juge. Pas une voix qui compare. Juste une présence — stable, douce, constante." },
];

export default function Home() {
  return (
    <div className="bg-bg-main">
      <WelcomeModal />

      {/* Crisis Banner */}
      <div className="bg-lavender/20 border-b border-lavender/30 px-4 py-3">
        <div className="container flex items-center gap-3 text-sm text-text-main">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>La tempête est là? <Link href="/urgence" className="font-semibold underline">De l'aide, maintenant</Link></span>
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

        <div className="container relative z-20 py-14 sm:py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-main mb-4 md:mb-6" style={{ fontFamily: "'Lora', serif" }}>
              Calme-toi.<br />Tu es en sécurité.
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-text-muted mb-6 md:mb-8 leading-relaxed">
              Ici, tes mots n'ont pas besoin d'être beaux. Tes larmes n'ont pas besoin d'être expliquées. Dallaal est l'espace où tu arrives tel que tu es — et où quelque chose, doucement, commence à bouger.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16 dalal-heading">
            Explore les espaces de Dallaal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                    Quand ça devient trop lourd pour porter seul(e). Un souffle guidé, une main tendue — tout de suite.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 lg:mb-12 dalal-heading">
            Les principes de Dallaal
          </h2>
          <div className="space-y-8">
            {VALUES.map(v => (
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
