import { useState, useEffect, useRef } from 'react';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { ArrowLeft, Send, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type RoomId = 'general' | 'tristesse' | 'anxiete' | 'famille' | 'amour' | 'deuil';

const ROOMS: { id: RoomId; label: string; emoji: string; desc: string }[] = [
  { id: 'general',   label: 'Espace libre',       emoji: '🌿', desc: "Parle de ce que tu veux" },
  { id: 'tristesse', label: 'Tristesse & Déprime', emoji: '🌧️', desc: "Tu n'es pas seul(e) dans la nuit" },
  { id: 'anxiete',   label: 'Anxiété & Stress',    emoji: '🌬️', desc: "Respire, on est là" },
  { id: 'famille',   label: 'Famille & Pression',  emoji: '🏠', desc: "Ce que la famille ne comprend pas" },
  { id: 'amour',     label: "Peine d'amour",        emoji: '💔', desc: "Ça passe. Vraiment." },
  { id: 'deuil',     label: 'Deuil & Perte',        emoji: '🕯️', desc: "Pleurer ensemble, sans honte" },
];

const PSEUDONYMS = [
  'Étoile du soir', 'Brise légère', 'Soleil caché', 'Vague douce',
  'Nuage passager', 'Fleur sauvage', 'Oiseau libre', 'Lune calme',
  'Rivière tranquille', 'Arbre sage', 'Papillon errant', 'Écho lointain',
  'Rosée du matin', 'Vent du Sahel', 'Baobab patient', 'Aube nouvelle',
];

function getPseudonym(): string {
  const stored = localStorage.getItem('dallaal_chat_pseudonym');
  if (stored) return stored;
  const name = PSEUDONYMS[Math.floor(Math.random() * PSEUDONYMS.length)];
  const num = Math.floor(Math.random() * 999) + 1;
  const pseudo = `${name} #${num}`;
  localStorage.setItem('dallaal_chat_pseudonym', pseudo);
  return pseudo;
}

export default function Chat() {
  const [room, setRoom] = useState<RoomId | null>(null);
  const [pseudonym] = useState<string>(getPseudonym);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentRoom = ROOMS.find(r => r.id === room);

  const { data: messages = [], refetch } = trpc.peerChat.messages.useQuery(
    { roomId: room! },
    {
      enabled: !!room,
      refetchInterval: 2500,
      refetchIntervalInBackground: false,
    }
  );

  const sendMutation = trpc.peerChat.send.useMutation({
    onSuccess: () => refetch(),
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || sendMutation.isPending) return;
    sendMutation.mutate({ roomId: room!, pseudonym, content: text });
    setInput('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!room) {
    return (
      <div className="bg-bg-main min-h-screen">
        <div className="container py-10 max-w-2xl mx-auto">
          <Link href="/">
            <span className="mb-6 inline-flex items-center gap-2 text-text-muted hover:text-green-deep transition cursor-pointer text-sm">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
              Chat pair-aidant
            </h1>
            <p className="text-text-muted text-sm leading-relaxed">
              Des espaces anonymes où des personnes qui traversent des choses similaires peuvent se retrouver.
              Tu entres sous le nom <span className="font-medium text-green-deep">{pseudonym}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROOMS.map(r => (
              <button
                key={r.id}
                onClick={() => setRoom(r.id)}
                className="dalal-card p-5 text-left hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="font-bold text-text-main mb-1" style={{ fontFamily: "'Lora', serif" }}>
                  {r.label}
                </h3>
                <p className="text-xs text-text-muted">{r.desc}</p>
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-text-muted">
            Tous les messages disparaissent après 24h. Personne ne sait qui tu es.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-main min-h-screen flex flex-col">
      {/* Header de salon */}
      <div className="sticky top-0 z-10 bg-bg-card border-b border-green-light/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{currentRoom?.emoji}</span>
          <div>
            <h2 className="font-bold text-text-main text-sm" style={{ fontFamily: "'Lora', serif" }}>
              {currentRoom?.label}
            </h2>
            <p className="text-xs text-text-muted flex items-center gap-1">
              <Users className="w-3 h-3" />
              Tu apparais comme <span className="text-green-deep font-medium ml-1">{pseudonym}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setRoom(null)}
          className="p-2 rounded-full hover:bg-green-light/20 transition text-text-muted hover:text-text-main"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="text-center py-16 text-text-muted text-sm">
            <p className="text-2xl mb-3">{currentRoom?.emoji}</p>
            <p className="italic">Le salon est calme pour l'instant.</p>
            <p className="text-xs mt-2 opacity-60">Sois le premier à briser le silence.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => {
              const isMe = msg.pseudonym === pseudonym;
              return (
                <div key={msg.id} className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-green-light/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs text-green-deep font-bold">{msg.pseudonym.charAt(0)}</span>
                    </div>
                  )}
                  <div className={`max-w-[78%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                    {!isMe && (
                      <span className="text-xs text-text-muted ml-1">{msg.pseudonym}</span>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-green-deep text-white rounded-tr-sm'
                          : 'bg-bg-card text-text-main rounded-tl-sm border border-green-light/20'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-xs text-text-muted/50 mx-1">
                      {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-bg-card border-t border-green-light/20 px-4 py-3 max-w-2xl mx-auto w-full">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écris quelque chose..."
            rows={1}
            maxLength={500}
            className="flex-1 resize-none rounded-2xl border border-green-light bg-bg-main text-text-main placeholder:text-text-muted/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-deep/40 max-h-28"
            style={{ lineHeight: '1.5' }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || sendMutation.isPending}
            className="bg-green-deep hover:bg-green-deep/90 text-white rounded-full h-10 w-10 p-0 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-text-muted/40 mt-1.5 text-center">
          Bienveillance obligatoire. Les messages disparaissent après 24h.
        </p>
      </div>
    </div>
  );
}
