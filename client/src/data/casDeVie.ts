/**
 * 10 Cas de Vie — Données complètes
 * Chaque cas contient: description, signes, exercices dédiés, ressources
 */

export interface CasDeVie {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  description: string;
  signs: string[];
  exercises: CasExercise[];
  resources: string[];
  emergencyNote?: string;
}

export interface CasExercise {
  title: string;
  description: string;
  steps: string[];
  duration: string;
}

export const CAS_DE_VIE: CasDeVie[] = [
  {
    id: 'depression',
    title: 'Dépression et détresse sévère',
    subtitle: 'Quand la tristesse ne part plus',
    emoji: '🌧️',
    color: '#C4B8D4',
    description: 'La dépression n\'est pas de la faiblesse. C\'est une maladie qui affecte ta chimie cérébrale. Tu mérites de l\'aide, et il existe des solutions.',
    signs: [
      'Tristesse persistante depuis plus de 2 semaines',
      'Perte d\'intérêt pour les activités qu\'on aimait',
      'Fatigue constante, même après le repos',
      'Difficultés de concentration',
      'Changements d\'appétit ou de sommeil',
      'Pensées négatives récurrentes',
      'Isolement social progressif',
    ],
    exercises: [
      {
        title: 'Activation comportementale',
        description: 'Quand la dépression te dit de rester au lit, fais le contraire — doucement.',
        steps: [
          'Choisis UNE petite action (se lever, ouvrir la fenêtre, boire de l\'eau)',
          'Fais-la sans te juger, même si ça semble insignifiant',
          'Note comment tu te sens après (même un tout petit changement compte)',
          'Demain, ajoute une deuxième petite action',
          'Chaque jour, un pas de plus. Pas de marathon.',
        ],
        duration: '5 min',
      },
      {
        title: 'Lettre à toi-même',
        description: 'Écris-toi une lettre comme si tu parlais à ton meilleur ami qui souffre.',
        steps: [
          'Prends un papier ou ouvre l\'espace Expression de Dalal',
          'Commence par "Cher(e) moi..."',
          'Écris ce que tu dirais à un ami qui traverse la même chose',
          'Sois doux/douce avec toi-même dans cette lettre',
          'Relis-la quand les jours sont difficiles',
        ],
        duration: '10 min',
      },
      {
        title: 'Respiration 4-7-8 pour le sommeil',
        description: 'Technique spécifique pour calmer le système nerveux avant de dormir.',
        steps: [
          'Allonge-toi confortablement',
          'Inspire par le nez pendant 4 secondes',
          'Retiens ta respiration pendant 7 secondes',
          'Expire lentement par la bouche pendant 8 secondes',
          'Répète 4 cycles. Laisse le sommeil venir.',
        ],
        duration: '5 min',
      },
    ],
    resources: [
      'Service de Psychiatrie — Hôpital de Fann: +221 33 825 50 22',
      'SOS Médecins Sénégal: +221 33 889 15 15 (24h/24)',
    ],
    emergencyNote: 'Si tu penses au suicide, appelle immédiatement le +221 33 825 50 22 ou rends-toi aux urgences psychiatriques de Fann.',
  },
  {
    id: 'trauma',
    title: 'Trauma et violence',
    subtitle: 'Ce qui t\'est arrivé n\'est pas ta faute',
    emoji: '🛡️',
    color: '#C5D5E8',
    description: 'Le trauma laisse des traces profondes. Mais ton corps et ton esprit ont une capacité incroyable de guérison. Tu n\'as pas à traverser ça seul(e).',
    signs: [
      'Flashbacks ou cauchemars récurrents',
      'Évitement de lieux, personnes ou situations',
      'Hypervigilance (sursauter facilement)',
      'Difficultés à faire confiance',
      'Engourdissement émotionnel',
      'Réactions physiques (tremblements, nausées)',
    ],
    exercises: [
      {
        title: 'Ancrage de sécurité',
        description: 'Quand un flashback survient, ramène-toi dans le présent.',
        steps: [
          'Pose tes pieds fermement au sol',
          'Nomme 5 choses que tu VOIS autour de toi',
          'Touche 4 objets et décris leur texture',
          'Écoute 3 sons dans ton environnement',
          'Rappelle-toi: "Je suis ici. Je suis en sécurité. C\'est du passé."',
        ],
        duration: '3 min',
      },
      {
        title: 'Le lieu sûr (visualisation)',
        description: 'Crée un espace de sécurité dans ton esprit.',
        steps: [
          'Ferme les yeux et imagine un lieu où tu te sens totalement en sécurité',
          'Ça peut être réel ou imaginaire (une plage, une chambre, sous un baobab)',
          'Ajoute des détails: couleurs, sons, odeurs, température',
          'Ressens la paix de cet endroit dans ton corps',
          'Tu peux y retourner à tout moment en fermant les yeux',
        ],
        duration: '5 min',
      },
      {
        title: 'Papillon (EMDR simplifié)',
        description: 'Technique de stimulation bilatérale pour calmer le système nerveux.',
        steps: [
          'Croise tes bras sur ta poitrine (mains sur les épaules)',
          'Tapote alternativement: main gauche, main droite, lentement',
          'Pense à ton lieu sûr pendant que tu tapottes',
          'Continue pendant 2 minutes à un rythme régulier',
          'Observe comment ton corps se calme progressivement',
        ],
        duration: '3 min',
      },
    ],
    resources: [
      'Service de Psychiatrie — Hôpital de Fann: +221 33 825 50 22',
      'ALIMA — Soutien psychosocial: alima.ngo',
    ],
    emergencyNote: 'Si tu es en danger immédiat, appelle la police (17) ou SOS Médecins (+221 33 889 15 15).',
  },
  {
    id: 'deuil',
    title: 'Deuil et perte',
    subtitle: 'Il n\'y a pas de bonne façon de pleurer',
    emoji: '🕯️',
    color: '#D4B896',
    description: 'Perdre quelqu\'un qu\'on aime est l\'une des douleurs les plus profondes. Le deuil n\'a pas de calendrier. Prends le temps qu\'il te faut.',
    signs: [
      'Tristesse intense et vagues d\'émotion',
      'Sentiment de vide ou d\'irréalité',
      'Colère (contre la personne, contre Dieu, contre soi)',
      'Culpabilité ("si j\'avais fait...")',
      'Difficultés à accepter la réalité de la perte',
      'Changements de sommeil et d\'appétit',
    ],
    exercises: [
      {
        title: 'Lettre non envoyée',
        description: 'Écris à la personne que tu as perdue. Dis tout ce que tu n\'as pas pu dire.',
        steps: [
          'Prends un moment calme, seul(e)',
          'Écris "Cher(e) [nom]..."',
          'Dis tout: les regrets, les mercis, les "tu me manques"',
          'Ne te retiens pas. Les larmes sont bienvenues.',
          'Garde la lettre ou brûle-la — c\'est ton choix, ton rituel.',
        ],
        duration: '15 min',
      },
      {
        title: 'Bougie mémorielle',
        description: 'Un rituel simple pour honorer la mémoire de la personne.',
        steps: [
          'Allume une bougie (réelle ou imagine-la)',
          'Pense à un souvenir heureux avec cette personne',
          'Souris en te rappelant ce moment',
          'Dis à voix haute ou dans ta tête: "Merci d\'avoir été là"',
          'Laisse la bougie brûler le temps que tu veux',
        ],
        duration: '5 min',
      },
      {
        title: 'Boîte à souvenirs',
        description: 'Rassemble les souvenirs positifs pour les jours difficiles.',
        steps: [
          'Choisis 3 souvenirs heureux avec la personne',
          'Écris-les en détail (lieu, moment, ce que tu as ressenti)',
          'Ajoute des photos, objets ou chansons qui te rappellent ces moments',
          'Quand la douleur est forte, ouvre ta boîte à souvenirs',
          'Rappelle-toi: l\'amour ne disparaît pas avec la personne',
        ],
        duration: '10 min',
      },
    ],
    resources: [
      'REPOSAMS — Groupes de parole: reposams.sn',
      'Association des Psychologues du Sénégal',
    ],
  },
  {
    id: 'addiction',
    title: 'Addiction',
    subtitle: 'Tu es plus fort(e) que ta dépendance',
    emoji: '⛓️',
    color: '#8B6BAE',
    description: 'L\'addiction n\'est pas un manque de volonté. C\'est un mécanisme du cerveau. Comprendre comment il fonctionne est le premier pas vers la liberté.',
    signs: [
      'Besoin irrésistible de consommer/faire quelque chose',
      'Perte de contrôle sur la quantité ou la fréquence',
      'Continuer malgré les conséquences négatives',
      'Besoin de doses croissantes (tolérance)',
      'Symptômes de manque (irritabilité, anxiété, tremblements)',
      'Abandon d\'activités importantes',
    ],
    exercises: [
      {
        title: 'Urge Surfing (surfer sur l\'envie)',
        description: 'L\'envie est comme une vague: elle monte, atteint un pic, puis redescend. Tu peux la surfer.',
        steps: [
          'Quand l\'envie arrive, ne lutte pas. Observe-la.',
          'Où la sens-tu dans ton corps? (gorge, ventre, poitrine)',
          'Note son intensité de 1 à 10',
          'Respire lentement et observe l\'envie monter',
          'Attends 15 minutes. L\'envie va redescendre. Tu as surfé!',
        ],
        duration: '15 min',
      },
      {
        title: 'Journal de sobriété',
        description: 'Chaque jour sans consommer est une victoire. Note-les.',
        steps: [
          'Chaque soir, note: "Jour X sans [substance/comportement]"',
          'Écris un mot sur comment tu te sens',
          'Note ce qui t\'a aidé aujourd\'hui',
          'Note ce qui a été difficile',
          'Célèbre chaque semaine complétée',
        ],
        duration: '5 min',
      },
      {
        title: 'Plan d\'urgence anti-rechute',
        description: 'Prépare-toi pour les moments de faiblesse.',
        steps: [
          'Identifie tes 3 déclencheurs principaux (lieu, personne, émotion)',
          'Pour chaque déclencheur, écris une alternative (ex: "quand je suis stressé, je marche 10 min")',
          'Note 2 personnes que tu peux appeler en cas d\'urgence',
          'Écris-toi un message de motivation à relire dans les moments durs',
          'Garde ce plan sur toi (téléphone ou papier)',
        ],
        duration: '10 min',
      },
    ],
    resources: [
      'Centre Hospitalier Psychiatrique de Thiaroye — Unité d\'addictologie: +221 33 834 01 52',
      'Hôpital de Fann — Service de Psychiatrie: +221 33 825 50 22',
    ],
  },
  {
    id: 'troubles-alimentaires',
    title: 'Troubles alimentaires',
    subtitle: 'Ton corps mérite de l\'amour, pas de la guerre',
    emoji: '🍃',
    color: '#B8CBBF',
    description: 'Les troubles alimentaires ne sont pas un choix. Ils sont souvent liés à des émotions profondes. Tu mérites une relation apaisée avec ton corps et la nourriture.',
    signs: [
      'Préoccupation excessive pour le poids ou la forme du corps',
      'Restriction alimentaire sévère ou crises de boulimie',
      'Se faire vomir ou utiliser des laxatifs',
      'Exercice physique excessif et compulsif',
      'Éviter de manger en public',
      'Honte ou culpabilité liée à la nourriture',
    ],
    exercises: [
      {
        title: 'Bienveillance corporelle',
        description: 'Apprends à parler à ton corps avec douceur.',
        steps: [
          'Place ta main sur ton cœur',
          'Dis: "Mon corps me porte chaque jour. Merci."',
          'Nomme 3 choses que ton corps fait bien (marcher, respirer, sourire)',
          'Remplace une pensée négative par une neutre: "Mon corps est mon allié"',
          'Répète chaque matin pendant 7 jours',
        ],
        duration: '3 min',
      },
      {
        title: 'Journal émotionnel de la faim',
        description: 'Comprendre le lien entre tes émotions et ta relation à la nourriture.',
        steps: [
          'Avant de manger, note: "Est-ce que j\'ai faim physiquement ou émotionnellement?"',
          'Si c\'est émotionnel: quelle émotion? (stress, ennui, tristesse, colère)',
          'Note ce que tu manges et comment tu te sens après',
          'Pas de jugement. C\'est de l\'observation.',
          'Après une semaine, cherche les patterns',
        ],
        duration: '5 min',
      },
    ],
    resources: [
      'SamaPsy — Cabinet de Psychologie: sama-psy.com',
      'Association des Psychologues du Sénégal',
    ],
  },
  {
    id: 'anxiete-sociale',
    title: 'Anxiété sociale et isolement',
    subtitle: 'Le monde n\'est pas aussi menaçant qu\'il paraît',
    emoji: '🫣',
    color: '#C5D5E8',
    description: 'L\'anxiété sociale te fait croire que tout le monde te juge. Mais la réalité est souvent bien plus douce que ce que ton cerveau te raconte.',
    signs: [
      'Peur intense des situations sociales',
      'Évitement des rassemblements, cours, fêtes',
      'Peur d\'être jugé(e) ou humilié(e)',
      'Rougissement, tremblements, bégaiement en public',
      'Rumination après les interactions ("j\'aurais dû dire...")',
      'Isolement progressif',
    ],
    exercises: [
      {
        title: 'Exposition graduelle',
        description: 'Affronte tes peurs par petites étapes, pas par grands sauts.',
        steps: [
          'Écris ta "hiérarchie de peur" (du moins au plus effrayant)',
          'Exemple: 1. Dire bonjour au voisin → 5. Parler en classe → 10. Présentation devant un groupe',
          'Commence par le niveau 1. Fais-le 3 fois cette semaine.',
          'Quand c\'est confortable, passe au niveau suivant',
          'Célèbre chaque victoire, même la plus petite',
        ],
        duration: '5 min de planification',
      },
      {
        title: 'Préparation sociale',
        description: 'Prépare-toi mentalement avant une situation sociale stressante.',
        steps: [
          'Visualise la situation à l\'avance (lieu, personnes, durée)',
          'Prépare 2-3 sujets de conversation simples',
          'Rappelle-toi: les gens pensent moins à toi que tu ne crois',
          'Fixe-toi un objectif réaliste (ex: "parler à 1 personne")',
          'Après: note ce qui s\'est bien passé (pas ce qui a mal tourné)',
        ],
        duration: '5 min',
      },
    ],
    resources: [
      'SamaPsy — Consultation en wolof disponible: sama-psy.com',
      'IREP — Programmes jeunesse UCAD',
    ],
  },
  {
    id: 'pression-familiale',
    title: 'Pression familiale et culturelle',
    subtitle: 'Entre respect et liberté',
    emoji: '🏠',
    color: '#D4B896',
    description: 'En Afrique, la famille est sacrée. Mais tes rêves et ta santé mentale comptent aussi. Tu peux honorer ta famille tout en étant fidèle à toi-même.',
    signs: [
      'Sentiment constant de ne pas être à la hauteur',
      'Choix de vie dictés par les attentes des autres',
      'Culpabilité quand tu fais quelque chose pour toi',
      'Comparaison constante avec les autres',
      'Peur de décevoir',
      'Colère refoulée contre la famille',
    ],
    exercises: [
      {
        title: 'Valeurs vs Attentes',
        description: 'Distingue ce que TU veux de ce qu\'on attend de toi.',
        steps: [
          'Fais deux colonnes: "Mes valeurs" et "Les attentes des autres"',
          'Écris 5 choses dans chaque colonne',
          'Entoure ce qui se chevauche (les points communs)',
          'Pour les différences: demande-toi "est-ce que je peux vivre avec ça?"',
          'Identifie 1 chose non-négociable pour toi. C\'est ta ligne.',
        ],
        duration: '10 min',
      },
      {
        title: 'Communication non-violente',
        description: 'Apprends à exprimer tes besoins sans blesser.',
        steps: [
          'Observe sans juger: "Quand tu dis que je dois..."',
          'Exprime ton émotion: "Je me sens..."',
          'Identifie ton besoin: "Parce que j\'ai besoin de..."',
          'Fais une demande claire: "Est-ce qu\'on pourrait..."',
          'Exemple: "Quand tu compares mes notes à celles de Fatou, je me sens blessé(e), parce que j\'ai besoin d\'être reconnu(e) pour mes efforts. Est-ce qu\'on pourrait en parler calmement?"',
        ],
        duration: '5 min',
      },
    ],
    resources: [
      'SamaPsy — Thérapie familiale disponible: sama-psy.com',
      'Association des Psychologues du Sénégal',
    ],
  },
  {
    id: 'souffrance-spirituelle',
    title: 'Souffrance spirituelle',
    subtitle: 'Quand la foi ne suffit plus à calmer la douleur',
    emoji: '🌙',
    color: '#4A7C6F',
    description: 'La spiritualité peut être une force immense. Mais parfois, la souffrance dépasse ce que la prière seule peut guérir. Chercher de l\'aide professionnelle n\'est pas un manque de foi.',
    signs: [
      'Sentiment que Dieu t\'a abandonné(e)',
      'Culpabilité spirituelle ("c\'est une punition")',
      'Conflit entre croyances et réalité vécue',
      'Pression pour "juste prier" quand tu souffres',
      'Doutes existentiels profonds',
      'Sentiment de vide malgré la pratique religieuse',
    ],
    exercises: [
      {
        title: 'Méditation de gratitude spirituelle',
        description: 'Reconnecter avec le sacré à travers la gratitude.',
        steps: [
          'Trouve un endroit calme',
          'Ferme les yeux et respire profondément 3 fois',
          'Nomme 3 choses pour lesquelles tu es reconnaissant(e) aujourd\'hui',
          'Même les plus petites: le soleil, un sourire, un repas',
          'Termine par: "Merci pour ce jour, même avec ses difficultés."',
        ],
        duration: '5 min',
      },
      {
        title: 'Dialogue intérieur',
        description: 'Avoir une conversation honnête avec toi-même sur ta foi et ta douleur.',
        steps: [
          'Écris: "Ce que je crois..." et "Ce que je ressens..."',
          'Accepte que les deux peuvent coexister',
          'La foi et la douleur ne s\'excluent pas',
          'Écris: "Ce dont j\'ai besoin maintenant..."',
          'Rappelle-toi: chercher de l\'aide est aussi un acte de foi',
        ],
        duration: '10 min',
      },
    ],
    resources: [
      'Ordre Hospitalier de Saint Jean de Dieu — Approche holistique',
      'REPOSAMS — Groupes de parole: reposams.sn',
    ],
  },
  {
    id: 'goumi',
    title: 'Goumi — Peine d\'amour',
    subtitle: 'Le cœur brisé guérit, même s\'il ne le croit pas encore',
    emoji: '💔',
    color: '#C4B8D4',
    description: 'En wolof, "goumi" décrit cette douleur du cœur brisé. C\'est l\'une des souffrances les plus universelles. Et oui, ça passe. Même si maintenant, ça semble impossible.',
    signs: [
      'Douleur physique dans la poitrine',
      'Obsession pour l\'autre personne',
      'Vérification compulsive des réseaux sociaux',
      'Perte d\'appétit ou boulimie émotionnelle',
      'Insomnie ou hypersomnie',
      'Sentiment que la vie n\'a plus de sens',
    ],
    exercises: [
      {
        title: 'No-Contact Timer',
        description: 'Chaque jour sans contact est un jour de guérison.',
        steps: [
          'Décide: pas de messages, pas d\'appels, pas de stalking',
          'Note le jour 1 dans ton calendrier',
          'Chaque jour, coche. Célèbre chaque semaine.',
          'Si tu craques, recommence sans te juger. C\'est normal.',
          'Objectif: 30 jours. Après, tu verras plus clair.',
        ],
        duration: '1 min/jour',
      },
      {
        title: 'Lettre finale (non envoyée)',
        description: 'Dis tout ce que tu as sur le cœur. Puis ferme ce chapitre.',
        steps: [
          'Écris tout: la colère, la tristesse, les bons souvenirs, les regrets',
          'Ne te censure pas. C\'est pour toi, pas pour l\'autre.',
          'Termine par: "Je te laisse partir. Je me choisis."',
          'Brûle la lettre, déchire-la, ou garde-la — c\'est ton rituel.',
          'C\'est un acte de libération, pas de faiblesse.',
        ],
        duration: '15 min',
      },
      {
        title: 'Liste de reconstruction',
        description: 'Rappelle-toi qui tu es en dehors de cette relation.',
        steps: [
          'Écris 5 choses que tu aimes faire et que tu avais arrêtées',
          'Écris 3 qualités que tes amis voient en toi',
          'Écris 1 rêve que tu veux poursuivre',
          'Cette semaine, fais au moins 1 chose de ta liste',
          'Tu es une personne entière, avec ou sans cette relation.',
        ],
        duration: '10 min',
      },
    ],
    resources: [
      'SamaPsy — Consultation individuelle: sama-psy.com',
    ],
  },
  {
    id: 'phobies',
    title: 'Phobies et complexes',
    subtitle: 'Ta peur est réelle, mais elle ne te définit pas',
    emoji: '🦋',
    color: '#B8CBBF',
    description: 'Les phobies sont des peurs irrationnelles mais très réelles. Les complexes sont des jugements sévères envers toi-même. Les deux peuvent être apprivoisés.',
    signs: [
      'Peur intense et disproportionnée face à un objet ou une situation',
      'Évitement systématique',
      'Crises de panique (cœur qui bat, sueurs, tremblements)',
      'Honte de son apparence physique',
      'Comparaison constante avec les autres',
      'Pensées obsédantes sur ses "défauts"',
    ],
    exercises: [
      {
        title: 'Exposition progressive',
        description: 'Apprivoise ta peur par petites doses.',
        steps: [
          'Identifie ta peur précise',
          'Crée une échelle de 0 à 10 (0 = aucune peur, 10 = terreur)',
          'Commence par le niveau 1-2 (ex: regarder une photo de ce qui te fait peur)',
          'Reste dans la situation jusqu\'à ce que l\'anxiété baisse de moitié',
          'Monte progressivement. Jamais plus de 2 niveaux à la fois.',
        ],
        duration: '10 min',
      },
      {
        title: 'Affirmations miroir',
        description: 'Change le dialogue intérieur sur ton apparence.',
        steps: [
          'Chaque matin, regarde-toi dans le miroir',
          'Dis une chose neutre ou positive: "Mes yeux sont beaux" ou "Mon corps me porte"',
          'Si c\'est trop dur, commence par: "Je suis digne de respect"',
          'Écris 3 affirmations et colle-les sur ton miroir',
          'En 21 jours, ton cerveau commencera à y croire',
        ],
        duration: '2 min',
      },
      {
        title: 'Journal de succès',
        description: 'Contrebalance les pensées négatives par des preuves positives.',
        steps: [
          'Chaque soir, note 1 chose que tu as bien faite aujourd\'hui',
          'Ça peut être minuscule: "J\'ai souri à quelqu\'un"',
          'Après 7 jours, relis ton journal',
          'Tu verras: tu fais bien plus de choses que tu ne crois',
          'Continue pendant 30 jours pour un vrai changement de perspective',
        ],
        duration: '3 min',
      },
    ],
    resources: [
      'SamaPsy — Thérapie cognitive et comportementale: sama-psy.com',
      'Association des Psychologues du Sénégal',
    ],
  },
];
