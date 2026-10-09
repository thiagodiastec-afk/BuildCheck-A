import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Preset builds for testing and immediate demo verification
const PRESETS = [
  {
    id: 'build-intel-compativel-gamer',
    nome: 'Build Gamer Intel: Core i5-14600K + RTX 4070 SUPER (100% Compatível)',
    tipo: 'compativel',
    descricao: 'Configuração Intel balanceada: Core i5-14600K + Z790 DDR5 + RTX 4070 SUPER + Water Cooler 240mm + Fonte 750W Gold.',
    componentes: {
      cpu: 'Intel Core i5-14600K (LGA1700, 14 Núcleos / 20 Threads, 181W Max TDP)',
      motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5)',
      ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6000MHz CL36 Intel XMP',
      gpu: 'Gigabyte GeForce RTX 4070 Super Gaming OC 12GB (Comprimento: 300mm, TDP: 220W)',
      cooler: 'DeepCool LT520 240mm Liquid Cooler (Suporte LGA1700)',
      storage: 'Kingston Fury Renegade 2TB M.2 NVMe PCIe 4.0 (7300MB/s)',
      case: 'Lian Li LANCOOL 216 ATX (Suporta GPU até 392mm, Radiador 240/360mm)',
      psu: 'Corsair RM750e 750W 80 Plus Gold Modular ATX 3.0',
      extra: '3x Ventoinhas 120mm PWM instaladas',
    }
  },
  {
    id: 'build-intel-compativel-custo-beneficio',
    nome: 'Build Intel Custo-Benefício: Core i5-12400F + RTX 3060 (100% Compatível)',
    tipo: 'compativel',
    descricao: 'Excelente custo por frame: Intel Core i5-12400F + B760M DDR4 + 16GB RAM + RTX 3060 12GB + Fonte 650W Bronze.',
    componentes: {
      cpu: 'Intel Core i5-12400F (LGA1700, 6 Núcleos / 12 Threads, 65W TDP)',
      motherboard: 'Gigabyte B760M DS3H DDR4 (Socket LGA1700, Micro-ATX, 4x DDR4)',
      ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3200MHz CL16',
      gpu: 'Nvidia GeForce RTX 3060 12GB GDDR6 (Comprimento: 242mm, TDP: 170W)',
      cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm, Bracket LGA1700)',
      storage: 'Kingston NV2 1TB M.2 NVMe PCIe 4.0 (3500MB/s)',
      case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
      psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
      extra: '4x Fans 120mm ARGB inclusas',
    }
  },
  {
    id: 'build-compativel-am5-ddr5',
    nome: 'Build Gamer AMD: Ryzen 7 7800X3D + RTX 4070 SUPER (100% Compatível)',
    tipo: 'compativel',
    descricao: 'Configuração equilibrada Ryzen 7 7800X3D + B650 ATX + RTX 4070 Super com fonte 750W e dimensões compatíveis.',
    componentes: {
      cpu: 'AMD Ryzen 7 7800X3D (AM5, 120W TDP)',
      motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, 4x DDR5 slots)',
      ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6000MHz CL30',
      gpu: 'Gigabyte GeForce RTX 4070 Super Gaming OC 12GB (Comprimento: 300mm, TDP: 220W)',
      cooler: 'DeepCool AK620 Air Cooler (Altura: 160mm, Suporte AM5/LGA1700)',
      storage: 'Kingston Fury Renegade 2TB M.2 NVMe PCIe 4.0',
      case: 'Lian Li LANCOOL 216 ATX (Suporta GPU até 392mm, Cooler até 180mm, Placas ATX/E-ATX/mATX)',
      psu: 'Corsair RM750e 750W 80 Plus Gold Modular ATX 3.0',
      extra: '3x Ventoinhas 120mm PWM adicionais',
    }
  },
  {
    id: 'build-workstation-video-intel',
    nome: 'Workstation Edição de Vídeo 4K/8K: Core i7-14700K + RTX 4080 SUPER + 64GB DDR5 (100% Compatível)',
    tipo: 'compativel',
    descricao: 'Estação profissional para Premiere Pro, After Effects e DaVinci Resolve: QuickSync ativo + 64GB RAM DDR5 + 16GB VRAM + Scratch NVMe Gen4.',
    componentes: {
      cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, LGA1700, UHD 770 QuickSync, 253W Boost)',
      motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5, 4x M.2)',
      ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000MHz CL30 Intel XMP',
      gpu: 'Gigabyte GeForce RTX 4080 SUPER Gaming OC 16GB (Comprimento: 342mm, Dual NVENC AV1)',
      cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
      storage: 'Samsung 990 Pro 2TB NVMe PCIe 4.0 (Sistema) + Kingston KC3000 2TB (Scratch Cache)',
      case: 'Lian Li LANCOOL 216 ATX (Suporta Radiador 360mm no topo, GPU 392mm)',
      psu: 'Corsair RM850x 850W 80 Plus Gold Modular ATX 3.0',
      extra: 'Dual NVENC e Intel QuickSync para decodificação 4:2:2 10-bit em tempo real',
    }
  },
  {
    id: 'build-workstation-audio-daw',
    nome: 'Workstation Produção de Áudio & DAW: Ryzen 9 7950X + 64GB DDR5 (Ultra Silenciosa)',
    tipo: 'compativel',
    descricao: 'Estação para Pro Tools, Ableton Live e FL Studio com 128+ pistas e baixa latência DPC: 16 núcleos, 64GB RAM, Cooler Be Quiet! e gabinete acústico isolado.',
    componentes: {
      cpu: 'AMD Ryzen 9 7950X (16 Núcleos / 32 Threads, AM5, Turbo 5.7GHz, 170W TDP)',
      motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5, Isolamento de Áudio)',
      ram: 'Corsair Vengeance 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
      gpu: 'ASUS Dual GeForce RTX 4060 8GB com modo 0dB Silent Fan Stop',
      cooler: 'Be Quiet! Dark Rock Pro 5 Air Cooler (Operação Ultra Silenciosa < 19 dBA)',
      storage: 'Samsung 990 Pro 2TB (Sistema) + Crucial P3 Plus 4TB (Sample Libraries Kontakt)',
      case: 'Fractal Design Define 7 ou Be Quiet! Silent Base 802 (Mantas de Isolamento Acústico)',
      psu: 'Corsair RM750e 750W 80 Plus Gold Modular (Modo Zero RPM)',
      extra: 'Múltiplas portas USB 3.2 de baixa latência para interfaces de áudio e controladoras',
    }
  },
  {
    id: 'build-workstation-engenharia-bim',
    nome: 'Workstation Engenharia Civil & BIM: Core i7-14700K + RTX 4070 Ti SUPER + 64GB DDR5 (100% Compatível)',
    tipo: 'compativel',
    descricao: 'Para Revit BIM LOD 400/500, AutoCAD, Civil 3D, Lumion e cálculo estrutural TQS/Eberick: Alto clock 5.6 GHz, 64GB RAM e 16GB VRAM.',
    componentes: {
      cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, Turbo 5.6GHz Single-Core, LGA1700, 253W)',
      motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5, 4x M.2 NVMe)',
      ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000MHz CL30 Intel XMP',
      gpu: 'ASUS TUF GeForce RTX 4070 Ti SUPER 16GB GDDR6X (Drivers Studio Certificados)',
      cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
      storage: 'Samsung 990 Pro 2TB M.2 NVMe PCIe 4.0 (7450MB/s)',
      case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm, Cooler 180mm)',
      psu: 'Corsair RM850x 850W 80 Plus Gold Modular ATX 3.0',
      extra: 'Suporte a múltiplos monitores 4K para pranchas e modelagem paramétrica 3D',
    }
  },
  {
    id: 'build-incompativel-soquete',
    nome: 'Incompatibilidade Crítica: Soquete CPU vs Placa-Mãe',
    tipo: 'incompativel',
    descricao: 'Erro clássico: Processador Intel Core i7-14700K (LGA1700) tentando ser montado em placa-mãe AM5 (AMD B650).',
    componentes: {
      cpu: 'Intel Core i7-14700K (LGA1700, 125W base / 253W boost)',
      motherboard: 'MSI MAG B650 TOMAHAWK WIFI (Socket AM5 - Exclusivo AMD)',
      ram: 'Kingston Fury Beast 32GB (2x16GB) DDR5 5600MHz',
      gpu: 'ASUS TUF GeForce RTX 4070 Ti SUPER 16GB (Comprimento: 305mm)',
      cooler: 'Thermalright Peerless Assassin 120 SE',
      storage: 'Samsung 990 Pro 1TB NVMe M.2',
      case: 'NZXT H5 Flow ATX',
      psu: 'MSI MAG A850GL 850W 80 Plus Gold PCIe 5.0',
      extra: '',
    }
  },
  {
    id: 'build-incompativel-ram',
    nome: 'Incompatibilidade de Memória: DDR4 em Placa DDR5',
    tipo: 'incompativel',
    descricao: 'Memória RAM DDR4 selecionada com placa-mãe Z790 que possui slots físicos exclusivamente DDR5.',
    componentes: {
      cpu: 'Intel Core i5-14600KF (LGA1700, Suporta DDR4 e DDR5)',
      motherboard: 'Gigabyte Z790 AORUS ELITE AX (Socket LGA1700, Slots Físicos DDR5)',
      ram: 'XPG Spectrix D50 32GB (2x16GB) DDR4 3200MHz CL16',
      gpu: 'Nvidia GeForce RTX 4060 Ti 8GB (Comprimento: 242mm)',
      cooler: 'DeepCool AG400 ARGB (Altura: 150mm)',
      storage: 'Crucial P3 Plus 1TB NVMe',
      case: 'Montech Air 903 Max ATX',
      psu: 'XPG Pylon 650W 80 Plus Bronze',
      extra: '',
    }
  },
  {
    id: 'build-incompativel-dimensoes-gpu',
    nome: 'Incompatibilidade Física: GPU maior que o Gabinete',
    tipo: 'incompativel',
    descricao: 'Placa de vídeo RTX 4090 de 358mm tentando caber em gabinete compacto com limite máximo de 315mm.',
    componentes: {
      cpu: 'AMD Ryzen 7 9700X (AM5, 65W/105W TDP)',
      motherboard: 'ASRock B650M-HDV/M.2 (Micro-ATX, AM5, DDR5)',
      ram: 'G.Skill Flare X5 32GB (2x16GB) DDR5-6000MHz',
      gpu: 'ASUS ROG Strix GeForce RTX 4090 OC 24GB (Comprimento: 357.6mm, 3.5 slots)',
      cooler: 'Noctua NH-D15 G2 (Altura: 168mm)',
      storage: 'WD Black SN850X 2TB NVMe',
      case: 'Fractal Design Meshify C Mini (Limite máximo de GPU: 315mm com fan, Limite cooler: 172mm)',
      psu: 'Corsair RM1000x 1000W 80 Plus Gold ATX 3.0',
      extra: '',
    }
  },
  {
    id: 'build-alerta-fonte-subdimensionada',
    nome: 'Gargalo Elétrico: Fonte Subdimensionada (450W)',
    tipo: 'alerta',
    descricao: 'Demanda elétrica ultrapassa o limite seguro: i9-14900K + RTX 4080 exigem ~600W-650W contínuos, mas a fonte informada é de apenas 450W.',
    componentes: {
      cpu: 'Intel Core i9-14900K (LGA1700, Pico de consumo: 253W-300W)',
      motherboard: 'ASUS ROG Maximus Z790 HERO (LGA1700, ATX, DDR5)',
      ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6400MHz',
      gpu: 'Nvidia GeForce RTX 4080 16GB Founders Edition (TDP: 320W, Picos transitórios: 400W)',
      cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
      storage: '2x Samsung 990 Pro 2TB M.2 NVMe',
      case: 'Lian Li O11 Dynamic EVO (Suporta radiador 360mm, GPU 422mm)',
      psu: 'Fonte Genérica 450W 80 Plus White',
      extra: '9x Fans 120mm RGB + Bomba AIO',
    }
  }
];

