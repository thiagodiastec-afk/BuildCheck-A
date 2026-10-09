import { Zap, Box, Cpu, HardDrive, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Fan, Layers } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface TechnicalMetersProps {
  result: AnalysisResult;
}

export function TechnicalMeters({ result }: TechnicalMetersProps) {
  const { demanda_eletrica, dimensoes_fisicas, soquete_e_geracao, memoria_ram, cooler_bracket } = result;

  const consumo = demanda_eletrica.consumo_estimado_sistema_w || 350;
  const psu = demanda_eletrica.potencia_fonte_informada_w || demanda_eletrica.potencia_recomendada_psu_w || 650;
  const loadPercentage = Math.min(Math.round((consumo / psu) * 100), 120);

  const coolerHeight = dimensoes_fisicas.altura_cooler_mm || 155;
  const caseCoolerMax = dimensoes_fisicas.limite_altura_cooler_gabinete_mm || 170;
  const coolerRatio = Math.min(Math.round((coolerHeight / caseCoolerMax) * 100), 120);

  const gpuLength = dimensoes_fisicas.comprimento_gpu_mm || 280;
  const caseGpuMax = dimensoes_fisicas.limite_gpu_gabinete_mm || 360;
  const gpuRatio = Math.min(Math.round((gpuLength / caseGpuMax) * 100), 120);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Demanda Elétrica & Dimensionamento da Fonte */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Demanda Elétrica & Dimensionamento PSU</span>
            </h4>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                demanda_eletrica.status === 'OK'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : demanda_eletrica.status === 'ERRO'
                  ? 'bg-rose-950 text-rose-400 border border-rose-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              {demanda_eletrica.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-3 text-center">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">TDP CPU</span>
              <span className="text-sm font-bold font-mono text-cyan-400">{demanda_eletrica.tdp_cpu_w}W</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">TDP GPU</span>
              <span className="text-sm font-bold font-mono text-emerald-400">{demanda_eletrica.tdp_gpu_w}W</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Consumo Total</span>
              <span className="text-sm font-bold font-mono text-amber-400">~{demanda_eletrica.consumo_estimado_sistema_w}W</span>
            </div>
          </div>

          {/* Load gauge */}
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Carga da Fonte ({consumo}W / {psu}W informados)</span>
              <span className="font-mono font-bold">{loadPercentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-500 ${
                  loadPercentage > 90
                    ? 'bg-rose-500'
                    : loadPercentage > 75
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(loadPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0W</span>
              <span>Faixa Ideal (50-70% carga para máxima eficiência)</span>
              <span>{psu}W</span>
            </div>
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-slate-800/80 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg">
          <p className="leading-relaxed">
            <span className="font-bold text-slate-200">Parecer da Fonte:</span> {demanda_eletrica.avaliacao_fonte}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Potência mínima segura recomendada: <span className="text-amber-400 font-bold">{demanda_eletrica.potencia_recomendada_psu_w}W</span>
          </p>
        </div>
      </div>

      {/* 2. Dimensões Físicas & Gabinete */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4 text-indigo-400" />
              <span>Desobstrução & Dimensões Físicas</span>
            </h4>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                dimensoes_fisicas.status === 'OK'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : dimensoes_fisicas.status === 'ERRO'
                  ? 'bg-rose-950 text-rose-400 border border-rose-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              {dimensoes_fisicas.status}
            </span>
          </div>

          {/* GPU Clearance */}
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Comprimento GPU ({dimensoes_fisicas.comprimento_gpu_mm ? `${dimensoes_fisicas.comprimento_gpu_mm}mm` : 'N/A'})</span>
              <span className="text-slate-400 text-[11px]">Máx Gabinete: {dimensoes_fisicas.limite_gpu_gabinete_mm ? `${dimensoes_fisicas.limite_gpu_gabinete_mm}mm` : 'N/A'}</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full ${
                  gpuRatio > 100 ? 'bg-rose-500' : gpuRatio > 85 ? 'bg-amber-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${Math.min(gpuRatio, 100)}%` }}
              />
            </div>
          </div>

          {/* Cooler Clearance */}
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Altura Cooler ({dimensoes_fisicas.altura_cooler_mm ? `${dimensoes_fisicas.altura_cooler_mm}mm` : 'N/A'})</span>
              <span className="text-slate-400 text-[11px]">Máx Gabinete: {dimensoes_fisicas.limite_altura_cooler_gabinete_mm ? `${dimensoes_fisicas.limite_altura_cooler_gabinete_mm}mm` : 'N/A'}</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full ${
                  coolerRatio > 100 ? 'bg-rose-500' : coolerRatio > 85 ? 'bg-amber-500' : 'bg-teal-500'
                }`}
                style={{ width: `${Math.min(coolerRatio, 100)}%` }}
              />
            </div>
          </div>

          {/* Form Factor compatibility */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Form-Factor Placa-Mãe</span>
              <span className="font-mono text-slate-200">{dimensoes_fisicas.form_factor_placa_mae || 'ATX / mATX'}</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Suporte Gabinete</span>
              <span className="font-mono text-slate-200">
                {dimensoes_fisicas.suporte_gabinete_form_factors?.join(', ') || 'ATX, mATX, ITX'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-slate-800/80 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg">
          <p className="leading-relaxed font-mono">
            {dimensoes_fisicas.compatibilidade_fisica}
          </p>
        </div>
      </div>

      {/* 3. Soquete, Chipset & Arquitetura */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Soquete & Arquitetura CPU / Placa-Mãe</span>
          </h4>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              soquete_e_geracao.status === 'OK'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : soquete_e_geracao.status === 'ERRO'
                ? 'bg-rose-950 text-rose-400 border border-rose-800'
                : 'bg-amber-950 text-amber-400 border border-amber-800'
            }`}
          >
            {soquete_e_geracao.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 my-3 text-xs">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Soquete CPU</span>
            <span className="font-mono font-bold text-cyan-400 text-sm">{soquete_e_geracao.soquete_cpu}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Soquete Placa-Mãe</span>
            <span className="font-mono font-bold text-indigo-400 text-sm">{soquete_e_geracao.soquete_placa_mae}</span>
          </div>
        </div>

        <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-400">Chipset:</span>
            <span className="font-mono font-semibold text-slate-200">{soquete_e_geracao.chipset || 'Detectado'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Atualização de BIOS Necessária:</span>
            <span className="font-mono font-semibold text-slate-200">
              {soquete_e_geracao.compatibilidade_bios_necessaria ? 'Sim (Verificar BIOS Flashback)' : 'Não'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 mt-1">
            {soquete_e_geracao.observacao}
          </p>
        </div>
      </div>

      {/* 4. Memória RAM & Cooler Bracket */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Padrão de Memória & Fixação Cooler</span>
          </h4>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              memoria_ram.status === 'OK' && cooler_bracket.status === 'OK'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : memoria_ram.status === 'ERRO' || cooler_bracket.status === 'ERRO'
                ? 'bg-rose-950 text-rose-400 border border-rose-800'
                : 'bg-amber-950 text-amber-400 border border-amber-800'
            }`}
          >
            {memoria_ram.status === 'OK' && cooler_bracket.status === 'OK' ? 'OK' : 'VERIFICAR'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 my-3 text-xs">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Padrão RAM Escolhido</span>
            <span className="font-mono font-bold text-sky-400">{memoria_ram.tipo_memoria_escolhida}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Padrão Placa-Mãe</span>
            <span className="font-mono font-bold text-indigo-400">{memoria_ram.tipo_placa_mae}</span>
          </div>
        </div>

        <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Canais & Topologia:</span>
            <span className="font-mono text-slate-200">{memoria_ram.canais_recomendados || 'Dual-Channel 2x16GB'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Suporte Cooler Bracket:</span>
            <span className={`font-mono font-bold ${cooler_bracket.suporte_soquete ? 'text-emerald-400' : 'text-rose-400'}`}>
              {cooler_bracket.suporte_soquete ? 'Bracket Compatível' : 'Incompatível'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 mt-1">
            {cooler_bracket.detalhes}
          </p>
        </div>
      </div>
    </div>
  );
}
