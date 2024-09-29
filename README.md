# Sales Proposal API

## Estrutura do Projeto

```bash
project/
│
├── src/
│   ├── domain/               # Entidades de negócio e interfaces
│   ├── application/          # Casos de uso (business logic), serviços e dtos
│   ├── infrastructure/       # Implementação de serviços externos
│   ├── presentation/         # Controladores e rotas
│   └── main.ts               # Arquivo principal de entrada
├── docker-compose.yml        # Arquivo Docker Compose
├── package.json              # Dependências do Node.js
├── tsconfig.json             # Configurações do TypeScript
└── .env                      # Variáveis de ambiente
```

## Estrutura do Código
- **src/domain**: Contém as entidades de negócio e interfaces (regras de negócio).
- **src/application**: Casos de uso que encapsulam a lógica de negócio.
- **src/infrastructure**: Implementação de repositórios ou serviços externos (como banco de dados).
- **src/presentation**: Controladores e rotas (interação com o Express).
- **src/main.ts**: Arquivo de entrada principal da aplicação, inicializa o servidor Express.

## Exemplo de Fluxo de Execução
1) **Rota**: Quando um cliente faz uma requisição para ```/users/:id```, a rota chama o controlador.
2) **Controlador**: O controlador faz a ponte entre o cliente e a lógica de negócio (casos de uso).
3) **Caso de Uso**: Um caso de uso (por exemplo, ```GetUser```) contém a lógica para buscar um usuário e interage com o repositório.
4) **Repositório**: O repositório lida com a fonte de dados, retornando o resultado para o caso de uso.
5) **Resposta**: O caso de uso retorna o resultado para o controlador, que envia a resposta ao cliente.

## Personalizando
Se você deseja adicionar novas funcionalidades:
- Adicione novas Entidades em ```src/**domain```.
- Crie novos Casos de Uso em ```src/application``` para lidar com a lógica de negócio.
- Implemente os Repositórios em ```src/infrastructure``` para lidar com a persistência de dados.
- Defina novas Rotas e Controladores em ```src/presentation```.

## Principais Tecnologias
- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework web minimalista para Node.js.
- **TypeScript**: Superset do JavaScript que adiciona tipos estáticos.
- **Arquitetura Limpa**: O código está organizado seguindo os princípios da arquitetura limpa e SOLID, garantindo alta coesão e baixo acoplamento.

## Funcionalidades
- **Login de usuário**: Login de usuário usando JWT.
- **Gerenciamento de cliente**: Cadastro de clientes, listagem, pesquisa por id, pesquisa por email
- **Gerenciamento de produtos**: Cadastro de produtos, listagem, pesquisa por id, pesquisa por nome
- **Gerenciamento de serviços**: Cadastro de serviços, listagem, pesquisa por id, pesquisa por nome
- **Gerenciamento de proposta de venda**: Cadastro de de proposta de venda, listagem, pesquisa por id, envio via email para o cliente

## Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

- Nodejs
- Docker Compose

## Como Rodar o Projeto

### 1) **Clone o repositório**
```bash
git clone https://github.com/thiago-m/api_sale_proposal.git
cd api_sales_proposal
```

### 2) **Crie o arquivo ```.env```**
Copie o arquivo ```.env.example``` para ```.env``` e defina as variáveis de ambiente.

### 3) **Rodar com Docker**
Certifique-se de que o Docker Compose estão instalados. Para construir e rodar o postgreSQL execute:

```bash
docker-compose up --build
```
Isso irá construir a imagem Docker da postgreSQL.

### 4) **Acesse a aplicação**

A aplicação estará rodando em ```http://localhost``` na porta ```3000```.

## Scripts Disponíveis
- ```npm run build```: Compila o código TypeScript para JavaScript na pasta dist.
- ```npm start```: Inicia a aplicação.
- ```npm run dev```: Compila o código e inicia a aplicação.
- ```docker-compose up --build```: Compila e sobe o contêineres postgreSQL.













