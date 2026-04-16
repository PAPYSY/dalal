/**
 * Bibliothèque de Ressources
 * Articles par catégorie, recherche, lecture complète
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Search, Clock, Tag } from 'lucide-react';
import { ARTICLES, CATEGORIES, type Article } from '@/data/ressources';

export default function Bibliotheque() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const filteredArticles = ARTICLES.filter(a => {
    const matchCategory = !selectedCategory || a.category === selectedCategory;
    const matchSearch = !searchQuery || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  if (readingArticle) {
    return (
      <div className="bg-bg-main">
        <article className="container max-w-2xl mx-auto py-12">
          <button
            onClick={() => setReadingArticle(null)}
            className="mb-6 inline-flex items-center gap-2 text-text-main hover:text-green-deep transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à la bibliothèque</span>
          </button>
          <div className="mb-6">
            <span className="text-sm text-green-deep font-medium">
              {CATEGORIES.find(c => c.id === readingArticle.category)?.label}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-text-main mt-2 mb-4" style={{ fontFamily: "'Lora', serif" }}>
              {readingArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {readingArticle.readTime} min de lecture
              </span>
              <div className="flex items-center gap-1 flex-wrap">
                <Tag className="w-4 h-4" />
                {readingArticle.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-green-light/20 text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {readingArticle.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h3 key={i} className="text-xl font-bold text-text-main mt-8 mb-3" style={{ fontFamily: "'Lora', serif" }}>{paragraph.replace(/\*\*/g, '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(l => l.startsWith('- '));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 text-text-muted mb-4">
                    {items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-main">$1</strong>') }} />
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                const items = paragraph.split('\n').filter(l => l.match(/^\d/));
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-1 text-text-muted mb-4">
                    {items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-main">$1</strong>') }} />
                    ))}
                  </ol>
                );
              }
              if (paragraph.startsWith('"') || paragraph.startsWith('\u2014')) {
                return (
                  <blockquote key={i} className="border-l-4 border-green-deep pl-4 italic text-text-muted my-6" style={{ fontFamily: "'Lora', serif" }}>
                    {paragraph}
                  </blockquote>
                );
              }
              return (
                <p key={i} className="text-text-muted leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-main">$1</strong>') }} />
              );
            })}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="bg-bg-main">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Bibliothèque
          </h1>
          <p className="text-lg text-text-muted">
            Articles, conseils et témoignages pour mieux comprendre ce que tu traverses.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un article, un sujet..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-green-light bg-bg-card text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !selectedCategory ? 'bg-green-deep text-white' : 'bg-bg-card text-text-muted hover:bg-green-light/20'
            }`}
          >
            Tout
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat.id ? 'bg-green-deep text-white' : 'bg-bg-card text-text-muted hover:bg-green-light/20'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredArticles.map(article => (
            <button
              key={article.id}
              onClick={() => setReadingArticle(article)}
              className="dalal-card p-6 text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-xs text-green-deep font-medium">
                {CATEGORIES.find(c => c.id === article.category)?.icon} {CATEGORIES.find(c => c.id === article.category)?.label}
              </span>
              <h3 className="text-lg font-bold text-text-main mt-2 mb-2" style={{ fontFamily: "'Lora', serif" }}>
                {article.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-3">{article.summary}</p>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readTime} min
                </span>
                <div className="flex gap-1">
                  {article.tags.slice(0, 2).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-green-light/20">{t}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">Aucun article trouvé pour cette recherche.</p>
          </div>
        )}

        {/* Link to Annuaire */}
        <div className="max-w-xl mx-auto mt-12 text-center">
          <div className="dalal-card p-6">
            <h3 className="text-xl font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
              Besoin d'aide professionnelle?
            </h3>
            <p className="text-text-muted mb-4">
              Consulte notre annuaire de professionnels et organisations de santé mentale au Sénégal.
            </p>
            <Link href="/annuaire">
              <span className="inline-block px-6 py-2 rounded-full bg-green-deep text-white font-medium hover:bg-green-deep/90 transition cursor-pointer">
                Voir l'annuaire
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
