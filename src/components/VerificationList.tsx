import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Cpu, Layers, Box, Zap, Fan, Server } from 'lucide-react';
import type { CheckItem } from '../types';

interface VerificationListProps {
  verificacoes: CheckItem[];
}

export function VerificationList({ verificacoes }: VerificationListProps) {
  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case 'SOQUETE_GERACAO':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'MEMORIA_RAM':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'DIMENSOES_FISICAS':
        return <Box className="w-4 h-4 text-indigo-400" />;
      case 'DEMANDA_ELETRICA':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'COOLER_BRACKET':
        return <Fan className="w-4 h-4 text-teal-400" />;
      default:
        return <Server className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: 'OK' | 'ERRO' | 'AVISO') => {
    if (status === 'OK') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>COMPATÍVEL</span>
        </span>
      );
    }
    if (status === 'ERRO') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
          <XCircle className="w-3 h-3 text-rose-400" />
          <span>INCOMPATÍVEL</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
        <AlertTriangle className="w-3 h-3 text-amber-400" />
        <span>ATENÇÃO</span>
      </span>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Auditoria Detalhada por Módulo de Hardware</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Checagem minuciosa de cada interface física, barramento lógico e tolerância térmica/elétrica
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-800/80 mt-2">
        {verificacoes.map((item, index) => (
          <div key={index} className="py-3.5 flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                {getCategoryIcon(item.categoria)}
                <span className="text-xs font-bold text-slate-200">
                  {item.titulo}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                {item.detalhes}
              </p>
              {item.explicacao_tecnica && (
                <p className="text-[11px] text-slate-500 font-mono pl-6 pt-0.5">
                  <span className="text-slate-400">Parâmetros analisados:</span> {item.explicacao_tecnica}
                </p>
              )}
            </div>

            <div className="shrink-0 pl-6 md:pl-0">
              {getStatusBadge(item.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
