import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GameBuilderView } from './components/GameBuilderView';
import { BuildInputForm } from './components/BuildInputForm';
import { AnalysisOverview } from './components/AnalysisOverview';
import { TechnicalMeters } from './components/TechnicalMeters';
import { OptimizationRecommendations } from './components/OptimizationRecommendations';
import { VerificationList } from './components/VerificationList';
import { ShareReportModal } from './components/ShareReportModal';
import { AssemblyChecklistView } from './components/AssemblyChecklistView';
import { 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Zap, 
  Box, 
  FileText, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle,
  Gamepad2,
  Sparkles,
  ArrowRight,
  Settings,
  Share2,
  Copy,
  Check,
  ClipboardCheck
} from 'lucide-react';
import type { PCComponents, AnalysisResult, PresetBuild, GameRequirement } from './types';
import { GAMES_CATALOG } from './data/gamesCatalog';
import { generateFormattedAuditSummary } from './utils/reportFormatter';

const INITIAL_COMPONENTS: PCComponents = {
  cpu: 'AMD Ryzen 7 7800X3D (AM5, 120W TDP)',
  motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, 4x DDR5 slots)',
  ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6000MHz CL30',
  gpu: 'Gigabyte GeForce RTX 4070 Super Gaming OC 12GB (Comprimento: 300mm, TDP: 220W)',
  cooler: 'DeepCool AK620 Air Cooler (Altura: 160mm, Suporte AM5/LGA1700)',
  storage: 'Kingston Fury Renegade 2TB M.2 NVMe PCIe 4.0',
  case: 'Lian Li LANCOOL 216 ATX (Suporta GPU até 392mm, Cooler até 180mm)',
  psu: 'Corsair RM750e 750W 80 Plus Gold Modular ATX 3.0',
  extra: '3x Ventoinhas 120mm PWM adicionais',
  rawText: ''
};

