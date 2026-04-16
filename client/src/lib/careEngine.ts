/**
 * Care Engine — Système de détection bienveillante
 * 
 * Détecte les signaux de détresse dans le texte et propose une aide adaptée.
 * Règles éthiques:
 * - Jamais de diagnostic
 * - Toujours bienveillant
 * - Propose, ne force jamais
 * - Respecte l'anonymat
 */

export interface DetectionResult {
  level: 'none' | 'low' | 'medium' | 'high' | 'critical';
  score: number; // 0-100
  triggers: string[];
  suggestedCas?: string;
  message: string;
  action: 'none' | 'gentle' | 'suggest' | 'urgent';
}

// Mots-clés pondérés par niveau de gravité
const KEYWORDS: { word: string; weight: number; category: string }[] = [
  // Critique (poids 10)
  { word: 'suicide', weight: 10, category: 'urgence' },
  { word: 'me tuer', weight: 10, category: 'urgence' },
  { word: 'en finir', weight: 10, category: 'urgence' },
  { word: 'mourir', weight: 8, category: 'urgence' },
  { word: 'plus envie de vivre', weight: 10, category: 'urgence' },
  { word: 'me suicider', weight: 10, category: 'urgence' },
  { word: 'sauter', weight: 6, category: 'urgence' },
  { word: 'plus la peine', weight: 8, category: 'urgence' },
  { word: 'disparaître', weight: 6, category: 'urgence' },
  
  // Dépression (poids 3-5)
  { word: 'déprimé', weight: 5, category: 'depression' },
  { word: 'dépression', weight: 5, category: 'depression' },
  { word: 'vide', weight: 3, category: 'depression' },
  { word: 'sans espoir', weight: 5, category: 'depression' },
  { word: 'inutile', weight: 4, category: 'depression' },
  { word: 'rien ne va', weight: 4, category: 'depression' },
  { word: 'plus envie', weight: 4, category: 'depression' },
  { word: 'fatigué de tout', weight: 4, category: 'depression' },
  { word: 'plus de force', weight: 4, category: 'depression' },
  
  // Trauma (poids 4-6)
  { word: 'violé', weight: 6, category: 'trauma' },
  { word: 'violence', weight: 5, category: 'trauma' },
  { word: 'agressé', weight: 6, category: 'trauma' },
  { word: 'frappé', weight: 5, category: 'trauma' },
  { word: 'cauchemar', weight: 3, category: 'trauma' },
  { word: 'flashback', weight: 4, category: 'trauma' },
  { word: 'abusé', weight: 6, category: 'trauma' },
  { word: 'maltraité', weight: 5, category: 'trauma' },
  
  // Addiction (poids 3-4)
  { word: 'alcool', weight: 3, category: 'addiction' },
  { word: 'drogue', weight: 4, category: 'addiction' },
  { word: 'cannabis', weight: 3, category: 'addiction' },
  { word: 'dépendant', weight: 4, category: 'addiction' },
  { word: 'addiction', weight: 4, category: 'addiction' },
  { word: 'rechute', weight: 4, category: 'addiction' },
  
  // Anxiété (poids 2-4)
  { word: 'anxieux', weight: 3, category: 'anxiete-sociale' },
  { word: 'anxiété', weight: 3, category: 'anxiete-sociale' },
  { word: 'panique', weight: 4, category: 'anxiete-sociale' },
  { word: 'peur', weight: 2, category: 'anxiete-sociale' },
  { word: 'angoisse', weight: 4, category: 'anxiete-sociale' },
  { word: 'stressé', weight: 2, category: 'anxiete-sociale' },
  
  // Deuil (poids 3-5)
  { word: 'mort', weight: 3, category: 'deuil' },
  { word: 'perdu quelqu', weight: 4, category: 'deuil' },
  { word: 'décédé', weight: 4, category: 'deuil' },
  { word: 'deuil', weight: 5, category: 'deuil' },
  { word: 'manque', weight: 2, category: 'deuil' },
  
  // Peine d'amour (poids 2-3)
  { word: 'cœur brisé', weight: 3, category: 'goumi' },
  { word: 'rupture', weight: 3, category: 'goumi' },
  { word: 'quitté', weight: 3, category: 'goumi' },
  { word: 'trompé', weight: 3, category: 'goumi' },
  { word: 'goumi', weight: 3, category: 'goumi' },
  
  // Pression familiale (poids 2-3)
  { word: 'famille', weight: 2, category: 'pression-familiale' },
  { word: 'parents', weight: 2, category: 'pression-familiale' },
  { word: 'pression', weight: 3, category: 'pression-familiale' },
  { word: 'obligation', weight: 3, category: 'pression-familiale' },
  { word: 'mariage forcé', weight: 5, category: 'pression-familiale' },
  
  // Troubles alimentaires (poids 3-4)
  { word: 'vomir', weight: 4, category: 'troubles-alimentaires' },
  { word: 'manger', weight: 2, category: 'troubles-alimentaires' },
  { word: 'gros', weight: 3, category: 'troubles-alimentaires' },
  { word: 'maigrir', weight: 3, category: 'troubles-alimentaires' },
  { word: 'anorexie', weight: 4, category: 'troubles-alimentaires' },
  { word: 'boulimie', weight: 4, category: 'troubles-alimentaires' },
  
  // Wolof keywords
  { word: 'dof', weight: 3, category: 'depression' },
  { word: 'bëgg naa dee', weight: 10, category: 'urgence' },
  { word: 'sama xol', weight: 2, category: 'goumi' },
];

