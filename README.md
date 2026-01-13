# SaaS Dashboard - Sistema de Gestão de E-commerce

Sistema completo de gestão para e-commerce com integração Shopify, gerenciamento de pedidos, inbox inteligente e processamento de reembolsos.

## 🚀 Stack Utilizada

- **Framework:** [Next.js 15](https://nextjs.org/) (TypeScript)
- **Estilização:** [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Validação de Formulários:** [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Temas:** [next-themes](https://github.com/pacocoursey/next-themes) (Dark Mode)
- **Ícones:** [Lucide React](https://lucide.dev/)

## 📦 Como Rodar o Projeto

```bash
# Clone o repositório
git clone [link-do-repositorio]

# Entre na pasta do projeto
cd desafio-saas

# Instale as dependências
npm install

# Rode o projeto em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

> **Nota:** Ao entrar, você será direcionado para a página de login. Basta inserir qualquer dado no email e senha que será redirecionado para o dashboard.

## 🎨 Decisões de UI/UX

### Arquitetura "Feature-First"

Organizei os componentes por funcionalidade em vez de tipo, facilitando a manutenção e escalabilidade:

```
components/
  features/
    dashboard/    # Componentes específicos do Dashboard
    inbox/        # Componentes do sistema de e-mails
    orders/       # Componentes de pedidos
    refunds/      # Componentes de reembolsos
    settings/     # Componentes de configurações
```

### Gerenciamento de Estado com Zustand

Escolhi o **Zustand** pela simplicidade e performance. O estado global simula uma API real, incluindo:
- Marcação de e-mails como lidos
- Adição de respostas em threads

### Experiência de Inbox Inteligente



**Funcionalidade Mock:** Implementei simuladores de delay e tradução automática (PT/EN) para demonstrar como a interface reage a:
- Estados de carregamento (Loading States)
- Feedback ao usuário (Toasts)
- Interações assíncronas


### Design System Consistente

- **Modo Escuro:** Implementação completa com paleta de cores otimizada para ambos os temas
- **Responsividade:** Layout adaptativo com breakpoints estratégicos para mobile, tablet e desktop
- **Acessibilidade:** Componentes shadcn/ui com suporte a navegação por teclado e screen readers

## ✨ Funcionalidades Implementadas

- [x] **Autenticação**
- [x] **Dashboard**
- [x] **Inbox:** Leitura de e-mails, visualização em threads e simulação de tradução EN/PT
- [x] **Pedidos:** Listagem completa com filtros por status e detalhes com histórico cruzado de e-mails
- [x] **Refunds**
- [x] **Configurações:** Formulários validados e card de integração visual com Shopify
- [x] **Diferenciais:** Dark Mode completo e Responsividade total

## 📱 Páginas e Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Login (rota pública) |
| `/dashboard` | Overview com KPIs e estatísticas |
| `/dashboard/inbox` | Sistema de e-mails com threads |
| `/dashboard/orders` | Listagem de pedidos |
| `/dashboard/orders/[id]` | Detalhes do pedido |
| `/dashboard/refunds` | Gerenciamento de reembolsos |
| `/dashboard/settings` | Configurações SMTP e integração Shopify |

## 🏗️ Estrutura do Projeto

```
desafio-saas/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── (auth)/            # Grupo de rotas de autenticação
│   │   ├── dashboard/         # Rotas protegidas do dashboard
│   │   └── layout.tsx         # Layout raiz com providers
│   ├── components/
│   │   ├── features/          # Componentes organizados por feature
│   │   ├── layout/            # Header, Sidebar, etc.
│   │   └── ui/                # Componentes shadcn/ui
│   ├── data/                  # Dados mockados (JSON)
│   ├── lib/                   # Utilitários
│   ├── providers/             # Providers (Theme, etc.)
│   ├── schemas/               # Schemas Zod
│   ├── store/                 # Estado global (Zustand)
│   └── types/                 # Definições TypeScript
└── public/                    # Arquivos estáticos
```

## 🎯 Destaques Técnicos

- **Type Safety:** TypeScript strict mode em todo o projeto
- **Code Splitting:** Componentes otimizados com lazy loading
- **Performance:** Uso de `useMemo` e `useCallback` para otimização de re-renders
- **Clean Code:** Componentes modulares e reutilizáveis
- **Organização:** Schemas centralizados e types bem definidos

---

Desenvolvido com ❤️ utilizando as melhores práticas de desenvolvimento moderno.
