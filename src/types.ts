export interface PCComponents {
  cpu: string;
  motherboard: string;
  ram: string;
  gpu: string;
  cooler: string;
  storage: string;
  case: string;
  psu: string;
  extra?: string;
  rawText?: string;
}

export type StatusLevel = 'OK' | 'AVISO' | 'ERRO';
export type OverallStatus = 'COMPATIVEL' | 'INCOMPATIVEL' | 'ALERTA';

export interface CheckItem {
  categoria: 'SOQUETE_GERACAO' | 'MEMORIA_RAM' | 'DIMENSOES_FISICAS' | 'DEMANDA_ELETRICA' | 'COOLER_BRACKET' | 'OUTROS';
  titulo: string;
  status: StatusLevel;
  detalhes: string;
  explicacao_tecnica?: string;
}

export interface ElectricalDemand {
  tdp_cpu_w: number;
  tdp_gpu_w: number;
  consumo_outros_w: number;
  consumo_estimado_sistema_w: number;
  potencia_recomendada_psu_w: number;
  potencia_fonte_informada_w: number | null;
  margem_seguranca_percentual: number | null;
  avaliacao_fonte: string;
  status: StatusLevel;
}

export interface PhysicalDimensions {
  altura_cooler_mm: number | null;
  limite_altura_cooler_gabinete_mm: number | null;
  comprimento_gpu_mm: number | null;
  limite_gpu_gabinete_mm: number | null;
  form_factor_placa_mae: string;
  suporte_gabinete_form_factors: string[];
  espaco_radiador_suportado?: string | null;
  compatibilidade_fisica: string;
  status: StatusLevel;
}

export interface SocketGeneration {
  soquete_cpu: string;
  soquete_placa_mae: string;
  chipset: string;
  compatibilidade_bios_necessaria: boolean;
  observacao: string;
  status: StatusLevel;
}

export interface MemoryRAMCheck {
  tipo_cpu_suportado: string;
  tipo_placa_mae: string;
  tipo_memoria_escolhida: string;
  slots_disponiveis: number;
  pentes_utilizados: number;
  canais_recomendados: string;
  status: StatusLevel;
}

export interface CoolerBracketCheck {
  suporte_soquete: boolean;
  detalhes: string;
  status: StatusLevel;
}

export interface OptimizationRecommendation {
  tipo: 'GARGALO_CPU_GPU' | 'FLUXO_DE_AR_TERMICO' | 'MEMORIA_RAM' | 'ARMAZENAMENTO_PCIE' | 'ALIMENTACAO_EFICIENCIA';
  titulo: string;
  nivelImpacto: 'ALTO' | 'MEDIO' | 'REFINAMENTO';
  gargaloIdentificado: string;
  ajusteSugerido: string;
  ganhoEsperado: string;
  explicacaoTecnica?: string;
}

export interface AnalysisResult {
  status_geral: OverallStatus;
  resumo_executivo: string;
  score_compatibilidade: number;
  soquete_e_geracao: SocketGeneration;
  memoria_ram: MemoryRAMCheck;
  dimensoes_fisicas: PhysicalDimensions;
  demanda_eletrica: ElectricalDemand;
  cooler_bracket: CoolerBracketCheck;
  verificacoes: CheckItem[];
  incompatibilidades_criticas: string[];
  alertas_e_recomendacoes_tecnicas: string[];
  recomendacoes_otimizacao?: OptimizationRecommendation[];
  componentes_identificados: {
    cpu: string;
    placa_mae: string;
    ram: string;
    gpu: string;
    cooler: string;
    armazenamento: string;
    gabinete: string;
    fonte: string;
    outros?: string;
  };
  esquema_json_valido?: boolean;
}

export interface PresetBuild {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'compativel' | 'incompativel' | 'alerta';
  componentes: PCComponents;
}

export interface GameBuildSpec {
  nome: string;
  descricao: string;
  presetGrafico: string;
  fpsEstimado: string;
  resolucaoAlvo: string;
  componentes: PCComponents;
  caracteristicasTecnicas: string[];
}

export type WorkloadCategory = 
  | 'Competitivo / eSports'
  | 'AAA / Nova Geração'
  | 'Mundo Aberto / Simulação'
  | 'Ray Tracing / Gráficos Pesados'
  | 'Edição de Vídeo / Pós-Produção'
  | 'Produção de Áudio / DAW'
  | 'Engenharia Civil / BIM & CAD'
  | 'Cálculo Estrutural / Engenharia';

export interface GameRequirement {
  id: string;
  nome: string;
  categoria: WorkloadCategory;
  engine: string;
  resumoRequisitos: string;
  exigenciaVram: string;
  exigenciaCpu: string;
  armazenamentoTipo: 'NVMe Gen4 Recomendado' | 'SSD SATA Mínimo' | 'NVMe com DirectStorage' | 'NVMe Gen4 Scratch Disk' | 'NVMe Gen4/Gen5 Dual Disk';
  resolucoesSuportadas: ('1080p' | '1440p' | '4K' | 'Projetos Pequenos' | 'Projetos Médios' | 'Projetos Complexos' | '4K ProRes' | '8K RAW' | '64 Pistas' | '128+ Pistas')[];
  minima: GameBuildSpec;
  recomendada: GameBuildSpec;
  minimaIntel?: GameBuildSpec;
  recomendadaIntel?: GameBuildSpec;
  tecnologiasRecomendadas: string[];
  dicasOtimizacao: string[];
}
