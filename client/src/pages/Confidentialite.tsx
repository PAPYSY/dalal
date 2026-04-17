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
                Dalal ne sait pas qui tu es
              </h2>
              <p className="text-text-muted leading-relaxed">
                Tout ce que tu écris reste sur ton appareil. Nous ne créons pas de compte. Nous ne collectons pas ton nom. Nous ne vendons rien. Juste un espace pour toi.
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
                <li>✓ Exporter toutes tes données en JSON en un clic</li>
                <li>✓ Supprimer complètement toutes tes données</li>
                <li>✓ Désactiver le système de détection bienveillante</li>
                <li>✓ Accéder à cette politique en langage simple</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Limites éthiques de Dalal
              </h2>
              <ul className="space-y-2 text-text-muted">
                <li>• Dalal n'est pas un service médical — il ne remplace pas un professionnel</li>
                <li>• Dalal ne diagnostique jamais une condition mentale</li>
                <li>• Dalal n'intervient jamais automatiquement sans ton consentement</li>
                <li>• Les articles et exercices sont validés par un psychologue sénégalais</li>
                <li>• Les ressources de l'annuaire sont vérifiées régulièrement</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-green-light/10 border border-green-light/30">
              <h2 className="text-2xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Questions?
              </h2>
              <p className="text-text-muted mb-4">
                Si tu as des questions sur ta confidentialité ou comment Dalal fonctionne, n'hésite pas à nous contacter.
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
