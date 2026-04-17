/**
 * Annuaire Professionnel
 * Organisations réelles, filtres par type, bannière urgence
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { Phone, Globe, MapPin, Clock, AlertCircle, Search, ExternalLink } from 'lucide-react';
import { ORGANISATIONS, ORG_TYPES, type Organisation } from '@/data/ressources';

export default function Annuaire() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ORGANISATIONS.filter(org => {
    const matchType = !selectedType || org.type === selectedType;
    const matchSearch = !searchQuery ||
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="bg-bg-main">
      {/* Urgence Banner */}
      <div className="bg-lavender/20 border-b border-lavender/30 px-4 py-3">
        <div className="container flex items-center gap-3 text-sm text-text-main">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-lavender" />
          <span>En situation d'urgence? <Link href="/urgence" className="font-semibold underline">Accès immédiat à l'aide</Link></span>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Annuaire Professionnel
          </h1>
          <p className="text-lg text-text-muted">
            Organisations et professionnels de santé mentale au Sénégal. Toutes les informations sont vérifiées.
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
              placeholder="Rechercher une organisation, un service..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-green-light bg-bg-card text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-green-deep"
            />
          </div>
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !selectedType ? 'bg-green-deep text-white' : 'bg-bg-card text-text-muted hover:bg-green-light/20'
            }`}
          >
            Tout ({ORGANISATIONS.length})
          </button>
          {ORG_TYPES.map(type => {
            const count = ORGANISATIONS.filter(o => o.type === type.id).length;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedType === type.id ? 'bg-green-deep text-white' : 'bg-bg-card text-text-muted hover:bg-green-light/20'
                }`}
              >
                {type.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Organisations */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filtered.map(org => (
            <OrgCard key={org.id} org={org} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">Aucune organisation trouvée.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function OrgCard({ org }: { org: Organisation }) {
  return (
    <div className={`dalal-card p-6 ${org.isUrgent ? 'border-2 border-lavender' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {org.isUrgent && (
              <span className="px-2 py-0.5 rounded-full bg-lavender/20 text-xs font-semibold" style={{ color: '#8B6BAE' }}>
                Urgence
              </span>
            )}
            <span className="text-xs text-text-muted">
              {ORG_TYPES.find(t => t.id === org.type)?.label}
            </span>
          </div>
          <h3 className="text-lg font-bold text-text-main mb-2" style={{ fontFamily: "'Lora', serif" }}>
            {org.name}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-3">{org.description}</p>

          {/* Info */}
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{org.location}</span>
            </div>
            {org.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-green-deep" />
                <a href={`tel:${org.phone}`} className="text-green-deep hover:underline font-medium">{org.phone}</a>
              </div>
            )}
            {org.hours && (
              <div className="flex items-center gap-2 text-text-muted">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{org.hours}</span>
              </div>
            )}
            {org.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 flex-shrink-0 text-blue-slate" />
                <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-slate hover:underline flex items-center gap-1">
                  Site web <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Services */}
          <div className="flex flex-wrap gap-1 mt-3">
            {org.services.map(s => (
              <span key={s} className="px-2 py-0.5 rounded-full bg-green-light/20 text-xs text-text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
