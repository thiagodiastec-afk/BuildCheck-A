import { Cpu, ShieldCheck, Gamepad2, Settings, ClipboardCheck } from 'lucide-react';

interface HeaderProps {
  hasResult: boolean;
  activeView: 'game-matcher' | 'hardware-audit' | 'checklist';
  onViewChange: (view: 'game-matcher' | 'hardware-audit' | 'checklist') => void;
}

export function Header({ hasResult, activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-tight font-sans flex items-center gap-1.5">
                <span>BuildCheck</span>
                <span className="text-cyan-400 font-extrabold">AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
                v3.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Dimensionamento por Jogo, Auditoria & Checklist Pré-Montagem
            </p>
          </div>
        </div>

        {/* View switcher nav buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => onViewChange('game-matcher')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeView === 'game-matcher'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Montar por Jogo</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('hardware-audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeView === 'hardware-audit'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Auditoria de Hardware</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('checklist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeView === 'checklist'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Checklist Pré-Montagem</span>
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Técnico</span>
          </div>
        </div>
      </div>
    </header>
  );
}