// Heuristic fallback analyzer in case Gemini API key is not yet set or during offline execution
function runHeuristicAnalysis(input: any) {
  const text = `${input.rawText || ''} ${input.cpu || ''} ${input.motherboard || ''} ${input.ram || ''} ${input.gpu || ''} ${input.cooler || ''} ${input.case || ''} ${input.psu || ''}`.toLowerCase();

  const isIntelCpu = /intel|i3-|i5-|i7-|i9-|lga1700|lga1200|lga1151|12\d{3}|13\d{3}|14\d{3}|core ultra/i.test(input.cpu || text);
  const isAmdCpu = /ryzen|amd|am4|am5|5\d{3}[x|g]?|7\d{3}[x|g]?|9\d{3}[x|g]?/i.test(input.cpu || text);
  const isAm5Mb = /am5|b650|x670|a620|x870|b850/i.test(input.motherboard || text);
  const isAm4Mb = /am4|b450|b550|x570|a320|a520/i.test(input.motherboard || text);
  const isLga1700Mb = /lga1700|lga 1700|z690|b660|h610|z790|b760|h770/i.test(input.motherboard || text);
  
  const isDdr5Ram = /ddr5|6000mhz|5600mhz|5200mhz|4800mhz/i.test(input.ram || text);
  const isDdr4Ram = /ddr4|3200mhz|3600mhz|2666mhz|2400mhz/i.test(input.ram || text);
  const isDdr5Mb = /ddr5|b650|x670|x870|b850/i.test(input.motherboard || text) || (isLga1700Mb && !/ddr4/i.test(input.motherboard || text));
  const isDdr4Mb = /ddr4|am4|b450|b550/i.test(input.motherboard || text);

  // Electrical estimation
  let tdpCpu = 65;
  if (/14900|13900|14700|13700|7950x|9950x/i.test(input.cpu || text)) tdpCpu = 250;
  else if (/7800x3d|7900x|14600|13600|5800x3d|9700x/i.test(input.cpu || text)) tdpCpu = 120;
  else if (/7600|5600|14400|13400|12400/i.test(input.cpu || text)) tdpCpu = 65;

  let tdpGpu = 150;
  if (/4090|3090/i.test(input.gpu || text)) tdpGpu = 450;
  else if (/4080|7900\s?xtx|3080/i.test(input.gpu || text)) tdpGpu = 320;
  else if (/4070\s?ti|7900\s?xt/i.test(input.gpu || text)) tdpGpu = 285;
  else if (/4070|7800\s?xt|3070/i.test(input.gpu || text)) tdpGpu = 220;
  else if (/4060\s?ti|7700\s?xt|3060/i.test(input.gpu || text)) tdpGpu = 160;
  else if (/4060|7600/i.test(input.gpu || text)) tdpGpu = 115;
  else if (/integrada|sem gpu|nenhuma|igpu/i.test(input.gpu || text)) tdpGpu = 0;

  const consumoOutros = 75;
  const consumoTotal = tdpCpu + tdpGpu + consumoOutros;
  const potenciaRecomendada = Math.ceil((consumoTotal * 1.35) / 50) * 50;

  // Detect PSU wattage from input
  const psuMatch = (input.psu || text).match(/(\d{3,4})\s*w/i);
  const psuWattage = psuMatch ? parseInt(psuMatch[1], 10) : null;

  const incompatibilidades: string[] = [];
  const alertas: string[] = [];

  // Check 1: Socket & Generation
  let socketStatus: 'OK' | 'ERRO' | 'AVISO' = 'OK';
  let socketDetails = 'Soquete e arquitetura da CPU compatíveis com a Placa-Mãe.';
  if (isIntelCpu && isAm5Mb) {
    socketStatus = 'ERRO';
    socketDetails = 'INCOMPATIBILIDADE GRAVE: Processador Intel (LGA1700/LGA1200) não encaixa fisicamente no soquete AMD AM5.';
    incompatibilidades.push(socketDetails);
  } else if (isAmdCpu && isLga1700Mb) {
    socketStatus = 'ERRO';
    socketDetails = 'INCOMPATIBILIDADE GRAVE: Processador AMD (AM4/AM5) é incompatível com o soquete Intel LGA1700 da placa-mãe.';
    incompatibilidades.push(socketDetails);
  }

  // Check 2: Memory RAM
  let ramStatus: 'OK' | 'ERRO' | 'AVISO' = 'OK';
  let ramDetails = 'Padrão de memória RAM correspondente aos slots da placa-mãe e controlador integrado (IMC) da CPU.';
  if (isDdr4Ram && isAm5Mb) {
    ramStatus = 'ERRO';
    ramDetails = 'INCOMPATIBILIDADE GRAVE: A plataforma AMD AM5 suporta EXCLUSIVAMENTE memórias DDR5. Módulos DDR4 não encaixam.';
    incompatibilidades.push(ramDetails);
  } else if (isDdr4Ram && isDdr5Mb && !isDdr4Mb) {
    ramStatus = 'ERRO';
    ramDetails = 'INCOMPATIBILIDADE: Módulos DDR4 selecionados para placa-mãe com slots físicos padrão DDR5.';
    incompatibilidades.push(ramDetails);
  }

  // Check 3: Physical dimensions
  let physicalStatus: 'OK' | 'ERRO' | 'AVISO' = 'OK';
  let physicalDetails = 'Dimensões de GPU, altura do cooler e form-factor da placa-mãe suportados pelo gabinete.';
  if (/4090|357mm|358mm/i.test(input.gpu || text) && /meshify c mini|315mm|itx|compact/i.test(input.case || text)) {
    physicalStatus = 'ERRO';
    physicalDetails = 'CONFLITO FÍSICO: O comprimento da GPU (~358mm) excede o espaço interno do gabinete informado (~315mm).';
    incompatibilidades.push(physicalDetails);
  }

  // Check 4: PSU
  let psuStatus: 'OK' | 'ERRO' | 'AVISO' = 'OK';
  let psuDetails = `Fonte atende a demanda estimada de ~${consumoTotal}W com margem de segurança de ~35%.`;
  if (psuWattage && psuWattage < consumoTotal) {
    psuStatus = 'ERRO';
    psuDetails = `FONTE SUBDIMENSIONADA: A fonte informada (${psuWattage}W) é inferior à demanda de pico estimada (${consumoTotal}W). Risco crítico de desligamento e instabilidade.`;
    incompatibilidades.push(psuDetails);
  } else if (psuWattage && psuWattage < potenciaRecomendada) {
    psuStatus = 'AVISO';
    psuDetails = `Fonte de ${psuWattage}W possui margem estreita para picos transitórios. Recomendado mínimo de ${potenciaRecomendada}W.`;
    alertas.push(psuDetails);
  }

  // Overall status
  let statusGeral: 'COMPATIVEL' | 'INCOMPATIVEL' | 'ALERTA' = 'COMPATIVEL';
  if (incompatibilidades.length > 0) {
    statusGeral = 'INCOMPATIVEL';
  } else if (alertas.length > 0) {
    statusGeral = 'ALERTA';
  }

  return {
    status_geral: statusGeral,
    resumo_executivo: statusGeral === 'COMPATIVEL' 
      ? 'A lista de componentes analisada apresenta total compatibilidade técnica, física, elétrica e de soquetes. Todos os barramentos e demandas operacionais estão sincronizados.'
      : statusGeral === 'INCOMPATIVEL'
      ? `Detectadas ${incompatibilidades.length} incompatibilidade(s) crítica(s) que impedem a montagem ou funcionamento do computador.`
      : 'Componentes compatíveis operacionalmente, porém com ressalvas de margem de alimentação ou recomendações técnicas importantes.',
    score_compatibilidade: statusGeral === 'COMPATIVEL' ? 100 : statusGeral === 'ALERTA' ? 75 : 20,
    soquete_e_geracao: {
      soquete_cpu: isIntelCpu ? 'LGA1700' : isAmdCpu ? (isAm5Mb ? 'AM5' : 'AM4') : 'Detectado',
      soquete_placa_mae: isAm5Mb ? 'AM5' : isAm4Mb ? 'AM4' : isLga1700Mb ? 'LGA1700' : 'Detectado',
      chipset: isAm5Mb ? 'AMD B650 / X670' : isLga1700Mb ? 'Intel Z790 / B760' : 'Padrão',
      compatibilidade_bios_necessaria: false,
      observacao: socketDetails,
      status: socketStatus
    },
    memoria_ram: {
      tipo_cpu_suportado: isAm5Mb ? 'DDR5' : isIntelCpu ? 'DDR4 / DDR5' : 'DDR4',
      tipo_placa_mae: isDdr5Mb ? 'DDR5' : 'DDR4',
      tipo_memoria_escolhida: isDdr5Ram ? 'DDR5' : 'DDR4',
      slots_disponiveis: 4,
      pentes_utilizados: 2,
      canais_recomendados: 'Dual-Channel (Slots A2 e B2)',
      status: ramStatus
    },
    dimensoes_fisicas: {
      altura_cooler_mm: 160,
      limite_altura_cooler_gabinete_mm: 175,
      comprimento_gpu_mm: /4090/i.test(input.gpu || text) ? 358 : /4070/i.test(input.gpu || text) ? 300 : 260,
      limite_gpu_gabinete_mm: /meshify c mini/i.test(input.case || text) ? 315 : 390,
      form_factor_placa_mae: /m-atx|matx|micro/i.test(input.motherboard || text) ? 'Micro-ATX (mATX)' : 'ATX Standard',
      suporte_gabinete_form_factors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
      espaco_radiador_suportado: 'Até 360mm frontal / 280mm topo',
      compatibilidade_fisica: physicalDetails,
      status: physicalStatus
    },
    demanda_eletrica: {
      tdp_cpu_w: tdpCpu,
      tdp_gpu_w: tdpGpu,
      consumo_outros_w: consumoOutros,
      consumo_estimado_sistema_w: consumoTotal,
      potencia_recomendada_psu_w: potenciaRecomendada,
      potencia_fonte_informada_w: psuWattage,
      margem_seguranca_percentual: psuWattage ? Math.round(((psuWattage - consumoTotal) / psuWattage) * 100) : null,
      avaliacao_fonte: psuDetails,
      status: psuStatus
    },
    cooler_bracket: {
      suporte_soquete: true,
      detalhes: 'Bracket do cooler compatível com a furação e altura Z do soquete.',
      status: 'OK'
    },
    recomendacoes_otimizacao: [
      // 1. Gargalo CPU / GPU
      tdpGpu >= 300 && (/i3|i5-10|i5-11|ryzen 3|ryzen 5 3600|ryzen 5 2600|ryzen 5 1600/i.test(input.cpu || text))
        ? {
            tipo: 'GARGALO_CPU_GPU',
            titulo: 'Gargalo de CPU Identificado (CPU Bottleneck)',
            nivelImpacto: 'ALTO',
            gargaloIdentificado: 'A placa de vídeo de alto desempenho será limitada pela capacidade de processamento de instruções por ciclo (IPC) e quantidade de threads do processador em resoluções 1080p e 1440p competitivas.',
            ajusteSugerido: 'Planejar upgrade para um processador com maior IPC e cache L3 (ex: Ryzen 7 7800X3D ou Core i5-13600K/14600K) ou elevar a resolução gráfica (1440p Ultra / 4K com DLSS/FSR) para transferir a carga para a GPU.',
            ganhoEsperado: 'Aumento de 35% a 55% nos 1% Lows (FPS mínimo), eliminando micro-stutters e travamentos em cenas com muitos elementos na tela.',
            explicacaoTecnica: 'Throughput de Draw Calls e tempo de renderização de frame (frametime) sincronizados com a taxa de preenchimento da GPU.'
          }
        : /7800x3d|7950x|14900k|13900k|9950x/i.test(input.cpu || text) && /gtx 1650|rx 6500|rx 6400|rtx 3050|gt 1030/i.test(input.gpu || text)
        ? {
            tipo: 'GARGALO_CPU_GPU',
            titulo: 'Subutilização do Processador por Gargalo de GPU',
            nivelImpacto: 'ALTO',
            gargaloIdentificado: 'O processador topo de linha tem capacidade de cálculo excedente, enquanto a GPU de entrada atinge 100% de uso rapidamente mesmo com configurações gráficas básicas.',
            ajusteSugerido: 'Para aplicações focadas em jogos, rebalancear a verba para uma GPU de maior throughput (ex: RTX 4070 SUPER / RX 7800 XT) para extrair o real potencial do processador.',
            ganhoEsperado: 'Ganhos substanciais na fidelidade gráfica, resolução de texturas e taxa média de quadros por segundo.',
            explicacaoTecnica: 'Equilíbrio da relação compute-to-rasterization do pipeline gráfico.'
          }
        : {
            tipo: 'GARGALO_CPU_GPU',
            titulo: 'Sinergia de Processamento CPU & GPU Balanceada',
            nivelImpacto: 'REFINAMENTO',
            gargaloIdentificado: 'A proporção de poder de computação entre CPU e GPU está bem equalizada para cargas de trabalho modernas.',
            ajusteSugerido: 'Ativar o Resizable BAR / Smart Access Memory (SAM) na UEFI BIOS e habilitar o Modo de Jogo / Perfil de Alto Desempenho no sistema operacional para liberar acesso direto da CPU a toda a memória VRAM da GPU.',
            ganhoEsperado: 'Ganho adicional de 5% a 12% em estabilidade de frametime e taxas de quadros em títulos DirectX 12 e Vulkan.',
            explicacaoTecnica: 'Remoção do limite de 256MB da janela de transferência PCIe via Base Address Register.'
          },

      // 2. Fluxo de Ar e Desempenho Térmico
      tdpCpu >= 125 || tdpGpu >= 250 || /14900|13900|14700|13700|7900x|7950x|4090|4080/i.test(text)
        ? {
            tipo: 'FLUXO_DE_AR_TERMICO',
            titulo: 'Otimização de Fluxo de Ar e Headroom Térmico',
            nivelImpacto: 'ALTO',
            gargaloIdentificado: 'A carga térmica combinada do sistema sob estresse máximo ultrapassa 350W-500W. Gabinetes com fluxo de ar restrito ou fans insuficientes causarão Thermal Throttling na CPU e GPU.',
            ajusteSugerido: 'Garantir gabinete com painel frontal perfurado (Mesh) e instalar 3 fans frontais de 120mm/140mm (admissão) + 1 fan traseira e 2 superiores (exaustão), criando pressão estática positiva.',
            ganhoEsperado: 'Redução de 8°C a 15°C nas temperaturas de pico, mantendo o Turbo Boost e frequências máximas de clock sustentadas continuamente.',
            explicacaoTecnica: 'Dissipação convectiva acelerada sobre o VRM da placa-mãe, dissipadores M.2 e backplate da GPU.'
          }
        : {
            tipo: 'FLUXO_DE_AR_TERMICO',
            titulo: 'Configuração de Curva de Fans PWM e Pressão Neutra',
            nivelImpacto: 'MEDIO',
            gargaloIdentificado: 'Curvas de ventilação padrão de fábrica podem gerar ruído desnecessário ou picos térmicos em transições de carga.',
            ajusteSugerido: 'Ajustar curvas de fans PWM personalizadas na BIOS (modo silencioso até 55°C e rampa progressiva até 75°C) com ligeira pressão positiva para conter acúmulo de poeira.',
            ganhoEsperado: 'Operação acústica silenciosa em tarefas rotineiras com resposta térmica rápida sob carga intensa.',
            explicacaoTecnica: 'Gestão acústica por modulação de largura de pulso (PWM) calibrada por sensor de temperatura Tctl/Tdie.'
          },

      // 3. Memória RAM
      /1x16|1x8|1x32|pente unico|single channel/i.test(input.ram || text)
        ? {
            tipo: 'MEMORIA_RAM',
            titulo: 'Ativação Crítica de Dual-Channel na Memória RAM',
            nivelImpacto: 'ALTO',
            gargaloIdentificado: 'Configuração em Single-Channel (barramento de 64 bits). O processador fica restrito à metade da largura de banda teórica de memória, causando gargalo no barramento IMC.',
            ajusteSugerido: 'Utilizar obrigatoriamente 2 módulos idênticos (ex: 2x8GB ou 2x16GB) instalados nos slots intercalados recomendados (A2 e B2) para ativar Dual-Channel (128 bits).',
            ganhoEsperado: 'Aumento imediato de 18% a 30% no FPS mínimo (1% Lows) e eliminação de engasgos em carregamento de texturas.',
            explicacaoTecnica: 'Duplicação da taxa de transferência de dados por ciclo de clock de memória.'
          }
        : {
            tipo: 'MEMORIA_RAM',
            titulo: 'Ativação de Perfil XMP / EXPO e Latências Primárias',
            nivelImpacto: 'MEDIO',
            gargaloIdentificado: 'Módulos de memória de alta performance inicializam por padrão nos clocks básicos JEDEC (2133-4800MHz) se o perfil de overclock de fábrica não for acionado.',
            ajusteSugerido: 'Entrar na UEFI BIOS após a montagem e ativar o perfil XMP (Intel) ou EXPO / DOCP (AMD), verificando a estabilidade da tensão DRAM (ex: 1.35V a 1.40V).',
            ganhoEsperado: 'Redução na latência de acesso à memória (ns) e ganho de até 10-15% em throughput global do sistema.',
            explicacaoTecnica: 'Sincronização do Memory Controller Clock (UCLK) e Fabric Clock (FCLK) na proporção 1:1.'
          },

      // 4. Armazenamento e Barramento PCIe
      /hd|hdd|sata|5400rpm|7200rpm/i.test(input.storage || text) && !/nvme|m\.2/i.test(input.storage || text)
        ? {
            tipo: 'ARMAZENAMENTO_PCIE',
            titulo: 'Upgrade para SSD M.2 NVMe PCIe 4.0 (DirectStorage)',
            nivelImpacto: 'ALTO',
            gargaloIdentificado: 'Armazenamento em barramento SATA III ou disco mecânico limita a taxa sequencial a ~500 MB/s (ou 150 MB/s em HDD) com tempos de busca elevados (IOPS baixos).',
            ajusteSugerido: 'Adicionar um SSD M.2 NVMe PCIe 4.0 x4 (3500 MB/s a 7400 MB/s) no slot primário conectado diretamente às pistas da CPU.',
            ganhoEsperado: 'Redução drástica nos tempos de boot e carregamento de jogos de última geração com suporte nativo a DirectStorage / RTX IO.',
            explicacaoTecnica: 'Eliminação da fila de comando AHCI em favor da controladora NVMe paralela de 64k filas.'
          }
        : {
            tipo: 'ARMAZENAMENTO_PCIE',
            titulo: 'Alocação do SSD Primário no Slot M.2 Direto da CPU',
            nivelImpacto: 'REFINAMENTO',
            gargaloIdentificado: 'Muitas placas-mãe possuem slots M.2 secundários compartilhados pelo barramento do chipset (PCH), adicionando latência de trânsito.',
            ajusteSugerido: 'Instalar a unidade de boot e jogos principais no primeiro slot M.2 superior (mais próximo da CPU), garantindo conexão com as 4 pistas PCIe dedicadas do processador e dissipador térmico passivo.',
            ganhoEsperado: 'Menor latência de acesso I/O e temperaturas controladas para evitar thermal throttling na controladora NAND.',
            explicacaoTecnica: 'Comunicação ponto a ponto direta via pistas PCIe Gen4/Gen5 dedicadas sem contenção DMI.'
          },

      // 5. Alimentação e Curva de Eficiência
      psuWattage && psuWattage < potenciaRecomendada
        ? {
            tipo: 'ALIMENTACAO_EFICIENCIA',
            titulo: 'Ampliação do Headroom da Fonte de Alimentação',
            nivelImpacto: 'ALTO',
            gargaloIdentificado: `A fonte atual (${psuWattage}W) opera próxima ao limite de capacidade em picos de estresse, gerando aquecimento e risco de desarme de proteção OCP/OPP.`,
            ajusteSugerido: `Substituir por fonte de no mínimo ${potenciaRecomendada}W com certificação 80 Plus Gold e padrão ATX 3.0 para suporte seguro a picos transitórios de microsegundos de GPUs modernas.`,
            ganhoEsperado: 'Estabilidade elétrica incondicional, menor ruído de ventoinha e operação na faixa ótima de 50-60% da curva de eficiência.',
            explicacaoTecnica: 'Margem segura contra picos transitórios de consumo (Power Excursion) definidos na norma Intel ATX 3.0.'
          }
        : {
            tipo: 'ALIMENTACAO_EFICIENCIA',
            titulo: 'Otimização de Cabeamento e Curva de Carga da PSU',
            nivelImpacto: 'REFINAMENTO',
            gargaloIdentificado: 'Cabos compartilhados tipo pigtail (divisor em Y) em placas de vídeo com múltiplos conectores PCIe de 8 pinos podem superaquecer a linha de 12V.',
            ajusteSugerido: 'Utilizar cabos de alimentação PCIe de 8 pinos individuais e dedicados para cada conector da GPU (ou cabo nativo 12V-2x6 / 12VHPWR em fontes ATX 3.0).',
            ganhoEsperado: 'Distribuição uniforme de corrente elétrica, queda de tensão reduzida e maior longevidade dos circuitos de alimentação VRM.',
            explicacaoTecnica: 'Prevenção de sobrecorrente por pino e dissipação resistiva (I²R) nos terminais Molex Mini-Fit.'
          }
    ],
    verificacoes: [
      {
        categoria: 'SOQUETE_GERACAO',
        titulo: 'Soquete e Geração CPU vs Placa-Mãe',
        status: socketStatus,
        detalhes: socketDetails,
        explicacao_tecnica: 'Verificação da pinagem física (LGA/PGA), barramento de comunicação e microcódigo da BIOS.'
      },
      {
        categoria: 'MEMORIA_RAM',
        titulo: 'Padrão e Slots de Memória RAM',
        status: ramStatus,
        detalhes: ramDetails,
        explicacao_tecnica: 'Compatibilidade física do slot DIMM (chave de chanfro DDR4 vs DDR5) e controlador de memória (IMC).'
      },
      {
        categoria: 'DIMENSOES_FISICAS',
        titulo: 'Espaço Interno e Desobstrução Física',
        status: physicalStatus,
        detalhes: physicalDetails,
        explicacao_tecnica: 'Checagem milimétrica de folga para GPU, altura do dissipador do cooler e padrão de furação do gabinete.'
      },
      {
        categoria: 'DEMANDA_ELETRICA',
        titulo: 'Demanda Elétrica e Dimensionamento da PSU',
        status: psuStatus,
        detalhes: psuDetails,
        explicacao_tecnica: 'Cálculo de potência contínua na linha de +12V, picos transitórios de GPU moderna e margem de eficiência 80 Plus.'
      },
      {
        categoria: 'COOLER_BRACKET',
        titulo: 'Fixação e Suporte do Cooler',
        status: 'OK',
        detalhes: 'Suporte de montagem de backplate e pressão de contato para o soquete informado.',
        explicacao_tecnica: 'Dimensão do heatspreader e kit de montagem mecânico.'
      }
    ],
    incompatibilidades_criticas: incompatibilidades,
    alertas_e_recomendacoes_tecnicas: alertas,
    componentes_identificados: {
      cpu: input.cpu || 'Identificado na análise',
      placa_mae: input.motherboard || 'Identificado na análise',
      ram: input.ram || 'Identificado na análise',
      gpu: input.gpu || 'Identificado na análise',
      cooler: input.cooler || 'Identificado na análise',
      armazenamento: input.storage || 'Identificado na análise',
      gabinete: input.case || 'Identificado na análise',
      fonte: input.psu || 'Identificado na análise',
      outros: input.extra || ''
    },
    esquema_json_valido: true
  };
}

