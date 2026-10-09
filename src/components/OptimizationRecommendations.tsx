import { useState } from 'react';
import { 
  Cpu, 
  Wind, 
  Layers, 
  HardDrive, 
  Zap, 
  Gauge, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import type { OptimizationRecommendation } from '../types';

interface OptimizationRecommendationsProps {
  recomendacoes?: OptimizationRecommendation[];
}

export function OptimizationRecommendations({ recomendacoes = [] }: OptimizationRecommendationsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'TODOS' | 'ALTO' | 'MEDIO' | 'REFINAMENTO'>('TODOS');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');

  if (!recomendacoes || recomendacoes.length === 0) {
    return null;
  }

  const filteredItems = recomendacoes.filter(item => {
    const matchesImpact = selectedFilter === 'TODOS' || item.nivelImpacto === selectedFilter;
    const matchesCategory = selectedCategory === 'TODAS' || item.tipo === selectedCategory;
    return matchesImpact && matchesCategory;
  });

  const highImpactCount = recomendacoes.filter(r => r.nivelImpacto === 'ALTO').length;
  const mediumImpactCount = recomendacoes.filter(r => r.nivelImpacto === 'MEDIO').length;
  const refinementCount = recomendacoes.filter(r => r.nivelImpacto === 'REFINAMENTO').length;

  const getCategoryIcon = (tipo: string) => {
    switch (tipo) {
      case 'GARGALO_CPU_GPU':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'FLUXO_DE_AR_TERMICO':
        return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'MEMORIA_RAM':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'ARMAZENAMENTO_PCIE':
        return <HardDrive className="w-4 h-4 text-amber-400" />;
      case 'ALIMENTACAO_EFICIENCIA':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      default:
        return <Gauge className="w-4 h-4 text-slate-400" />;
    }
  };

  const getCategoryLabel = (tipo: string) => {
    switch (tipo) {
      case 'GARGALO_CPU_GPU':
        return 'Gargalo CPU / GPU';
      case 'FLUXO_DE_AR_TERMICO':
        return 'Fluxo de Ar & Térmica';
      case 'MEMORIA_RAM':
        return 'Largura de Banda RAM';
      case 'ARMAZENAMENTO_PCIE':
        return 'Armazenamento & PCIe';
      case 'ALIMENTACAO_EFICIENCIA':
        return 'Alimentação & Eficiência';
      default:
        return 'Otimização Geral';
    }
  };

  const getImpactBadge = (nivel: 'ALTO' | 'MEDIO' | 'REFINAMENTO') => {
    switch (nivel) {
      case 'ALTO':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-rose-950/80 text-rose-300 border border-rose-700/60 shadow-sm">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>ALTO IMPACTO</span>
          </span>
        );
      case 'MEDIO':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-700/60 shadow-sm">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            <span>MÉDIO IMPACTO</span>
          </span>
        );
      case 'REFINAMENTO':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>REFINAMENTO</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>Recomendações de Otimização & Performance</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                  {recomendacoes.length} {recomendacoes.length === 1 ? 'ajuste' : 'ajustes'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ajustes de arquitetura, mitigação de gargalos de CPU/GPU, fluxo de ar e sincronização de barramento
              </p>
            </div>
          </div>
        </div>

        {/* Quick metrics */}
        <div className="flex items-center gap-2 flex-wrap">
          {highImpactCount > 0 && (
            <div className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              <span>{highImpactCount} Gargalo(s) Crítico(s)</span>
            </div>
          )}
          {mediumImpactCount > 0 && (
            <div className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
              <span>{mediumImpactCount} Ajuste(s) Moderado(s)</span>
            </div>
          )}
          {refinementCount > 0 && (
            <div className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-semibold flex items-center gap-1.5">
              <span>{refinementCount} Otimização de BIOS/Barramento</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 mr-1">Filtrar por Impacto:</span>
          {(['TODOS', 'ALTO', 'MEDIO', 'REFINAMENTO'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedFilter === filter
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              {filter === 'TODOS' ? 'Todos os Ajustes' : filter === 'ALTO' ? 'Alto Impacto' : filter === 'MEDIO' ? 'Médio Impacto' : 'Refinamentos'}
            </button>
          ))}
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-1.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="TODAS">Todas as Áreas Técnicas</option>
            <option value="GARGALO_CPU_GPU">Gargalo CPU / GPU</option>
            <option value="FLUXO_DE_AR_TERMICO">Fluxo de Ar & Térmico</option>
            <option value="MEMORIA_RAM">Memória RAM</option>
            <option value="ARMAZENAMENTO_PCIE">Armazenamento & PCIe</option>
            <option value="ALIMENTACAO_EFICIENCIA">Alimentação & Eficiência</option>
          </select>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 gap-3.5 pt-2">
        {filteredItems.map((rec, index) => {
          const isHigh = rec.nivelImpacto === 'ALTO';
          const isMedium = rec.nivelImpacto === 'MEDIO';

          return (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all ${
                isHigh
                  ? 'bg-slate-950/80 border-rose-500/30 hover:border-rose-500/60'
                  : isMedium
                  ? 'bg-slate-950/80 border-amber-500/30 hover:border-amber-500/60'
                  : 'bg-slate-950/80 border-cyan-500/30 hover:border-cyan-500/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    {getCategoryIcon(rec.tipo)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      {getCategoryLabel(rec.tipo)}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">
                      {rec.titulo}
                    </h4>
                  </div>
                </div>

                <div className="shrink-0">
                  {getImpactBadge(rec.nivelImpacto)}
                </div>
              </div>

              {/* Grid with diagnostic, adjustment and expected gain */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3.5 text-xs">
                {/* 1. Gargalo Identificado */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Gargalo Identificado</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {rec.gargaloIdentificado}
                  </p>
                </div>

                {/* 2. Ajuste Sugerido */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ajuste Técnico Recomendado</span>
                  </span>
                  <p className="text-slate-200 leading-relaxed text-[11px]">
                    {rec.ajusteSugerido}
                  </p>
                </div>

                {/* 3. Ganho Esperado */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-900/40 space-y-1.5 bg-gradient-to-br from-slate-900/90 to-emerald-950/20">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ganho de Desempenho</span>
                  </span>
                  <p className="text-emerald-200/90 leading-relaxed text-[11px] font-medium">
                    {rec.ganhoEsperado}
                  </p>
                </div>
              </div>

              {/* Technical parameter explanation footer */}
              {rec.explicacaoTecnica && (
                <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="text-cyan-400 font-bold">Fundamento Arquitetural:</span>
                  <span className="text-slate-300">{rec.explicacaoTecnica}</span>
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="p-6 text-center rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
            Nenhuma recomendação encontrada para o filtro selecionado.
          </div>
        )}
      </div>

      {/* Pro-tip footer banner */}
      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            As recomendações consideram a relação de clock, IPC de arquitetura, fluxo térmico em CFM e taxas de transferência PCIe.
          </span>
        </div>
      </div>
    </div>
  );
}