const MESSAGES = {
  none: '',
  low: 'Dalal est là pour toi. N\'hésite pas à explorer nos exercices.',
  medium: 'Ce que tu ressens est important. Dalal a des outils qui peuvent t\'aider.',
  high: 'Tu traverses quelque chose de difficile. Tu n\'es pas seul(e). Dalal peut t\'orienter.',
  critical: 'Tu sembles en grande souffrance. S\'il te plaît, contacte un professionnel ou appelle le +221 33 825 50 22.',
};

/**
 * Analyse un texte et retourne un résultat de détection
 */
export function analyzeText(text: string): DetectionResult {
  const lowerText = text.toLowerCase();
  let totalScore = 0;
  const triggers: string[] = [];
  const categoryScores: Record<string, number> = {};

  for (const kw of KEYWORDS) {
    if (lowerText.includes(kw.word.toLowerCase())) {
      totalScore += kw.weight;
      triggers.push(kw.word);
      categoryScores[kw.category] = (categoryScores[kw.category] || 0) + kw.weight;
    }
  }

  // Normalize score to 0-100
  const score = Math.min(100, totalScore * 5);

  // Determine level
  let level: DetectionResult['level'] = 'none';
  let action: DetectionResult['action'] = 'none';

  if (score >= 80 || categoryScores['urgence'] >= 8) {
    level = 'critical';
    action = 'urgent';
  } else if (score >= 50) {
    level = 'high';
    action = 'suggest';
  } else if (score >= 25) {
    level = 'medium';
    action = 'suggest';
  } else if (score > 0) {
    level = 'low';
    action = 'gentle';
  }

  // Find most relevant cas de vie
  let suggestedCas: string | undefined;
  let maxCatScore = 0;
  for (const [cat, catScore] of Object.entries(categoryScores)) {
    if (catScore > maxCatScore && cat !== 'urgence') {
      maxCatScore = catScore;
      suggestedCas = cat;
    }
  }

  return {
    level,
    score,
    triggers,
    suggestedCas,
    message: MESSAGES[level],
    action,
  };
}

/**
 * PHQ-2 Questionnaire (Patient Health Questionnaire - 2 items)
 * Score >= 3 suggests possible depression
 */
export interface PHQ2Result {
  score: number;
  isPositive: boolean;
  message: string;
}

export const PHQ2_QUESTIONS = [
  'Au cours des 2 dernières semaines, combien de fois as-tu été gêné(e) par un sentiment de tristesse, de déprime ou de désespoir?',
  'Au cours des 2 dernières semaines, combien de fois as-tu eu peu d\'intérêt ou de plaisir à faire les choses?',
];

export const PHQ2_OPTIONS = [
  { value: 0, label: 'Jamais' },
  { value: 1, label: 'Plusieurs jours' },
  { value: 2, label: 'Plus de la moitié des jours' },
  { value: 3, label: 'Presque tous les jours' },
];

export function evaluatePHQ2(answers: number[]): PHQ2Result {
  const score = answers.reduce((sum, a) => sum + a, 0);
  const isPositive = score >= 3;
  const message = isPositive
    ? 'Ton score suggère que tu pourrais traverser une période difficile. Ce n\'est pas un diagnostic, mais il serait bon de consulter un professionnel. Tu n\'es pas seul(e).'
    : 'Ton score est dans la normale. Si tu te sens quand même mal, n\'hésite pas à utiliser les exercices de Dalal ou à consulter un professionnel.';
  return { score, isPositive, message };
}
