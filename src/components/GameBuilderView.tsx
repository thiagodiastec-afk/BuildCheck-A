import { useState, useMemo, type FormEvent } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Search, 
  Cpu, 
  Layers, 
  Zap, 
  HardDrive, 
  Monitor, 
  CheckCircle2, 
  Info, 
  Award, 
  ZapOff, 
  Activity,
  ChevronRight,
  Video,
  Music,
  Building2,
  Filter
} from 'lucide-react';
import type { GameRequirement, PCComponents, GameBuildSpec, WorkloadCategory } from '../types';

interface GameBuilderViewProps {
  games: GameRequirement[];
  selectedGame: GameRequirement | null;
  onSelectGame: (game: GameRequirement) => void;
  onApplyBuildToAudit: (components: PCComponents, buildName: string) => void;
  onSearchCustomGame: (gameName: string, resolution: string) => Promise<void>;
  searchingCustom: boolean;
}

export function GameBuilderView({
  games,
  selectedGame,
  onSelectGame,
  onApplyBuildToAudit,
  onSearchCustomGame,
  searchingCustom
}: GameBuilderViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [selectedResolution, setSelectedResolution] = useState<'1080p' | '1440p' | '4K'>('1080p');
  const [customGameInput, setCustomGameInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'TODAS' | 'INTEL' | 'AMD'>('TODAS');

  // Categories list for filter pills
  const categories = useMemo(() => [
    { id: 'TODAS', label: 'Todos', icon: Filter },
    { id: 'JOGOS', label: 'Jogos / eSports', icon: Gamepad2 },
    { id: 'VIDEO', label: 'Edição de Vídeo', icon: Video },
    { id: 'AUDIO', label: 'Áudio & DAW', icon: Music },
    { id: 'ENGENHARIA', label: 'Engenharia Civil & BIM', icon: Building2 },
  ], []);

  const filteredGames = useMemo(() => {
    return games.filter(g => {
      const matchesSearch = 
        g.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.engine.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'TODAS') return true;
      if (selectedCategory === 'JOGOS') {
        return !g.categoria.includes('Vídeo') && !g.categoria.includes('Áudio') && !g.categoria.includes('Engenharia') && !g.categoria.includes('Cálculo');
      }
      if (selectedCategory === 'VIDEO') {
        return g.categoria.includes('Vídeo');
      }
      if (selectedCategory === 'AUDIO') {
        return g.categoria.includes('Áudio');
      }
      if (selectedCategory === 'ENGENHARIA') {
        return g.categoria.includes('Engenharia') || g.categoria.includes('Cálculo') || g.categoria.includes('BIM');
      }
      return true;
    });
  }, [games, searchQuery, selectedCategory]);

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (customGameInput.trim()) {
      onSearchCustomGame(customGameInput.trim(), selectedResolution);
    }
  };

  // Helper to get active build specs based on chosen platform
  const getMinimaBuild = (): GameBuildSpec => {
    if (!selectedGame) return {} as GameBuildSpec;
    if (selectedPlatform === 'INTEL' && selectedGame.minimaIntel) {
      return selectedGame.minimaIntel;
    }
    return selectedGame.minima;
  };

  const getRecomendadaBuild = (): GameBuildSpec => {
    if (!selectedGame) return {} as GameBuildSpec;
    if (selectedPlatform === 'INTEL' && selectedGame.recomendadaIntel) {
      return selectedGame.recomendadaIntel;
    }
    return selectedGame.recomendada;
  };

  const currentMinima = getMinimaBuild();
  const currentRecomendada = getRecomendadaBuild();

  // Helper for category badge styling
  const getCategoryBadge = (cat: WorkloadCategory | string) => {
    if (cat.includes('Vídeo')) {
      return {
        bg: 'bg-purple-950/70 border-purple-800/60 text-purple-300',
        icon: Video
      };
    }
    if (cat.includes('Áudio')) {
      return {
        bg: 'bg-emerald-950/70 border-emerald-800/60 text-emerald-300',
        icon: Music
      };
    }
    if (cat.includes('Engenharia') || cat.includes('BIM') || cat.includes('Cálculo')) {
      return {
        bg: 'bg-amber-950/70 border-amber-800/60 text-amber-300',
        icon: Building2
      };
    }
    return {
      bg: 'bg-cyan-950/70 border-cyan-800/60 text-cyan-300',
      icon: Gamepad2
    };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Dimensionador de Hardware: Jogos & Workstations</span>
              </span>
              <span className="text-xs text-slate-400">
                Intel Core (LGA1700) & AMD Ryzen (AM4/AM5)
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-100 tracking-tight">
              Requisitos & Dimensionamento: Mínimo vs Recomendado
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Avalie as configurações de hardware para jogos de última geração e softwares profissionais de <strong className="text-purple-300">Edição de Vídeo</strong>, <strong className="text-emerald-300">Produção de Áudio</strong> e <strong className="text-amber-300">Engenharia Civil & BIM</strong>.
            </p>
          </div>

          {/* Controls: Platform & Resolution */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Platform Selector */}
            <div className="bg-slate-950/90 border border-slate-800 p-2 rounded-xl flex items-center gap-1.5">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Plataforma:</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('TODAS')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedPlatform === 'TODAS'
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Todas
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('INTEL')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    selectedPlatform === 'INTEL'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-blue-950/50 text-blue-300 hover:bg-blue-900/60 border border-blue-900/50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Intel Core</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('AMD')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    selectedPlatform === 'AMD'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-rose-950/50 text-rose-300 hover:bg-rose-900/60 border border-rose-900/50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <span>AMD Ryzen</span>
                </button>
              </div>
            </div>

            {/* Resolution Selector Buttons */}
            <div className="bg-slate-950/90 border border-slate-800 p-2 rounded-xl flex items-center gap-1.5">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Resolução/Escala:</span>
              </div>
              <div className="flex items-center gap-1">
                {(['1080p', '1440p', '4K'] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => {
                      setSelectedResolution(res);
                      if (selectedGame) {
                        onSearchCustomGame(selectedGame.nome, res);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedResolution === res
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Lateral Sidebar + Detail Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LATERAL SIDEBAR (Catalog & Search) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4 sticky top-6">
            
            {/* Sidebar Title & Count */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Filter className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Catálogo de Perfis</h3>
                  <p className="text-[10px] text-slate-400">Softwares & Jogos Disponíveis</p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-cyan-400 font-bold">
                {filteredGames.length} perfis
              </span>
            </div>

            {/* Custom Game/Software AI Search Form */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Buscar ou Analisar com IA</span>
              </label>
              <form onSubmit={handleCustomSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ex: AutoCAD, Premiere, Revit, GTA VI..."
                    value={customGameInput}
                    onChange={(e) => setCustomGameInput(e.target.value)}
                    className="w-full pl-3 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={searchingCustom || !customGameInput.trim()}
                  className="w-full py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 active:scale-[0.99]"
                >
                  {searchingCustom ? (
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>Analisar Requisitos (IA)</span>
                </button>
              </form>
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Filtrar por Categoria:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Text Filter Inside Catalog */}
            <div className="relative pt-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar nesta lista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Scrollable Lateral Catalog List */}
            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {filteredGames.map((game) => {
                const isSelected = selectedGame?.id === game.id;
                const badgeInfo = getCategoryBadge(game.categoria);
                const BadgeIcon = badgeInfo.icon;

                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => onSelectGame(game)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-500 text-white shadow-lg shadow-cyan-950/50'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border flex items-center gap-1 shrink-0 ${badgeInfo.bg}`}>
                          <BadgeIcon className="w-2.5 h-2.5" />
                          <span className="truncate max-w-[130px]">{game.categoria}</span>
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                        {game.nome}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {game.engine}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center text-slate-500 group-hover:text-slate-300">
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : ''}`} />
                    </div>
                  </button>
                );
              })}

              {filteredGames.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500 space-y-2">
                  <p>Nenhum perfil encontrado com esse filtro.</p>
                  <p className="text-[11px] text-slate-400">
                    Use o campo acima para analisar qualquer software ou jogo via IA!
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* MAIN CONTENT AREA (Selected Game / Software Specifications & Builds) */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-6">
          {selectedGame ? (
            <div className="space-y-6">
              {/* Selected Game Technical Profile Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                        {(() => {
                          const badge = getCategoryBadge(selectedGame.categoria);
                          const IconComp = badge.icon;
                          return <IconComp className="w-5 h-5 text-cyan-400" />;
                        })()}
                        <span>{selectedGame.nome}</span>
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                        {selectedGame.categoria}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      <span className="text-slate-300 font-semibold">Motor / API:</span> {selectedGame.engine}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                      <span className="text-slate-500 font-bold mr-1 text-[11px]">VRAM Alvo:</span>
                      <span className="text-amber-400 font-mono font-bold">{selectedGame.exigenciaVram}</span>
                    </div>
                    <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                      <span className="text-slate-500 font-bold mr-1 text-[11px]">Armazenamento:</span>
                      <span className="text-cyan-400 font-mono font-bold">{selectedGame.armazenamentoTipo}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-3">
                  {selectedGame.resumoRequisitos}
                </p>

                {/* Platform Quick Switch Banner */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">Exibindo opções de arquitetura:</span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                      selectedPlatform === 'INTEL' 
                        ? 'bg-blue-900/60 text-blue-300 border border-blue-700/60'
                        : selectedPlatform === 'AMD'
                        ? 'bg-rose-900/60 text-rose-300 border border-rose-700/60'
                        : 'bg-slate-800 text-cyan-300 border border-slate-700'
                    }`}>
                      {selectedPlatform === 'INTEL' ? 'Intel Core (LGA1700 / DDR4 / DDR5)' : selectedPlatform === 'AMD' ? 'AMD Ryzen (AM4 / AM5 / 3D V-Cache)' : 'Plataformas Intel Core & AMD Ryzen'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform('INTEL')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        selectedPlatform === 'INTEL'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-blue-300 hover:bg-blue-950/80 border border-blue-900/60'
                      }`}
                    >
                      Ver Opções Intel
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform('AMD')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        selectedPlatform === 'AMD'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-rose-300 hover:bg-rose-950/80 border border-rose-900/60'
                      }`}
                    >
                      Ver Opções AMD
                    </button>
                    {selectedPlatform !== 'TODAS' && (
                      <button
                        type="button"
                        onClick={() => setSelectedPlatform('TODAS')}
                        className="px-2 py-1 rounded text-[11px] text-slate-400 hover:text-white underline"
                      >
                        Comparar Todas
                      </button>
                    )}
                  </div>
                </div>

                {/* Tech badges */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Tecnologias & Recursos:</span>
                  {selectedGame.tecnologiasRecomendadas?.map((tech, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comparative Section: Minimum Build vs Recommended Best Performance */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* 1. Minimum Spec Build */}
                <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                          <ZapOff className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">
                            Entrada / Mínimo Funcional
                          </span>
                          <h4 className="text-sm font-bold text-slate-100">
                            {currentMinima.nome}
                          </h4>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60">
                        {currentMinima.fpsEstimado}
                      </span>
                    </div>

                    {/* Performance specs */}
                    <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 font-semibold block">Preset / Nível</span>
                        <span className="font-semibold text-slate-200">{currentMinima.presetGrafico}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 font-semibold block">Resolução / Alvo</span>
                        <span className="font-semibold text-slate-200">{currentMinima.resolucaoAlvo}</span>
                      </div>
                    </div>

                    {/* Component List */}
                    <div className="space-y-2 mt-4 text-xs font-mono">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Processador (CPU)</span>
                          <span className="text-slate-200 font-semibold">{currentMinima.componentes?.cpu}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Layers className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Placa-Mãe</span>
                          <span className="text-slate-200">{currentMinima.componentes?.motherboard}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Activity className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Memória RAM</span>
                          <span className="text-slate-200">{currentMinima.componentes?.ram}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Gamepad2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Placa de Vídeo (GPU)</span>
                          <span className="text-slate-200 font-semibold text-emerald-400">{currentMinima.componentes?.gpu}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <HardDrive className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Armazenamento</span>
                          <span className="text-slate-200">{currentMinima.componentes?.storage}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Fonte de Alimentação</span>
                          <span className="text-slate-200">{currentMinima.componentes?.psu}</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical highlights */}
                    <div className="mt-3.5 p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 space-y-1">
                      <span className="font-bold text-[11px] uppercase tracking-wider block text-amber-300">
                        Critérios Técnicos da Configuração Mínima:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-200/90 font-sans">
                        {currentMinima.caracteristicasTecnicas?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => onApplyBuildToAudit(currentMinima.componentes, `${selectedGame.nome} - Mínima (${currentMinima.nome})`)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-[0.99]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Montar & Auditar Esta Configuração Mínima</span>
                    </button>
                  </div>
                </div>

                {/* 2. Recommended High Performance Build */}
                <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider block">
                            Melhor Desempenho / Recomendado
                          </span>
                          <h4 className="text-sm font-bold text-slate-100">
                            {currentRecomendada.nome}
                          </h4>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60">
                        {currentRecomendada.fpsEstimado}
                      </span>
                    </div>

                    {/* Performance specs */}
                    <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 font-semibold block">Preset / Nível</span>
                        <span className="font-semibold text-slate-200">{currentRecomendada.presetGrafico}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 font-semibold block">Resolução / Alvo</span>
                        <span className="font-semibold text-slate-200">{currentRecomendada.resolucaoAlvo}</span>
                      </div>
                    </div>

                    {/* Component List */}
                    <div className="space-y-2 mt-4 text-xs font-mono">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Processador (CPU)</span>
                          <span className="text-slate-200 font-bold">{currentRecomendada.componentes?.cpu}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Layers className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Placa-Mãe</span>
                          <span className="text-slate-200">{currentRecomendada.componentes?.motherboard}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Activity className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Memória RAM</span>
                          <span className="text-slate-200">{currentRecomendada.componentes?.ram}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Gamepad2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Placa de Vídeo (GPU)</span>
                          <span className="text-slate-200 font-bold text-emerald-300">{currentRecomendada.componentes?.gpu}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <HardDrive className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Armazenamento</span>
                          <span className="text-slate-200">{currentRecomendada.componentes?.storage}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-sans uppercase block">Fonte de Alimentação</span>
                          <span className="text-slate-200">{currentRecomendada.componentes?.psu}</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical highlights */}
                    <div className="mt-3.5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/50 text-xs text-cyan-200 space-y-1">
                      <span className="font-bold text-[11px] uppercase tracking-wider block text-cyan-300">
                        Vantagens de Desempenho Arquitetural:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-cyan-100 font-sans">
                        {currentRecomendada.caracteristicasTecnicas?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => onApplyBuildToAudit(currentRecomendada.componentes, `${selectedGame.nome} - Recomendada (${currentRecomendada.nome})`)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Montar & Auditar Esta Configuração Recomendada</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comparison table when 'TODAS' is active and Intel specs exist */}
              {selectedPlatform === 'TODAS' && selectedGame.minimaIntel && selectedGame.recomendadaIntel && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-slate-100">
                        Tabela Comparativa: Intel Core vs AMD Ryzen para {selectedGame.nome}
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">100% Compatibilidade Técnica</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                    {/* Intel Card Summary */}
                    <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          <span>Opções Intel Core (LGA1700)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedPlatform('INTEL')}
                          className="text-[11px] text-blue-400 hover:text-blue-200 underline font-bold"
                        >
                          Selecionar Intel
                        </button>
                      </div>
                      <div className="space-y-1 text-slate-300 text-[11px]">
                        <p>• <strong>Mínima:</strong> {selectedGame.minimaIntel.componentes.cpu} + {selectedGame.minimaIntel.componentes.gpu}</p>
                        <p>• <strong>Recomendada:</strong> {selectedGame.recomendadaIntel.componentes.cpu} + {selectedGame.recomendadaIntel.componentes.gpu}</p>
                      </div>
                    </div>

                    {/* AMD Card Summary */}
                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                          <span>Opções AMD Ryzen (AM4/AM5)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedPlatform('AMD')}
                          className="text-[11px] text-rose-400 hover:text-rose-200 underline font-bold"
                        >
                          Selecionar AMD
                        </button>
                      </div>
                      <div className="space-y-1 text-slate-300 text-[11px]">
                        <p>• <strong>Mínima:</strong> {selectedGame.minima.componentes.cpu} + {selectedGame.minima.componentes.gpu}</p>
                        <p>• <strong>Recomendada:</strong> {selectedGame.recomendada.componentes.cpu} + {selectedGame.recomendada.componentes.gpu}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Optimization & Pro Tips */}
              {selectedGame.dicasOtimizacao && selectedGame.dicasOtimizacao.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                  <h5 className="font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider text-[11px]">
                    <Info className="w-4 h-4 text-cyan-400" />
                    <span>Diretrizes de Otimização e Ajuste Fino para {selectedGame.nome}</span>
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                    {selectedGame.dicasOtimizacao.map((dica, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                        <span className="text-cyan-400 font-bold font-mono">0{i + 1}.</span>
                        <span className="leading-relaxed">{dica}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 space-y-3">
              <Gamepad2 className="w-12 h-12 mx-auto text-slate-600 mb-2" />
              <h3 className="text-base font-semibold text-slate-200">Selecione um jogo ou software no menu lateral</h3>
              <p className="text-xs max-w-md mx-auto text-slate-400">
                Navegue pelas categorias ao lado ou pesquise qualquer software profissional ou jogo para visualizar o dimensionamento detalhado de componentes com opções Intel e AMD.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

