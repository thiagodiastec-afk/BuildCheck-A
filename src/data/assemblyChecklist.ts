export interface ChecklistStep {
  id: string;
  fase: 'PREPARACAO' | 'PLACA_MAE_CPU' | 'COOLER_PASTA' | 'GABINETE' | 'CABEAMENTO_ENERGIA' | 'PRIMEIRO_BOOT';
  titulo: string;
  descricao: string;
  avisoCritico?: string;
  dicaPro?: string;
  impacto: 'CRITICO' | 'ALTO' | 'MEDIO';
  tags: string[];
}

export const ASSEMBLY_PHASES: { id: ChecklistStep['fase']; label: string; iconName: string }[] = [
  { id: 'PREPARACAO', label: '1. Preparação & Bancada', iconName: 'Layers' },
  { id: 'PLACA_MAE_CPU', label: '2. Placa-Mãe, CPU & RAM', iconName: 'Cpu' },
  { id: 'COOLER_PASTA', label: '3. Refrigeração & Pasta Térmica', iconName: 'Flame' },
  { id: 'GABINETE', label: '4. Instalação no Gabinete', iconName: 'Box' },
  { id: 'CABEAMENTO_ENERGIA', label: '5. Cabeamento & Alimentação', iconName: 'Zap' },
  { id: 'PRIMEIRO_BOOT', label: '6. Checagem Pré-Ligue & Boot', iconName: 'Power' },
];

