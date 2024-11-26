# SphereTech 🪐

Este é o repositório do projeto do website institucional de uma empresa de TI, desenvolvido para apresentar os serviços oferecidos e permitir a interação com clientes através de funcionalidades como cadastro, login e solicitações de serviços.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Instalação e Execução](#instalação-e-execução)
- [Como Usar](#como-usar)
- [Contato](#contato)

## Descrição do Projeto

Este projeto consiste em um website institucional de uma empresa de TI que oferece diversos serviços de tecnologia, como desenvolvimento de software, consultoria em TI, suporte técnico e segurança da informação. O website é composto por várias páginas, incluindo uma página de apresentação da empresa, uma área de login e cadastro de clientes, e uma área para solicitação de serviços.

## Funcionalidades

- **Página Inicial:** Apresenta uma visão geral da empresa, incluindo uma descrição da empresa, carrossel de fotos e uma seção detalhada dos serviços oferecidos.
- **Cadastro de Clientes:** Permite que novos clientes se cadastrem, preenchendo informações como nome, e-mail, CPF, data de nascimento, telefone, estado civil e escolaridade.
- **Login e Logout:** Clientes registrados podem fazer login para acessar áreas restritas do site, como a página de solicitação de serviços.
- **Solicitação de Serviços:** Após o login, clientes podem acessar a área de solicitação de serviços, onde escolhem o tipo de serviço desejado, visualizam os detalhes do serviço e enviam uma solicitação.

## Tecnologias Utilizadas

- **HTML5** - Estrutura do conteúdo das páginas
- **CSS3** - Estilização e layout
- **JavaScript** - Funcionalidades interativas e validações de formulário
- **React** - Biblioteca para construção de interfaces de usuário dinâmicas e componentizadas.
- **Bootstrap 5** - Design responsivo e componentes visuais
- **Font Awesome** - Ícones para navegação e estilo
- **Node.js** - Plataforma para execução do código backend.
- **Express** - Framework web para criação de rotas e APIs no backend.
- **MongoDB** - Banco de dados NoSQL para armazenamento das informações.

## Estrutura de Arquivos

```plaintext
.
Spheretech/
├── backend/
│   ├── controllers/        # Lógica de controle para rotas
│   ├── models/             # Modelos de dados (MongoDB)
│   ├── node_modules/       # Dependências do backend
│   ├── routes/             # Definição das rotas da API
│   ├── seeder/             # Scripts para popular o banco de dados
│   ├── .env                # Variáveis de ambiente (configurações sensíveis)
│   ├── package.json        # Dependências e scripts do backend
│   ├── package-lock.json   # Lockfile para versões exatas das dependências
│   └── server.js           # Configuração do servidor Express
├── spheretech/
│   ├── node_modules/       # Dependências do frontend
│   ├── public/             # Arquivos públicos (index.html, ícones)
│   ├── src/                # Código-fonte do React
│   │   ├── assets/         # Recursos como imagens e ícones
│   │   ├── components/     # Componentes reutilizáveis do React
│   │   ├── context/        # Context API para gerenciamento de estado
│   │   ├── App.css         # Estilos globais do aplicativo
│   │   ├── App.jsx         # Componente principal do React
│   │   ├── index.css       # Estilos para o arquivo index.js
│   │   ├── index.js        # Entrada principal do React
│   │   ├── reportWebVitals.js  # Métricas de desempenho do app
│   │   └── setupTests.js   # Configuração para testes automatizados


```

## Como usar

### Utilize este link de acesso: https://sphere-tech.vercel.app/

1. Acesse a Página inicial para conhecer mais sobre a empresa e seus serviços
2. Cadastre-se e depois realize o login com seu email e senha
3. Após o login, navegue para a Página de Solicitação de Serviços, onde poderá selecionar e enviar solicitações de TI personalizadas.
4. Use a barra de navegação para acessar diferentes seções do site e utilize o botão de logout para encerrar a sessão.