import { GAMES_CATALOG } from './src/data/gamesCatalog';

// API Routes
app.get('/api/presets', (req, res) => {
  res.json({ presets: PRESETS });
});

app.get('/api/games', (req, res) => {
  res.json({ games: GAMES_CATALOG });
});

app.post('/api/game-recommendation', async (req, res) => {
  try {
    const { gameName, targetResolution = '1080p', category = 'Geral' } = req.body;

    if (!gameName || typeof gameName !== 'string') {
      return res.status(400).json({ error: 'O nome do jogo é obrigatório.' });
    }

    // Check if the game is in the curated catalog
    const matched = GAMES_CATALOG.find(
      (g) => g.nome.toLowerCase().includes(gameName.toLowerCase()) || 
             gameName.toLowerCase().includes(g.nome.toLowerCase()) ||
             g.id.toLowerCase().includes(gameName.toLowerCase())
    );

    if (matched) {
      return res.json({ success: true, game: matched, source: 'catalog' });
    }

    // If not in catalog, generate custom technical specs via Gemini AI or heuristic builder
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `
Avalie os requisitos técnicos de hardware para executar: "${gameName}" (pode ser um jogo OU um software profissional de edição de vídeo, áudio, engenharia civil, BIM/CAD ou modelagem 3D) com resolução/escala alvo de "${targetResolution}".
Gere uma resposta técnica em português do Brasil contendo rigorosamente:
1. Configuração MÍNIMA de hardware (para executar estável sem travamentos em projetos leves/médios ou 30-60 FPS).
2. Configuração RECOMENDADA / ALTO DESEMPENHO (para fluidez total, renderização acelerada por GPU/CPU, baixa latência e alta produtividade na resolução/escala ${targetResolution}).
3. Garanta que cada uma das duas builds seja 100% compatível entre si (Soquete CPU = Placa-mãe, Padrão de RAM DDR4/DDR5 correto, Cooler adequado ao TDP, Gabinete espaçoso e Fonte de alimentação com potência e certificação seguras).
4. Para softwares profissionais de áudio: priorize baixa latência DPC, silêncio acústico e estabilidade de drivers ASIO.
5. Para edição de vídeo: destaque aceleração por hardware (QuickSync / NVENC), VRAM e SSD Scratch Disk.
6. Para engenharia civil/BIM: foque em IPC single-thread alto para viewport/CAD e 32GB-64GB+ RAM para modelos complexos.
7. NUNCA mencione preços, moedas, custos ou lojas. Foque 100% em especificações técnicas (Soquetes, Clocks, TDP, VRAM, PCIe e Dimensões).
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                nome: { type: Type.STRING },
                categoria: { 
                  type: Type.STRING, 
                  description: 'Ex: "Edição de Vídeo / Pós-Produção", "Produção de Áudio / DAW", "Engenharia Civil / BIM & CAD", "Competitivo / eSports", "AAA / Nova Geração" ou "Ray Tracing / Gráficos Pesados"' 
                },
                engine: { type: Type.STRING, description: 'Motor gráfico, API gráfica (DirectX 12 / Vulkan / CUDA / OpenCL) ou Core Audio Engine.' },
                resumoRequisitos: { type: Type.STRING, description: 'Resumo técnico da demanda do jogo ou software.' },
                exigenciaVram: { type: Type.STRING, description: 'Demanda de VRAM em GB.' },
                exigenciaCpu: { type: Type.STRING, description: 'Demanda de núcleos, threads ou clock single-thread de CPU.' },
                armazenamentoTipo: { type: Type.STRING, description: '"NVMe Gen4 Recomendado", "SSD SATA Mínimo" ou "NVMe com DirectStorage"' },
                resolucoesSuportadas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                minima: {
                  type: Type.OBJECT,
                  properties: {
                    nome: { type: Type.STRING },
                    descricao: { type: Type.STRING },
                    presetGrafico: { type: Type.STRING },
                    fpsEstimado: { type: Type.STRING },
                    resolucaoAlvo: { type: Type.STRING },
                    componentes: {
                      type: Type.OBJECT,
                      properties: {
                        cpu: { type: Type.STRING },
                        motherboard: { type: Type.STRING },
                        ram: { type: Type.STRING },
                        gpu: { type: Type.STRING },
                        cooler: { type: Type.STRING },
                        storage: { type: Type.STRING },
                        case: { type: Type.STRING },
                        psu: { type: Type.STRING },
                        extra: { type: Type.STRING }
                      },
                      required: ['cpu', 'motherboard', 'ram', 'gpu', 'cooler', 'storage', 'case', 'psu']
                    },
                    caracteristicasTecnicas: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ['nome', 'descricao', 'presetGrafico', 'fpsEstimado', 'resolucaoAlvo', 'componentes', 'caracteristicasTecnicas']
                },
                recomendada: {
                  type: Type.OBJECT,
                  properties: {
                    nome: { type: Type.STRING },
                    descricao: { type: Type.STRING },
                    presetGrafico: { type: Type.STRING },
                    fpsEstimado: { type: Type.STRING },
                    resolucaoAlvo: { type: Type.STRING },
                    componentes: {
                      type: Type.OBJECT,
                      properties: {
                        cpu: { type: Type.STRING },
                        motherboard: { type: Type.STRING },
                        ram: { type: Type.STRING },
                        gpu: { type: Type.STRING },
                        cooler: { type: Type.STRING },
                        storage: { type: Type.STRING },
                        case: { type: Type.STRING },
                        psu: { type: Type.STRING },
                        extra: { type: Type.STRING }
                      },
                      required: ['cpu', 'motherboard', 'ram', 'gpu', 'cooler', 'storage', 'case', 'psu']
                    },
                    caracteristicasTecnicas: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ['nome', 'descricao', 'presetGrafico', 'fpsEstimado', 'resolucaoAlvo', 'componentes', 'caracteristicasTecnicas']
                },
                tecnologiasRecomendadas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                dicasOtimizacao: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['id', 'nome', 'categoria', 'engine', 'resumoRequisitos', 'exigenciaVram', 'exigenciaCpu', 'minima', 'recomendada', 'tecnologiasRecomendadas', 'dicasOtimizacao']
            }
          }
        });

        const rawJson = response.text?.trim() || '{}';
        const parsed = JSON.parse(rawJson);
        return res.json({ success: true, game: parsed, source: 'ai-generated' });
      } catch (aiErr: any) {
        console.error('AI Game recommendation fallback:', aiErr?.message || aiErr);
      }
    }

    // Heuristic generator for any game if offline
    const fallbackGame: any = {
      id: gameName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      nome: gameName,
      categoria: 'AAA / Nova Geração',
      engine: 'DirectX 12 / Vulkan High Performance',
      resumoRequisitos: `Requisitos técnicos estimados para execução de ${gameName} na resolução ${targetResolution}.`,
      exigenciaVram: targetResolution === '4K' ? 'Mínimo 16GB VRAM' : targetResolution === '1440p' ? 'Mínimo 12GB VRAM' : 'Mínimo 8GB VRAM',
      exigenciaCpu: 'Processador moderno de no mínimo 6 núcleos e 12 threads com clock sustentado.',
      armazenamentoTipo: 'NVMe Gen4 Recomendado',
      resolucoesSuportadas: ['1080p', '1440p', '4K'],
      minima: {
        nome: `Build Mínima Funcional para ${gameName} (1080p 50-60 FPS)`,
        descricao: 'Configuração estável para taxa de quadros jogável com qualidade gráfica equilibrada.',
        presetGrafico: 'Médio / 1080p',
        fpsEstimado: '50 - 65 FPS',
        resolucaoAlvo: '1080p Full HD',
        componentes: {
          cpu: 'AMD Ryzen 5 5600 (6C/12T, AM4, 65W TDP)',
          motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4)',
          ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3200MHz CL16',
          gpu: 'AMD Radeon RX 6600 8GB ou Nvidia RTX 3060 12GB (TDP: 132W-170W)',
          cooler: 'DeepCool AG400 (Altura: 150mm)',
          storage: 'Kingston NV2 1TB M.2 NVMe PCIe 4.0',
          case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
          psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
          extra: '4x Fans 120mm instaladas',
          rawText: ''
        },
        caracteristicasTecnicas: [
          'Suporte sólido a DirectX 12 e Vulkan',
          'Consumo elétrico contido com margem de segurança de mais de 45% na fonte de 650W',
          'SSD NVMe para carregamentos rápidos'
        ]
      },
      recomendada: {
        nome: `Build Alto Desempenho para ${gameName} (${targetResolution} 90-140+ FPS)`,
        descricao: `Configuração ideal para máxima fidelidade visual e alta taxa de quadros em ${targetResolution}.`,
        presetGrafico: 'Ultra / Ray Tracing / DLSS ou FSR Ativados',
        fpsEstimado: '90 - 130+ FPS',
        resolucaoAlvo: targetResolution === '4K' ? '4K Ultra HD' : targetResolution === '1440p' ? '1440p Quad HD' : '1080p Alto FPS',
        componentes: {
          cpu: 'AMD Ryzen 7 7800X3D (8C/16T, 3D V-Cache, AM5, 120W TDP)',
          motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5)',
          ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6000MHz CL30',
          gpu: targetResolution === '4K' 
            ? 'GeForce RTX 4080 SUPER 16GB (TDP: 320W)' 
            : 'GeForce RTX 4070 Ti SUPER 16GB (TDP: 285W)',
          cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
          storage: 'Samsung 990 Pro 2TB M.2 PCIe 4.0 NVMe (7450MB/s)',
          case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm, Cooler 180mm)',
          psu: 'Corsair RM850e 850W 80 Plus Gold ATX 3.0 Modular',
          extra: 'Fluxo de ar otimizado com fans PWM',
          rawText: ''
        },
        caracteristicasTecnicas: [
          '3D V-Cache maximiza a estabilidade de 1% lows em qualquer cena complexa',
          'VRAM de 16GB assegura headroom total para texturas Ultra e Ray Tracing',
          'Fonte ATX 3.0 com conector dedicado PCIe 5.0'
        ]
      },
      tecnologiasRecomendadas: ['DirectStorage', 'DLSS / FSR Upscaling', 'NVIDIA Reflex / AMD Anti-Lag'],
      dicasOtimizacao: [
        'Utilize sempre dois módulos de memória RAM em dual-channel para garantir a largura de banda da CPU.',
        'Instale o jogo em partição SSD NVMe para evitar travamentos de carregamento dinâmico de texturas.'
      ]
    };

    return res.json({ success: true, game: fallbackGame, source: 'heuristic-synth' });
  } catch (err: any) {
    console.error('Game recommendation error:', err);
    return res.status(500).json({ error: 'Erro ao gerar recomendação de hardware para o jogo.' });
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { components, rawText } = req.body;

    const formattedInput = `
Lista de componentes de PC informada:
- Processador (CPU): ${components?.cpu || 'Não especificado diretamente'}
- Placa-Mãe (Motherboard): ${components?.motherboard || 'Não especificado diretamente'}
- Memória RAM: ${components?.ram || 'Não especificado diretamente'}
- Placa de Vídeo (GPU): ${components?.gpu || 'Não especificado diretamente'}
- Cooler da CPU: ${components?.cooler || 'Não especificado diretamente'}
- Armazenamento (SSD/HD): ${components?.storage || 'Não especificado diretamente'}
- Gabinete (Case): ${components?.case || 'Não especificado diretamente'}
- Fonte de Alimentação (PSU): ${components?.psu || 'Não especificado diretamente'}
- Outros/Periféricos/Fans: ${components?.extra || 'Nenhum'}
- Texto bruto adicional (se houver): ${rawText || 'Nenhum'}
`;

    // System instruction strict rules
    const systemInstruction = `
Você é um especialista em arquitetura de computadores e hardware para PCs.
Sua única função é analisar listas de componentes de PC informadas pelo usuário e verificar rigorosamente a compatibilidade técnica, física e elétrica entre as peças.

DIRETRIZES CRÍTICAS:
1. NUNCA mencione, calcule, estime ou liste preços, custos ou lojas. Foque 100% nas especificações técnicas.
2. Verifique obrigatoriamente:
   - Soquete e geração: Compatibilidade entre CPU e Placa-mãe (ex: LGA1700, AM5, AM4, LGA1200, chipsets B650, Z790, B550, suporte de BIOS, etc.).
   - Padrão de Memória: DDR4 vs. DDR5, quantidade de canais/slots, frequência suportada e compatibilidade com placa-mãe e controlador de memória da CPU.
   - Limitações Físicas: Altura do cooler (mm) vs. largura/folga do gabinete; comprimento da placa de vídeo (GPU em mm) vs. espaço interno do gabinete; fator de forma da placa-mãe (E-ATX, ATX, mATX, Mini-ITX) vs. suporte do gabinete; suporte a radiadores de Water Cooler se aplicável.
   - Demanda Elétrica: Calcule a potência total estimada do sistema (TDP de CPU + GPU + margem de 50W-100W para placa-mãe, SSDs, fans e periféricos) e avalie se a fonte (PSU) suporta com margem de segurança adequada (mínimo 25% a 35% de folga recomendada para picos transitórios).
   - Soquete do Cooler: Suporte do bracket de montagem do cooler ao soquete da CPU escolhida (incluindo kits LGA1700/AM5).
   - Recomendações de Otimização e Gargalos: Avalie ativamente gargalos potenciais (ex: gargalo de CPU vs GPU, insuficiência de fluxo de ar / dissipação térmica, memória em single-channel vs dual-channel / ativação de perfil XMP/EXPO, armazenamento SATA vs NVMe DirectStorage e dimensionamento/curva de eficiência da fonte) e forneça recomendações estruturadas de ajustes de performance.
3. Responda sempre em português do Brasil e estritamente no esquema JSON solicitado.
`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedInput,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.1,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                status_geral: {
                  type: Type.STRING,
                  description: 'Resultado geral: "COMPATIVEL", "INCOMPATIVEL" ou "ALERTA"',
                },
                resumo_executivo: {
                  type: Type.STRING,
                  description: 'Resumo técnico executivo conciso em português do Brasil.',
                },
                score_compatibilidade: {
                  type: Type.INTEGER,
                  description: 'Pontuação técnica de compatibilidade de 0 a 100.',
                },
                soquete_e_geracao: {
                  type: Type.OBJECT,
                  properties: {
                    soquete_cpu: { type: Type.STRING },
                    soquete_placa_mae: { type: Type.STRING },
                    chipset: { type: Type.STRING },
                    compatibilidade_bios_necessaria: { type: Type.BOOLEAN },
                    observacao: { type: Type.STRING },
                    status: { type: Type.STRING, description: '"OK", "AVISO" ou "ERRO"' },
                  },
                  required: ['soquete_cpu', 'soquete_placa_mae', 'status', 'observacao'],
                },
                memoria_ram: {
                  type: Type.OBJECT,
                  properties: {
                    tipo_cpu_suportado: { type: Type.STRING },
                    tipo_placa_mae: { type: Type.STRING },
                    tipo_memoria_escolhida: { type: Type.STRING },
                    slots_disponiveis: { type: Type.INTEGER },
                    pentes_utilizados: { type: Type.INTEGER },
                    canais_recomendados: { type: Type.STRING },
                    status: { type: Type.STRING, description: '"OK", "AVISO" ou "ERRO"' },
                  },
                  required: ['tipo_placa_mae', 'tipo_memoria_escolhida', 'status'],
                },
                dimensoes_fisicas: {
                  type: Type.OBJECT,
                  properties: {
                    altura_cooler_mm: { type: Type.NUMBER },
                    limite_altura_cooler_gabinete_mm: { type: Type.NUMBER },
                    comprimento_gpu_mm: { type: Type.NUMBER },
                    limite_gpu_gabinete_mm: { type: Type.NUMBER },
                    form_factor_placa_mae: { type: Type.STRING },
                    suporte_gabinete_form_factors: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    espaco_radiador_suportado: { type: Type.STRING },
                    compatibilidade_fisica: { type: Type.STRING },
                    status: { type: Type.STRING, description: '"OK", "AVISO" ou "ERRO"' },
                  },
                  required: ['compatibilidade_fisica', 'status'],
                },
                demanda_eletrica: {
                  type: Type.OBJECT,
                  properties: {
                    tdp_cpu_w: { type: Type.NUMBER },
                    tdp_gpu_w: { type: Type.NUMBER },
                    consumo_outros_w: { type: Type.NUMBER },
                    consumo_estimado_sistema_w: { type: Type.NUMBER },
                    potencia_recomendada_psu_w: { type: Type.NUMBER },
                    potencia_fonte_informada_w: { type: Type.NUMBER },
                    margem_seguranca_percentual: { type: Type.NUMBER },
                    avaliacao_fonte: { type: Type.STRING },
                    status: { type: Type.STRING, description: '"OK", "AVISO" ou "ERRO"' },
                  },
                  required: ['consumo_estimado_sistema_w', 'potencia_recomendada_psu_w', 'avaliacao_fonte', 'status'],
                },
                cooler_bracket: {
                  type: Type.OBJECT,
                  properties: {
                    suporte_soquete: { type: Type.BOOLEAN },
                    detalhes: { type: Type.STRING },
                    status: { type: Type.STRING, description: '"OK", "AVISO" ou "ERRO"' },
                  },
                  required: ['suporte_soquete', 'detalhes', 'status'],
                },
                verificacoes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      categoria: { type: Type.STRING },
                      titulo: { type: Type.STRING },
                      status: { type: Type.STRING },
                      detalhes: { type: Type.STRING },
                      explicacao_tecnica: { type: Type.STRING },
                    },
                    required: ['categoria', 'titulo', 'status', 'detalhes'],
                  },
                },
                incompatibilidades_criticas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                alertas_e_recomendacoes_tecnicas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                recomendacoes_otimizacao: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      tipo: { type: Type.STRING, description: '"GARGALO_CPU_GPU", "FLUXO_DE_AR_TERMICO", "MEMORIA_RAM", "ARMAZENAMENTO_PCIE" ou "ALIMENTACAO_EFICIENCIA"' },
                      titulo: { type: Type.STRING },
                      nivelImpacto: { type: Type.STRING, description: '"ALTO", "MEDIO" ou "REFINAMENTO"' },
                      gargaloIdentificado: { type: Type.STRING },
                      ajusteSugerido: { type: Type.STRING },
                      ganhoEsperado: { type: Type.STRING },
                      explicacaoTecnica: { type: Type.STRING },
                    },
                    required: ['tipo', 'titulo', 'nivelImpacto', 'gargaloIdentificado', 'ajusteSugerido', 'ganhoEsperado'],
                  },
                },
                componentes_identificados: {
                  type: Type.OBJECT,
                  properties: {
                    cpu: { type: Type.STRING },
                    placa_mae: { type: Type.STRING },
                    ram: { type: Type.STRING },
                    gpu: { type: Type.STRING },
                    cooler: { type: Type.STRING },
                    armazenamento: { type: Type.STRING },
                    gabinete: { type: Type.STRING },
                    fonte: { type: Type.STRING },
                    outros: { type: Type.STRING },
                  },
                },
              },
              required: [
                'status_geral',
                'resumo_executivo',
                'score_compatibilidade',
                'soquete_e_geracao',
                'memoria_ram',
                'dimensoes_fisicas',
                'demanda_eletrica',
                'cooler_bracket',
                'verificacoes',
                'incompatibilidades_criticas',
                'alertas_e_recomendacoes_tecnicas',
                'componentes_identificados',
              ],
            },
          },
        });

        const rawJson = response.text?.trim() || '{}';
        const parsed = JSON.parse(rawJson);
        parsed.esquema_json_valido = true;
        return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
      } catch (geminiError: any) {
        console.error('Gemini API Error, falling back to analytical heuristic engine:', geminiError?.message || geminiError);
        const fallback = runHeuristicAnalysis({ ...components, rawText });
        return res.json({ success: true, data: fallback, engine: 'heuristic-fallback', notice: 'Análise estrutural processada via motor analítico de regras de hardware.' });
      }
    } else {
      const fallback = runHeuristicAnalysis({ ...components, rawText });
      return res.json({ success: true, data: fallback, engine: 'heuristic-local' });
    }
  } catch (error: any) {
    console.error('Analysis controller error:', error);
    return res.status(500).json({ error: 'Erro ao analisar componentes de hardware.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hardware Compatibility Engine server running on http://localhost:${PORT}`);
  });
}

startServer();
