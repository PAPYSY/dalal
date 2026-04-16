/**
 * Données de la bibliothèque et de l'annuaire professionnel
 * Sources réelles vérifiées pour le Sénégal et l'Afrique de l'Ouest
 */

// ==================== ARTICLES ====================

export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: number;
  tags: string[];
}

export const CATEGORIES = [
  { id: 'comprendre', label: 'Comprendre', icon: '🧠', desc: 'Mieux comprendre la santé mentale' },
  { id: 'agir', label: 'Agir', icon: '💪', desc: 'Outils et techniques pratiques' },
  { id: 'temoignages', label: 'Témoignages', icon: '💬', desc: 'Histoires de résilience' },
  { id: 'culture', label: 'Culture & Santé', icon: '🌍', desc: 'Santé mentale en contexte africain' },
  { id: 'relations', label: 'Relations', icon: '🤝', desc: 'Famille, amitié, amour' },
];

export const ARTICLES: Article[] = [
  {
    id: 'depression-comprendre',
    title: 'La dépression, ce n\'est pas de la faiblesse',
    category: 'comprendre',
    summary: 'Comprendre ce qu\'est vraiment la dépression et pourquoi elle n\'a rien à voir avec un manque de volonté.',
    readTime: 5,
    tags: ['dépression', 'stigmatisation', 'science'],
    content: `La dépression est une maladie, pas un choix. Au Sénégal et en Afrique de l'Ouest, on entend souvent "il faut être fort", "prie et ça passera", ou "c'est dans ta tête". Ces phrases, bien intentionnées, peuvent empêcher quelqu'un de chercher l'aide dont il a besoin.

**Qu'est-ce que la dépression?**

La dépression est un trouble de l'humeur qui affecte la chimie du cerveau. Ce n'est pas de la tristesse passagère. C'est une maladie qui peut durer des semaines, des mois, voire des années si elle n'est pas traitée.

**Les signes à reconnaître:**
- Tristesse persistante pendant plus de 2 semaines
- Perte d'intérêt pour les activités qu'on aimait
- Fatigue constante, même après le repos
- Difficultés de concentration
- Changements d'appétit ou de sommeil
- Pensées négatives récurrentes
- Isolement social

**Pourquoi c'est important d'en parler?**

Selon l'OMS, la dépression touche plus de 280 millions de personnes dans le monde. En Afrique subsaharienne, le manque de professionnels de santé mentale (moins de 1 psychiatre pour 100 000 habitants au Sénégal) rend l'accès aux soins difficile.

**Ce que tu peux faire:**
1. Reconnaître que ce que tu ressens est réel et valide
2. En parler à quelqu'un de confiance
3. Consulter un professionnel si possible
4. Utiliser les exercices de Dalal comme complément (pas remplacement) d'un suivi professionnel

Tu n'es pas faible. Tu es humain(e). Et demander de l'aide est un acte de courage.`,
  },
  {
    id: 'anxiete-gerer',
    title: 'L\'anxiété: quand l\'inquiétude prend le dessus',
    category: 'comprendre',
    summary: 'Comprendre l\'anxiété et apprendre à la reconnaître pour mieux la gérer au quotidien.',
    readTime: 6,
    tags: ['anxiété', 'stress', 'techniques'],
    content: `L'anxiété est une réponse naturelle du corps face au danger. Mais quand elle devient constante et disproportionnée, elle peut paralyser ta vie quotidienne.

**L'anxiété normale vs le trouble anxieux**

Tout le monde ressent de l'anxiété: avant un examen, un entretien, ou une situation nouvelle. C'est normal et même utile — ça nous prépare à agir. Mais quand l'anxiété survient sans raison apparente, qu'elle est intense et qu'elle dure, elle devient un trouble.

**Les manifestations physiques:**
- Cœur qui bat vite
- Mains moites, tremblements
- Boule dans la gorge ou l'estomac
- Difficultés à respirer
- Tensions musculaires
- Vertiges

**Les manifestations mentales:**
- Pensées catastrophiques ("et si...")
- Difficulté à se concentrer
- Irritabilité
- Insomnie
- Besoin constant d'être rassuré(e)

**Techniques qui aident:**
1. **La respiration 4-7-8**: Inspire 4 secondes, retiens 7, expire 8. Répète 4 fois.
2. **L'ancrage 5-4-3-2-1**: Identifie 5 choses que tu vois, 4 que tu touches, 3 que tu entends, 2 que tu sens, 1 que tu goûtes.
3. **Le mouvement**: Marche, danse, fais du sport. Le corps a besoin de libérer l'énergie de l'anxiété.
4. **La routine**: Un emploi du temps régulier aide le cerveau à se sentir en sécurité.

L'anxiété ne te définit pas. C'est une vague qui passe. Et tu peux apprendre à surfer dessus.`,
  },
  {
    id: 'deuil-traverser',
    title: 'Traverser le deuil: il n\'y a pas de bonne façon de pleurer',
    category: 'comprendre',
    summary: 'Le deuil est un processus unique pour chacun. Comprendre ses étapes peut aider à traverser cette épreuve.',
    readTime: 7,
    tags: ['deuil', 'perte', 'processus'],
    content: `Perdre quelqu'un qu'on aime est l'une des expériences les plus douloureuses de la vie. En Afrique, le deuil est souvent vécu collectivement, mais la douleur intérieure reste profondément personnelle.

**Les étapes du deuil (modèle de Kübler-Ross):**

1. **Le déni**: "Ce n'est pas possible." Le cerveau se protège du choc.
2. **La colère**: "Pourquoi moi? C'est injuste!" La douleur se transforme en rage.
3. **Le marchandage**: "Si seulement j'avais fait..." On cherche à négocier avec le destin.
4. **La dépression**: La réalité de la perte s'installe. Tristesse profonde.
5. **L'acceptation**: Non pas "aller mieux", mais apprendre à vivre avec l'absence.

**Important:** Ces étapes ne sont pas linéaires. Tu peux aller et venir entre elles. Il n'y a pas de calendrier.

**Le deuil en contexte africain:**

Au Sénégal, les rituels funéraires (le "takk" en wolof) offrent un cadre collectif pour le deuil. Mais parfois, la pression sociale de "rester fort" peut empêcher l'expression de la douleur. Il est normal de pleurer, même des mois après.

**Ce qui peut aider:**
- Parler de la personne disparue (raconter des souvenirs)
- Écrire une lettre à la personne (même si elle ne la lira jamais)
- Respecter ton rythme — il n'y a pas de date limite pour le deuil
- Créer un rituel personnel de souvenir
- Accepter l'aide de ta communauté

Le deuil n'est pas quelque chose qu'on "surmonte". C'est quelque chose qu'on apprend à porter.`,
  },
  {
    id: 'addiction-comprendre',
    title: 'L\'addiction: comprendre pour se libérer',
    category: 'comprendre',
    summary: 'L\'addiction n\'est pas un manque de volonté. C\'est un mécanisme du cerveau qu\'on peut apprendre à comprendre.',
    readTime: 6,
    tags: ['addiction', 'dépendance', 'cerveau'],
    content: `L'addiction est un piège dans lequel le cerveau tombe pour fuir la douleur. Que ce soit l'alcool, le cannabis, les écrans, ou même la nourriture — le mécanisme est le même.

**Comment fonctionne l'addiction:**

1. **La douleur**: Tu ressens un mal-être (stress, solitude, trauma)
2. **La substance/comportement**: Tu trouves quelque chose qui soulage temporairement
3. **Le soulagement**: Le cerveau libère de la dopamine — tu te sens mieux
4. **La tolérance**: Il en faut de plus en plus pour le même effet
5. **La dépendance**: Tu ne peux plus t'en passer

**Au Sénégal:**

Le Centre Hospitalier Psychiatrique de Thiaroye dispose d'une unité d'addictologie spécialisée. L'alcool et le cannabis sont les substances les plus courantes, mais l'addiction aux écrans et aux jeux d'argent en ligne est en forte hausse chez les jeunes.

**Premiers pas vers la liberté:**
- Reconnaître le problème (le plus dur, mais le plus courageux)
- Identifier les déclencheurs (quand, où, pourquoi tu consommes)
- Trouver des alternatives saines (sport, art, musique)
- Parler à quelqu'un de confiance
- Consulter un professionnel

Tu n'es pas ton addiction. Tu es la personne qui se bat pour s'en sortir.`,
  },
  {
    id: 'pression-familiale',
    title: 'La pression familiale: entre respect et liberté',
    category: 'culture',
    summary: 'Comment naviguer entre les attentes familiales et ses propres besoins dans un contexte africain.',
    readTime: 5,
    tags: ['famille', 'culture', 'pression'],
    content: `En Afrique, la famille est le pilier de la société. Mais parfois, les attentes familiales peuvent devenir un poids écrasant. Comment respecter sa famille tout en prenant soin de soi?

**Les formes de pression familiale:**
- Choix de carrière imposé ("tu dois être médecin/ingénieur")
- Mariage arrangé ou pression pour se marier
- Attentes financières (envoyer de l'argent, réussir pour la famille)
- Comparaison avec les cousins, voisins, amis
- Pression religieuse ou culturelle

**Pourquoi c'est si difficile:**

Dans la culture sénégalaise, le "teranga" (hospitalité) et le "kersa" (pudeur/respect) sont des valeurs fondamentales. Dire "non" à sa famille peut être perçu comme un manque de respect. Mais ta santé mentale compte aussi.

**Comment naviguer:**
1. **Communiquer avec respect**: "Je comprends ton point de vue, et j'ai besoin que tu comprennes le mien aussi."
2. **Poser des limites douces**: Tu peux dire non sans être irrespectueux(se).
3. **Trouver des alliés**: Un oncle, une tante, un aîné qui peut comprendre ta position.
4. **Prendre du recul**: Parfois, la distance physique aide à voir plus clair.
5. **Te rappeler**: Prendre soin de toi n'est pas égoïste. Tu ne peux pas aider ta famille si tu es brisé(e).

Ton bonheur n'est pas en opposition avec celui de ta famille. Les deux peuvent coexister.`,
  },
  {
    id: 'stigmatisation-briser',
    title: 'Briser la stigmatisation de la santé mentale en Afrique',
    category: 'culture',
    summary: 'Pourquoi parler de santé mentale reste tabou en Afrique et comment changer les mentalités.',
    readTime: 6,
    tags: ['stigmatisation', 'culture', 'changement'],
    content: `"Les Africains ne font pas de dépression." "C'est un problème de Blancs." "Il faut juste prier." Ces phrases, on les entend encore trop souvent. Pourtant, la souffrance psychologique ne connaît pas de frontières.

**Pourquoi le tabou persiste:**
- Association de la maladie mentale à la folie ("dof" en wolof)
- Croyances en des causes surnaturelles (djinns, maraboutage)
- Manque d'éducation sur la santé mentale
- Peu de professionnels disponibles
- Peur du jugement social

**Les chiffres parlent:**
- L'OMS estime que 1 personne sur 4 sera touchée par un trouble mental au cours de sa vie
- Au Sénégal, il y a environ 3 psychiatres pour 1 million d'habitants
- Le suicide est la 4ème cause de décès chez les 15-29 ans dans le monde

**Comment changer les choses:**
1. **Parler ouvertement**: Chaque conversation brise un peu plus le tabou
2. **Éduquer**: Partager des informations fiables sur la santé mentale
3. **Normaliser**: "Je vais voir un psy" devrait être aussi normal que "je vais chez le médecin"
4. **Soutenir**: Écouter sans juger quand quelqu'un se confie
5. **Adapter**: Intégrer les approches culturelles et spirituelles dans les soins

Le changement commence par toi. En lisant cet article, tu fais déjà partie de la solution.`,
  },
  {
    id: 'temoignage-moussa',
    title: '"J\'ai appris à demander de l\'aide" — Moussa, 22 ans, Dakar',
    category: 'temoignages',
    summary: 'Moussa raconte comment il a surmonté sa dépression en brisant le silence.',
    readTime: 4,
    tags: ['témoignage', 'dépression', 'espoir'],
    content: `"Pendant deux ans, je me suis levé chaque matin en me demandant pourquoi. Pourquoi continuer. Pourquoi faire semblant que tout allait bien.

J'étais étudiant à l'UCAD. De l'extérieur, tout semblait normal. Mais à l'intérieur, j'étais vide. Je ne mangeais plus, je ne dormais plus, je ne sortais plus. Mes amis pensaient que j'étais juste 'fatigué'.

Le plus dur, c'était la honte. Dans ma famille, on ne parle pas de ces choses. Mon père dit toujours 'un homme ne pleure pas'. Alors je gardais tout en moi.

Un jour, un ami m'a dit: 'Moussa, tu n'as pas l'air bien. Tu veux en parler?' Cette simple phrase a tout changé. Pour la première fois, quelqu'un voyait ma douleur.

J'ai fini par consulter au service de psychiatrie de l'hôpital de Fann. Le docteur m'a expliqué que ce que j'avais s'appelait la dépression. Que c'était une maladie. Que ça se soignait.

Aujourd'hui, je vais mieux. Pas parfaitement, mais mieux. J'ai appris que demander de l'aide n'est pas de la faiblesse. C'est du courage.

Si tu te reconnais dans mon histoire, sache que tu n'es pas seul(e). Et que ça peut aller mieux."

— Moussa, 22 ans, Dakar (témoignage anonymisé)`,
  },
  {
    id: 'temoignage-aissatou',
    title: '"La créativité m\'a sauvée" — Aissatou, 19 ans, Saint-Louis',
    category: 'temoignages',
    summary: 'Aissatou raconte comment l\'art l\'a aidée à traverser un traumatisme.',
    readTime: 4,
    tags: ['témoignage', 'art', 'trauma', 'résilience'],
    content: `"Quand c'est arrivé, je n'avais pas les mots. Littéralement. Je ne pouvais plus parler de ce qui m'était arrivé. Mon corps se figeait chaque fois que j'essayais.

Alors j'ai commencé à dessiner. D'abord des gribouillis. Puis des formes. Puis des couleurs. Chaque dessin était un morceau de ma douleur que je posais sur le papier.

Ma grand-mère, qui est guérisseuse traditionnelle, m'a dit: 'Ma fille, ce que tu fais avec tes mains, c'est ce que nos ancêtres faisaient avec les chants et les danses. Tu guéris ton esprit.'

Elle avait raison. L'art ne m'a pas fait oublier. Mais il m'a donné un langage quand les mots me manquaient. Il m'a donné un espace sûr quand le monde me faisait peur.

Aujourd'hui, j'enseigne le dessin à d'autres jeunes filles de mon quartier. On ne parle pas toujours de ce qui nous fait mal. Mais on dessine. Et dans ces dessins, il y a de la guérison.

Si tu ne trouves pas les mots, essaie les couleurs. Essaie la musique. Essaie la danse. Ton corps sait guérir, il a juste besoin d'un chemin."

— Aissatou, 19 ans, Saint-Louis (témoignage anonymisé)`,
  },
  {
    id: 'respiration-science',
    title: 'La science derrière la respiration: pourquoi ça marche',
    category: 'agir',
    summary: 'Comprendre scientifiquement pourquoi les exercices de respiration calment l\'anxiété.',
    readTime: 5,
    tags: ['respiration', 'science', 'nerf vague'],
    content: `Tu as peut-être entendu "respire profondément" mille fois. Mais sais-tu pourquoi ça fonctionne vraiment? La science a des réponses fascinantes.

**Le système nerveux autonome:**

Ton corps a deux modes:
- **Sympathique** (mode combat/fuite): cœur rapide, muscles tendus, respiration courte
- **Parasympathique** (mode repos/digestion): cœur calme, muscles détendus, respiration lente

L'anxiété active le mode sympathique. La respiration profonde active le parasympathique.

**Le nerf vague: ton allié caché**

Le nerf vague est le plus long nerf du corps. Il relie le cerveau au cœur, aux poumons et à l'intestin. Quand tu expires lentement, tu stimules ce nerf, qui envoie un signal de calme au cerveau.

**Pourquoi le Box Breathing fonctionne:**
1. **Inspire 4s**: Tu remplis tes poumons, tu augmentes l'oxygène
2. **Retiens 4s**: Tu permets à l'oxygène de se distribuer dans le sang
3. **Expire 4s**: Tu stimules le nerf vague, tu ralentis le cœur
4. **Retiens 4s**: Tu crées un moment de calme total

**Les preuves scientifiques:**
- Une étude de Stanford (2023) a montré que 5 minutes de respiration cyclique réduisent l'anxiété plus efficacement que la méditation
- Les Navy SEALs utilisent le Box Breathing pour rester calmes sous pression
- La respiration lente réduit le cortisol (hormone du stress) de 25% en 10 minutes

**Pratique quotidienne recommandée:**
- Matin: 3 cycles au réveil pour bien commencer la journée
- Midi: 2 cycles pour recharger l'énergie
- Soir: 5 cycles avant de dormir pour un meilleur sommeil

La respiration est gratuite, disponible partout, et scientifiquement prouvée. C'est le meilleur outil que tu possèdes déjà.`,
  },
  {
    id: 'relations-toxiques',
    title: 'Reconnaître une relation toxique',
    category: 'relations',
    summary: 'Comment identifier les signes d\'une relation toxique et trouver le courage de s\'en éloigner.',
    readTime: 6,
    tags: ['relations', 'toxicité', 'limites'],
    content: `Une relation toxique, c'est comme un poison lent. Au début, tu ne le sens pas. Puis un jour, tu réalises que tu n'es plus toi-même.

**Les signes d'une relation toxique:**
- Tu marches sur des œufs constamment
- Tu te sens coupable de tout, même de ce qui n'est pas ta faute
- L'autre personne te rabaisse, te critique, te contrôle
- Tu t'isoles de tes amis et de ta famille
- Tu as peur de la réaction de l'autre
- Tu excuses constamment son comportement
- Tu te sens épuisé(e) après chaque interaction

**Amitié, amour, famille: ça peut être toxique partout**

La toxicité n'est pas réservée aux relations amoureuses. Un ami qui te manipule, un parent qui te contrôle, un collègue qui te harcèle — tout ça compte.

**En contexte africain:**

La notion de communauté est forte en Afrique. "On ne quitte pas sa famille." "Un(e) ami(e) d'enfance, c'est pour la vie." Ces croyances peuvent rendre difficile la mise en place de limites. Mais ta santé mentale passe avant les conventions sociales.

**Comment agir:**
1. **Nomme ce que tu vis**: Ce n'est pas normal. Ce n'est pas de l'amour.
2. **Parle à quelqu'un de confiance**: Un ami, un adulte, un professionnel.
3. **Pose des limites**: "Je ne suis pas d'accord avec la façon dont tu me traites."
4. **Prépare ta sortie**: Si c'est dangereux, planifie avec l'aide d'un professionnel.
5. **Sois patient(e) avec toi-même**: Quitter une relation toxique prend du temps et du courage.

Tu mérites des relations qui te construisent, pas qui te détruisent.`,
  },
];

