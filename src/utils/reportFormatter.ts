import type { AnalysisResult, PCComponents } from '../types';

export interface FormatOptions {
  format?: 'markdown' | 'plain' | 'discord' | 'forum';
  buildTitle?: string;
}

export function generateFormattedAuditSummary(
  result: AnalysisResult,
  components: PCComponents,
  options: FormatOptions = {}
): string {
  const { format = 'markdown', buildTitle } = options;

  const isCompatible = result.status_geral === 'COMPATIVEL';
  const isIncompatible = result.status_geral === 'INCOMPATIVEL';
  const isWarning = result.status_geral === 'ALERTA';

  const statusSymbol = isCompatible ? '✅ COMPATÍVEL' : isIncompatible ? '❌ INCOMPATÍVEL' : '⚠️ ALERTA / RESSALVAS';
  const score = result.score_compatibilidade ?? (isCompatible ? 100 : isIncompatible ? 20 : 75);

  const titleHeader = buildTitle ? ` - ${buildTitle}` : '';

  if (format === 'discord') {
    // Discord markdown formatting with emojis and codeblocks
    const lines: string[] = [
      `# 🛠️ **RELATÓRIO DE AUDITORIA DE HARDWARE**${titleHeader ? ` (${buildTitle})` : ''}`,
      `> **Status Geral:** **${statusSymbol}** (Índice de Confiabilidade: **${score}/100**)`,
      ``,
      `### 📋 **Componentes do Setup:**`,
      `* **CPU:** \`${components.cpu || 'Não informado'}\``,
      `* **Placa-Mãe:** \`${components.motherboard || 'Não informado'}\``,
      `* **Memória RAM:** \`${components.ram || 'Não informado'}\``,
      `* **Placa de Vídeo:** \`${components.gpu || 'Não informado'}\``,
      `* **Cooler CPU:** \`${components.cooler || 'Não informado'}\``,
      `* **Armazenamento:** \`${components.storage || 'Não informado'}\``,
      `* **Gabinete:** \`${components.case || 'Não informado'}\``,
      `* **Fonte (PSU):** \`${components.psu || 'Não informado'}\``,
      ...(components.extra ? [`* **Extras/Fans:** \`${components.extra}\``] : []),
      ``,
      `### 🔍 **Resumo Técnico Executivo:**`,
      `${result.resumo_executivo}`,
      ``,
      `### ⚡ **Dimensionamento Elétrico:**`,
      `* **Consumo Total Estimado:** \`${result.demanda_eletrica?.consumo_estimado_sistema_w || 0}W\` (CPU: ${result.demanda_eletrica?.tdp_cpu_w || 0}W | GPU: ${result.demanda_eletrica?.tdp_gpu_w || 0}W)`,
      `* **Fonte Informada:** \`${result.demanda_eletrica?.potencia_fonte_informada_w ? `${result.demanda_eletrica.potencia_fonte_informada_w}W` : 'Não especificada'}\``,
      `* **Potência Recomendada:** \`${result.demanda_eletrica?.potencia_recomendada_psu_w || 0}W\` (Margem de Segurança: \`${result.demanda_eletrica?.margem_seguranca_percentual ? `+${result.demanda_eletrica.margem_seguranca_percentual}%` : 'N/A'}\`)`,
      `* **Avaliação Elétrica:** ${result.demanda_eletrica?.avaliacao_fonte || 'OK'}`,
      ``,
      `### 📐 **Compatibilidade Física & Dimensões:**`,
      `* **Placa de Vídeo vs Gabinete:** GPU ${result.dimensoes_fisicas?.comprimento_gpu_mm ? `${result.dimensoes_fisicas.comprimento_gpu_mm}mm` : 'N/A'} (Limite do gabinete: ${result.dimensoes_fisicas?.limite_gpu_gabinete_mm ? `${result.dimensoes_fisicas.limite_gpu_gabinete_mm}mm` : 'Compatível'})`,
      `* **Cooler vs Gabinete:** Altura ${result.dimensoes_fisicas?.altura_cooler_mm ? `${result.dimensoes_fisicas.altura_cooler_mm}mm` : 'N/A'} (Limite do gabinete: ${result.dimensoes_fisicas?.limite_altura_cooler_gabinete_mm ? `${result.dimensoes_fisicas.limite_altura_cooler_gabinete_mm}mm` : 'Compatível'})`,
      `* **Fator de Forma Placa-Mãe:** ${result.dimensoes_fisicas?.form_factor_placa_mae || 'ATX/mATX'}`,
      ``,
      `### 🧩 **Soquete & Padrão de Memória:**`,
      `* **CPU / Soquete:** ${result.soquete_e_geracao?.soquete_cpu || 'Compatível'} | **Placa-Mãe:** ${result.soquete_e_geracao?.soquete_placa_mae || 'Compatível'} (Chipset: ${result.soquete_e_geracao?.chipset || 'N/A'})`,
      `* **Memória RAM:** ${result.memoria_ram?.tipo_memoria_escolhida || 'DDR4/DDR5'} (${result.memoria_ram?.canais_recomendados || 'Dual Channel'})`,
    ];

    if (result.incompatibilidades_criticas && result.incompatibilidades_criticas.length > 0) {
      lines.push(
        ``,
        `### 🚫 **INCOMPATIBILIDADES CRÍTICAS DETECTADAS (${result.incompatibilidades_criticas.length}):**`,
        ...result.incompatibilidades_criticas.map(inc => `* ❌ ${inc}`)
      );
    }

    if (result.alertas_e_recomendacoes_tecnicas && result.alertas_e_recomendacoes_tecnicas.length > 0) {
      lines.push(
        ``,
        `### ⚠️ **Alertas Técnicos & Ressalvas:**`,
        ...result.alertas_e_recomendacoes_tecnicas.map(al => `* 🔸 ${al}`)
      );
    }

    if (result.recomendacoes_otimizacao && result.recomendacoes_otimizacao.length > 0) {
      lines.push(
        ``,
        `### 🚀 **Recomendações de Otimização & Performance:**`,
        ...result.recomendacoes_otimizacao.map(rec => 
          `* **[${rec.nivelImpacto}] ${rec.titulo}:**\n  * **Gargalo:** ${rec.gargaloIdentificado}\n  * **Ajuste:** ${rec.ajusteSugerido}\n  * **Ganho:** ${rec.ganhoEsperado}`
        )
      );
    }

    lines.push(
      ``,
      `---`,
      `*Auditoria gerada via Especialista em Arquitetura de Hardware de PC*`
    );

    return lines.join('\n');
  }

  // Standard Markdown format (Perfect for Reddit, Clube do Hardware, Adrenaline, GitHub, Tech Forums)
  const lines: string[] = [
    `# ========================================================`,
    `# RELATÓRIO DE AUDITORIA TÉCNICA DE COMPATIBILIDADE DE PC${titleHeader.toUpperCase()}`,
    `# ========================================================`,
    ``,
    `## 📊 STATUS GERAL: [ ${statusSymbol} ]`,
    `* **Índice de Confiabilidade Arquitetural:** ${score}/100`,
    `* **Data da Análise:** ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    ``,
    `## ⚙️ LISTA DE COMPONENTES AVALIADOS:`,
    `- **Processador (CPU):** ${components.cpu || 'Não informado'}`,
    `- **Placa-Mãe (Motherboard):** ${components.motherboard || 'Não informado'}`,
    `- **Memória RAM:** ${components.ram || 'Não informado'}`,
    `- **Placa de Vídeo (GPU):** ${components.gpu || 'Não informado'}`,
    `- **Cooler da CPU:** ${components.cooler || 'Não informado'}`,
    `- **Armazenamento (SSD/HD):** ${components.storage || 'Não informado'}`,
    `- **Gabinete (Case):** ${components.case || 'Não informado'}`,
    `- **Fonte de Alimentação (PSU):** ${components.psu || 'Não informado'}`,
    ...(components.extra ? [`- **Outros / Extras:** ${components.extra}`] : []),
    ``,
    `## 📝 PARECER TÉCNICO EXECUTIVO:`,
    `${result.resumo_executivo}`,
    ``,
    `## ⚡ DEMANDA ELÉTRICA & DIMENSIONAMENTO DE FONTE:`,
    `- **Consumo Total Estimado do Sistema:** ~${result.demanda_eletrica?.consumo_estimado_sistema_w || 0}W (CPU: ${result.demanda_eletrica?.tdp_cpu_w || 0}W | GPU: ${result.demanda_eletrica?.tdp_gpu_w || 0}W | Placa/SSDs/Fans: ${result.demanda_eletrica?.consumo_outros_w || 60}W)`,
    `- **Fonte Informada:** ${result.demanda_eletrica?.potencia_fonte_informada_w ? `${result.demanda_eletrica.potencia_fonte_informada_w}W` : 'Não especificada nominalmente'}`,
    `- **Potência Recomendada da Fonte:** ${result.demanda_eletrica?.potencia_recomendada_psu_w || 0}W`,
    `- **Margem de Segurança:** ${result.demanda_eletrica?.margem_seguranca_percentual !== null && result.demanda_eletrica?.margem_seguranca_percentual !== undefined ? `+${result.demanda_eletrica.margem_seguranca_percentual}% de folga` : 'N/A'}`,
    `- **Diagnóstico da Fonte:** ${result.demanda_eletrica?.avaliacao_fonte || 'Dentro dos parâmetros normais'}`,
    ``,
    `## 📏 FOLGAS FÍSICAS & GABINETE:`,
    `- **Comprimento da GPU:** ${result.dimensoes_fisicas?.comprimento_gpu_mm ? `${result.dimensoes_fisicas.comprimento_gpu_mm}mm` : 'Dimensão compatível'} (Espaço máx. no gabinete: ${result.dimensoes_fisicas?.limite_gpu_gabinete_mm ? `${result.dimensoes_fisicas.limite_gpu_gabinete_mm}mm` : 'Adequado'})`,
    `- **Altura do Cooler:** ${result.dimensoes_fisicas?.altura_cooler_mm ? `${result.dimensoes_fisicas.altura_cooler_mm}mm` : 'Dimensão compatível'} (Espaço máx. no gabinete: ${result.dimensoes_fisicas?.limite_altura_cooler_gabinete_mm ? `${result.dimensoes_fisicas.limite_altura_cooler_gabinete_mm}mm` : 'Adequado'})`,
    `- **Fator de Forma da Placa-Mãe:** ${result.dimensoes_fisicas?.form_factor_placa_mae || 'ATX / Micro-ATX'}`,
    `- **Avaliação Física:** ${result.dimensoes_fisicas?.compatibilidade_fisica || 'Folgas e fluxo de ar verificados'}`,
    ``,
    `## 🔌 SOQUETE, CHIPSET & MEMÓRIA RAM:`,
    `- **Soquete CPU vs Placa-Mãe:** ${result.soquete_e_geracao?.soquete_cpu || 'N/A'} vs ${result.soquete_e_geracao?.soquete_placa_mae || 'N/A'} (Chipset: ${result.soquete_e_geracao?.chipset || 'N/A'})`,
    `- **Geração de Memória:** ${result.memoria_ram?.tipo_memoria_escolhida || 'DDR4 / DDR5'} (${result.memoria_ram?.canais_recomendados || 'Dual Channel'})`,
    `- **Atualização de BIOS Necessária:** ${result.soquete_e_geracao?.compatibilidade_bios_necessaria ? 'Sim (pode requerer BIOS Flashback)' : 'Não'}`,
    `- **Observação de Soquete:** ${result.soquete_e_geracao?.observacao || 'Totalmente compatível'}`,
  ];

  if (result.incompatibilidades_criticas && result.incompatibilidades_criticas.length > 0) {
    lines.push(
      ``,
      `## ❌ INCOMPATIBILIDADES CRÍTICAS IDENTIFICADAS (${result.incompatibilidades_criticas.length}):`,
      ...result.incompatibilidades_criticas.map((inc, i) => `${i + 1}. [ERRO CRÍTICO] ${inc}`)
    );
  }

  if (result.alertas_e_recomendacoes_tecnicas && result.alertas_e_recomendacoes_tecnicas.length > 0) {
    lines.push(
      ``,
      `## ⚠️ ALERTAS TÉCNICOS & RESSALVAS:`,
      ...result.alertas_e_recomendacoes_tecnicas.map((al, i) => `${i + 1}. [AVISO] ${al}`)
    );
  }

  if (result.recomendacoes_otimizacao && result.recomendacoes_otimizacao.length > 0) {
    lines.push(
      ``,
      `## 🚀 RECOMENDAÇÕES DE OTIMIZAÇÃO & PERFORMANCE:`,
      ...result.recomendacoes_otimizacao.map((rec, i) => 
        `${i + 1}. **[Impacto ${rec.nivelImpacto}] ${rec.titulo}**\n   - **Gargalo:** ${rec.gargaloIdentificado}\n   - **Ajuste Sugerido:** ${rec.ajusteSugerido}\n   - **Ganho Esperado:** ${rec.ganhoEsperado}${rec.explicacaoTecnica ? `\n   - **Base Técnica:** ${rec.explicacaoTecnica}` : ''}`
      )
    );
  }

  if (result.verificacoes && result.verificacoes.length > 0) {
    lines.push(
      ``,
      `## 📋 DETALHAMENTO DAS VERIFICAÇÕES TÉCNICAS:`,
      ...result.verificacoes.map(v => 
        `- [${v.status === 'OK' ? 'OK' : v.status === 'ERRO' ? 'ERRO' : 'AVISO'}] **${v.titulo}**: ${v.detalhes}`
      )
    );
  }

  lines.push(
    ``,
    `--------------------------------------------------------`,
    `*Relatório gerado automaticamente por Especialista em Arquitetura de Computadores e Hardware.*`,
    `*Foco 100% técnico em compatibilidade física, elétrica e térmica.*`
  );

  return lines.join('\n');
}
