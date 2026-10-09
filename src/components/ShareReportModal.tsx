import { useState } from 'react';
import { 
  Copy, 
  Check, 
  FileText, 
  Share2, 
  Download, 
  X, 
  MessageSquare, 
  Terminal, 
  Globe,
  Sparkles
} from 'lucide-react';
import type { AnalysisResult, PCComponents } from '../types';
import { generateFormattedAuditSummary, type FormatOptions } from '../utils/reportFormatter';

interface ShareReportModalProps {
  result: AnalysisResult;
  components: PCComponents;
  buildTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareReportModal({
  result,
  components,
  buildTitle,
  isOpen,
  onClose
}: ShareReportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'markdown' | 'discord' | 'plain'>('markdown');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const formattedText = generateFormattedAuditSummary(result, components, {
    format: selectedFormat,
    buildTitle
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const handleDownload = () => {
    const extension = selectedFormat === 'markdown' ? 'md' : 'txt';
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-auditoria-pc-${new Date().toISOString().slice(0, 10)}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>Resumo Textual Formatado do Relatório</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300 font-mono">
                  Pronto para Compartilhar
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Copie e cole este relatório técnico em fóruns (Clube do Hardware, Adrenaline, Reddit), Discord, WhatsApp ou suporte.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Estilo de Formatação:
            </span>

            <button
              type="button"
              onClick={() => setSelectedFormat('markdown')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                selectedFormat === 'markdown'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Fóruns & Markdown (Reddit / Adrenaline)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat('discord')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                selectedFormat === 'discord'
                  ? 'bg-indigo-500 text-white font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discord & WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat('plain')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                selectedFormat === 'plain'
                  ? 'bg-slate-200 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Texto Puro (.txt)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs"
              title="Baixar arquivo de texto"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Baixar Arquivo</span>
            </button>
          </div>
        </div>

        {/* Textarea Monospace Preview */}
        <div className="p-5 flex-1 overflow-y-auto bg-slate-950 space-y-2">
          <div className="relative">
            <pre className="w-full h-80 sm:h-96 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre select-all focus:outline-none focus:border-cyan-500">
              {formattedText}
            </pre>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Formato estruturado com especificações técnicas, compatibilidade e gargalos.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex-1 sm:flex-initial"
            >
              Fechar
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all flex-1 sm:flex-initial shadow-lg ${
                copied
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 active:scale-[0.99]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado para Área de Transferência!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Resumo Formatado</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
