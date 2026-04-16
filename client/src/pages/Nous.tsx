import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Nous() {
  return (
    <div className="bg-bg-main">
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Communauté Anonyme
          </h1>
          <p className="text-lg text-text-muted mb-8">
            Partagez anonymement, écoutez les autres. Vous n'êtes pas seul(e). Bientôt disponible.
          </p>
          <Link href="/">
            <Button className="dalal-button-primary">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
