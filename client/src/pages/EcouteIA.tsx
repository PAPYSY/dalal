import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { AIChatBox } from '@/components/AIChatBox';
import type { Message } from '@/components/AIChatBox';
import { Link } from 'wouter';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Je me sens perdu(e) en ce moment...",
  "J'ai du mal à dormir, les pensées ne s'arrêtent pas",
  "J'ai besoin de parler à quelqu'un sans être jugé(e)",
  "Je traverses une période très difficile",
];

export default function EcouteIA() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    },
    onError: (error) => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: error.message || 'Quelque chose s\'est passé. Réessaie dans un instant.' },
      ]);
    },
  });

  const handleSend = (content: string) => {
    const updated: Message[] = [...messages, { role: 'user', content }];
    setMessages(updated);
    chatMutation.mutate({
      messages: updated.filter(m => m.role !== 'system') as { role: 'user' | 'assistant'; content: string }[],
    });
  };

  return (
    <div className="bg-bg-main min-h-screen flex flex-col">
      <div className="container py-6 flex-1 flex flex-col max-w-2xl mx-auto">
        <Link href="/">
          <span className="mb-4 inline-flex items-center gap-2 text-text-muted hover:text-green-deep transition cursor-pointer text-sm">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </span>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
            Compagnon d'écoute
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Une présence douce, anonyme, disponible. Dis ce que tu as sur le cœur — sans te presser.
          </p>
        </div>

        <div className="flex-1 min-h-0" style={{ minHeight: '480px' }}>
          <AIChatBox
            messages={messages}
            onSendMessage={handleSend}
            isLoading={chatMutation.isPending}
            placeholder="Dis ce que tu ressens..."
            emptyStateMessage="Je suis là. Prends ton temps."
            suggestedPrompts={SUGGESTED_PROMPTS}
            height="100%"
            className="h-full border-green-light/30 bg-bg-card"
          />
        </div>

        <div className="mt-4 p-3 rounded-xl bg-lavender/10 border border-lavender/20 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-lavender flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-muted">
            Ce compagnon n'est pas un thérapeute. En cas de danger immédiat,{' '}
            <Link href="/urgence">
              <span className="underline cursor-pointer text-lavender">accède à l'espace Urgence</span>
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
