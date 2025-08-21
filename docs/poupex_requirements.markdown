# Documento de Projeto: Aplicação Web Poupex (MVP)

## Pitch da Aplicação Poupex

**Título: Poupex – O Seu Aliado para uma Vida Financeira Inteligente**

"Controle suas finanças como nunca antes com o Poupex! Registre seus gastos diários com facilidade, organize-os em categorias personalizadas e acompanhe tudo em um dashboard intuitivo. Mais do que uma ferramenta de controle, o Poupex é seu guia financeiro: receba dicas personalizadas gratuitas geradas por IA para poupar e investir melhor, e tenha acesso a cursos pagos exclusivos para aprofundar seu conhecimento em investimentos, orçamento e multiplicação de riqueza.

Ideal para todos – do estudante ao profissional –, o Poupex usa inteligência artificial para analisar seus hábitos e oferecer relatórios detalhados, alertas de orçamento e simulações de crescimento financeiro. Transforme pequenas economias em grandes conquistas com uma experiência simples e motivadora.

Baixe o Poupex hoje e comece a construir seu futuro financeiro. Poupar é estratégia, e a riqueza começa agora!"

**Duração estimada: 1 minuto**\
**Dicas para apresentação:** Use slides com gráficos de gastos, ícones de crescimento financeiro e exemplos de cursos para engajar. Destaque a emoção de liberdade financeira.

## Levantamento de Requisitos para o MVP da Aplicação Web Poupex

O MVP será desenvolvido em 1 mês, priorizando autenticação, overview, registro de gastos, análise básica, gerenciamento de categorias e educação financeira (dicas gratuitas via IA e cursos pagos). A seção de cursos terá funcionalidades para administradores carregarem conteúdo e usuários visualizarem, com acesso pago.

### Visão Geral

O Poupex é uma aplicação web para gerenciar finanças pessoais, com um **overview** financeiro, áreas para **registro de gastos**, **análise detalhada com estatísticas**, **gerenciamento de categorias** e uma **seção de educação financeira** (dicas gratuitas via IA e cursos pagos). O foco é simplicidade, personalização e aprendizado.

**Público-Alvo:** Usuários de 18 a 60 anos, de iniciantes a intermediários.\
**Tecnologias:** React.js (frontend), Node.js/Express (backend), PostgreSQL/MongoDB, Chart.js para gráficos, IA para análises, Stripe/PayPal para pagamentos.

### Requisitos Funcionais

| Módulo | Requisito | Descrição | Prioridade |
| --- | --- | --- | --- |
| **Autenticação** | RF-01 | Cadastro/login via e-mail, Google, GitHub. | Alta |
| **Overview** | RF-16 | Dashboard com saldo, gastos mensais, gráfico de categorias, alertas. | Alta |
| **Overview** | RF-17 | Métricas: renda/despesa média, taxa de poupança, filtros por período. | Alta |
| **Registro de Gastos** | RF-03 | Formulário para inserir gastos (valor, data, categoria). | Alta |
| **Registro de Gastos** | RF-04 | Categorização automática via IA. | Média |
| **Análise/Relatórios** | RF-06 | Gráficos (barras, pizza) de gastos por categoria, tendências. | Alta |
| **Análise/Relatórios** | RF-18 | Estatísticas: variância, correlações, projeções, filtros por categoria. | Média |
| **Categorias** | RF-19 | Cadastrar/editar/excluir categorias personalizadas (nome, cor, descrição). | Alta |
| **Categorias** | RF-20 | Categorias padrão (ex: Alimentação) pré-cadastradas, desativáveis. | Alta |
| **Categorias** | çRF-21 | Validação anti-duplicatas, limite de 50 categorias. | Alta |
| **Educação Financeira** | RF-08 | Dicas personalizadas gratuitas via IA, baseadas em padrões de gastos. | Alta |
| **Educação Financeira** | RF-22 (Novo) | Seção de cursos pagos: administradores podem carregar cursos (título, descrição, vídeo/PDF, preço). | Alta |
| **Educação Financeira** | RF-23 (Novo) | Usuários visualizam cursos disponíveis; acesso liberado após pagamento via Stripe/PayPal. | Alta |
| **Educação Financeira** | RF-24 (Novo) | Painel de administração para gerenciar cursos (CRUD) com autenticação restrita. | Alta |
| **Educação Financeira** | RF-10 | Simulador de investimentos na área de análise. | Média |

### Requisitos Não Funcionais

- **Desempenho:** Carregamento &lt; 2s, suporta 5.000 usuários simultâneos.
- **Usabilidade:** Interface responsiva, acessível (WCAG 2.1), português/inglês.
- **Segurança:** Criptografia AES-256, HTTPS, conformidade LGPD/GDPR. Pagamentos seguros via Stripe/PayPal.
- **Confiabilidade:** 99.9% de disponibilidade, backups diários.
- **Portabilidade:** Compatível com Chrome, Firefox, Safari, Edge.

### Estrutura de Interface

- **Overview:** Dashboard com saldo, gráfico de categorias, métricas gerais.
- **Registro de Gastos:** Formulário com dropdown de categorias (padrão/personalizadas).
- **Análise/Relatórios:** Gráficos e estatísticas filtráveis por categoria.
- **Categorias:** Página para criar/editar/desativar categorias (tabela/formulário).
- **Educação Financeira:**
  - **Dicas (Gratuito):** Seção com dicas de IA integradas ao dashboard.
  - **Cursos (Pago):** Página com lista de cursos (título, descrição, preço), botão de compra e visualização pós-pagamento.
  - **Painel Admin:** Interface restrita para upload/gerenciamento de cursos.

### Histórias de Usuário

- Quero um overview para ver meu status financeiro rapidamente.
- Quero registrar gastos usando categorias personalizadas.
- Quero analisar estatísticas detalhadas por categoria.
- Quero cadastrar/editar categorias para personalizar minha organização.
- Como usuário, quero acessar dicas gratuitas de IA para melhorar minhas finanças.
- Como usuário, quero comprar e visualizar cursos pagos para aprender mais.
- Como administrador, quero carregar cursos para oferecer aos usuários.

### Cronograma (MVP - 1 Mês)

- **Semana 1:** Autenticação, overview, estrutura básica de categorias.
- **Semana 2:** Registro de gastos, seção de categorias, dicas via IA.
- **Semana 3:** Análise/relatórios, simulador, seção de cursos (usuário/admin).
- **Semana 4:** Integração de pagamentos, testes, correções, deploy.

### Considerações

- **Riscos:** Prazo de 1 mês exige foco em prioridades altas; integração de pagamentos pode atrasar se APIs apresentarem problemas.
- **Testes:** Usabilidade no fluxo overview → registro → análise → categorias → educação; testes beta com 10 usuários.
- **Próximos Passos:** Prototipar interface no Figma, configurar Stripe/PayPal, iniciar desenvolvimento.