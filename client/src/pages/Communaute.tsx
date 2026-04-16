/**
 * Communauté Anonyme
 * Partage anonyme, réactions bienveillantes, signalement
 */

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Heart, Users, Flag, Send, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const EMOTIONS = [
  { id: 'triste', label: 'Triste', emoji: '😢' },
  { id: 'anxieux', label: 'Anxieux(se)', emoji: '😰' },
  { id: 'en-colere', label: 'En colère', emoji: '😤' },
  { id: 'perdu', label: 'Perdu(e)', emoji: '😶' },
  { id: 'seul', label: 'Seul(e)', emoji: '🥺' },
  { id: 'fatigue', label: 'Fatigué(e)', emoji: '😩' },
  { id: 'espoir', label: 'Plein(e) d\'espoir', emoji: '🌱' },
  { id: 'reconnaissant', label: 'Reconnaissant(e)', emoji: '🙏' },
];

const PSEUDONYMS = [
  'Étoile du soir', 'Brise légère', 'Soleil caché', 'Vague douce',
  'Nuage passager', 'Fleur sauvage', 'Oiseau libre', 'Lune calme',
  'Rivière tranquille', 'Arbre sage', 'Papillon errant', 'Écho lointain',
];

function getRandomPseudonym() {
  const name = PSEUDONYMS[Math.floor(Math.random() * PSEUDONYMS.length)];
  const num = Math.floor(Math.random() * 999) + 1;
  return `${name} #${num}`;
}

export default function Communaute() {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState('');
  const [pseudonym] = useState(getRandomPseudonym);
  const [reportingId, setReportingId] = useState<number | null>(null);
  const [reportReason, setReportReason] = useState('');

  const { data: posts, isLoading, refetch } = trpc.community.list.useQuery();
  const createMutation = trpc.community.create.useMutation({
    onSuccess: () => {
      setContent('');
      setEmotion('');
      setShowForm(false);
      refetch();
      toast.success('Ton message a été partagé anonymement.');
    },
    onError: () => toast.error('Erreur lors du partage. Réessaie.'),
  });
  const supportMutation = trpc.community.support.useMutation({
    onSuccess: () => refetch(),
  });
  const relateMutation = trpc.community.relate.useMutation({
    onSuccess: () => refetch(),
  });
  const reportMutation = trpc.community.report.useMutation({
    onSuccess: () => {
      setReportingId(null);
      setReportReason('');
      toast.success('Signalement envoyé. Merci de veiller sur la communauté.');
      refetch();
    },
  });

  const handleSubmit = () => {
    if (!content.trim()) return;
    createMutation.mutate({
      pseudonym,
      content: content.trim(),
      emotion: emotion || undefined,
    });
  };

  return (
    <div className="bg-bg-main">
      {/* Disclaimer */}
      <div className="bg-blue-mist/20 border-b border-blue-mist/30 px-4 py-3">
        <div className="container flex items-center gap-3 text-sm text-text-main">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>Cet espace est anonyme et bienveillant. Aucun compte requis. Les messages expirent après 7 jours.</span>
        </div>
      </div>

      <div className="container py-12 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Communauté
          </h1>
          <p className="text-lg text-text-muted">
            Tu n'es pas seul(e). Partage, écoute, soutiens.
          </p>
        </div>

        {/* New Post Button */}
        {!showForm && (
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-green-deep text-white hover:bg-green-deep/90 rounded-full px-6 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Partager anonymement
            </Button>
          </div>
        )}

        {/* New Post Form */}
        {showForm && (
          <div className="dalal-card p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-light/30 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-deep" />
              </div>
              <span className="text-sm text-text-muted">{pseudonym}</span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ce que tu ressens, ce que tu traverses... Cet espace est à toi."
              className="w-full p-4 rounded-xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep resize-none"
              rows={4}
              maxLength={2000}
            />
            <div className="text-right text-xs text-text-muted mt-1">{content.length}/2000</div>

            {/* Emotion Selector */}
            <div className="mt-4">
              <p className="text-sm text-text-muted mb-2">Comment te sens-tu? (optionnel)</p>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS.map(em => (
                  <button
                    key={em.id}
                    onClick={() => setEmotion(emotion === em.id ? '' : em.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${
                      emotion === em.id
                        ? 'bg-green-deep text-white'
                        : 'bg-bg-main text-text-muted hover:bg-green-light/20'
                    }`}
                  >
                    {em.emoji} {em.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-full">
                Annuler
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || createMutation.isPending}
                className="bg-green-deep text-white hover:bg-green-deep/90 rounded-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {createMutation.isPending ? 'Envoi...' : 'Partager'}
              </Button>
            </div>
          </div>
        )}

        {/* Posts */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-pulse text-text-muted">Chargement de la communauté...</div>
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
            <p className="text-text-muted text-lg">La communauté attend ta voix.</p>
            <p className="text-text-muted text-sm mt-1">Sois le/la premier(e) à partager.</p>
          </div>
        )}

        <div className="space-y-4">
          {posts?.map(post => (
            <div key={post.id} className="dalal-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-light/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-deep" />
                </div>
                <span className="text-sm font-medium text-text-main">{post.pseudonym}</span>
                {post.emotion && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-mist/20 text-xs text-text-muted">
                    {EMOTIONS.find(e => e.id === post.emotion)?.emoji} {EMOTIONS.find(e => e.id === post.emotion)?.label}
                  </span>
                )}
                <span className="text-xs text-text-muted ml-auto">
                  {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </span>
              </div>

              <p className="text-text-main leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => supportMutation.mutate({ postId: post.id })}
                  className="flex items-center gap-1.5 text-sm text-text-muted hover:text-green-deep transition"
                >
                  <Heart className="w-4 h-4" />
                  <span>Je te soutiens {post.supportCount > 0 && `(${post.supportCount})`}</span>
                </button>
                <button
                  onClick={() => relateMutation.mutate({ postId: post.id })}
                  className="flex items-center gap-1.5 text-sm text-text-muted hover:text-blue-slate transition"
                >
                  <Users className="w-4 h-4" />
                  <span>Je me reconnais {post.relateCount > 0 && `(${post.relateCount})`}</span>
                </button>
                <button
                  onClick={() => setReportingId(reportingId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-sm text-text-muted hover:text-red-400 transition ml-auto"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>

              {/* Report Form */}
              {reportingId === post.id && (
                <div className="mt-3 p-3 rounded-lg bg-bg-main border border-green-light/20">
                  <p className="text-sm text-text-muted mb-2">Pourquoi signaler ce message?</p>
                  <input
                    type="text"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Raison du signalement..."
                    className="w-full p-2 rounded-lg border border-green-light bg-bg-card text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-green-deep"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setReportingId(null)} className="text-xs text-text-muted hover:text-text-main">
                      Annuler
                    </button>
                    <button
                      onClick={() => {
                        if (reportReason.trim()) {
                          reportMutation.mutate({ postId: post.id, reason: reportReason.trim() });
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-500 font-medium"
                    >
                      Signaler
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
