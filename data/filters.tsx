/**
 * Este arquivo define conjuntos de dados categorizados utilizados para representar diferentes aspectos de negócios em uma aplicação web.
 * Os dados são usados para preencher seletores em interfaces de usuário, como filtros em tabelas, opções em formulários e indicadores visuais.
 *
 * Categorias de Dados:
 * - Labels: Categorias que podem representar tipos de transações ou propriedades de itens, como 'Revenda' ou 'Despesa/Imobilizado'.
 * - Statuses: Define estados de processos ou tarefas, cada um com um ícone associado para uma representação visual imediata,
 *   como 'A Classificar' (com ícone de um relógio) ou 'Classificada' (com ícone de verificação).
 * - Priorities: Indica a prioridade de tarefas ou alertas, também com ícones associados que variam de setas para cima (alta) a setas para baixo (baixa).
 * - Filiais: Representa localizações ou filiais de uma organização, numeradas e nomeadas especificamente, como '0101 - Curitiba' ou '0119 - Cariacica'.
 *
 * Uso:
 * - Os 'Labels' são frequentemente utilizados para categorização em filtros de tabelas ou como tags em visualizações de detalhes de itens.
 * - Os 'Statuses' são usados em colunas de tabelas para indicar rapidamente o estado de uma tarefa, frequentemente acompanhados por filtros correspondentes.
 * - As 'Priorities' são usadas para filtrar ou ordenar listas de tarefas, mostrando visualmente a urgência através dos ícones.
 * - As 'Filiais' são utilizadas em seletores de localização em formulários ou como filtros em relatórios e dashboards para análise regional.
 *
 * Essas definições são projetadas para facilitar o desenvolvimento e a manutenção de componentes de UI que dependem de dados padronizados e consistentes.
 */


import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'rev',
    label: 'Revenda',
  },
  {
    value: 'des',
    label: 'Despesa/Imobilizado',
  },
  {
    value: 'map',
    label: 'Matéria Prima',
  },
  {
    value: 'col',
    label: 'Collection',
  },
]

export const statuses = [
  {
    value: 'classificar',
    label: 'A Classificar',
    icon: StopwatchIcon,
  },
  {
    value: 'classificada',
    label: 'Classificada',
    icon: CheckCircledIcon,
  },
  {
    value: 'revisar',
    label: 'Revisar',
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Baixo',
    value: 'baixa',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medio',
    value: 'media',
    icon: ArrowRightIcon,
  },
  {
    label: 'Alto',
    value: 'alta',
    icon: ArrowUpIcon,
  },
]

export const filiais = [
  {
    value: '0101',
    label: '0101 - Curitiba',
  },
  {
    value: '0102',
    label: '0102 - Ponta Grossa',
  },
  {
    value: '0103',
    label: '0103 - Cascavel',
  },
  {
    value: '0104',
    label: '0104 - Cambé',
  },
  {
    value: '0105',
    label: '0105 - Guaíba',
  },
  {
    value: '0106',
    label: '0106 - Paranaguá',
  },
  {
    value: '0108',
    label: '0108 - Curitiba',
  },
  {
    value: '0109',
    label: '0109 - Lages',
  },
  {
    value: '0110',
    label: '0110 - Marialva',
  },
  {
    value: '0111',
    label: '0111 - Marmeleiro',
  },
  {
    value: '0112',
    label: '0112 - Guarapuava',
  },
  {
    value: '0113',
    label: '0113 - Pelotas',
  },
  {
    value: '0114',
    label: '0114 - Platina',
  },
  {
    value: '0116',
    label: '0116 - Curvelo',
  },
  {
    value: '0117',
    label: '0117 - 3 Lagoas',
  },
  {
    value: '0118',
    label: '0118 - Palhoça',
  },
  {
    value: '0119',
    label: '0119 - Cariacica',
  },
]
export const payment = [
  { value: "CCI", label: "AVISTA" },
  { value: "C02", label: "BOLETO 7 DIAS" },
  { value: "C03", label: "BOLETO 14 DIAS" },
  { value: "C00", label: "BOLETO 28 DIAS" },
  { value: "C05", label: "BOLETO 49 DIAS" },
  { value: "C06", label: "BOLETO 1X" },
  { value: "C07", label: "BOLETO 2X" },
  { value: "C08", label: "BOLETO 3X" },
  { value: "C09", label: "BOLETO 4X" },
  { value: "C10", label: "BOLETO 5X" },
  { value: "C11", label: "BOLETO 6X" },
  { value: "C12", label: "BOLETO 28/56/84" },
  { value: "C13", label: "BOLETO 21 DIAS" },
  { value: "C14", label: "BOLETO 30 DIAS" },
  { value: "C15", label: "BOLETO 28/42" },
  { value: "C17", label: "BOLETO 7/28/48" },
  { value: "C18", label: "BOLETO 15/30/45" },
  { value: "C19", label: "BOLETO 30/60" },
  { value: "C20", label: "BOLETO 28/35/42" },
  { value: "C21", label: "BOLETO 35 DIAS" },
  { value: "C22", label: "ENTRADA 30% + 3X" },
  { value: "C23", label: "BOLETO 2X" },
  { value: "C24", label: "BOLETO 15/30" },
  { value: "C25", label: "BOLETO 4X" },
  { value: "C26", label: "BOLETO 28/42" },
  { value: "C27", label: "DEPTO AVISTA" },
  { value: "C28", label: "DEPTO 10 DIAS" },
  { value: "C29", label: "DEPTO 30 DIAS" },
  { value: "C32", label: "DEPTO 60 DIAS" },
]

export const fornecedores = [
  { value: "081134-01", label: "TRANSPORTADORA COROL LTDA - 05485300000121" },
  { value: "081128-01", label: "SONNENTAL COMERCIO DE PANEIS SOLARES LTDA - 30081600000192" },
  { value: "080646-03", label: "12M COMERCIO E TRANSPORTES LTDA - 15551000000157" },
  { value: "080599-1", label: "ECX CARD ADMINISTRADORA E PROCESSADORA DE CARTOES SIA - 71225700000122" },
  { value: "080486-01", label: "RCC TECH COMERCIO E TECNOLOGIA LTDA - 51066700000110" },
  { value: "080304-01", label: "AQUINO PRESTADORA DE SERVICOS LTDA - 14630900000127" },
  { value: "080124-01", label: "EDILSON BARBOSA DA SILVA - 36962500000151" },
]
export const produtos = [
  { value: "0000022-B", label: "(0000022-B) PARAFUSO PLACA GUIA GRUA PS" },
  { value: "0000094-A", label: "(0000094-A) PARAFUSO SEXT Ml 6 X 100 ps" },
  { value: "0000105-A", label: "(0000105-A) PARAFUSO SEXT M30 X 300 ps" },
  { value: "0000123-A", label: "(0000123-A) PARAFUSO SEXT FLANGEADO M08 X 25 ps" },
  { value: "0000124-A", label: "(0000124-A) PARAFUSO ALLEN M12 X 100 ps" },
  { value: "0000160040-A", label: "(0000160040-A) ANEL VED PARAFUSO TAMPA CABECOTE PS" },
]