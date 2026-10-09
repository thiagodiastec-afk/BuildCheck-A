import type { GameRequirement } from '../types';

export const GAMES_CATALOG: GameRequirement[] = [
  {
    id: 'cyberpunk-2077',
    nome: 'Cyberpunk 2077: Phantom Liberty',
    categoria: 'Ray Tracing / Gráficos Pesados',
    engine: 'REDengine 4 (DirectX 12 Ultimate / Path Tracing Overdrive)',
    resumoRequisitos: 'Exige alto poder de computação gráfica e suporte a tecnologias de reconstrução de raios (Ray Reconstruction) e DirectStorage.',
    exigenciaVram: 'Mínimo 8GB para 1080p; Recomendado 12GB - 16GB para Path Tracing e texturas Ultra.',
    exigenciaCpu: 'Alto uso de multithreading (8+ threads) devido à simulação de multidão e tráfego de Night City.',
    armazenamentoTipo: 'NVMe Gen4 Recomendado',
    resolucoesSuportadas: ['1080p', '1440p', '4K'],
    minima: {
      nome: 'Build AMD Mínima Estável (1080p 50-65 FPS)',
      descricao: 'Configuração equilibrada AMD para rodar em 1080p na qualidade Média/Alta com DLSS/FSR em modo Qualidade.',
      presetGrafico: 'Médio / Texturas Altas (Sem Ray Tracing)',
      fpsEstimado: '50 - 65 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'AMD Ryzen 5 5600 (6 Núcleos / 12 Threads, Soquete AM4, 65W TDP)',
        motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4)',
        ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 3060 12GB GDDR6 (Comprimento: 242mm, TDP: 170W)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe PCIe 4.0 (3500MB/s)',
        case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: '4x Fans 120mm instaladas',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'VRAM de 12GB garante que não haja estouro de memória de textura em 1080p',
        'Ryzen 5 5600 mantém 1% low frames acima de 40 FPS no centro da cidade',
        'SSD NVMe elimina o pop-in de veículos e texturas em alta velocidade'
      ]
    },
    recomendada: {
      nome: 'Build AMD Alta Performance / Ray Tracing (1440p / 4K 90-120+ FPS)',
      descricao: 'Máximo desempenho com processador AMD 3D V-Cache e Ray Tracing Overdrive ativados com fluidez total.',
      presetGrafico: 'Ultra / Ray Tracing Overdrive / DLSS 3.7 Frame Gen',
      fpsEstimado: '90 - 130 FPS (1440p) / 60 - 85 FPS (4K)',
      resolucaoAlvo: '1440p Quad HD / 4K UHD',
      componentes: {
        cpu: 'AMD Ryzen 7 7800X3D (8 Núcleos / 16 Threads, 3D V-Cache, AM5, 120W TDP)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6000MHz CL30 AMD EXPO',
        gpu: 'ASUS TUF GeForce RTX 4070 Ti SUPER 16GB (Comprimento: 305mm, TDP: 285W)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Samsung 990 Pro 2TB M.2 NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU até 392mm, Cooler 180mm)',
        psu: 'Corsair RM850e 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Suporte anti-sag para GPU incluso no gabinete',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '3D V-Cache do 7800X3D elimina qualquer gargalo de CPU em áreas densas como Dogtown',
        'RTX 4070 Ti SUPER 16GB suporta Shader Execution Reordering (SER) e Frame Generation',
        'Fonte ATX 3.0 com conector nativo 12VHPWR para estabilidade sob picos de transientes'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Mínima Estável (1080p 55-70 FPS)',
      descricao: 'Configuração Intel Core i5 com arquitetura híbrida para excelente estabilidade em 1080p.',
      presetGrafico: 'Médio / Texturas Altas (Sem Ray Tracing)',
      fpsEstimado: '55 - 70 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-12400F (6 Núcleos / 12 Threads, Soquete LGA1700, 65W TDP)',
        motherboard: 'Gigabyte B760M DS3H DDR4 (Socket LGA1700, Micro-ATX, DDR4)',
        ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 3060 12GB GDDR6 (Comprimento: 242mm, TDP: 170W)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm, Bracket LGA1700)',
        storage: 'Kingston NV2 1TB M.2 NVMe PCIe 4.0 (3500MB/s)',
        case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: '4x Fans 120mm instaladas',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Arquitetura Golden Cove de alto IPC entrega excelente consistência de frametime',
        'VRAM de 12GB para texturas pesadas de Night City sem estouro de buffer',
        'Placa-mãe B760 com suporte para upgrades futuros até a 14ª Geração Intel'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Alta Performance / Ray Tracing (1440p / 4K 95-135+ FPS)',
      descricao: 'Processador Intel Core i7 de 20 núcleos com memórias DDR5 velozes e Ray Tracing completo.',
      presetGrafico: 'Ultra / Ray Tracing Overdrive / DLSS 3.7 Frame Gen',
      fpsEstimado: '95 - 135 FPS (1440p) / 65 - 90 FPS (4K)',
      resolucaoAlvo: '1440p Quad HD / 4K UHD',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, LGA1700, Turbo até 5.6GHz, 253W)',
        motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6400MHz CL32 Intel XMP',
        gpu: 'ASUS TUF GeForce RTX 4070 Ti SUPER 16GB (Comprimento: 305mm, TDP: 285W)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 2TB M.2 NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta Radiador 360mm, GPU 392mm)',
        psu: 'Corsair RM850e 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Suporte anti-sag para GPU incluso',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '20 núcleos (8 P-Cores + 12 E-Cores) lidam simultaneamente com IA de NPCs, streaming e traçado de raios',
        'Water Cooler 360mm com ventoinha dedicada para resfriar os VRMs da placa-mãe Z790',
        'Memórias DDR5 6400MHz com Intel XMP 3.0 para largura de banda de até 100 GB/s'
      ]
    },
    tecnologiasRecomendadas: ['DLSS 3.7 / FSR 3.1', 'Ray Reconstruction', 'DirectStorage', 'Shader Execution Reordering'],
    dicasOtimizacao: [
      'Ative o Crowd Density no Médio/Alto para aliviar o gargalo de CPU sem perda visual perceptível.',
      'Instalar obrigatoriamente em SSD NVMe para evitar microtravamentos no carregamento de streaming de mapa.'
    ]
  },
  {
    id: 'black-myth-wukong',
    nome: 'Black Myth: Wukong',
    categoria: 'AAA / Nova Geração',
    engine: 'Unreal Engine 5.4 (Nanite Geometry, Lumen Global Illumination & Full Path Tracing)',
    resumoRequisitos: 'Titulado como um dos jogos mais exigentes da atualidade na Unreal Engine 5, demanda poder de sombreamento massivo e compilador de shaders veloz.',
    exigenciaVram: 'Mínimo 8GB (com FSR/DLSS); 12GB - 16GB para texturas Cinemáticas e Iluminação Global Total.',
    exigenciaCpu: 'Necessita de arquiteturas modernas com instruções AVX2 e alto IPC para gerenciar os clusters Nanite.',
    armazenamentoTipo: 'NVMe Gen4 Recomendado',
    resolucoesSuportadas: ['1080p', '1440p', '4K'],
    minima: {
      nome: 'Build AMD Mínima Otimizada (1080p 55-65 FPS)',
      descricao: 'Permite jogar a campanha com estabilidade e visuais fiéis com upscaling habilitado.',
      presetGrafico: 'Médio / Super Sampling 65%',
      fpsEstimado: '55 - 65 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'AMD Ryzen 5 5600 (6 Núcleos / 12 Threads, AM4, 65W TDP)',
        motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4)',
        ram: 'Team Group T-Force Vulcan 16GB (2x8GB) DDR4-3200MHz CL16',
        gpu: 'AMD Radeon RX 6700 XT 12GB ou RTX 3060 12GB (Comprimento: 267mm, TDP: 230W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Adata Legend 800 1TB M.2 PCIe 4.0 NVMe',
        case: 'Pichau Kazer Micro-ATX (Suporta GPU 320mm, Cooler 160mm)',
        psu: 'Galax Omega GL650S 650W 80 Plus Bronze',
        extra: '3x Ventoinhas frontais',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'VRAM de 12GB impede vazamento de memória durante batalhas com chefes complexos',
        'Processador de 12 threads mantém renderização de física e partículas fluida',
        'Armazenamento NVMe para descompactação rápida de assets da UE5'
      ]
    },
    recomendada: {
      nome: 'Build AMD Desempenho Supremo / Cinemático (1440p / 4K 80-110 FPS)',
      descricao: 'Renderização no preset Cinemático com Full Path Tracing e fidelidade visual máxima da Unreal Engine 5.',
      presetGrafico: 'Cinemático / Full Ray Tracing / DLSS Frame Gen',
      fpsEstimado: '80 - 110 FPS',
      resolucaoAlvo: '1440p / 4K UHD',
      componentes: {
        cpu: 'AMD Ryzen 7 7800X3D (8 Núcleos / 16 Threads, AM5, 120W TDP)',
        motherboard: 'Gigabyte B650 AORUS ELITE AX V2 (Socket AM5, ATX, DDR5)',
        ram: 'Kingston Fury Renegade 32GB (2x16GB) DDR5-6000MHz CL32',
        gpu: 'Gigabyte GeForce RTX 4080 SUPER Gaming OC 16GB (Comprimento: 342mm, TDP: 320W)',
        cooler: 'DeepCool LT720 360mm Liquid Cooler',
        storage: 'WD Black SN850X 2TB NVMe PCIe 4.0 (7300MB/s)',
        case: 'Montech King 95 Pro (Suporta GPU 420mm, Radiador 360mm)',
        psu: 'Super Flower LEADEX VII Gold 850W ATX 3.0 PCIe 5.0',
        extra: 'Fluxo de ar panorâmico com 6 fans pré-instaladas',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'RTX 4080 SUPER com 10.240 núcleos CUDA e 3ª geração de RT Cores domina o Path Tracing',
        'Memórias DDR5 6000MHz com baixa latência para alimentar o fluxo contínuo de Nanite meshes',
        'Water Cooler 360mm mantendo o CPU abaixo de 68°C em cargas pesadas de shaders'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Mínima Otimizada (1080p 55-65 FPS)',
      descricao: 'Configuração com Intel Core i5-12400F para desfrutar da jornada sem travamentos.',
      presetGrafico: 'Médio / Super Sampling 65%',
      fpsEstimado: '55 - 65 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-12400F (6 Núcleos / 12 Threads, LGA1700, 65W TDP)',
        motherboard: 'ASRock B760M-HDV/M.2 D4 (Socket LGA1700, mATX, DDR4)',
        ram: 'Team Group T-Force Vulcan 16GB (2x8GB) DDR4-3200MHz CL16',
        gpu: 'AMD Radeon RX 6700 XT 12GB ou RTX 3060 12GB (Comprimento: 267mm, TDP: 230W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Adata Legend 800 1TB M.2 PCIe 4.0 NVMe',
        case: 'Pichau Kazer Micro-ATX (Suporta GPU 320mm, Cooler 160mm)',
        psu: 'Galax Omega GL650S 650W 80 Plus Bronze',
        extra: '3x Ventoinhas frontais',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Excelente relação de custo por frame no soquete Intel LGA1700',
        'Controlador de memória integrado robusto para taxas de transferência consistentes',
        'Fonte de 650W com folga térmica'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Desempenho Supremo Cinemático (1440p / 4K 85-115 FPS)',
      descricao: 'Processador Intel Core i7-14700K aliado à RTX 4080 SUPER para Full Path Tracing e gráficos cinemáticos.',
      presetGrafico: 'Cinemático / Full Ray Tracing / DLSS Frame Gen',
      fpsEstimado: '85 - 115 FPS',
      resolucaoAlvo: '1440p / 4K UHD',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, LGA1700, Turbo até 5.6GHz, 253W)',
        motherboard: 'Gigabyte Z790 AORUS ELITE AX (Socket LGA1700, ATX, DDR5)',
        ram: 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400MHz CL32',
        gpu: 'Gigabyte GeForce RTX 4080 SUPER Gaming OC 16GB (Comprimento: 342mm, TDP: 320W)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'WD Black SN850X 2TB NVMe PCIe 4.0 (7300MB/s)',
        case: 'Montech King 95 Pro (Suporta GPU 420mm, Radiador 360mm)',
        psu: 'Corsair RM850e 850W 80 Plus Gold ATX 3.0',
        extra: '6x Fans ARGB PWM pré-instaladas',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Alto clock sustentado de até 5.6 GHz acelera a compilação e despacho de shaders da UE 5.4',
        'RTX 4080 SUPER com 16GB de VRAM GDDR6X executa Nanite e Lumen sem engasgos',
        'Placa-mãe Z790 com dissipadores robustos de VRM para estabilidade contínua'
      ]
    },
    tecnologiasRecomendadas: ['TSR / DLSS 3 / FSR 3', 'Nanite Clustering', 'Lumen Hardware Ray Tracing', 'Frame Generation'],
    dicasOtimizacao: [
      'Reduzir a Iluminação Global para "Alto" em vez de "Cinemático" traz ganho de até 25% de FPS com impacto visual quase nulo.',
      'Sempre aguarde a compilação completa de shaders no menu inicial antes de carregar a campanha.'
    ]
  },
  {
    id: 'counter-strike-2',
    nome: 'Counter-Strike 2 / Valorant',
    categoria: 'Competitivo / eSports',
    engine: 'Source 2 / Unreal Engine (Foco em latência mínima, clock single-core e 1% Lows)',
    resumoRequisitos: 'Títulos de tiro em primeira pessoa competitivos onde cada milissegundo de atraso de entrada (input lag) e consistência de quadros por segundo é crucial.',
    exigenciaVram: 'Mínimo 6GB para 1080p; 8GB suficiente para qualquer resolução competitiva.',
    exigenciaCpu: 'Altíssima sensibilidade a IPC de processador, velocidade de cache L3 e latência de memória.',
    armazenamentoTipo: 'SSD SATA Mínimo',
    resolucoesSuportadas: ['1080p', '1440p'],
    minima: {
      nome: 'Build AMD Competitiva 144Hz - 240Hz (1080p 180-260 FPS)',
      descricao: 'Excelente taxa de quadros e baixa latência para monitores de 144Hz ou 180Hz com excelente estabilidade.',
      presetGrafico: 'Competitivo (Low/Medium com High Shadows)',
      fpsEstimado: '200 - 280 FPS',
      resolucaoAlvo: '1080p Full HD (Nativa ou 4:3 Esticada)',
      componentes: {
        cpu: 'AMD Ryzen 5 5600X (6 Núcleos / 12 Threads, 35MB Cache, AM4, 65W TDP)',
        motherboard: 'ASUS Prime B550M-A WIFI II (Socket AM4, mATX, DDR4)',
        ram: 'Corsair Vengeance LPX 16GB (2x8GB) DDR4-3600MHz CL16',
        gpu: 'AMD Radeon RX 6600 8GB ou GTX 1660 Super 6GB (Comprimento: 200mm, TDP: 132W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe',
        case: 'DeepCool CC560 V2 ATX (Suporta GPU 370mm, Cooler 163mm)',
        psu: 'MSI MAG A550BN 550W 80 Plus Bronze',
        extra: '4x Fans 120mm instaladas',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Memórias DDR4-3600MHz em 1:1 Infinity Fabric sincronizado para mínima latência no CS2',
        'RX 6600 entrega framerates consistentes sem sobrecarregar a GPU em resoluções eSports',
        '1% Lows mantidos acima de 140 FPS mesmo em meio a múltiplas Smokes volumétricas'
      ]
    },
    recomendada: {
      nome: 'Build AMD Pro eSports 360Hz - 540Hz (1080p/1440p 450-600+ FPS)',
      descricao: 'Nível torneio profissional para monitores de 240Hz, 360Hz ou 540Hz OLED com NVIDIA Reflex e latência sub-5ms.',
      presetGrafico: 'Competitivo / Fidelidade Máxima de Modelos',
      fpsEstimado: '450 - 650+ FPS',
      resolucaoAlvo: '1080p / 1440p eSports',
      componentes: {
        cpu: 'AMD Ryzen 7 7800X3D (8 Núcleos / 16 Threads, 96MB L3 3D V-Cache, AM5)',
        motherboard: 'MSI MAG B650 TOMAHAWK WIFI (Socket AM5, ATX, DDR5)',
        ram: 'G.Skill Flare X5 32GB (2x16GB) DDR5-6000MHz CL30 (Hynix A-Die)',
        gpu: 'Nvidia GeForce RTX 4070 SUPER 12GB (Comprimento: 242mm, TDP: 220W)',
        cooler: 'Thermalright Phantom Spirit 120 EVO (Altura: 157mm)',
        storage: 'Samsung 990 Pro 1TB M.2 PCIe 4.0 NVMe',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm)',
        psu: 'Corsair RM750e 750W 80 Plus Gold Modular ATX 3.0',
        extra: 'NVIDIA Reflex Low Latency + Boost',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'O 3D V-Cache de 96MB do 7800X3D é o campeão absoluto de 1% lows e frametimes no Source 2',
        'NVIDIA Reflex diminui a latência de renderização para menos de 4.2ms',
        'Memória RAM com timings CL30 ajustados reduz o atraso de ticks entre servidor e cliente'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Competitiva 144Hz - 240Hz (1080p 190-270 FPS)',
      descricao: 'Processador Intel Core i5 com alta frequência single-core para partidas competitivas com latência reduzida.',
      presetGrafico: 'Competitivo (Low/Medium)',
      fpsEstimado: '190 - 270 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-13400F (10 Núcleos / 16 Threads, LGA1700, 65W TDP)',
        motherboard: 'ASRock B760M PRO RS/D4 (Socket LGA1700, mATX, DDR4)',
        ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3600MHz CL17',
        gpu: 'Nvidia GeForce RTX 3060 12GB ou RTX 4060 8GB (TDP: 115W-170W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe',
        case: 'DeepCool CC560 V2 ATX (Suporta GPU 370mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: '4x Fans 120mm instaladas',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '10 núcleos garantem folga total para Discord, gravação de replays e OBS em segundo plano',
        'NVIDIA Reflex reduz o input lag para menos de 6ms',
        'Frametimes estáveis sem quedas bruscas em granadas de fumaça'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Pro eSports 360Hz - 500Hz (1080p/1440p 420-580+ FPS)',
      descricao: 'Processador Intel Core i5-14600K com overclock de fábrica e memórias DDR5 de altíssima frequência.',
      presetGrafico: 'Competitivo / Fidelidade Máxima de Modelos',
      fpsEstimado: '420 - 580+ FPS',
      resolucaoAlvo: '1080p / 1440p eSports',
      componentes: {
        cpu: 'Intel Core i5-14600K (14 Núcleos / 20 Threads, Turbo até 5.3GHz, LGA1700, 181W TDP)',
        motherboard: 'MSI MAG Z790 TOMAHAWK WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'G.Skill Ripjaws S5 32GB (2x16GB) DDR5-6400MHz CL32 Intel XMP',
        gpu: 'Nvidia GeForce RTX 4070 SUPER 12GB (Comprimento: 242mm, TDP: 220W)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Samsung 990 Pro 1TB M.2 PCIe 4.0 NVMe',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm)',
        psu: 'Corsair RM750e 750W 80 Plus Gold Modular ATX 3.0',
        extra: 'NVIDIA Reflex Low Latency + Boost',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Clock single-core de 5.3 GHz maximiza a taxa de quadros por segundo no motor Source 2',
        'Memória DDR5-6400MHz com latência reduzida para resposta imediata de tiro (hit-registration)',
        'Placa-mãe Z790 com circuito de VRM de 16 fases garantindo estabilidade máxima de clock'
      ]
    },
    tecnologiasRecomendadas: ['NVIDIA Reflex / AMD Anti-Lag 2', 'NVIDIA G-Sync / FreeSync Premium Pro', 'High Priority Threading'],
    dicasOtimizacao: [
      'Ative o NVIDIA Reflex no modo "On + Boost" para manter o clock da GPU sempre no pico máximo de resposta.',
      'Configure as memórias no perfil EXPO/XMP para ativar a máxima taxa de transferência de dados com a CPU.'
    ]
  },
  {
    id: 'gta-vi-gta-v',
    nome: 'GTA VI / GTA V (Próxima Geração RAGE)',
    categoria: 'Mundo Aberto / Simulação',
    engine: 'Rockstar Advanced Game Engine (RAGE 9 - DirectStorage & Iluminação Global Volumétrica)',
    resumoRequisitos: 'Mundos abertos densos com milhares de NPCs simultâneos, tráfego dinâmico, física de água e clima volumétrico exigem muita RAM e largura de banda de SSD.',
    exigenciaVram: 'Mínimo 8GB - 10GB; 16GB ideal para streaming de texturas ultra em alta velocidade pela cidade.',
    exigenciaCpu: 'Uso intenso de múltiplos núcleos para cálculo de IA, física de ragdoll e densidade urbana.',
    armazenamentoTipo: 'NVMe com DirectStorage',
    resolucoesSuportadas: ['1080p', '1440p', '4K'],
    minima: {
      nome: 'Build AMD Mínima para Próxima Geração (1080p 50-60 FPS)',
      descricao: 'Configuração robusta AM5 para encarar a densidade urbana e iluminação moderna com estabilidade.',
      presetGrafico: 'Médio / Texturas Altas / Densidade de Tráfego Moderada',
      fpsEstimado: '50 - 60 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'AMD Ryzen 5 7600 (6 Núcleos / 12 Threads, AM5, DDR5 nativo, 65W TDP)',
        motherboard: 'ASRock B650M-HDV/M.2 (Socket AM5, Micro-ATX, DDR5)',
        ram: 'Kingston Fury Beast 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'AMD Radeon RX 6750 XT 12GB ou RTX 4060 8GB (Comprimento: 280mm, TDP: 250W)',
        cooler: 'DeepCool AG400 ARGB (Altura: 150mm)',
        storage: 'Crucial P3 Plus 1TB M.2 PCIe 4.0 NVMe (5000MB/s)',
        case: 'Montech Air 903 Base ATX (Suporta GPU 400mm, Cooler 180mm)',
        psu: 'Corsair CX650 650W 80 Plus Bronze',
        extra: '3x Fans 140mm de alto fluxo de ar',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '32GB de RAM DDR5 é o padrão mínimo para jogos modernos de mundo aberto sem swap de disco',
        '12GB de VRAM acomoda a carga pesada de texturas em viagens rápidas de veículos',
        'Plataforma AM5 permite upgrades futuros para CPUs de até 16 núcleos'
      ]
    },
    recomendada: {
      nome: 'Build AMD Master Race / Experiência Definitiva (1440p / 4K 90-120 FPS)',
      descricao: 'Projetada para rodar a simulação com densidade máxima de população, Ray Tracing completo e texturas em resolução 4K.',
      presetGrafico: 'Ultra / Ray Tracing / Reflexos de Água e Sombras no Máximo',
      fpsEstimado: '90 - 120 FPS (1440p) / 65 - 85 FPS (4K)',
      resolucaoAlvo: '1440p Quad HD / 4K UHD',
      componentes: {
        cpu: 'AMD Ryzen 7 7800X3D (8 Núcleos / 16 Threads, 3D V-Cache, AM5)',
        motherboard: 'ASUS ROG STRIX B650E-F GAMING WIFI (Socket AM5, PCIe 5.0, ATX)',
        ram: 'Corsair Dominator Titanium 32GB (2x16GB) DDR5-6000MHz CL30',
        gpu: 'ASUS TUF GeForce RTX 4080 SUPER 16GB (Comprimento: 348mm, TDP: 320W)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler',
        storage: 'Samsung 990 Pro 2TB NVMe PCIe 4.0 com dissipador (7450MB/s)',
        case: 'Lian Li O11 Dynamic EVO RGB (Suporta GPU 455mm, Radiadores 360mm)',
        psu: 'Corsair RM1000x 1000W 80 Plus Gold ATX 3.0 Modular',
        extra: '7x Fans 120mm PWM + Cabo 12V-2x6 nativo',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Largura de banda de 737 GB/s na VRAM de 16GB elimina micro-stuttering em alta velocidade',
        'SSD Gen4 de 7450MB/s permite que o DirectStorage carregue quarteirões inteiros em milissegundos',
        'Fonte de 1000W com certificação Cybenetics Platinum e tolerância a picos transitórios de 200%'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Mínima para Próxima Geração (1080p 50-60 FPS)',
      descricao: 'Configuração Intel Core i5-13400 com 32GB de memória RAM para carregar o mapa sem contenção.',
      presetGrafico: 'Médio / Texturas Altas',
      fpsEstimado: '50 - 62 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-13400F (10 Núcleos / 16 Threads, LGA1700, 65W TDP)',
        motherboard: 'ASRock B760M PG Riptide (Socket LGA1700, Micro-ATX, DDR5)',
        ram: 'Kingston Fury Beast 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'AMD Radeon RX 6750 XT 12GB ou RTX 4060 8GB (Comprimento: 280mm, TDP: 250W)',
        cooler: 'DeepCool AG400 ARGB (Altura: 150mm)',
        storage: 'Crucial P3 Plus 1TB M.2 PCIe 4.0 NVMe (5000MB/s)',
        case: 'Montech Air 903 Base ATX (Suporta GPU 400mm, Cooler 180mm)',
        psu: 'Corsair CX650 650W 80 Plus Bronze',
        extra: '3x Fans 140mm de alto fluxo de ar',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '32GB DDR5 para tolerância a vazamentos de memória e carregamento contínuo de texturas',
        '10 núcleos (6 Performance + 4 Efficient) gerenciam a física de multidão',
        'SSD Gen4 com suporte DirectStorage'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Master Race / Experiência Definitiva (1440p / 4K 90-125 FPS)',
      descricao: 'Processador Intel Core i7-14700K de 20 núcleos com a poderosa RTX 4080 SUPER 16GB.',
      presetGrafico: 'Ultra / Ray Tracing / Reflexos de Água no Máximo',
      fpsEstimado: '90 - 125 FPS (1440p) / 65 - 90 FPS (4K)',
      resolucaoAlvo: '1440p Quad HD / 4K UHD',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, LGA1700, Turbo 5.6GHz, 253W)',
        motherboard: 'MSI MAG Z790 TOMAHAWK WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Dominator Titanium 32GB (2x16GB) DDR5-6400MHz CL32',
        gpu: 'ASUS TUF GeForce RTX 4080 SUPER 16GB (Comprimento: 348mm, TDP: 320W)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 2TB NVMe PCIe 4.0 com dissipador (7450MB/s)',
        case: 'Lian Li O11 Dynamic EVO RGB (Suporta GPU 455mm, Radiadores 360mm)',
        psu: 'Corsair RM1000x 1000W 80 Plus Gold ATX 3.0 Modular',
        extra: '7x Fans 120mm PWM + Cabo 12V-2x6 nativo',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '20 núcleos dedicados suportam o streaming massivo de ativos e tráfego urbano em tempo real',
        'Memórias DDR5 6400MHz reduzem tempo de acesso à CPU em situações com muitos veículos',
        'Water Cooler 360mm garante temperaturas controladas sob sessões longas de gameplay'
      ]
    },
    tecnologiasRecomendadas: ['DirectStorage 1.2', 'Ray Traced Global Illumination', 'DLSS 3.7 / FSR 3.1', 'NVIDIA Reflex'],
    dicasOtimizacao: [
      'Reserve pelo menos 150GB a 200GB de espaço livre em SSD NVMe para streaming contínuo de dados.',
      'Sempre utilize 2 pentes de memória RAM (Dual-Channel) para dobrar a largura de banda de acesso à CPU.'
    ]
  },
  {
    id: 'warzone-mw3',
    nome: 'Call of Duty: Warzone & MW3',
    categoria: 'Competitivo / eSports',
    engine: 'IW Engine 9.0 (DirectX 12 / Alto Uso de VRAM e Cache de Shaders)',
    resumoRequisitos: 'Battle Royale de ritmo acelerado em mapas gigantes com 120 jogadores simultâneos, exigindo alta taxa de quadros e estabilidade térmica contínua.',
    exigenciaVram: 'Mínimo 8GB; 12GB+ altamente recomendado para evitar alocação de memória do sistema.',
    exigenciaCpu: 'Escalona perfeitamente em até 8 núcleos / 16 threads com alto clock sustentado.',
    armazenamentoTipo: 'NVMe Gen4 Recomendado',
    resolucoesSuportadas: ['1080p', '1440p', '4K'],
    minima: {
      nome: 'Build AMD Warzone Competitiva (1080p 90-115 FPS)',
      descricao: 'Excelente equilíbrio de frametime para trocas de tiro consistentes em 1080p.',
      presetGrafico: 'Básico/Competitivo (Texturas Normais, Sombras Baixas, FidelityFX CAS 80%)',
      fpsEstimado: '95 - 120 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'AMD Ryzen 5 5600X (6 Núcleos / 12 Threads, AM4, 65W TDP)',
        motherboard: 'Gigabyte B550M DS3H AC (Socket AM4, mATX, DDR4)',
        ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3600MHz CL17',
        gpu: 'AMD Radeon RX 6650 XT 8GB (Comprimento: 241mm, TDP: 180W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe',
        case: 'Montech Air 100 Lite (Suporta GPU 330mm, Cooler 161mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: '',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'A arquitetura RDNA2 da AMD apresenta excelente eficiência e framerates altos no motor gráfico IW Engine',
        'FidelityFX CAS integrado melhora a nitidez e visibilidade de inimigos à distância',
        'Fonte com folga segura para operação ininterrupta de longas sessões de gameplay'
      ]
    },
    recomendada: {
      nome: 'Build AMD Warzone Elite 1440p (1440p 160-220+ FPS)',
      descricao: 'Visuais ultra-nítidos em 1440p com framerates altíssimos para monitores de 165Hz/240Hz.',
      presetGrafico: 'Alto / Otimizado Competitivo / DLSS ou FSR Native Quality',
      fpsEstimado: '160 - 220+ FPS',
      resolucaoAlvo: '1440p Quad HD',
      componentes: {
        cpu: 'AMD Ryzen 7 7800X3D (8 Núcleos / 16 Threads, 3D V-Cache, AM5)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6000MHz CL30',
        gpu: 'AMD Radeon RX 7900 XT 20GB ou GeForce RTX 4070 Ti SUPER 16GB (TDP: 315W)',
        cooler: 'DeepCool AK620 Digital (Altura: 162mm)',
        storage: 'WD Black SN850X 2TB NVMe PCIe 4.0',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm)',
        psu: 'Corsair RM850x 850W 80 Plus Gold Modular',
        extra: 'Suporte de GPU anti-torção',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'VRAM de 20GB garante zero stuttering por texture paging no Warzone',
        '7800X3D entrega os maiores 1% Lows medidos no motor IW 9.0 em resolução 1440p',
        'Air Cooler de duplo dissipador mantém a CPU silenciosa e fria mesmo após horas contínuas'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Warzone Competitiva (1080p 95-125 FPS)',
      descricao: 'Configuração Intel Core i5-12400F rápida e econômica para tiroteios fluídos no Warzone.',
      presetGrafico: 'Competitivo / Fidelidade CAS 80%',
      fpsEstimado: '95 - 125 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-12400F (6 Núcleos / 12 Threads, LGA1700, 65W TDP)',
        motherboard: 'Gigabyte B760M DS3H DDR4 (Socket LGA1700, mATX)',
        ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3600MHz CL17',
        gpu: 'Nvidia GeForce RTX 3060 12GB ou RX 6650 XT 8GB (TDP: 170W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe',
        case: 'Montech Air 100 Lite (Suporta GPU 330mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: '',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Excelente relação de estabilidade de quadros por segundo em 1080p',
        'Suporte a NVIDIA Reflex para menor atraso de clique de mouse',
        'TDP contido de 65W mantendo o setup muito silencioso'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Warzone Elite 1440p (1440p 165-225+ FPS)',
      descricao: 'Intel Core i5-14600K com memórias DDR5 velozes para manter 200+ FPS em Urzikstan.',
      presetGrafico: 'Alto / Otimizado Competitivo',
      fpsEstimado: '165 - 225+ FPS',
      resolucaoAlvo: '1440p Quad HD',
      componentes: {
        cpu: 'Intel Core i5-14600K (14 Núcleos / 20 Threads, LGA1700, Turbo 5.3GHz, 181W)',
        motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6400MHz CL32',
        gpu: 'GeForce RTX 4070 Ti SUPER 16GB (Comprimento: 305mm, TDP: 285W)',
        cooler: 'DeepCool AK620 Digital (Altura: 162mm)',
        storage: 'WD Black SN850X 2TB NVMe PCIe 4.0',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm)',
        psu: 'Corsair RM850e 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Suporte de GPU anti-torção',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '14 núcleos distribuem a compilação contínua de shaders em tempo real sem travar a thread de render',
        '16GB de VRAM GDDR6X suporta mapas gigantes sem necessidade de descarregar texturas na RAM',
        'Fonte ATX 3.0 certificada para estabilidade total'
      ]
    },
    tecnologiasRecomendadas: ['AMD FidelityFX CAS', 'NVIDIA Reflex', 'Variable Rate Shading (VRS)'],
    dicasOtimizacao: [
      'Defina a escala de memória de vídeo (VRAM Scale Target) no menu de gráficos em 80% para evitar alocação excessiva pelo Windows.',
      'Instale o jogo em partição NVMe dedicada para carregamento instantâneo de shaders.'
    ]
  },
  {
    id: 'elden-ring',
    nome: 'Elden Ring / Shadow of the Erdtree',
    categoria: 'AAA / Nova Geração',
    engine: 'FromSoftware Proprietary Engine (DirectX 12 / Ray Tracing Opcional)',
    resumoRequisitos: 'Com trava nativa de 60 FPS no motor, o foco técnico primordial é a estabilidade de frame pacing (tempo de quadro de 16.6ms contínuo) e ausência de engasgos durante transições de áreas.',
    exigenciaVram: 'Mínimo 6GB; 8GB - 12GB ideal para ativar Ray Tracing sem quedas de frames.',
    exigenciaCpu: 'Exige clock por núcleo estável para manter o frame time em 16.6ms contínuo.',
    armazenamentoTipo: 'SSD SATA Mínimo',
    resolucoesSuportadas: ['1080p', '1440p', '4K'],
    minima: {
      nome: 'Build Intel Soulsborne Otimizada (1080p 60 FPS Cravados)',
      descricao: 'Construção perfeita Intel Core i5 para garantir 60 FPS contínuos sem quedas na qualidade Alta.',
      presetGrafico: 'Alto (Sem Ray Tracing)',
      fpsEstimado: '60 FPS Estáveis (Trava de Motor)',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-12400F (6 Núcleos / 12 Threads, LGA1700, 65W TDP)',
        motherboard: 'Gigabyte B760M DS3H DDR4 (Socket LGA1700, mATX)',
        ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3200MHz CL16',
        gpu: 'AMD Radeon RX 6600 8GB ou RTX 3060 8GB (Comprimento: 200mm, TDP: 132W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe',
        case: 'Pichau Kazer Micro-ATX (Suporta GPU 320mm, Cooler 160mm)',
        psu: 'MSI MAG A550BN 550W 80 Plus Bronze',
        extra: '',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Entrega os 60 FPS cravados no motor do jogo com 100% de consistência de frame pacing',
        'Consumo total do sistema abaixo de 280W, gerando pouquíssimo calor',
        'Baixíssimo ruído acústico'
      ]
    },
    recomendada: {
      nome: 'Build AMD Terras Intermédias 4K Ultra + RT (1440p / 4K 60 FPS Máximo)',
      descricao: 'Permite jogar em resolução nativa 1440p ou 4K com Ray Tracing de oclusão de ambiente e sombras ativados sem flutuação.',
      presetGrafico: 'Máximo / Ray Tracing Alto',
      fpsEstimado: '60 FPS Ultra-Estáveis (Tempo de quadro constante)',
      resolucaoAlvo: '1440p / 4K UHD',
      componentes: {
        cpu: 'AMD Ryzen 5 7600X (6 Núcleos / 12 Threads, AM5, DDR5, 105W TDP)',
        motherboard: 'ASUS TUF Gaming B650M-PLUS (Socket AM5, mATX, DDR5)',
        ram: 'Kingston Fury Renegade 32GB (2x16GB) DDR5-6000MHz CL32',
        gpu: 'Nvidia GeForce RTX 4070 SUPER 12GB (Comprimento: 242mm, TDP: 220W)',
        cooler: 'DeepCool AK500 Digital (Altura: 158mm)',
        storage: 'Kingston Fury Renegade 1TB M.2 PCIe 4.0 NVMe (7300MB/s)',
        case: 'Montech Air 903 Max ATX (Suporta GPU 400mm, Cooler 180mm)',
        psu: 'Corsair RM750e 750W 80 Plus Gold ATX 3.0',
        extra: '4x Fans ARGB PWM',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'RTX 4070 SUPER sustenta o peso do Ray Tracing da FromSoftware sem qualquer perda de quadros',
        'Plataforma AM5 com DDR5 para carregamentos de morte e teletransporte instantâneos',
        'Fonte ATX 3.0 de 750W com alta eficiência energética'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Soulsborne Otimizada (1080p 60 FPS Cravados)',
      descricao: 'Construção Intel Core i5-12400F para garantir 60 FPS com frame time de 16.6ms contínuo.',
      presetGrafico: 'Alto (Sem Ray Tracing)',
      fpsEstimado: '60 FPS Estáveis',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-12400F (6 Núcleos / 12 Threads, LGA1700, 65W TDP)',
        motherboard: 'Gigabyte B760M DS3H DDR4 (Socket LGA1700, mATX)',
        ram: 'Kingston Fury Beast 16GB (2x8GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 3060 12GB ou RX 6600 8GB (TDP: 132W-170W)',
        cooler: 'DeepCool AG400 (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe',
        case: 'Pichau Kazer Micro-ATX (Suporta GPU 320mm, Cooler 160mm)',
        psu: 'MSI MAG A550BN 550W 80 Plus Bronze',
        extra: '',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '60 FPS fixos e estáveis para esquivas perfeitas',
        'Consumo total muito baixo e silencioso',
        'Compatibilidade comprovada com soquete LGA1700'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Terras Intermédias 4K Ultra + RT (1440p / 4K 60 FPS Máximo)',
      descricao: 'Intel Core i5-14600K com RTX 4070 SUPER para resolução 4K e Ray Tracing habilitado.',
      presetGrafico: 'Máximo / Ray Tracing Alto',
      fpsEstimado: '60 FPS Ultra-Estáveis',
      resolucaoAlvo: '1440p / 4K UHD',
      componentes: {
        cpu: 'Intel Core i5-14600K (14 Núcleos / 20 Threads, LGA1700, DDR5, 181W TDP)',
        motherboard: 'MSI MAG B760 TOMAHAWK WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'Kingston Fury Renegade 32GB (2x16GB) DDR5-6000MHz CL32',
        gpu: 'Nvidia GeForce RTX 4070 SUPER 12GB (Comprimento: 242mm, TDP: 220W)',
        cooler: 'DeepCool AK620 Digital (Altura: 162mm)',
        storage: 'Kingston Fury Renegade 1TB M.2 PCIe 4.0 NVMe (7300MB/s)',
        case: 'Montech Air 903 Max ATX (Suporta GPU 400mm, Cooler 180mm)',
        psu: 'Corsair RM750e 750W 80 Plus Gold ATX 3.0',
        extra: '4x Fans ARGB PWM',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '14 núcleos e alto clock eliminam travamentos em chefes com efeitos volumétricos pesados',
        'DDR5 de 6000MHz acelera carregamentos de áreas e masmorras',
        'Compatibilidade 100% testada de gabinete e dissipador'
      ]
    },
    tecnologiasRecomendadas: ['Auto HDR / HDR10', 'Shader Pre-Caching', 'Variable Refresh Rate (VRR)'],
    dicasOtimizacao: [
      'Desative a sobreposição do Discord e do Steam caso sinta pequenas variações no tempo de quadro (frametime micro-stutter).',
      'Ative o G-Sync ou FreeSync no monitor para suavizar a transição dos 60 FPS fixos.'
    ]
  },
  {
    id: 'flight-simulator-2024',
    nome: 'Microsoft Flight Simulator 2024',
    categoria: 'Mundo Aberto / Simulação',
    engine: 'Asobo Digital Twin Engine (Física de fluidos em tempo real, renderização de globo e nuvens volumétricas)',
    resumoRequisitos: 'Um dos softwares mais pesados existentes para computador: consome dezenas de gigabytes de memória para dados fotogramétricos e exige extremo poder de processamento em CPU.',
    exigenciaVram: 'Mínimo 12GB; 16GB - 24GB altamente recomendado para aeroportos complexos e aeronaves detalhadas.',
    exigenciaCpu: 'A CPU mais rápida possível com o maior cache L3 e alto clock para simular aerodinâmica e tráfego aéreo.',
    armazenamentoTipo: 'NVMe Gen4 Recomendado',
    resolucoesSuportadas: ['1080p', '1440p', '4K'],
    minima: {
      nome: 'Build AMD Simulação Básica (1080p 40-55 FPS)',
      descricao: 'Configuração estável com boa quantidade de RAM para voos visuais (VFR) em cidades padrão.',
      presetGrafico: 'Médio / Alto / DLSS ou FSR Balanceado',
      fpsEstimado: '40 - 55 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'AMD Ryzen 7 5700X3D (8 Núcleos / 16 Threads, 3D V-Cache, AM4, 105W TDP)',
        motherboard: 'MSI B550-A PRO (Socket AM4, ATX, DDR4)',
        ram: 'Corsair Vengeance LPX 32GB (2x16GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 4060 Ti 16GB ou RX 7700 XT 12GB (TDP: 165W)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Kingston KC3000 2TB M.2 PCIe 4.0 NVMe (7000MB/s)',
        case: 'Montech Air 903 Base (Suporta GPU 400mm, Cooler 180mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Conexão de internet cabeada Gigabit recomendada',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '3D V-Cache do 5700X3D mitiga o terrível gargalo de thread principal típico de simuladores de voo',
        'VRAM de 16GB permite carregar dados fotogramétricos de satélite sem engasgos',
        'SSD Gen4 de 2TB acomoda os massivos pacotes de cenários mundiais'
      ]
    },
    recomendada: {
      nome: 'Build AMD Cockpit Ultra 4K / VR Ready (1440p / 4K 70-100+ FPS com Frame Gen)',
      descricao: 'Construção máxima com 64GB de memória RAM, 3D V-Cache de última geração e GPU de topo para voos IFR em 4K ou Realidade Virtual.',
      presetGrafico: 'Ultra / Nuvens Volumétricas Ultra / DLSS 3 Frame Generation',
      fpsEstimado: '70 - 110+ FPS (1440p/4K com Frame Gen)',
      resolucaoAlvo: '1440p / 4K / VR Headset',
      componentes: {
        cpu: 'AMD Ryzen 7 7800X3D (8 Núcleos / 16 Threads, 3D V-Cache, AM5, 120W TDP)',
        motherboard: 'ASUS ROG STRIX B650E-E GAMING WIFI (Socket AM5, ATX, DDR5)',
        ram: 'G.Skill Trident Z5 Neo 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
        gpu: 'ASUS ROG Strix GeForce RTX 4090 24GB ou RTX 4080 SUPER 16GB (Comprimento: 358mm, TDP: 450W)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 4TB NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL III ATX (Suporta GPU até 435mm, Cooler 187mm)',
        psu: 'Corsair RM1000x SHIFT 1000W 80 Plus Gold ATX 3.0',
        extra: 'Suporte nativo a múltiplos monitores e manetes HOTAS',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '64GB de memória RAM DDR5 com baixa latência para streaming de terreno em alta altitude',
        'DLSS 3 Frame Generation dobra a fluidez de imagens em cenários CPU-bound pesados como aeroportos internacionais',
        'Fonte de 1000W ATX 3.0 com cabos de conexão lateral para montagem organizada e segura'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Simulação Básica (1080p 42-58 FPS)',
      descricao: 'Configuração Intel Core i5-13600K com 32GB de memória RAM para carregar fotogrametria.',
      presetGrafico: 'Médio / Alto / DLSS',
      fpsEstimado: '42 - 58 FPS',
      resolucaoAlvo: '1080p Full HD',
      componentes: {
        cpu: 'Intel Core i5-13600K (14 Núcleos / 20 Threads, LGA1700, Turbo 5.1GHz, 181W)',
        motherboard: 'MSI PRO Z790-P WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'Nvidia GeForce RTX 4060 Ti 16GB (Comprimento: 242mm, TDP: 165W)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Kingston KC3000 2TB M.2 PCIe 4.0 NVMe (7000MB/s)',
        case: 'Montech Air 903 Base (Suporta GPU 400mm, Cooler 180mm)',
        psu: 'MSI MAG A750GL 750W 80 Plus Gold ATX 3.0',
        extra: 'Conexão Gigabit Ethernet',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '14 núcleos e alto clock single-core sustentado de 5.1 GHz para cálculo aerodinâmico',
        '16GB de VRAM acomoda texturas em alta resolução de satélite',
        '32GB DDR5 para evitar gargalo de memória RAM'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Cockpit Ultra 4K / VR Ready (1440p / 4K 75-115+ FPS)',
      descricao: 'Intel Core i9-14900K de 24 núcleos com 64GB de RAM DDR5 e RTX 4090 24GB para a experiência mais realista de simulação aérea.',
      presetGrafico: 'Ultra / Nuvens Volumétricas Ultra / DLSS 3 Frame Gen',
      fpsEstimado: '75 - 115+ FPS (1440p/4K com Frame Gen)',
      resolucaoAlvo: '1440p / 4K / VR Headset',
      componentes: {
        cpu: 'Intel Core i9-14900K (24 Núcleos / 32 Threads, Turbo até 6.0GHz, LGA1700, 253W)',
        motherboard: 'ASUS ROG Maximus Z790 HERO (Socket LGA1700, ATX, DDR5)',
        ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6400MHz CL32',
        gpu: 'ASUS ROG Strix GeForce RTX 4090 24GB (Comprimento: 358mm, TDP: 450W)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 4TB NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL III ATX (Suporta GPU até 435mm, Cooler 187mm)',
        psu: 'Corsair RM1000x SHIFT 1000W 80 Plus Gold ATX 3.0',
        extra: 'Suporte nativo a múltiplos monitores e HOTAS',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '24 núcleos e clock de até 6.0 GHz dominam a simulação física em tempo real',
        '64GB de memória RAM DDR5 com altíssima largura de banda para fotogrametria',
        'Fonte de 1000W ATX 3.0 com alimentação 12V-2x6 direta para a RTX 4090'
      ]
    },
    tecnologiasRecomendadas: ['DLSS 3 Frame Generation', 'Rolling Cache NVMe', 'Dynamic Photogrammetry Streaming', 'Multi-Threaded Sim'],
    dicasOtimizacao: [
      'Configure um "Rolling Cache" de pelo menos 32GB no seu SSD mais rápido para pré-armazenar áreas voadas com frequência.',
      'O uso de 64GB de RAM garante que o simulador nunca recorra à memória virtual lenta do Windows.'
    ]
  },
  {
    id: 'premiere-after-effects',
    nome: 'Adobe Premiere Pro & After Effects (4K / 8K & VFX)',
    categoria: 'Edição de Vídeo / Pós-Produção',
    engine: 'Mercury Playback Engine (CUDA / OpenCL / QuickSync Hardware Decode)',
    resumoRequisitos: 'Edição de vídeo profissional, motion graphics e composição pesada no After Effects exigem alta capacidade de RAM (32GB a 64GB+), processador com alto clock single-thread aliado a multithread, e aceleração por hardware (NVENC/QuickSync/CUDA).',
    exigenciaVram: 'Mínimo 8GB VRAM para timelines 4K; 16GB+ VRAM para After Effects, projetos 8K RAW e plugins multicamada.',
    exigenciaCpu: 'Alto clock single-core para timelines responsivas + 12 a 24 threads para renderização de efeitos e exportação.',
    armazenamentoTipo: 'NVMe Gen4 Scratch Disk',
    resolucoesSuportadas: ['1080p', '4K', '4K ProRes', '8K RAW'],
    minima: {
      nome: 'Build AMD Edição 4K Básica / Criadores (AMD Ryzen 7 5700X + RTX 4060 8GB)',
      descricao: 'Configuração eficiente para edição fluida em 1080p e 4K H.264/H.265 com 32GB de RAM.',
      presetGrafico: 'Timeline 4K H.264 / 32GB RAM / Playback 1/2 Resolução',
      fpsEstimado: 'Exportação 4K ~1.5x Tempo Real (NVENC)',
      resolucaoAlvo: '4K ProRes / H.265',
      componentes: {
        cpu: 'AMD Ryzen 7 5700X (8 Núcleos / 16 Threads, Soquete AM4, 65W TDP)',
        motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4)',
        ram: 'Kingston Fury Beast 32GB (2x16GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 4060 8GB GDDR6 (Comprimento: 242mm, 8th Gen NVENC)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe PCIe 4.0 (3500MB/s) + SSD Secundário para Scratch Cache',
        case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Suporte a aceleração CUDA e NVENC para render rápido',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '32GB de RAM permite alternar entre Premiere e Photoshop sem travamentos',
        'Encoder de 8ª Geração (NVENC) na RTX 4060 acelera drasticamente o render de exports',
        'Ryzen 7 com 8 núcleos e 16 threads garante scrubbing estável na timeline'
      ]
    },
    recomendada: {
      nome: 'Build AMD Workstation 4K/8K & Motion Design (Ryzen 9 7900X + RTX 4080 SUPER 16GB + 64GB DDR5)',
      descricao: 'Workstation AMD para After Effects pesado, render 3D em tempo real e timelines 8K RAW multicam.',
      presetGrafico: 'Timeline 4K/8K RAW / After Effects RAM Preview / Full Resolução',
      fpsEstimado: 'Exportação 4K/8K Ultra Rápida (~4x Tempo Real)',
      resolucaoAlvo: '8K RAW / After Effects Motion',
      componentes: {
        cpu: 'AMD Ryzen 9 7900X (12 Núcleos / 24 Threads, AM5, Turbo 5.6GHz, 170W TDP)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5, 3x M.2 NVMe)',
        ram: 'Corsair Vengeance 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
        gpu: 'ASUS TUF GeForce RTX 4080 SUPER 16GB (Comprimento: 348mm, Dual NVENC AV1)',
        cooler: 'Thermalright Peerless Assassin 120 SE ou Water Cooler 240mm',
        storage: 'Samsung 990 Pro 2TB M.2 PCIe 4.0 (SO/Apps) + Kingston KC3000 2TB (Media & Scratch Cache)',
        case: 'Lian Li LANCOOL 216 ATX (Excelente fluxo de ar para renders longos)',
        psu: 'Corsair RM850e 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Dual NVENC com suporte nativo ao codec AV1 e ProRes',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '64GB DDR5 garante pré-visualizações longas no After Effects sem estourar cache',
        'Dual NVENC da RTX 4080 SUPER divide a carga de exportação com aceleração de hardware',
        'Dois SSDs NVMe Gen4 dedicados eliminam o estrangulamento de leitura de mídias pesadas'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Edição Ágil com QuickSync (Core i5-13500 + RTX 3060 12GB + 32GB RAM)',
      descricao: 'Aproveita o decodificador de hardware Intel QuickSync da iGPU integrado com a GPU dedicada Nvidia para reprodução ultra suave de arquivos H.264/HEVC 10-bit 4:2:2.',
      presetGrafico: 'Timeline 4K 10-bit 4:2:2 / 32GB RAM / Decodificação QuickSync Híbrida',
      fpsEstimado: 'Scrubbing 4K Fluido em Tempo Real sem Proxies',
      resolucaoAlvo: '4K ProRes / HEVC 10-bit',
      componentes: {
        cpu: 'Intel Core i5-13500 (14 Núcleos / 20 Threads, UHD Graphics 770 QuickSync, LGA1700)',
        motherboard: 'ASRock B760M Steel Legend WIFI (Socket LGA1700, Micro-ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'Nvidia GeForce RTX 3060 12GB GDDR6 (12GB VRAM para efeitos pesados)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm, LGA1700)',
        storage: 'Kingston KC3000 1TB M.2 NVMe PCIe 4.0 (7000MB/s) + 1TB Scratch Disk',
        case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Intel QuickSync habilitado na BIOS para decodificação de vídeos de câmeras Sony/Canon/Panasonic',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'QuickSync da iGPU Intel decodifica nativamente vídeos 4:2:2 10-bit que engasgam outras CPUs',
        '12GB de VRAM da RTX 3060 evita erros de falta de memória de GPU em projetos no Premiere',
        '14 núcleos Intel (6 Performance + 8 Efficient) balanceiam tarefas de fundo e preview'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Workstation Master (Core i7-14700K + RTX 4080 SUPER 16GB + 64GB DDR5 + QuickSync)',
      descricao: 'O padrão ouro para pós-produção audiovisual: Intel Core i7-14700K de 20 núcleos, QuickSync ativo, 64GB RAM DDR5 e aceleração CUDA/NVENC.',
      presetGrafico: 'Multicam 4K/8K / After Effects Compositing / Real-time Playback',
      fpsEstimado: 'Exportação Instantânea com QuickSync + Dual NVENC',
      resolucaoAlvo: '8K RAW / Multicam 4K',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, Turbo 5.6GHz, UHD 770 QuickSync, LGA1700, 253W)',
        motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5, 4x M.2)',
        ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000MHz CL30 Intel XMP',
        gpu: 'Gigabyte GeForce RTX 4080 SUPER Gaming OC 16GB (Comprimento: 342mm, 3x Fans)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 2TB NVMe PCIe 4.0 (Sistema/Projetos) + Kingston KC3000 2TB (Media Scratch Cache)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta Radiador 360mm no topo)',
        psu: 'Corsair RM850x 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Configuração Multi-GPU (Intel UHD 770 para Decode + RTX 4080 para Render/CUDA)',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '20 núcleos (28 threads) e 33MB Intel Smart Cache para renderização veloz no After Effects',
        'QuickSync + RTX 4080 SUPER formam o pipeline de vídeo mais rápido e compatível do mercado',
        'Water Cooler 360mm dissipa com facilidade as cargas contínuas de 253W em renderizações longas'
      ]
    },
    tecnologiasRecomendadas: ['Intel QuickSync Hardware Decode (4:2:2 10-bit)', 'Nvidia CUDA & NVENC Dual Encoders', 'Dedicated NVMe Media Scratch Disk', 'Mercury Playback GPU Acceleration'],
    dicasOtimizacao: [
      'Separe sempre um SSD NVMe secundário exclusivo para o Scratch Disk / Cache de Mídia do Premiere e After Effects.',
      'Em processadores Intel com iGPU (não F), deixe a placa de vídeo integrada ativada para acelerar a decodificação de vídeos de câmeras mirrorless.'
    ]
  },
  {
    id: 'davinci-resolve-studio',
    nome: 'DaVinci Resolve Studio & Fusion (Color Grading & 8K Blackmagic RAW)',
    categoria: 'Edição de Vídeo / Pós-Produção',
    engine: 'DaVinci Neural Engine (CUDA / Tensor Cores / GPU Acceleration)',
    resumoRequisitos: 'O DaVinci Resolve Studio é intensamente dependente do poder e da quantidade de VRAM da placa de vídeo. Utiliza os Tensor Cores da Nvidia para redução de ruído temporal, tracking óptico e isolamento por IA.',
    exigenciaVram: 'Mínimo 8GB VRAM (1080p); 12GB - 16GB VRAM mandatório para projetos 4K com nós de correção de cor; 24GB para 8K RAW.',
    exigenciaCpu: 'Processador de 8 a 16 núcleos para descompressão de Blackmagic RAW, REDCODE e codecs pesados em tempo real.',
    armazenamentoTipo: 'NVMe Gen4 Scratch Disk',
    resolucoesSuportadas: ['1080p', '4K', '4K ProRes', '8K RAW'],
    minima: {
      nome: 'Build AMD DaVinci 4K Studio (Ryzen 7 5700X + RTX 3060 12GB + 32GB RAM)',
      descricao: 'Setup custo-benefício que não sofre com erro de falta de memória de GPU graças aos 12GB VRAM da RTX 3060.',
      presetGrafico: 'Timeline 4K BRAW / Color Grading com 10+ Nós / Playback Fluido',
      fpsEstimado: '30 - 60 FPS em Timeline 4K',
      resolucaoAlvo: '4K ProRes / BRAW',
      componentes: {
        cpu: 'AMD Ryzen 7 5700X (8 Núcleos / 16 Threads, Soquete AM4, 65W TDP)',
        motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4)',
        ram: 'Kingston Fury Beast 32GB (2x16GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 3060 12GB GDDR6 (12GB VRAM dedicada)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm)',
        storage: 'Kingston NV2 1TB M.2 NVMe PCIe 4.0 (3500MB/s)',
        case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Suporte a drivers Nvidia Studio',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '12GB de VRAM impede o clássico erro "GPU Memory Full" em nós de redução de ruído temporal',
        'Drivers Nvidia Studio garantem estabilidade absoluta sem crashes durante o color grading'
      ]
    },
    recomendada: {
      nome: 'Build AMD Colorist Pro / 8K RAW (Ryzen 9 7950X + RTX 4090 24GB + 64GB DDR5)',
      descricao: 'Workstation de nível cinematográfico para coloristas e editores que trabalham com múltiplas câmeras 6K/8K RAW e nós de Fusion complexos.',
      presetGrafico: 'Timeline 8K RAW / Redução de Ruído Temporal / Magic Mask IA em Tempo Real',
      fpsEstimado: '60 FPS Real-Time Playback em 8K RAW com Graus de Cor',
      resolucaoAlvo: '8K RAW / Cinema DCI',
      componentes: {
        cpu: 'AMD Ryzen 9 7950X (16 Núcleos / 32 Threads, AM5, Turbo 5.7GHz, 170W TDP)',
        motherboard: 'ASUS ROG Strix B650E-F Gaming WIFI (Socket AM5, PCIe 5.0, ATX, DDR5)',
        ram: 'Corsair Vengeance 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
        gpu: 'ASUS ROG Strix GeForce RTX 4090 24GB (24GB VRAM GDDR6X, 16384 CUDA Cores)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Crucial T700 2TB PCIe 5.0 NVMe (12400MB/s) + Samsung 990 Pro 4TB (Media Pool)',
        case: 'Lian Li LANCOOL III ATX (Suporta GPU 435mm, Cooler 187mm)',
        psu: 'Corsair RM1000x SHIFT 1000W 80 Plus Gold Modular ATX 3.0',
        extra: 'Suporte para monitores de referência 10-bit HDR via DeckLink ou HDMI 2.1',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '24GB de VRAM e 512 Tensor Cores aceleram Magic Mask e Speed Warp em velocidade máxima',
        '16 núcleos Zen 4 descomprimem arquivos REDCODE RAW e ARRI RAW sem perda de frames',
        'SSD PCIe 5.0 com 12.4 GB/s sustenta fluxos multicam não comprimidos'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel DaVinci Creator (Core i5-13600K + RTX 4060 Ti 16GB + 32GB RAM)',
      descricao: 'Excelente equilíbrio de CPU e 16GB de VRAM para timeline 4K limpa e sem engasgos.',
      presetGrafico: 'Timeline 4K 10-bit / Color Grading / Efeitos OpenFX',
      fpsEstimado: '45 - 60 FPS em Timeline 4K',
      resolucaoAlvo: '4K ProRes / BRAW',
      componentes: {
        cpu: 'Intel Core i5-13600K (14 Núcleos / 20 Threads, LGA1700, Turbo 5.1GHz, 181W)',
        motherboard: 'Gigabyte B760 Gaming X AX (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-6000MHz CL36',
        gpu: 'Nvidia GeForce RTX 4060 Ti 16GB (16GB VRAM GDDR6 para nós pesados)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Kingston KC3000 2TB M.2 NVMe PCIe 4.0 (7000MB/s)',
        case: 'Montech Air 903 Max (Suporta GPU 400mm)',
        psu: 'MSI MAG A750GL 750W 80 Plus Gold ATX 3.0',
        extra: 'Instalação com Nvidia Studio Driver',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '16GB de VRAM por um custo acessível garante espaço para color grading multicamada',
        '14 núcleos Intel processam o áudio Fairlight e as faixas auxiliares em tempo real'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel DaVinci Studio Ultra (Core i9-14900K + RTX 4090 24GB + 64GB DDR5)',
      descricao: 'Desempenho extremo para estúdios de pós-produção audiovisual e graduação de cor de longa-metragem.',
      presetGrafico: 'Timeline 8K RAW / DaVinci Neural Engine IA / Redução de Ruído 3D',
      fpsEstimado: '60+ FPS em 8K RAW com múltiplos nós de gradação',
      resolucaoAlvo: '8K RAW / Cinema DCI',
      componentes: {
        cpu: 'Intel Core i9-14900K (24 Núcleos / 32 Threads, Turbo 6.0GHz, LGA1700, 253W)',
        motherboard: 'ASUS ROG Maximus Z790 HERO (Socket LGA1700, ATX, DDR5, Thunderbolt 4)',
        ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6400MHz CL32',
        gpu: 'ASUS ROG Strix GeForce RTX 4090 24GB (Comprimento: 358mm, TDP: 450W)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 4TB NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL III ATX (Suporta GPU até 435mm, Cooler 187mm)',
        psu: 'Corsair RM1000x SHIFT 1000W 80 Plus Gold ATX 3.0',
        extra: 'Conexões Thunderbolt 4 nativas para conectar sistemas RAID e placas Blackmagic UltraStudio',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Portas Thunderbolt 4 integradas para conectar periféricos de broadcast de alta velocidade',
        '24GB VRAM com RTX 4090 permite color grading de produções inteiras em resolução nativa'
      ]
    },
    tecnologiasRecomendadas: ['DaVinci Neural Engine Tensor Cores', 'Thunderbolt 4 / RAID Direct Storage', 'Nvidia Studio Drivers', 'Blackmagic RAW GPU Acceleration'],
    dicasOtimizacao: [
      'Instale sempre os drivers Nvidia STUDIO em vez dos drivers Game Ready para máxima estabilidade no DaVinci.',
      'Ative a aceleração de GPU para computação e decodificação em Preferências > Sistema > Memória e GPU.'
    ]
  },
  {
    id: 'audio-daw-protools-fl',
    nome: 'Produção Musical & Áudio: Pro Tools, Ableton Live, FL Studio & Cubase',
    categoria: 'Produção de Áudio / DAW',
    engine: 'DAW Audio Processing Engine (ASIO Low-Latency / Single-Thread DSP / VST3 / DPC Latency Safe)',
    resumoRequisitos: 'Softwares de gravação e produção musical demandam baixíssima latência DPC (DPC Latency), alto desempenho single-thread para processamento serial de áudio na trilha master/canais com múltiplos plugins VST pesados, 32GB a 64GB de RAM para bibliotecas orquestrais (Kontakt) e operação acústica extremamente silenciosa.',
    exigenciaVram: 'Uso modesto de VRAM (4GB a 8GB suficiente para GUIs de plugins e múltiplos monitores de estúdio).',
    exigenciaCpu: 'Altíssimo desempenho single-core (IPC) + múltiplos núcleos para processamento paralelo de 100+ canais de áudio.',
    armazenamentoTipo: 'NVMe Gen4 Scratch Disk',
    resolucoesSuportadas: ['Projetos Pequenos', 'Projetos Médios', 'Projetos Complexos', '64 Pistas', '128+ Pistas'],
    minima: {
      nome: 'Build AMD Home Studio & Beatmaker (Ryzen 7 5700X + 32GB RAM + SSD NVMe Rápido)',
      descricao: 'Excelente máquina para produção musical no FL Studio e Ableton Live com múltiplos sintetizadores e plugins de mixagem.',
      presetGrafico: 'Buffer 128 samples / 64 Pistas de Áudio / Sintetizadores VSTi',
      fpsEstimado: 'Latência de Buffer < 4.2ms ASIO',
      resolucaoAlvo: '64 Pistas',
      componentes: {
        cpu: 'AMD Ryzen 7 5700X (8 Núcleos / 16 Threads, Soquete AM4, 65W TDP)',
        motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4, USBs Estáveis)',
        ram: 'Kingston Fury Beast 32GB (2x16GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce GTX 1650 / RTX 3050 6GB (Silenciosa, baixo consumo para estúdio)',
        cooler: 'Thermalright Assassin King 120 SE Silencioso (Operação < 22 dBA)',
        storage: 'Kingston KC3000 2TB M.2 NVMe PCIe 4.0 (7000MB/s para Samples e VSTs)',
        case: 'Montech Air 100 com controle de curvas de fans silenciosas',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Abundância de portas USB para interface de áudio, controladoras MIDI e iLok',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '32GB de RAM para carregar bancos de instrumentos Kontakt e packs de bateria em memória',
        'Cooler silencioso evita vazamento de ruído mecânico para microfones de gravação vocal',
        'Latência DPC limpa no chipset B550 para evitar estalos (pops e clicks) no áudio'
      ]
    },
    recomendada: {
      nome: 'Build AMD Pro Audio Master / Orquestral (Ryzen 9 7950X + 64GB DDR5 + Ultra Silencioso)',
      descricao: 'Workstation definitiva para trilhas sonoras orquestrais de cinema, mixagem e masterização de mais de 128 pistas com centenas de plugins pesados.',
      presetGrafico: 'Buffer 64 samples / 150+ Pistas / Bibliotecas Orquestrais Gigantescas',
      fpsEstimado: 'Latência Ultrabaixa < 1.8ms ASIO em Tempo Real',
      resolucaoAlvo: '128+ Pistas',
      componentes: {
        cpu: 'AMD Ryzen 9 7950X (16 Núcleos / 32 Threads, AM5, Turbo 5.7GHz, 170W TDP)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5, Áudio Isolado)',
        ram: 'Corsair Vengeance 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
        gpu: 'ASUS Dual GeForce RTX 4060 8GB com modo 0dB Fan Stop',
        cooler: 'Noctua NH-D15 chromax.black ou Be Quiet! Dark Rock Pro 5 (Extremamente Silencioso)',
        storage: 'Samsung 990 Pro 2TB (Sistema/DAWs) + Crucial P3 Plus 4TB (Sample Library & Kontakt)',
        case: 'Fractal Design Define 7 ou Be Quiet! Silent Base 802 (Gabinete com isolamento acústico anti-ruído)',
        psu: 'Corsair RM750e 750W 80 Plus Gold Modular (Modo Zero RPM)',
        extra: 'Painel com isolamento acústico e múltiplos slots USB 3.2 para hardware de estúdio',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '16 núcleos e 32 threads com alto clock de 5.7 GHz processam DSP pesado sem sobrecarregar a trilha master',
        '64GB de memória RAM DDR5 carrega gigabytes de bibliotecas Spitfire e Native Instruments',
        'Isolamento acústico com ventoinhas Noctua mantém o estúdio em silêncio absoluto (< 19 dBA)'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Home DAW & Gravação (Core i5-13500 + 32GB DDR5 + Silencioso)',
      descricao: '14 núcleos Intel para excelente multitarefa com baixa latência de driver ASIO.',
      presetGrafico: 'Buffer 128 samples / 64 Pistas de Áudio / Plugins VST3',
      fpsEstimado: 'Latência de Buffer < 3.8ms ASIO',
      resolucaoAlvo: '64 Pistas',
      componentes: {
        cpu: 'Intel Core i5-13500 (14 Núcleos / 20 Threads, Turbo 4.8GHz, LGA1700)',
        motherboard: 'Gigabyte B760M DS3H AX DDR5 (Socket LGA1700, Micro-ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'Nvidia GeForce RTX 3050 6GB Fan Stop 0dB',
        cooler: 'DeepCool AK400 Air Cooler Silencioso (Altura: 155mm)',
        storage: 'Kingston KC3000 2TB M.2 PCIe 4.0 NVMe (7000MB/s)',
        case: 'Montech Air 100 Micro-ATX com fans silenciosos',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Placa de rede e portas USB com baixo jitter para interfaces Focusrite/Universal Audio',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Excelente relação de núcleos para distribuir dezenas de canais de áudio na DAW',
        'Operação acústica discreta para gravações limpas'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Master Studio & Pro Tools HD (Core i7-14700K + 64GB DDR5 + Isolamento Acústico)',
      descricao: 'Potência máxima de processamento single-thread com 20 núcleos e arquitetura otimizada para sessões massivas de Pro Tools, Ableton e Cubase.',
      presetGrafico: 'Buffer 64 samples / 150+ Pistas / 200+ Plugins Ativos em Tempo Real',
      fpsEstimado: 'Latência Ultrabaixa < 1.5ms ASIO sem dropouts de áudio',
      resolucaoAlvo: '128+ Pistas',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, Turbo 5.6GHz, 33MB Cache, LGA1700)',
        motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5, USB-C 20Gbps)',
        ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000MHz CL30 Intel XMP',
        gpu: 'ASUS Dual GeForce RTX 4060 8GB com modo 0dB Silent Fan',
        cooler: 'Be Quiet! Dark Rock Pro 5 ou Arctic Liquid Freezer III 360 (Curva Silenciosa)',
        storage: 'Samsung 990 Pro 2TB (Sistema) + Crucial P3 Plus 4TB (Sample Libraries & Sessions)',
        case: 'Fractal Design Define 7 ou Be Quiet! Silent Base 802 com mantas de absorção de som',
        psu: 'Corsair RM850x 850W 80 Plus Gold Modular com modo Zero RPM Fan',
        extra: 'Portas Thunderbolt 4 / USB-C de alta velocidade para interfaces Apollo / Antelope / RME',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Alto clock sustentado de 5.6 GHz na CPU evita sobrecarga de DSP no canal master (onde a cadeia de plugins não pode ser paralelizada)',
        '64GB DDR5 para carregar orquestras sinfônicas completas sem latência de swap em disco',
        'Chassi e fonte com isolamento de vibração e operação 100% silenciosa'
      ]
    },
    tecnologiasRecomendadas: ['ASIO Low-Latency Drivers', 'DPC Latency Optimization', 'Zero-RPM Fan Technology', 'High-Speed NVMe Sample Streaming'],
    dicasOtimizacao: [
      'Desative opções de economia excessiva de energia na BIOS (como C-States profundos) se notar pequenas oscilações de latência DPC com interfaces de áudio USB.',
      'Aloque as bibliotecas de instrumentos virtuais (Kontakt, Spitfire) em um SSD NVMe dedicado exclusivo.'
    ]
  },
  {
    id: 'revit-bim-autocad',
    nome: 'Autodesk Revit BIM, AutoCAD & Civil 3D (Engenharia Civil & Arquitetura)',
    categoria: 'Engenharia Civil / BIM & CAD',
    engine: 'Autodesk Graphic Engine (DirectX 12 / High IPC Single-Thread BIM Parametric Modeling)',
    resumoRequisitos: 'Softwares de modelagem de informações da construção (BIM como Revit e Civil 3D) e CAD 2D/3D dependem criticamente do desempenho single-thread do processador para regeneração paramétrica de elementos de edifícios e cálculo de terraplenagem. Projetos grandes de engenharia demandam no mínimo 32GB a 64GB de memória RAM e placas de vídeo com drivers certificados e boa memória VRAM.',
    exigenciaVram: 'Mínimo 8GB VRAM para projetos médios; Recomendado 12GB - 16GB VRAM para nuvens de pontos e visualização 3D complexa.',
    exigenciaCpu: 'Altíssimo clock single-thread (5.0GHz+) é o fator número 1 para o Revit. Múltiplos núcleos auxiliam na exportação e no cálculo de malhas.',
    armazenamentoTipo: 'NVMe Gen4 Recomendado',
    resolucoesSuportadas: ['Projetos Pequenos', 'Projetos Médios', 'Projetos Complexos'],
    minima: {
      nome: 'Build AMD Engenharia & BIM Básico (Ryzen 7 5700X + RTX 4060 8GB + 32GB RAM)',
      descricao: 'Configuração eficiente para projetos residenciais, detalhamento no AutoCAD e modelagem BIM no Revit.',
      presetGrafico: 'Modelagem BIM Nível de Detalhe LOD 300 / 32GB RAM / AutoCAD 2D/3D',
      fpsEstimado: 'Regeneração Rápida de Vistas e Cortes Paramétricos',
      resolucaoAlvo: 'Projetos Médios',
      componentes: {
        cpu: 'AMD Ryzen 7 5700X (8 Núcleos / 16 Threads, Soquete AM4, Turbo 4.6GHz, 65W TDP)',
        motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4)',
        ram: 'Kingston Fury Beast 32GB (2x16GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 4060 8GB GDDR6 (Drivers Studio Certificados)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm)',
        storage: 'Kingston KC3000 1TB M.2 NVMe PCIe 4.0 (7000MB/s)',
        case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Suporte a aceleração DirectX 12 e múltiplos monitores para pranchas de engenharia',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '32GB de memória RAM para abrir pranchas complexas sem estouro de memória',
        'RTX 4060 acelera as visualizações sombreadas e realistas da viewport do Revit',
        'SSD NVMe com 7000 MB/s acelera a abertura e salvamento de arquivos centrais de projetos (.rvt / .dwg)'
      ]
    },
    recomendada: {
      nome: 'Build AMD Workstation BIM & Infraestrutura (Ryzen 7 7700X + RTX 4070 SUPER 12GB + 64GB DDR5)',
      descricao: 'Workstation de alta produtividade para grandes edifícios, infraestrutura no Civil 3D, nuvens de pontos e compatibilização Navisworks.',
      presetGrafico: 'Modelagem BIM LOD 400/500 / Pranchas Multidisciplinares / Civil 3D Superfícies Pesadas',
      fpsEstimado: 'Fluidez Total em Viewports 3D e Geração Instantânea de Cortes',
      resolucaoAlvo: 'Projetos Complexos',
      componentes: {
        cpu: 'AMD Ryzen 7 7700X (8 Núcleos / 16 Threads, AM5, Turbo 5.4GHz, 105W TDP)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5, 3x M.2)',
        ram: 'Corsair Vengeance 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
        gpu: 'Gigabyte GeForce RTX 4070 SUPER Gaming OC 12GB (Comprimento: 300mm, 12GB GDDR6X)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Samsung 990 Pro 2TB M.2 PCIe 4.0 NVMe (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm, Cooler 180mm)',
        psu: 'Corsair RM750e 750W 80 Plus Gold Modular ATX 3.0',
        extra: 'Compatível com nuvens de pontos LiDAR e modelos de compatibilização Navisworks',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Clock boost sustentado de 5.4 GHz garante respostas imediatas em cliques de modificação no Revit',
        '64GB de memória RAM DDR5 permite manipular arquivos de superfícies pesadas no Civil 3D',
        '12GB de VRAM GDDR6X suporta navegação 3D sem engasgos com sombras e iluminação real'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Engenharia & CAD (Core i5-13600K + RTX 4060 8GB + 32GB DDR5)',
      descricao: '14 núcleos com clock turbo de 5.1 GHz para excelente velocidade em comandos CAD e modelagem BIM.',
      presetGrafico: 'Modelagem Revit LOD 300 / AutoCAD 2D/3D / 32GB RAM DDR5',
      fpsEstimado: 'Regeneração de Vistas e Tabelas Instantânea',
      resolucaoAlvo: 'Projetos Médios',
      componentes: {
        cpu: 'Intel Core i5-13600K (14 Núcleos / 20 Threads, LGA1700, Turbo 5.1GHz, 181W)',
        motherboard: 'Gigabyte B760 Gaming X AX (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'Nvidia GeForce RTX 4060 8GB GDDR6 (Suporte a DirectX 12)',
        cooler: 'DeepCool AG620 Dual Tower Air Cooler (Altura: 157mm)',
        storage: 'Kingston KC3000 2TB M.2 PCIe 4.0 NVMe (7000MB/s)',
        case: 'Montech Air 903 Base (Suporta GPU 400mm)',
        psu: 'MSI MAG A750GL 750W 80 Plus Gold ATX 3.0',
        extra: 'Conexão estável para sincronização com Autodesk Construction Cloud (BIM 360)',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Alto desempenho single-thread do Core i5-13600K reduz em 40% o tempo de regeneração de modelos',
        'Memória DDR5 com alta largura de banda acelera a manipulação de famílias complexas no Revit'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Workstation Master Engenharia Civil (Core i7-14700K + RTX 4070 Ti SUPER 16GB + 64GB DDR5)',
      descricao: 'A máquina ideal recomendada pela indústria de engenharia e arquitetura: 20 núcleos, clock de 5.6 GHz, 64GB RAM e 16GB VRAM para projetos monumentais e nuvens de pontos.',
      presetGrafico: 'Grandes Empreendimentos BIM LOD 400/500 / Civil 3D Loteamentos / Navisworks Clash Detection',
      fpsEstimado: 'Tempo Zero de Espera em Regeneração Paramétrica e Análise de Interferências',
      resolucaoAlvo: 'Projetos Complexos',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, Turbo 5.6GHz, 33MB Cache, LGA1700, 253W)',
        motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5, 4x M.2 NVMe)',
        ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000MHz CL30 Intel XMP',
        gpu: 'ASUS TUF GeForce RTX 4070 Ti SUPER 16GB (16GB VRAM GDDR6X, 256-bit)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 2TB M.2 NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta Radiador 360mm e GPU 392mm)',
        psu: 'Corsair RM850x 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Suporte a múltiplos monitores 4K para pranchas e visualização 3D simultânea',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Clock monstruoso de 5.6 GHz em single-core domina o motor do Revit e Civil 3D',
        '64GB de memória DDR5 com 16GB VRAM na GPU permite abrir maquetes eletrônicas e nuvens de pontos sem travamento',
        '4 slots M.2 NVMe para expansão contínua de projetos de engenharia'
      ]
    },
    tecnologiasRecomendadas: ['DirectX 12 Autodesk Hardware Acceleration', 'BIM 360 Cloud Sync', 'Nvidia Studio Drivers', 'High IPC Single-Thread Dominance'],
    dicasOtimizacao: [
      'Priorize a velocidade de clock por núcleo (IPC) em vez de uma quantidade astronômica de núcleos lentos, já que o Revit executa a modelagem geométrica em uma única thread principal.',
      'Utilize no mínimo 64GB de RAM para modelos integrados com mais de 300MB de arquivo (.rvt).'
    ]
  },
  {
    id: 'lumion-twinmotion-sketchup',
    nome: 'Lumion 3D, Twinmotion & SketchUp Pro (Renderização Arquitetônica em Tempo Real)',
    categoria: 'Engenharia Civil / BIM & CAD',
    engine: 'Unreal Engine / Lumion Real-Time Ray Tracing Engine',
    resumoRequisitos: 'Softwares de renderização de arquitetura e engenharia em tempo real como Lumion e Twinmotion exigem enorme poder de GPU (Ray Tracing por hardware) e alta quantidade de VRAM para carregar árvores, vegetação 3D, texturas 4K/8K e iluminação global física.',
    exigenciaVram: 'Mínimo 8GB VRAM (Projetos pequenos); 12GB - 16GB VRAM mandatório para projetos com paisagismo denso e vídeo 4K.',
    exigenciaCpu: 'Processador de 8 a 16 núcleos para importação de geometria e animação de câmeras.',
    armazenamentoTipo: 'NVMe Gen4 Recomendado',
    resolucoesSuportadas: ['1080p', '1440p', '4K', 'Projetos Médios', 'Projetos Complexos'],
    minima: {
      nome: 'Build AMD ArqViz Básica (Ryzen 5 7600 + RTX 4060 Ti 16GB + 32GB DDR5)',
      descricao: 'Configuração moderna com 16GB de VRAM para carregar cenas ricas de vegetação sem estouro de memória de vídeo.',
      presetGrafico: 'Lumion Qualidade Média/Alta / Ray Tracing Básico / Render 1080p/1440p',
      fpsEstimado: '40 - 55 FPS em Viewport / Render Rápido',
      resolucaoAlvo: '1440p Quad HD',
      componentes: {
        cpu: 'AMD Ryzen 5 7600 (6 Núcleos / 12 Threads, Soquete AM5, 65W TDP)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'Nvidia GeForce RTX 4060 Ti 16GB (16GB VRAM GDDR6)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm)',
        storage: 'Kingston KC3000 1TB M.2 NVMe PCIe 4.0 (7000MB/s)',
        case: 'Montech Air 903 Base (Suporta GPU 400mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: '16GB VRAM para bibliotecas de blocos 3D e vegetação densa',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '16GB de VRAM permite renderizar cenas com milhares de árvores e reflexos sem lentidão',
        'Plataforma AM5 garante upgrade futuro para CPUs Ryzen 9000'
      ]
    },
    recomendada: {
      nome: 'Build AMD ArqViz Master (Ryzen 7 7800X3D / 7900X + RTX 4080 SUPER 16GB + 64GB DDR5)',
      descricao: 'Para estúdios de arquitetura e visualização que criam animações e passeios virtuais 4K com Ray Tracing completo.',
      presetGrafico: 'Lumion Ultra / Full Ray Tracing / Twinmotion Lumen / Render 4K HDR',
      fpsEstimado: '60+ FPS em Viewport 4K e Exportação de Animações em Minutos',
      resolucaoAlvo: '4K UHD / Render Animação',
      componentes: {
        cpu: 'AMD Ryzen 7 7800X3D ou Ryzen 9 7900X (AM5, 120W TDP)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5)',
        ram: 'Corsair Vengeance 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
        gpu: 'ASUS TUF GeForce RTX 4080 SUPER 16GB (Comprimento: 348mm, TDP: 320W)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Samsung 990 Pro 2TB M.2 NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm)',
        psu: 'Corsair RM850e 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Suporte a Path Tracing em tempo real',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'RTX 4080 SUPER reduz o tempo de renderização de vídeos de horas para minutos',
        '64GB DDR5 permite carregar modelos do SketchUp com centenas de blocos complexos'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel ArqViz Studio (Core i5-13600K + RTX 4060 Ti 16GB + 32GB DDR5)',
      descricao: 'Excelente desempenho de render com 16GB de VRAM e processamento ágil.',
      presetGrafico: 'Lumion Alto / Twinmotion Path Tracer / 1440p',
      fpsEstimado: '45 - 60 FPS na Viewport',
      resolucaoAlvo: '1440p Quad HD',
      componentes: {
        cpu: 'Intel Core i5-13600K (14 Núcleos / 20 Threads, LGA1700, Turbo 5.1GHz, 181W)',
        motherboard: 'Gigabyte B760 Gaming X AX (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'Nvidia GeForce RTX 4060 Ti 16GB GDDR6 (16GB VRAM)',
        cooler: 'DeepCool AG620 Dual Tower Air Cooler (Altura: 157mm)',
        storage: 'Kingston KC3000 1TB M.2 PCIe 4.0 NVMe (7000MB/s)',
        case: 'Montech Air 903 Base (Suporta GPU 400mm)',
        psu: 'MSI MAG A750GL 750W 80 Plus Gold ATX 3.0',
        extra: 'Drivers Nvidia Studio para evitar travamentos',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '16GB de VRAM na GPU acomoda texturas em altíssima resolução',
        'Excelente estabilidade térmica para renders prolongados'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel ArqViz Extreme 4K (Core i7-14700K + RTX 4080 SUPER 16GB + 64GB DDR5)',
      descricao: 'O setup definitivo para renderização fotorrealista de projetos arquitetônicos e vídeos de apresentação.',
      presetGrafico: 'Lumion Ultra / Ray Tracing / Render de Vídeo 4K Fotorrealista',
      fpsEstimado: 'Render de Vídeo 4K Ultrarrápido',
      resolucaoAlvo: '4K UHD / Render Animação',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, Turbo 5.6GHz, LGA1700, 253W)',
        motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000MHz CL30 Intel XMP',
        gpu: 'Gigabyte GeForce RTX 4080 SUPER Gaming OC 16GB (Comprimento: 342mm, 16GB GDDR6X)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 2TB M.2 NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta Radiador 360mm)',
        psu: 'Corsair RM850x 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Pipeline de animação 4K com iluminação global Lumen e Ray Tracing',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Aceleração massiva de Ray Tracing por hardware com os núcleos RT de 3ª geração da RTX 4080',
        'Dissipação térmica com Water Cooler 360mm para renderizações noturnas contínuas'
      ]
    },
    tecnologiasRecomendadas: ['Hardware Ray Tracing RT Cores', 'Unreal Engine Lumen & Nanite Support', 'High-VRAM Buffer (16GB+)', 'Nvidia Studio Drivers'],
    dicasOtimizacao: [
      'Para renders de vídeo 4K sem lentidão no Lumion, nunca utilize placas de vídeo com menos de 12GB de VRAM.',
      'Mantenha a ventilação do gabinete com pressão positiva para evitar acúmulo de poeira e manter temperaturas baixas durante renderizações de horas seguidas.'
    ]
  },
  {
    id: 'calculo-estrutural-tqs-eberick',
    nome: 'Engenharia Estrutural: TQS, AltoQi Eberick, SAP2000 & Robot Structural',
    categoria: 'Cálculo Estrutural / Engenharia',
    engine: 'Structural FEA Engine (Análise Matricial e de Elementos Finitos Multithreaded)',
    resumoRequisitos: 'Softwares de dimensionamento e cálculo estrutural de concreto armado, alvenaria estrutural e estruturas metálicas realizam inversão de matrizes de rigidez gigantescas e análises não-lineares. Demandam processadores com altíssima taxa de cálculo de ponto flutuante (AVX-512 / AVX2), memórias rápidas com temporizações ajustadas e SSDs velozes para gravação das matrizes temporárias de cálculo.',
    exigenciaVram: 'Uso moderado de GPU (6GB a 8GB suficiente para visualização 3D de armaduras e pórticos espaciais).',
    exigenciaCpu: 'Processador de 8 a 16 núcleos com alta densidade de cache L3 e instruções AVX para processamento paralelo de vigas, pilares e lajes.',
    armazenamentoTipo: 'NVMe Gen4 Recomendado',
    resolucoesSuportadas: ['Projetos Pequenos', 'Projetos Médios', 'Projetos Complexos'],
    minima: {
      nome: 'Build AMD Engenheiro Estrutural (Ryzen 7 5700X + RTX 3050 / 4060 + 32GB RAM)',
      descricao: 'Excelente estabilidade para edifícios de até 20 pavimentos no TQS e Eberick com 32GB de RAM.',
      presetGrafico: 'Edifícios até 20 Pavimentos / Análise Linear e P-Delta / 32GB RAM',
      fpsEstimado: 'Processamento de Pórtico Espacial em Segundos',
      resolucaoAlvo: 'Projetos Médios',
      componentes: {
        cpu: 'AMD Ryzen 7 5700X (8 Núcleos / 16 Threads, Soquete AM4, 65W TDP)',
        motherboard: 'MSI B550M PRO-VDH WIFI (Socket AM4, Micro-ATX, DDR4)',
        ram: 'Kingston Fury Beast 32GB (2x16GB) DDR4-3200MHz CL16',
        gpu: 'Nvidia GeForce RTX 4060 8GB GDDR6 (Visualização 3D de formas e armações)',
        cooler: 'DeepCool AG400 Air Cooler (Altura: 150mm)',
        storage: 'Kingston KC3000 1TB M.2 NVMe PCIe 4.0 (7000MB/s para arquivos de cálculo)',
        case: 'Montech Air 100 ARGB Micro-ATX (Suporta GPU 330mm, Cooler 161mm)',
        psu: 'MSI MAG A650BN 650W 80 Plus Bronze',
        extra: 'Suporte a múltiplos monitores para plantas de fôrma e relatórios de armação',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '32GB de memória garante que as matrizes de lajes e grelhas fiquem 100% carregadas na memória RAM',
        'SSD de 7000 MB/s reduz o tempo de gravação dos arquivos de resultados e relatórios'
      ]
    },
    recomendada: {
      nome: 'Build AMD Estruturas Complexas & FEA (Ryzen 9 7900X + RTX 4070 SUPER + 64GB DDR5)',
      descricao: 'Para grandes obras, pontes, galpões industriais e edifícios altos com análises dinâmicas de vento e não-linearidade física/geométrica.',
      presetGrafico: 'Edifícios Altos 30+ Pavimentos / Análise Não-Linear Física / Elementos Finitos (FEA)',
      fpsEstimado: 'Cálculo de Matrizes e Dimensionamento de Armaduras Ultrarrápido',
      resolucaoAlvo: 'Projetos Complexos',
      componentes: {
        cpu: 'AMD Ryzen 9 7900X (12 Núcleos / 24 Threads, AM5, Turbo 5.6GHz, Suporte AVX-512)',
        motherboard: 'ASUS TUF Gaming B650-PLUS WIFI (Socket AM5, ATX, DDR5)',
        ram: 'Corsair Vengeance 64GB (2x32GB) DDR5-6000MHz CL30 EXPO',
        gpu: 'Gigabyte GeForce RTX 4070 SUPER Gaming OC 12GB (Comprimento: 300mm)',
        cooler: 'Thermalright Peerless Assassin 120 SE (Altura: 155mm)',
        storage: 'Samsung 990 Pro 2TB M.2 PCIe 4.0 NVMe (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta GPU 392mm)',
        psu: 'Corsair RM750e 750W 80 Plus Gold Modular ATX 3.0',
        extra: 'Instruções AVX-512 nativas da arquitetura Zen 4 aceleram o solucionador de matrizes',
        rawText: ''
      },
      caracteristicasTecnicas: [
        'Suporte nativo a instruções AVX-512 nos núcleos Zen 4 acelera em até 2x o cálculo de elementos finitos',
        '64GB DDR5 com baixa latência CL30 sustenta grandes volumes de dados de análise estrutural'
      ]
    },
    minimaIntel: {
      nome: 'Build Intel Cálculo Estrutural (Core i5-13600K + RTX 4060 8GB + 32GB DDR5)',
      descricao: '14 núcleos e alto poder de ponto flutuante para dimensionamento de concreto armado e estruturas metálicas.',
      presetGrafico: 'TQS / Eberick / SAP2000 / 32GB RAM DDR5',
      fpsEstimado: 'Processamento Estrutural Rápido e Estável',
      resolucaoAlvo: 'Projetos Médios',
      componentes: {
        cpu: 'Intel Core i5-13600K (14 Núcleos / 20 Threads, LGA1700, Turbo 5.1GHz, 181W)',
        motherboard: 'Gigabyte B760 Gaming X AX (Socket LGA1700, ATX, DDR5)',
        ram: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600MHz CL36',
        gpu: 'Nvidia GeForce RTX 4060 8GB GDDR6 (Visualização 3D de armações e tensões)',
        cooler: 'DeepCool AG620 Dual Tower Air Cooler (Altura: 157mm)',
        storage: 'Kingston KC3000 2TB M.2 PCIe 4.0 NVMe (7000MB/s)',
        case: 'Montech Air 903 Base (Suporta GPU 400mm)',
        psu: 'MSI MAG A750GL 750W 80 Plus Gold ATX 3.0',
        extra: 'Ideal para escritório de projetos estruturais',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '14 núcleos Intel distribuem o processamento de lajes e pilares em threads simultâneas',
        'Estabilidade comprovada em sessões ininterruptas de cálculo estrutural'
      ]
    },
    recomendadaIntel: {
      nome: 'Build Intel Master Engenharia Estrutural (Core i7-14700K + RTX 4070 Ti SUPER 16GB + 64GB DDR5)',
      descricao: 'Workstation topo de linha para grandes escritórios de cálculo estrutural e consultorias de engenharia pesada.',
      presetGrafico: 'Grandes Obras de Infraestrutura / Análises Dinâmicas de Vento / Elementos Finitos',
      fpsEstimado: 'Tempo Mínimo de Cálculo e Relatórios Completos Instantâneos',
      resolucaoAlvo: 'Projetos Complexos',
      componentes: {
        cpu: 'Intel Core i7-14700K (20 Núcleos / 28 Threads, Turbo 5.6GHz, 33MB Cache, LGA1700, 253W)',
        motherboard: 'ASUS TUF Gaming Z790-PLUS WIFI (Socket LGA1700, ATX, DDR5)',
        ram: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000MHz CL30 Intel XMP',
        gpu: 'ASUS TUF GeForce RTX 4070 Ti SUPER 16GB (16GB GDDR6X)',
        cooler: 'Arctic Liquid Freezer III 360 AIO Water Cooler (360mm)',
        storage: 'Samsung 990 Pro 2TB M.2 NVMe PCIe 4.0 (7450MB/s)',
        case: 'Lian Li LANCOOL 216 ATX (Suporta Radiador 360mm)',
        psu: 'Corsair RM850x 850W 80 Plus Gold Modular ATX 3.0',
        extra: 'Capacidade de rodar múltiplas análises não-lineares em paralelo',
        rawText: ''
      },
      caracteristicasTecnicas: [
        '20 núcleos e 28 threads executam análises de pórticos e grelhas em tempo recorde',
        '64GB DDR5 com 4 slots de expansão na placa Z790 permite upgrades futuros para até 128GB'
      ]
    },
    tecnologiasRecomendadas: ['AVX-512 & AVX2 Floating Point Math', 'Multi-Threaded FEA Matrix Solver', 'High-Speed NVMe Scratch Storage', 'Multi-Display Productivity'],
    dicasOtimizacao: [
      'Configure os solvers do software estrutural para utilizar o número total de núcleos físicos da CPU para acelerar a inversão de matrizes de rigidez.',
      'Sempre utilize fontes de alta eficiência (80 Plus Gold) e nobreak senoidal para proteger o computador durante cálculos estruturais demorados.'
    ]
  }
];
