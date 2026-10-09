import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  HardDrive, 
  Zap, 
  Box, 
  Fan, 
  Play, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  XCircle,
  Component
} from 'lucide-react';
import type { PCComponents, PresetBuild } from '../types';

interface BuildInputFormProps {
  components: PCComponents;
  onChange: (components: PCComponents) => void;
  onAnalyze: () => void;
  loading: boolean;
  onSelectPreset: (preset: PresetBuild) => void;
  presets: PresetBuild[];
}

export function BuildInputForm({
  components,
  onChange,
  onAnalyze,
  loading,
  onSelectPreset,
  presets
}: BuildInputFormProps) {
  const [activeTab, setActiveTab] = useState<'structured' | 'raw'>('structured');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  const updateField = (field: keyof PCComponents, value: string) => {
    onChange({ ...components, [field]: value });
  };

  const handleClear = () => {
    onChange({
      cpu: '',
      motherboard: '',
      ram: '',
      gpu: '',
      cooler: '',
      storage: '',
      case: '',
      psu: '',
      extra: '',
      rawText: ''
    });
    setSelectedPresetId('');
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = presets.find((p) => p.id === presetId);
    if (found) {
      onSelectPreset(found);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      {/* Header controls & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2 font-sans">
            <Component className="w-5 h-5 text-cyan-400" />
            <span>Configuração do Sistema para Análise</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Preencha os campos abaixo ou cole a lista técnica de peças completa
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedPresetId}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="">-- Carregar Exemplo de Teste --</option>
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.tipo === 'compativel' ? '✅ ' : preset.tipo === 'incompativel' ? '❌ ' : '⚠️ '}
                {preset.nome}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700"
            title="Limpar todos os campos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 my-4 border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('structured')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'structured'
              ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Component className="w-4 h-4" />
          <span>Campos Estruturados</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('raw')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'raw'
              ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Texto Livre / Colar Lista</span>
        </button>
      </div>

      {/* Preset quick tag badges */}
      {selectedPresetId && (
        <div className="mb-4 p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-xs">
          {presets.find((p) => p.id === selectedPresetId)?.tipo === 'compativel' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : presets.find((p) => p.id === selectedPresetId)?.tipo === 'incompativel' ? (
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-semibold text-slate-200">
              {presets.find((p) => p.id === selectedPresetId)?.nome}:
            </span>{' '}
            <span className="text-slate-400">
              {presets.find((p) => p.id === selectedPresetId)?.descricao}
            </span>
          </div>
        </div>
      )}

      {/* Tab 1: Structured Form */}
      {activeTab === 'structured' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CPU */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Processador (CPU)</span>
                <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-slate-500 font-bold">Exemplos:</span>
                <button
                  type="button"
                  onClick={() => updateField('cpu', 'Intel Core i5-14600K (LGA1700, 181W)')}
                  className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-800/60 font-mono"
                >
                  i5-14600K
                </button>
                <button
                  type="button"
                  onClick={() => updateField('cpu', 'Intel Core i7-14700K (LGA1700, 253W)')}
                  className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-800/60 font-mono"
                >
                  i7-14700K
                </button>
                <button
                  type="button"
                  onClick={() => updateField('cpu', 'AMD Ryzen 7 7800X3D (AM5, 120W)')}
                  className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800/60 font-mono"
                >
                  7800X3D
                </button>
                <button
                  type="button"
                  onClick={() => updateField('cpu', 'AMD Ryzen 5 5600 (AM4, 65W)')}
                  className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800/60 font-mono"
                >
                  R5 5600
                </button>
              </div>
            </div>
            <input
              type="text"
              value={components.cpu}
              onChange={(e) => updateField('cpu', e.target.value)}
              placeholder="Ex: Intel Core i5-14600K (LGA1700) ou AMD Ryzen 7 7800X3D (AM5)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* Motherboard */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Placa-Mãe (Motherboard)</span>
                <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-slate-500 font-bold">Exemplos:</span>
                <button
                  type="button"
                  onClick={() => updateField('motherboard', 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5)')}
                  className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-800/60 font-mono"
                >
                  Z790 (Intel)
                </button>
                <button
                  type="button"
                  onClick={() => updateField('motherboard', 'Gigabyte B760M DS3H DDR4 (Socket LGA1700, mATX, DDR4)')}
                  className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-800/60 font-mono"
                >
                  B760M (Intel)
                </button>
                <button
                  type="button"
                  onClick={() => updateField('motherboard', 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5)')}
                  className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800/60 font-mono"
                >
                  B650 (AM5)
                </button>
              </div>
            </div>
            <input
              type="text"
              value={components.motherboard}
              onChange={(e) => updateField('motherboard', e.target.value)}
              placeholder="Ex: ASUS TUF Z790-PLUS (LGA1700, DDR5) ou B650-PLUS (AM5, DDR5)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* RAM */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Component className="w-3.5 h-3.5 text-sky-400" />
              <span>Memória RAM</span>
              <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={components.ram}
              onChange={(e) => updateField('ram', e.target.value)}
              placeholder="Ex: Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz CL30"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* GPU */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Placa de Vídeo (GPU)</span>
            </label>
            <input
              type="text"
              value={components.gpu}
              onChange={(e) => updateField('gpu', e.target.value)}
              placeholder="Ex: Gigabyte RTX 4070 Super Gaming OC (300mm, 220W TDP)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* Cooler */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Fan className="w-3.5 h-3.5 text-teal-400" />
              <span>Cooler do Processador (Air Cooler / AIO)</span>
            </label>
            <input
              type="text"
              value={components.cooler}
              onChange={(e) => updateField('cooler', e.target.value)}
              placeholder="Ex: DeepCool AK620 (Altura: 160mm) ou Water Cooler 360mm"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* Case */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-amber-400" />
              <span>Gabinete (Case)</span>
            </label>
            <input
              type="text"
              value={components.case}
              onChange={(e) => updateField('case', e.target.value)}
              placeholder="Ex: Lian Li LANCOOL 216 ATX (Suporta GPU até 392mm, Cooler 180mm)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* PSU */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Fonte de Alimentação (PSU)</span>
            </label>
            <input
              type="text"
              value={components.psu}
              onChange={(e) => updateField('psu', e.target.value)}
              placeholder="Ex: Corsair RM750e 750W 80 Plus Gold ATX 3.0"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* Storage */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-purple-400" />
              <span>Armazenamento (SSD / M.2 NVMe / HD)</span>
            </label>
            <input
              type="text"
              value={components.storage}
              onChange={(e) => updateField('storage', e.target.value)}
              placeholder="Ex: Kingston Fury Renegade 2TB M.2 NVMe PCIe 4.0"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>

          {/* Extra */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Fan className="w-3.5 h-3.5 text-slate-400" />
              <span>Ventoinhas Adicionais, Cabos ou Acessórios (Opcional)</span>
            </label>
            <input
              type="text"
              value={components.extra || ''}
              onChange={(e) => updateField('extra', e.target.value)}
              placeholder="Ex: 4x Fans ARGB 120mm PWM, Cabos Sleeved PCIe 8-pin"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Raw Text */}
      {activeTab === 'raw' && (
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Cole a lista de hardware (uma linha por peça ou texto corrido):
          </label>
          <textarea
            rows={8}
            value={components.rawText || ''}
            onChange={(e) => updateField('rawText', e.target.value)}
            placeholder={`Exemplo de lista colada:
- Processador AMD Ryzen 7 7800X3D
- Placa-mãe ASUS TUF Gaming B650-PLUS WIFI
- Memória Corsair Vengeance 32GB (2x16) DDR5 6000MHz
- Placa de Vídeo Gigabyte RTX 4070 Super 12GB
- Cooler DeepCool AK620
- Gabinete Lian Li Lancool 216
- Fonte Corsair RM750e 750W
- SSD Kingston Fury 2TB`}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed transition-colors"
          />
        </div>
      )}

      {/* Action Trigger */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Análise rigorosa: Soquete, RAM, Dimensões, Bracket e Demanda Elétrica (TDP).</span>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 active:scale-[0.99] text-slate-950 font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Processando Auditoria Técnica...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Verificar Compatibilidade Rigorosa</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
