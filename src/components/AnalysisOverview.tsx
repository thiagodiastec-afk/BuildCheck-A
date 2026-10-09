import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  Copy, 
  Check, 
  Share2 
} from 'lucide-react';
import type { AnalysisResult, PCComponents } from '../types';
import { generateFormattedAuditSummary } from '../utils/reportFormatter';

interface AnalysisOverviewProps {
  result: AnalysisResult;
  components?: PCComponents;
  buildTitle?: string;
  onOpenShareModal?: () => void;
}

export function AnalysisOverview({ result, components, buildTitle, onOpenShareModal }: AnalysisOverviewProps) {
  const [quickCopied, setQuickCopied] = useState<boolean>(false);

  const isCompatible = result.status_geral === 'COMPATIVEL';
  const isIncompatible = result.status_geral === 'INCOMPATIVEL';
  const isWarning = result.status_geral === 'ALERTA';

  const handleQuickCopy = async () => {
    if (!components) return;
    try {
      const summary = generateFormattedAuditSummary(result, components, {
        format: 'markdown',
        buildTitle
      });
      await navigator.clipboard.writeText(summary);
      setQuickCopied(true);
      setTimeout(() => setQuickCopied(false), 2500);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div
        className={`p-5 rounded-2xl border relative overflow-hidden transition-all shadow-xl ${
          isCompatible
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
            : isIncompatible
            ? 'bg-rose-950/40 border-rose-500/40 text-rose-100'
            : 'bg-amber-950/40 border-amber-500/40 text-amber-100'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                isCompatible
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : isIncompatible
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              {isCompatible ? (
                <CheckCircle2 className="w-7 h-7" />
              ) : isIncompatible ? (
                <XCircle className="w-7 h-7" />
              ) : (
                <AlertTriangle className="w-7 h-7" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                    isCompatible
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isIncompatible
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  Status da Auditoria: {result.status_geral}
                </span>

                <span className="text-xs text-slate-400">
                  {isCompatible
                    ? '100% das peças sincronizadas tecnicamente'
                    : isIncompatible
                    ? 'Bloqueio de compatibilidade detectado'
                    : 'Avisos de dimensionamento / montagem'}
                </span>
              </div>

              <h3 className="text-lg font-bold mt-1 text-slate-100">
                {isCompatible
                  ? 'Arquitetura e Componentes Totalmente Compatíveis'
                  : isIncompatible
                  ? 'Incompatibilidade Crítica Identificada no Setup'
                  : 'Componentes Compatíveis com Ressalvas Técnicas'}
              </h3>

              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                {result.resumo_executivo}
              </p>
            </div>
          </div>

          {/* Right side: Score Badge + Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-3 lg:pt-0 lg:pl-6">
            <div className="text-left lg:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Índice de Confiabilidade
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-3xl font-black font-mono ${
                    isCompatible
                      ? 'text-emerald-400'
                      : isIncompatible
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }`}
                >
                  {result.score_compatibilidade ?? (isCompatible ? 100 : isIncompatible ? 20 : 75)}
                </span>
                <span className="text-xs text-slate-400 font-bold">/ 100</span>
              </div>
            </div>

            {/* Quick Share / Copy Textual Summary Buttons */}
            {components && (
              <div className="flex items-center gap-2 w-full sm:w-auto mt-1">
                <button
                  type="button"
                  onClick={handleQuickCopy}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                    quickCopied
                      ? 'bg-emerald-500 text-slate-950 font-extrabold'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500'
                  }`}
                  title="Copiar relatório formatado em Markdown para colar em fóruns ou Discord"
                >
                  {quickCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-950" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copiar Resumo</span>
                    </>
                  )}
                </button>

                {onOpenShareModal && (
                  <button
                    type="button"
                    onClick={onOpenShareModal}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-[0.99]"
                    title="Abrir opções de exportação e visualização completa do relatório"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartilhar / Fóruns</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Incompatibilidades Críticas */}
      {result.incompatibilidades_criticas && result.incompatibilidades_criticas.length > 0 && (
        <div className="bg-rose-950/20 border border-rose-500/40 rounded-xl p-4">
          <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2 mb-2.5">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Incompatibilidades Físicas / Elétricas / Soquete ({result.incompatibilidades_criticas.length})</span>
          </h4>
          <ul className="space-y-2">
            {result.incompatibilidades_criticas.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-rose-200 bg-rose-950/40 border border-rose-900/60 p-2.5 rounded-lg"
              >
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-mono">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alertas e Recomendações */}
      {result.alertas_e_recomendacoes_tecnicas && result.alertas_e_recomendacoes_tecnicas.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-4">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 mb-2.5">
            <Info className="w-4 h-4 text-amber-400" />
            <span>Alertas Técnicos & Recomendações ({result.alertas_e_recomendacoes_tecnicas.length})</span>
          </h4>
          <ul className="space-y-2">
            {result.alertas_e_recomendacoes_tecnicas.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-amber-200 bg-amber-950/40 border border-amber-900/60 p-2.5 rounded-lg"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