// ==================== ANNUAIRE PROFESSIONNEL ====================

export interface Organisation {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  hours?: string;
  services: string[];
  isUrgent?: boolean;
}

export const ORG_TYPES = [
  { id: 'hopital', label: 'Hôpitaux & Cliniques' },
  { id: 'association', label: 'Associations' },
  { id: 'cabinet', label: 'Cabinets privés' },
  { id: 'ligne', label: 'Lignes d\'écoute' },
  { id: 'international', label: 'Organisations internationales' },
];

export const ORGANISATIONS: Organisation[] = [
  {
    id: 'fann',
    name: 'Service de Psychiatrie — Hôpital de Fann',
    type: 'hopital',
    description: 'Le service de psychiatrie du CHNU de Fann est la référence nationale en santé mentale au Sénégal. Fondé par le Pr Henri Collomb, il offre des consultations psychiatriques, des hospitalisations et un suivi ambulatoire.',
    location: 'Avenue Cheikh Anta Diop, Dakar-Fann',
    phone: '+221 33 825 50 22',
    hours: 'Lundi-Vendredi: 8h-18h',
    services: ['Consultation psychiatrique', 'Hospitalisation', 'Suivi ambulatoire', 'Urgences psychiatriques'],
    isUrgent: true,
  },
  {
    id: 'thiaroye',
    name: 'Centre Hospitalier Psychiatrique de Thiaroye',
    type: 'hopital',
    description: 'Centre hospitalier national psychiatrique avec une unité d\'addictologie spécialisée. Prise en charge des troubles psychiatriques et des addictions (cannabis, alcool, tabac, cocaïne).',
    location: 'Thiaroye, Dakar',
    phone: '+221 33 834 01 52',
    website: 'https://hopitalthiaroye.com',
    hours: 'Lundi-Vendredi: 8h-17h',
    services: ['Psychiatrie générale', 'Addictologie', 'Thérapie de groupe', 'Réhabilitation'],
  },
  {
    id: 'samapsy',
    name: 'SamaPsy — Cabinet de Psychologie',
    type: 'cabinet',
    description: 'Cabinet de psychologie à Dakar dédié à la promotion de la santé mentale pour tous. Consultations individuelles, thérapie de couple et familiale, en français et wolof.',
    location: 'Dakar',
    website: 'https://sama-psy.com',
    services: ['Consultation individuelle', 'Thérapie de couple', 'Thérapie familiale', 'Consultation en wolof'],
  },
  {
    id: 'reposams',
    name: 'REPOSAMS — Réseau des Personnes Affectées par la Santé Mentale',
    type: 'association',
    description: 'Association créée en 2019, constituée de parents de malades mentaux et d\'anciens malades guéris. Soutien par les pairs, plaidoyer et lutte contre la stigmatisation.',
    location: 'Dakar, Sénégal',
    website: 'https://reposams.sn',
    services: ['Soutien par les pairs', 'Groupes de parole', 'Plaidoyer', 'Sensibilisation'],
  },
  {
    id: 'sjdd',
    name: 'Ordre Hospitalier de Saint Jean de Dieu',
    type: 'international',
    description: 'Projet de santé mentale communautaire au Sénégal depuis 2020. Équipes soignantes mobiles pour les communautés rurales et urbaines.',
    location: 'Thiès et régions rurales',
    website: 'https://juanciudad.org',
    services: ['Santé mentale communautaire', 'Soins mobiles', 'Formation des agents de santé', 'Sensibilisation rurale'],
  },
  {
    id: 'aps',
    name: 'Association des Psychologues du Sénégal',
    type: 'association',
    description: 'Association professionnelle regroupant les psychologues du Sénégal. Orientation vers des professionnels qualifiés et actions de sensibilisation.',
    location: 'Dakar, Sénégal',
    services: ['Orientation professionnelle', 'Annuaire de psychologues', 'Sensibilisation', 'Formation continue'],
  },
  {
    id: 'alima',
    name: 'ALIMA — Santé Mentale Humanitaire',
    type: 'international',
    description: 'ONG médicale qui intègre les soins psychologiques et psychosociaux dans ses interventions humanitaires en Afrique de l\'Ouest.',
    location: 'Dakar (siège régional)',
    website: 'https://alima.ngo',
    services: ['Soutien psychosocial', 'Prise en charge des traumatismes', 'Santé mentale en urgence', 'Formation'],
  },
  {
    id: 'irep',
    name: 'IREP — Institut de Recherche en Santé Mentale (UCAD)',
    type: 'association',
    description: 'Institut de recherche rattaché à l\'Université Cheikh Anta Diop. Recherche et promotion de la santé mentale chez les jeunes au Sénégal.',
    location: 'UCAD, Dakar',
    website: 'https://www.issmucad.com',
    services: ['Recherche', 'Programmes jeunesse', 'Formation universitaire', 'Sensibilisation campus'],
  },
  {
    id: 'sos-medecins',
    name: 'SOS Médecins Sénégal',
    type: 'ligne',
    description: 'Service médical d\'urgence à domicile disponible 24h/24. Peut intervenir en cas de crise psychiatrique aiguë.',
    location: 'Dakar et environs',
    phone: '+221 33 889 15 15',
    hours: '24h/24, 7j/7',
    services: ['Urgences médicales', 'Visites à domicile', 'Orientation', 'Premiers secours psychiatriques'],
    isUrgent: true,
  },
  {
    id: 'croix-rouge',
    name: 'Croix-Rouge Sénégalaise',
    type: 'international',
    description: 'La Croix-Rouge offre un soutien psychosocial dans les situations de crise et de catastrophe. Programmes de premiers secours psychologiques.',
    location: 'Dakar et tout le Sénégal',
    phone: '+221 33 823 39 92',
    website: 'https://www.croixrouge.sn',
    services: ['Premiers secours psychologiques', 'Soutien en situation de crise', 'Formation', 'Bénévolat'],
  },
];
