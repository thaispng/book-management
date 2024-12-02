# Projeto Next.js com server.json

Este projeto é um exemplo de aplicação **Next.js** que utiliza um arquivo `server.json` como banco de dados local para realizar operações de CRUD. Ele inclui funcionalidades para criar livros no frontend, sendo necessário que o servidor local (`server.json`) esteja em execução.

---

## 📋 Pré-requisitos

Para executar o projeto, você precisará das seguintes ferramentas instaladas:

- **Node.js**: Para executar o ambiente de desenvolvimento.
- **JSON Server**: Para simular uma API REST local. Caso ainda não tenha instalado, execute o comando abaixo:
  ```bash
  npm install -g json-server

   Criando um Livro no Frontend
Acesse o Frontend: Abra http://localhost:3003 no navegador.
Formulário de Cadastro de Livros:
Preencha as informações necessárias no formulário.
Clique no botão para enviar os dados.
Verificar o Banco de Dados:
O novo livro será salvo no arquivo server.json e exibido na interface do frontend.
Importante: O servidor JSON precisa estar rodando para que a criação de livros funcione corretamente.

## 🐛 Possíveis Problemas
O formulário não salva os dados
Verifique se o JSON Server está em execução. Acesse http://localhost:3001 no navegador para confirmar.
Certifique-se de que as configurações da API no código frontend estão apontando para http://localhost:3001.
## 🧰 Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor e frontend, facilitando o desenvolvimento de aplicações modernas e performáticas.  
- **JSON Server**: Simulador de API REST para desenvolvimento local, permitindo criar endpoints rapidamente para testes.  
- **Tailwind CSS**: Framework de estilização utilitário para criar interfaces responsivas e elegantes de forma eficiente.  
- **Shadcn**: Conjunto de componentes acessíveis e estilizados que utiliza Tailwind CSS como base para a construção de interfaces modernas e consistentes.  
- **React Query**: Gerenciador de estado assíncrono para lidar com dados de APIs de maneira simples e eficiente.  
- **Zod**: Biblioteca para validação e parseamento de dados, garantindo segurança e confiabilidade no tratamento de formulários e dados dinâmicos.