export default function App() {
  const [activeView, setActiveView] = useState<'game-matcher' | 'hardware-audit' | 'checklist'>('game-matcher');
  const [components, setComponents] = useState<PCComponents>(INITIAL_COMPONENTS);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [presets, setPresets] = useState<PresetBuild[]>([]);
  const [games, setGames] = useState<GameRequirement[]>(GAMES_CATALOG);
  const [selectedGame, setSelectedGame] = useState<GameRequirement | null>(GAMES_CATALOG[0]);
  const [searchingCustomGame, setSearchingCustomGame] = useState<boolean>(false);
  const [appliedBuildInfo, setAppliedBuildInfo] = useState<{ name: string } | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [footerCopied, setFooterCopied] = useState<boolean>(false);

  // Load presets and games from server API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [resPresets, resGames] = await Promise.all([
          fetch('/api/presets'),
          fetch('/api/games')
        ]);

        if (resPresets.ok) {
          const data = await resPresets.json();
          if (data.presets) setPresets(data.presets);
        }

        if (resGames.ok) {
          const data = await resGames.json();
          if (data.games && data.games.length > 0) {
            setGames(data.games);
            setSelectedGame(data.games[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load initial data', err);
      }
    }
    loadData();
  }, []);

  const handleSelectPreset = (preset: PresetBuild) => {
    setComponents(preset.componentes);
    setAppliedBuildInfo(null);
    performAnalysis(preset.componentes);
  };

  const handleApplyBuildToAudit = (buildComponents: PCComponents, buildName: string) => {
    setComponents(buildComponents);
    setAppliedBuildInfo({ name: buildName });
    performAnalysis(buildComponents);
    
    // Smooth scroll down to audit results section
    setTimeout(() => {
      const element = document.getElementById('audit-results-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleSearchCustomGame = async (gameName: string, resolution: string) => {
    setSearchingCustomGame(true);
    setError(null);
    try {
      const res = await fetch('/api/game-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameName, targetResolution: resolution }),
      });

      if (!res.ok) {
        throw new Error('Não foi possível obter os requisitos técnicos para este jogo.');
      }

      const data = await res.json();
      if (data.success && data.game) {
        // Add to games list if not present
        if (!games.some(g => g.id === data.game.id)) {
          setGames(prev => [data.game, ...prev]);
        }
        setSelectedGame(data.game);
      } else {
        throw new Error(data.error || 'Erro ao avaliar requisitos do jogo.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao buscar requisitos do jogo.');
    } finally {
      setSearchingCustomGame(false);
    }
  };

  const performAnalysis = async (compData: PCComponents = components) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          components: compData,
          rawText: compData.rawText,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor de auditoria.');
      }

      const payload = await response.json();
      if (payload.success && payload.data) {
        setResult(payload.data);
      } else {
        throw new Error(payload.error || 'Erro ao processar compatibilidade.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro inesperado na análise técnica.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        hasResult={!!result}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-200 underline font-semibold"
            >
              Fechar
            </button>
          </div>
        )}

        {/* View 1: Game-Driven PC Builder (Requisitos Mínimos & Melhor Configuração por Jogo) */}
        {activeView === 'game-matcher' && (
          <GameBuilderView
            games={games}
            selectedGame={selectedGame}
            onSelectGame={setSelectedGame}
            onApplyBuildToAudit={handleApplyBuildToAudit}
            onSearchCustomGame={handleSearchCustomGame}
            searchingCustom={searchingCustomGame}
          />
        )}

        {/* View 2: Direct Hardware Compatibility Inspector */}
        {activeView === 'hardware-audit' && (
          <BuildInputForm
            components={components}
            onChange={setComponents}
            onAnalyze={() => performAnalysis(components)}
            loading={loading}
            onSelectPreset={handleSelectPreset}
            presets={presets}
          />
        )}

        {/* View 3: Pre-Assembly Safety & Logical Steps Checklist */}
        {activeView === 'checklist' && (
          <AssemblyChecklistView
            currentComponents={components}
            currentResult={result}
            onGoToAudit={() => {
              setActiveView('hardware-audit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Applied Build Banner Notification if loaded from Game Builder */}
        {activeView !== 'checklist' && appliedBuildInfo && (
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between gap-3 text-xs text-cyan-200 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Configuração ativa: <strong>{appliedBuildInfo.name}</strong>. Todas as peças foram carregadas e sincronizadas para auditoria de arquitetura.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('hardware-audit')}
              className="inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-white underline shrink-0"
            >
              <span>Editar Peças Manualmente</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Results Section (Always displays in Game Matcher or Hardware Audit whenever an audit has run) */}
        {activeView !== 'checklist' && (
          <div id="audit-results-section" className="space-y-6">
            {loading && (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-200">Processando auditoria técnica de hardware...</p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Verificando compatibilidade de soquete, pinagem de memória RAM, dimensões milimétricas do gabinete, bracket do cooler e dimensionamento da fonte com picos de transientes.
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6 animate-fade-in">
                {/* 1. Executive Status & Incompatibilities */}
                <AnalysisOverview 
                  result={result} 
                  components={components}
                  buildTitle={appliedBuildInfo?.name}
                  onOpenShareModal={() => setIsShareModalOpen(true)}
                />

                {/* 2. Technical Meters (Power, Physical, Socket, RAM) */}
                <TechnicalMeters result={result} />

                {/* 3. Performance & Optimization Recommendations */}
                <OptimizationRecommendations recomendacoes={result.recomendacoes_otimizacao} />

                {/* 4. Detailed Verification Breakdown */}
                <VerificationList verificacoes={result.verificacoes} />

                {/* Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Auditoria técnica concluída. Compartilhe o relatório formatado ou siga o checklist de montagem.</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('checklist');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-all flex items-center gap-1.5 shadow-sm"
                      title="Ir para os passos de segurança e montagem física das peças"
                    >
                      <ClipboardCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Checklist de Montagem</span>
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const text = generateFormattedAuditSummary(result, components, {
                            format: 'markdown',
                            buildTitle: appliedBuildInfo?.name
                          });
                          await navigator.clipboard.writeText(text);
                          setFooterCopied(true);
                          setTimeout(() => setFooterCopied(false), 2500);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        footerCopied
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      }`}
                    >
                      {footerCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copiado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copiar Resumo em Markdown</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsShareModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900/60 text-cyan-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Formatos de Compartilhamento</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('hardware-audit');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
                    >
                      Personalizar Peças da Build
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Share Report Modal */}
      {result && (
        <ShareReportModal
          result={result}
          components={components}
          buildTitle={appliedBuildInfo?.name}
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Especialista em Arquitetura de Computadores e Hardware de PC</span>
          </div>
          <div>
            Foco 100% em especificações técnicas • Sem estimativas comerciais
          </div>
        </div>
      </footer>
    </div>
  );
}
