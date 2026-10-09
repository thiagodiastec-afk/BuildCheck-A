import { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  Circle, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  RotateCcw, 
  CheckSquare, 
  Layers, 
  Cpu, 
  Flame, 
  Box, 
  Zap, 
  Power,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { 
  ASSEMBLY_CHECKLIST_DATA, 
  ASSEMBLY_PHASES, 
  type ChecklistStep 
} from '../data/assemblyChecklist';
import type { PCComponents, AnalysisResult } from '../types';

interface AssemblyChecklistViewProps {
  currentComponents?: PCComponents;
  currentResult?: AnalysisResult | null;
  onGoToAudit?: () => void;
}

const PHASE_ICONS: Record<string, any> = {
  PREPARACAO: Layers,
  PLACA_MAE_CPU: Cpu,
  COOLER_PASTA: Flame,
  GABINETE: Box,
  CABEAMENTO_ENERGIA: Zap,
  PRIMEIRO_BOOT: Power,
};

export function AssemblyChecklistView({
  currentComponents,
  currentResult,
  onGoToAudit,
}: AssemblyChecklistViewProps) {
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});
  const [selectedPhase, setSelectedPhase] = useState<string>('ALL');
  const [onlyCritical, setOnlyCritical] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleStep = (id: string) => {
    setCompletedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMarkAll = () => {
    const allCompleted: Record<string, boolean> = {};
    ASSEMBLY_CHECKLIST_DATA.forEach(step => {
      allCompleted[step.id] = true;
    });
    setCompletedIds(allCompleted);
  };

  const handleReset = () => {
    setCompletedIds({});
  };

  const filteredSteps = ASSEMBLY_CHECKLIST_DATA.filter(step => {
    if (selectedPhase !== 'ALL' && step.fase !== selectedPhase) return false;
    if (onlyCritical && step.impacto !== 'CRITICO') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = step.titulo.toLowerCase().includes(q);
      const matchDesc = step.descricao.toLowerCase().includes(q);
      const matchTags = step.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  const totalSteps = ASSEMBLY_CHECKLIST_DATA.length;
  const completedCount = Object.values(completedIds).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  const criticalSteps = ASSEMBLY_CHECKLIST_DATA.filter(s => s.impacto === 'CRITICO');
  const criticalCompletedCount = criticalSteps.filter(s => completedIds[s.id]).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                Guia de Segurança em Hardware
              </span>
              <span className="text-xs text-slate-400">
                • Passo a Passo Lógico de Montagem
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
              <ClipboardCheck className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Checklist Pré-Montagem & Prevenção de Falhas</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Evite os erros mais comuns que causam queima de placas, superaquecimento imediato a 100°C e ausência de sinal de vídeo. Siga a ordem lógica recomendada antes de energizar o setup.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl shrink-0 w-full lg:w-72 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">Progresso da Montagem</span>
              <span className="font-mono font-black text-cyan-400">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
              <span>{completedCount} de {totalSteps} passos validados</span>
              <span className={criticalCompletedCount === criticalSteps.length ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}>
                {criticalCompletedCount}/{criticalSteps.length} críticos
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Context Notice if components are loaded */}
        {currentComponents?.cpu && (
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-cyan-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Setup Carregado: <strong>{currentComponents.cpu.split('(')[0].trim()}</strong> + <strong>{currentComponents.gpu.split('(')[0].trim()}</strong>.
              </span>
            </div>
            {onGoToAudit && (
              <button
                type="button"
                onClick={onGoToAudit}
                className="inline-flex items-center gap-1 font-bold text-cyan-400 hover:text-white underline"
              >
                <span>Auditar Compatibilidade</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filter and Phase Navigation Bar */}
      <div className="space-y-3">
        {/* Phase Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedPhase('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedPhase === 'ALL'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-850'
            }`}
          >
            <span>Todos os Passos ({ASSEMBLY_CHECKLIST_DATA.length})</span>
          </button>

          {ASSEMBLY_PHASES.map((phase) => {
            const Icon = PHASE_ICONS[phase.id] || Layers;
            const phaseSteps = ASSEMBLY_CHECKLIST_DATA.filter(s => s.fase === phase.id);
            const phaseCompleted = phaseSteps.filter(s => completedIds[s.id]).length;
            const isAllPhaseDone = phaseCompleted === phaseSteps.length && phaseSteps.length > 0;

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedPhase === phase.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-850'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{phase.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                  selectedPhase === phase.id 
                    ? 'bg-slate-950 text-cyan-300' 
                    : isAllPhaseDone
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {phaseCompleted}/{phaseSteps.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls Toolbar: Search, Critical Filter, Quick Actions */}
        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px] max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por peça (ex: pasta térmica, cabo 8 pinos, RAM)..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            {/* Only Critical Toggle */}
            <button
              type="button"
              onClick={() => setOnlyCritical(prev => !prev)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                onlyCritical
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span>Apenas Críticos ({criticalSteps.length})</span>
            </button>
          </div>

          {/* Quick Mark / Reset buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAll}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Marcar Todos</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-300 transition-colors flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Cards Grid */}
      <div className="space-y-3.5">
        {filteredSteps.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <Info className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-bold text-slate-300">Nenhum passo encontrado com os filtros selecionados.</p>
            <button
              onClick={() => {
                setSelectedPhase('ALL');
                setOnlyCritical(false);
                setSearchQuery('');
              }}
              className="text-xs text-cyan-400 underline font-semibold hover:text-cyan-300"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          filteredSteps.map((step) => {
            const isDone = !!completedIds[step.id];
            const isCritical = step.impacto === 'CRITICO';
            const isHigh = step.impacto === 'ALTO';

            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none group relative ${
                  isDone
                    ? 'bg-slate-900/60 border-emerald-500/30 opacity-80'
                    : isCritical
                    ? 'bg-slate-900 border-slate-800 hover:border-rose-500/50 shadow-sm'
                    : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Custom Checkbox */}
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                          : 'bg-slate-950 border border-slate-700 group-hover:border-cyan-400 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono ${
                            isCritical
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : isHigh
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}
                        >
                          {isCritical ? '🚨 Risco Crítico' : isHigh ? '⚠️ Atenção Alta' : 'ℹ️ Importante'}
                        </span>

                        <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-100 group-hover:text-cyan-300'
                        }`}>
                          {step.titulo}
                        </h3>
                      </div>

                      {/* Tag badges */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {step.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDone ? 'text-slate-400' : 'text-slate-300'
                    }`}>
                      {step.descricao}
                    </p>

                    {/* Critical Warning Box if present */}
                    {step.avisoCritico && !isDone && (
                      <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-200 mt-2">
                        <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-rose-300">Atenção Técnica: </strong>
                          <span>{step.avisoCritico}</span>
                        </div>
                      </div>
                    )}

                    {/* Pro Tip Box if present */}
                    {step.dicaPro && (
                      <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-cyan-200 mt-2">
                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-cyan-300">Dica de Bancada: </strong>
                          <span>{step.dicaPro}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Checklist elaborado por arquitetos de hardware e técnicos de montagem de bancada.</span>
        </div>

        <div className="flex items-center gap-2">
          {progressPercent === 100 ? (
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Todos os passos verificados! Pronto para ligar o PC.</span>
            </span>
          ) : (
            <span className="text-slate-400">
              Restam <strong>{totalSteps - completedCount}</strong> passos para concluir a verificação.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