export const ASSEMBLY_CHECKLIST_DATA: ChecklistStep[] = [
  // FASE 1: PREPARAÇÃO
  {
    id: 'prep-surface',
    fase: 'PREPARACAO',
    titulo: 'Bancada limpa e superfície não condutiva',
    descricao: 'Monte o setup sobre uma mesa de madeira lisa ou um mousepad grande. Nunca monte a placa-mãe sobre o lado externo do saco antiestático cinza, pois a parte externa é condutiva e pode fechar curto na solda ao testar.',
    avisoCritico: 'Nunca coloque a placa-mãe em cima do saco antiestático ao ligar fora do gabinete.',
    dicaPro: 'Utilize a própria caixa de papelão da placa-mãe como bancada de teste inicial.',
    impacto: 'ALTO',
    tags: ['Eletrostática', 'Bancada']
  },
  {
    id: 'prep-tools',
    fase: 'PREPARACAO',
    titulo: 'Ferramentas e insumos separados',
    descricao: 'Tenha em mãos: chave Philips nº 2 (preferencialmente magnética), álcool isopropílico 99% e papel toalha (caso precise limpar pasta antiga), abraçadeiras plásticas para organização de cabos.',
    impacto: 'MEDIO',
    tags: ['Ferramentas']
  },

  // FASE 2: PLACA-MÃE, CPU & RAM
  {
    id: 'cpu-socket-alignment',
    fase: 'PLACA_MAE_CPU',
    titulo: 'Alinhamento da CPU no soquete sem pressão forçada',
    descricao: 'Identifique o triângulo dourado no canto do processador e coincida perfeitamente com a marca triangular no soquete da placa-mãe. Solte o processador com suavidade por gravidade.',
    avisoCritico: 'Jamais force a inserção. Pinos entortados em soquetes LGA (Intel/AM5) ou CPUs PGA anulam a garantia e causam falha no boot.',
    dicaPro: 'Feche a alavanca de retenção com firmeza moderada. É normal ouvir um leve rangido metálico nas travas modernas.',
    impacto: 'CRITICO',
    tags: ['CPU', 'Soquete', 'Segurança']
  },
  {
    id: 'ram-dual-channel',
    fase: 'PLACA_MAE_CPU',
    titulo: 'Instalação da Memória RAM nos slots prioritários (Dual-Channel)',
    descricao: 'Para 2 pentes em placas-mãe com 4 slots, instale obrigatoriamente nos slots 2 e 4 (A2 e B2, contando a partir do soquete). Abra as travas, alinhe o chanfro da memória e pressione as duas pontas uniformemente até ouvir o clique duplo.',
    avisoCritico: 'Usar os slots 1 e 3 pode impedir que perfis XMP/EXPO de alta frequência (6000MHz+) funcionem com estabilidade.',
    dicaPro: 'Pressione até a trava plástica fechar completamente e travar a ranhura lateral da memória.',
    impacto: 'ALTO',
    tags: ['RAM', 'Dual Channel', 'Slots']
  },
  {
    id: 'm2-thermal-pad-film',
    fase: 'PLACA_MAE_CPU',
    titulo: 'Remover película plástica do Thermal Pad do SSD M.2',
    descricao: 'Ao instalar o SSD NVMe sob os dissipadores de alumínio da placa-mãe, remova a película azul ou transparente que cobre o thermal pad condutivo.',
    avisoCritico: 'Esquecer o plástico no thermal pad causa superaquecimento e estrangulamento térmico (thermal throttling) severo no SSD NVMe.',
    dicaPro: 'Instale o SSD no primeiro slot M.2 superior (ligado diretamente às pistas PCIe da CPU, sem passar pelo chipset).',
    impacto: 'ALTO',
    tags: ['SSD', 'M.2', 'Thermal Pad']
  },

  // FASE 3: COOLER, REFRIGERAÇÃO & PASTA TÉRMICA
  {
    id: 'cooler-peel-sticker',
    fase: 'COOLER_PASTA',
    titulo: 'Remoção obrigatória da película plástica na base do Cooler / Water Cooler',
    descricao: 'Praticamente todos os coolers a ar e blocos de water cooler novos vêm de fábrica com um adesivo plástico transparente na base de cobre escrito "WARNING: REMOVE BEFORE USE".',
    avisoCritico: '⚠️ ERRO MAIS COMUM: Se esquecer esta película, a CPU passará de 90°C a 100°C em menos de 10 segundos no primeiro boot, causando desligamento térmico de emergência.',
    dicaPro: 'Verifique visualmente e passe o dedo limpo na base de cobre antes de aplicar a pasta.',
    impacto: 'CRITICO',
    tags: ['Cooler', 'Película Protetora', 'Térmico']
  },
  {
    id: 'thermal-paste-application',
    fase: 'COOLER_PASTA',
    titulo: 'Aplicação correta da pasta térmica (sem excessos ou bolhas)',
    descricao: 'Se o cooler não vier com pasta pré-aplicada de fábrica, coloque uma gota do tamanho de um grão de ervilha grande ou um padrão em "X" fino no centro do IHS metálico da CPU.',
    avisoCritico: 'Não espalhe pasta térmica com os dedos nus (óleos corporais degradam a transferência de calor) e evite excesso que transborde para o PCB da placa-mãe.',
    dicaPro: 'Aperte os parafusos do cooler em padrão cruzado diagonal alternado (1-2 voltas por parafuso) para espalhar a pasta com pressão 100% uniforme.',
    impacto: 'CRITICO',
    tags: ['Pasta Térmica', 'Pressão de Montagem']
  },
  {
    id: 'cooler-fan-header',
    fase: 'COOLER_PASTA',
    titulo: 'Conexão dos cabos no conector CPU_FAN e AIO_PUMP correto',
    descricao: 'Conecte o conector PWM de 4 pinos da ventoinha do cooler no conector rotulado exatamente como "CPU_FAN". Para Water Coolers, conecte a bomba no header "AIO_PUMP" / "PUMP_FAN" e as ventoinhas do radiador em "CPU_FAN" ou "CPU_OPT".',
    avisoCritico: 'Se conectar a ventoinha da CPU em um header SYS_FAN comum, a placa-mãe exibirá o erro "CPU Fan Speed Detection Error" e pode recusar o boot.',
    impacto: 'ALTO',
    tags: ['CPU_FAN', 'PWM', 'Bomba AIO']
  },

  // FASE 4: INSTALAÇÃO NO GABINETE
  {
    id: 'motherboard-standoffs',
    fase: 'GABINETE',
    titulo: 'Espaçadores metálicos (Standoffs) instalados nas posições exatas',
    descricao: 'Certifique-se de que os parafusos dourados/pretos de sustentação (standoffs) no fundo do gabinete correspondam rigorosamente aos furos da sua placa-mãe (ATX, Micro-ATX ou Mini-ITX).',
    avisoCritico: '⚠️ RISCO DE QUEIMA FATAL: Um espaçador posicionado em local sem furo encosta diretamente nas trilhas de cobre na traseira da placa-mãe, causando curto-circuito instantâneo ao energizar a fonte.',
    dicaPro: 'Conte o número de furos na placa-mãe (geralmente 6 a 9) e confirme que há a mesma quantidade exata de espaçadores parafusados.',
    impacto: 'CRITICO',
    tags: ['Standoffs', 'Curto-Circuito', 'Gabinete']
  },
  {
    id: 'io-shield-install',
    fase: 'GABINETE',
    titulo: 'Instalação do espelho traseiro (I/O Shield)',
    descricao: 'Se a sua placa-mãe não possuir espelho integrado, encaixe o espelho metálico no recorte traseiro do gabinete ANTES de parafusar a placa-mãe.',
    dicaPro: 'Verifique se as abas metálicas de aterramento do espelho não entraram para dentro das portas USB ou HDMI durante o encaixe da placa.',
    impacto: 'MEDIO',
    tags: ['I/O Shield', 'Portas Traseiras']
  },
  {
    id: 'airflow-direction',
    fase: 'GABINETE',
    titulo: 'Sentido do fluxo de ar das ventoinhas (Pressão Positiva)',
    descricao: 'Ventoinhas frontais e inferiores devem puxar ar frio para dentro (Intake - lado com as pás visíveis voltado para fora). Ventoinhas traseiras e superiores devem empurrar o ar quente para fora (Exhaust - lado com a estrutura plástica/motor voltado para fora).',
    impacto: 'ALTO',
    tags: ['Fluxo de Ar', 'Ventoinhas', 'Gabinete']
  },

  // FASE 5: CABEAMENTO & ALIMENTAÇÃO (CRÍTICO)
  {
    id: 'cpu-eps-8pin-power',
    fase: 'CABEAMENTO_ENERGIA',
    titulo: 'Cabo de alimentação CPU EPS 8 Pinos (4+4) conectado firmemente',
    descricao: 'Conecte o cabo rotulado como "CPU" ou "EPS" (divisor 4+4 pinos) no conector localizado no canto superior esquerdo da placa-mãe até ouvir a trava plástica engatar.',
    avisoCritico: '⚠️ NUNCA CONFUNDA O CABO PCIe COM O CABO CPU: O cabo PCIe 8 pinos (6+2) de GPU tem a polaridade de pinos invertida em relação ao cabo CPU (4+4). Forçar o cabo errado causa curto-circuito na linha de 12V da fonte.',
    dicaPro: 'Se a sua placa-mãe tiver dois conectores (8 pinos + 4 pinos) e seu processador for de TDP moderado, o conector principal de 8 pinos é obrigatório; o de 4 pinos extra é opcional para overclock extremo.',
    impacto: 'CRITICO',
    tags: ['CPU 8 Pinos', 'EPS', 'Alimentação']
  },
  {
    id: 'main-atx-24pin',
    fase: 'CABEAMENTO_ENERGIA',
    titulo: 'Cabo principal ATX 24 pinos conectado até o clique',
    descricao: 'O conector de 24 pinos requer pressão uniforme. Verifique se o gancho plástico lateral travou completamente na saliência do conector da placa-mãe sem deixar folgas milimétricas.',
    impacto: 'ALTO',
    tags: ['ATX 24 Pinos', 'Placa-Mãe']
  },
  {
    id: 'gpu-pcie-power-cables',
    fase: 'CABEAMENTO_ENERGIA',
    titulo: 'Cabos PCIe individuais dedicados para a Placa de Vídeo (Sem Daisy-Chain em GPUs fortes)',
    descricao: 'Para placas de vídeo com 2 ou mais conectores de 8 pinos, utilize cabos individuais separados vindos da fonte em vez de usar o conector duplicado (pigtail/daisy-chain) de um único cabo.',
    avisoCritico: 'Usar um único cabo em placas com consumo acima de 220W pode superaquecer a bitola dos fios e desarmar a fonte por sobrecorrente (OCP).',
    dicaPro: 'Em placas com o conector 12VHPWR (16 pinos / PCIe Gen 5), empurre até o fim absoluto sem deixar frestas visíveis e evite dobrar o cabo a menos de 35mm do plugue.',
    impacto: 'CRITICO',
    tags: ['GPU', 'PCIe 8 Pinos', '12VHPWR', 'Fonte']
  },
  {
    id: 'front-panel-headers',
    fase: 'CABEAMENTO_ENERGIA',
    titulo: 'Conexão dos pinos do painel frontal (Power SW, Reset SW, LEDs)',
    descricao: 'Consulte o diagrama da placa-mãe para conectar os pequenos conectores individuais do botão liga/desliga (Power SW), Reset e LEDs de atividade.',
    dicaPro: 'Os botões de Power SW e Reset SW não possuem polaridade (funcionam em qualquer orientação), mas os LEDs (+ e -) exigem o polo positivo correto.',
    impacto: 'MEDIO',
    tags: ['Painel Frontal', 'Power SW']
  },

  // FASE 6: PRIMEIRO BOOT & CHECAGEM FINAL
  {
    id: 'display-cable-to-gpu',
    fase: 'PRIMEIRO_BOOT',
    titulo: 'Cabo de vídeo (DisplayPort/HDMI) conectado na Placa de Vídeo (GPU)',
    descricao: 'Conecte o cabo de vídeo na saída traseira da PLACA DE VÍDEO DEDICADA, e nunca nas saídas de vídeo da placa-mãe.',
    avisoCritico: 'Conectar na placa-mãe quando a CPU não tem vídeo integrado (ex: Ryzen linha F ou Intel linha F) resultará em tela preta total (No Signal).',
    impacto: 'CRITICO',
    tags: ['DisplayPort', 'HDMI', 'GPU', 'Vídeo']
  },
  {
    id: 'psu-switch-on',
    fase: 'PRIMEIRO_BOOT',
    titulo: 'Chave I/O traseira da fonte na posição LIGADA (I)',
    descricao: 'Antes de pressionar o botão de ligar do gabinete, coloque a chave seletora da fonte na posição "I" (Ligada).',
    dicaPro: 'Verifique se os LEDs de standby da placa-mãe ou iluminação de diagnóstico acenderam.',
    impacto: 'MEDIO',
    tags: ['Fonte', 'Chave I/O']
  },
  {
    id: 'first-boot-memory-training',
    fase: 'PRIMEIRO_BOOT',
    titulo: 'Treinamento inicial de memória DDR5 no primeiro boot',
    descricao: 'Em plataformas recentes (AMD AM5 e Intel LGA1700 com DDR5), o primeiro boot pode demorar de 1 a 3 minutos com tela preta enquanto a placa-mãe calibra as frequências e latências dos módulos de memória.',
    avisoCritico: 'Não desligue o PC nem puxe o cabo da tomada durante esse primeiro boot de treinamento de memória.',
    dicaPro: 'Assim que der vídeo, pressione DEL/F2 para entrar na BIOS e ative o perfil XMP (Intel) ou EXPO / DOCP (AMD) para usar a frequência máxima nominal da memória.',
    impacto: 'ALTO',
    tags: ['DDR5', 'Treinamento de Memória', 'BIOS', 'XMP', 'EXPO']
  }
];
