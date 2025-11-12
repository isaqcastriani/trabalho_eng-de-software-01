# InHire - Sistema de Vagas

Sistema de gerenciamento de vagas de emprego desenvolvido com HTML, CSS e JavaScript puro.

## 📋 Sobre o Projeto

InHire é um sistema completo de vagas que permite:
- Visualizar vagas disponíveis
- Candidatar-se às vagas
- Área administrativa para gerenciar vagas e candidatos

## 🚀 Funcionalidades

### Área Pública
- **Listagem de vagas**: Todas as vagas ativas são exibidas na página inicial
- **Detalhes da vaga**: Informações completas sobre cada oportunidade
- **Formulário de candidatura**: Candidatos podem se inscrever enviando seus dados e currículo

### Área Administrativa
- **Login seguro**: Acesso protegido por usuário e senha
- **Dashboard**: Estatísticas de vagas e candidatos
- **CRUD de vagas**: Criar, editar e excluir vagas
- **Visualizar candidatos**: Ver todos os candidatos inscritos em cada vaga

## 📁 Estrutura do Projeto

```
inhire/
│
├── index.html              # Página inicial (listagem de vagas)
├── job.html                # Página de vaga específica
├── admin.html              # Página de administração
├── login.html              # Página de login
│
├── css/
│   ├── style.css           # Estilos da página inicial
│   ├── job.css             # Estilos da página de vaga
│   ├── admin.css           # Estilos da área administrativa
│   └── login.css           # Estilos da página de login
│
├── js/
│   ├── main.js             # Lógica da listagem de vagas
│   ├── job.js              # Lógica da vaga e candidatura
│   ├── admin.js            # Lógica da área administrativa
│   └── login.js            # Lógica do login
│
└── data/
    └── jobs.json           # Dados simulados das vagas
```

## 🔧 Como Usar

### Instalação

1. Clone ou baixe o projeto
2. Abra o arquivo `index.html` em seu navegador

**Não é necessário servidor web** - o projeto funciona 100% localmente!

### Credenciais de Acesso

Para acessar a área administrativa:
- **Usuário**: `admin`
- **Senha**: `1234`

### Fluxo de Uso

1. **Visualizar Vagas**: Acesse `index.html`
2. **Se candidatar**: Clique em "Ver detalhes" e preencha o formulário
3. **Administrar**: Acesse "Admin" no menu e faça login

## 💾 Armazenamento

O sistema utiliza **localStorage** para armazenar:
- Vagas cadastradas
- Candidaturas recebidas
- Estado de login do administrador

### Chaves do localStorage:
- `inhire_jobs`: Array com todas as vagas
- `inhire_candidatures`: Array com todas as candidaturas
- `inhire_admin_logged`: Estado de autenticação
- `inhire_admin_login_time`: Timestamp do login

## 🎨 Design

- Layout responsivo (funciona em desktop, tablet e mobile)
- Design moderno e clean
- Cores suaves e tipografia legível
- Transições e animações sutis

## 🔐 Segurança

- Sessão administrativa expira em 24 horas
- Validação de formulários no frontend
- Proteção de rotas administrativas

## 🤝 Contribuindo

Este projeto foi desenvolvido para demonstrar fluxo de trabalho em equipe no GitHub.

### Workflow Sugerido

1. **Branch para features**: `git checkout -b feature/nome-da-feature`
2. **Commits descritivos**: `git commit -m "Add: funcionalidade X"`
3. **Pull Request**: Sempre abra um PR para revisão
4. **Code Review**: Revise antes de fazer merge

### Sugestões de Features

- [ ] Filtros de vagas (localização, tipo, salário)
- [ ] Busca por palavra-chave
- [ ] Paginação da listagem
- [ ] Exportação de candidatos em CSV
- [ ] E-mail de confirmação (simulado)
- [ ] Dashboard com gráficos
- [ ] Modo escuro

## 📝 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- localStorage API

## 📄 Licença

Este é um projeto de exemplo para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como exemplo de sistema de vagas para demonstração de Git/GitHub workflow.

---

**Dica**: Para resetar todos os dados, abra o Console do navegador (F12) e execute:
```javascript
localStorage.clear();
location.reload();
```
