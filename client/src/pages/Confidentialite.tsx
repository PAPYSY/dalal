import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Confidentialite() {
  return (
    <div className="bg-bg-main">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-6 sm:mb-8" style={{ fontFamily: "'Lora', serif" }}>
            Politique de Confidentialité
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Dallaal ne sait pas qui tu es
              </h2>
              <p className="text-text-muted leading-relaxed">
                Tout ce que tu écris reste sur ton appareil — comme un journal qu'on ne peut pas voler. Pas de compte. Pas de nom. Pas de regard. Rien que toi et tes mots.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Ce qui est collecté
              </h2>
              <div className="space-y-4 text-text-muted">
                <div>
                  <h3 className="font-semibold text-text-main mb-2">Posts de la communauté</h3>
                  <p>Texte anonyme + nom poétique aléatoire — stocké sur Firebase Firestore</p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main mb-2">Tout le reste</h3>
                  <p>Stocké uniquement en localStorage — ne quitte jamais ton appareil</p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main mb-2">Analyses</h3>
                  <p>Aucune — pas de Google Analytics, pas de trackers</p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main mb-2">Publicité</h3>
                  <p>Aucune — jamais</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Tes droits
              </h2>
              <ul className="space-y-2 text-text-muted">
                <li>✓ Reprendre tes mots en un clic — tout exporter, tout emporter</li>
                <li>✓ Tout effacer, comme si tu n'étais jamais passé(e)</li>
                <li>✓ Éteindre la détection bienveillante si tu préfères le silence</li>
                <li>✓ Lire cette politique en langage humain, pas en jargon légal</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Limites éthiques de Dallaal
              </h2>
              <ul className="space-y-2 text-text-muted">
                <li>• Dallaal accompagne — il ne soigne pas. Un professionnel reste irremplaçable.</li>
                <li>• Dallaal ne pose jamais de diagnostic. Ce n'est pas son rôle.</li>
                <li>• Dallaal ne fait rien sans ton accord. Ton consentement est sacré.</li>
                <li>• Nos exercices et articles ont été relus par un psychologue sénégalais.</li>
                <li>• L'annuaire est vérifié régulièrement — pour que tu trouves une vraie aide.</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-green-light/10 border border-green-light/30">
              <h2 className="text-2xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Questions?
              </h2>
              <p className="text-text-muted mb-4">
                Une question sur comment tes données sont protégées? Une chose qui n'est pas claire? On est là.
              </p>
              <a href="mailto:contact@dalal.app">
                <Button className="dalal-button-primary">
                  Nous contacter
                </Button>
              </a>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button className="dalal-button-secondary">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
