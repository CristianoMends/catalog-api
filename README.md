# Product Catalog API

- [Product Catalog API](#product-catalog-api)
  - [Status](#status)
  - [Descrição do Projeto](#descrição-do-projeto)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Hospedagem](#hospedagem)
  - [Configuração e Instalação](#configuração-e-instalação)
    - [Pré-requisitos](#pré-requisitos)
    - [Clonando o Repositório](#clonando-o-repositório)
    - [Configurando o Versel Blob](#configurando-o-versel-blob)
    - [Configurando o Banco de Dados](#configurando-o-banco-de-dados)
    - [Instalação de Dependências](#instalação-de-dependências)
    - [Iniciando a Aplicação](#iniciando-a-aplicação)
    - [Verificação](#verificação)
  - [Próximos Passos](#próximos-passos)
  - [Endpoints](#endpoints)
    - [Autenticação](#autenticação)
    - [Usuários](#usuários)
    - [Produtos](#produtos)
    - [Catálogo](#catálogo)
  - [Licença](#licença)

## Status
Em Desenvolvimento
## Descrição do Projeto

Esta API permite que você gerencie um catálogo de produtos, incluindo a criação, atualização, exclusão e consulta de produtos e usuários.

<img src="docs/ER.png">

## Tecnologias Utilizadas


<div align="center">
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg"  width="80px"  />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"  width="80px"/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"  width="80px"/>
</div>

## Hospedagem

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original-wordmark.svg" width="100px"/>

[`https://thecatalogapi.vercel.app//`](https://thecatalogapi.vercel.app/)

</div>          
          
## Configuração e Instalação

Esta seção descreve como configurar e iniciar o projeto Product Catalog API em um ambiente de desenvolvimento local.

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

-   [Node.Js ](https://nodejs.org/en)(versão v20 ou superior)
-   [NestJS CLI](https://nestjs.com/)
-   [Versel blob ](https://vercel.com/docs/storage/vercel-blob)(Armazenamento de imagens)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Git](https://git-scm.com/)

### Clonando o Repositório

Abra um terminal e clone o repositório do projeto usando o seguinte comando:
    
    
```bash
$ git clone https://github.com/CristianoMends/product-catalog-api.git
  ```
```bash
$ cd product-catalog-api
```
### Configurando o Versel Blob
1. Instale o pacote
```bash
npm i @vercel/blob
```
2. Navegue até o projeto ao qual você deseja adicionar o armazenamento de blobs. Selecione a guia Armazenamento e, em seguida, selecione o botão Conectar banco de dados .
3. Na guia Criar novo , selecione Blob e depois o botão Continuar .

4. Use o nome "Imagens" e selecione Criar um novo armazenamento de Blob . Selecione os ambientes onde você gostaria que o token de leitura e gravação fosse incluído. Você também pode atualizar o prefixo da variável de ambiente em opções avançadas

5. Depois de criado, você será direcionado para a página da loja Vercel Blob.
6. Será Criado automaticamente a variavel de ambiente:
   ```
   BLOB_READ_WRITE_TOKEN
   ```

### Configurando o Banco de Dados

1.  Certifique-se de que o PostgreSQL está instalado e em execução.
    
2.  Crie uma nova base de dados `database`.
    
3.  Configure as credenciais de acesso ao banco de dados no arquivo `.env` no diretório raiz do projeto.
    
    Exemplo de configuração `.env`:
    
```bash    
DATABASE_URL=postgres://username:password@localhost:5432/database
JWT_SECRET=your_secret_key 
```
  ```ts
  Aviso: Alterar em src\db\db.module.ts

  ssl: { rejectUnauthorized: false }, //remover comentario para deploy
  ```


### Instalação de Dependências

No diretório do projeto, execute o seguinte comando para instalar todas as dependências necessárias:
    
```bash
$ npm install
```    
 
       

### Iniciando a Aplicação

Inicie o servidor de desenvolvimento com o seguinte comando:
        
  ```bash
  $ npm run start:dev
  ``` 
    
Este comando iniciará a aplicação no modo de desenvolvimento. A API estará acessível em `http://localhost:3000`.

### Verificação

  Abra um navegador e acesse `http://localhost:3000/` para ver se a aplicação está rodando corretamente. Você deve ver a Homepage da API.

## Próximos Passos

Após a instalação e configuração, você pode começar a utilizar as rotas definidas nos endpoints para criar, atualizar, excluir e consultar produtos e usuários conforme documentado nas seções de endpoints da API.

## Endpoints
### Autenticação
-   **Login de Usuário**
    
    -   **Método:** GET
    -   **Endpoint:** `/auth`
    -   **Descrição:** Realiza o login de um usuário com base nas credenciais fornecidas no corpo da requisição e gera um token.
    -   **Corpo da Requisição:**
        -   `email`: Email do usuário (string)
        -   `password`: Senha do usuário (string)
      ```json
      Exemplo:  

      {
        "email":"cristianomendes@gmail.com",
        "password":"cristiano1234",
      }
      ```  
### Usuários

-   **Criar Usuário**
    
    -   **Método:** POST
    -   **Endpoint:** `/user`
    -   **Descrição:** Cria um novo usuário com base nos dados fornecidos no corpo da requisição.
    -   **Corpo da Requisição:**
        -   `fullName`: Nome do usuário (string)
        -   `email`: Email do usuário (string)
        -   `password`: Senha do usuário (string)
        -   `phone`: Telefone do usuário (string)
        -   `address`: Endereço do usuário (string)
      ```json
      Exemplo:      
      {
        "fullName":"Cristiano Mendes",
        "email":"cristianomendes@gmail.com",
        "password":"cristiano1234",
        "phone":"88999999999",
        "address":"Rua A, 6, Centro, Quixadá-CE"
      }
   
-   **Obter Usuário**    
    -   **Método:** GET
    -   **Endpoint:** `/user`
    -   **Descrição:** Retorna os dados de usuário logado.
    -   **Autenticação:** Token JWT deve ser incluído no cabeçalho `Authorization`.
-   **Atualizar Usuário**
    
    -   **Método:** PUT
    -   **Endpoint:** `/user`
    -   **Descrição:** Atualiza os dados de um usuário logado.
    -   **Autenticação:** Token JWT deve ser incluído no cabeçalho `Authorization`.
    -   **Corpo da Requisição:**
        -   `name`: Novo nome do usuário (string)
        -   `email`: Novo email do usuário (string)
        -   `password`: Nova senha do usuário (string)
        -   `phone`: Novo telefone (string)
        -   `address`: Novo endereço (string)
      ```json
      Exemplo:      
      {
        "fullName":"Updated Cristiano Mendes",
        "email":"updatedcristianomendes@gmail.com",
        "password":"updatedcristiano1234",
        "phone":"88999900000",
        "address":"Updated Rua A, 6, Centro, Quixadá-CE"
      }
      ``` 
-   **Remover Usuário**
    
    -   **Método:** DELETE
    -   **Endpoint:** `/user`
    -   **Descrição:** Remove um usuário logado.
    -   **Autenticação:** Token JWT deve ser incluído no cabeçalho `Authorization`.


### Produtos

-   **Criar Produto**

    -   **Método:** POST
    -   **Endpoint:** `/product`
    -   **Descrição:** Cria um novo produto com base nos dados fornecidos no corpo da requisição e no arquivo de imagem enviado. É necessário fornecer um token de autenticação válido no cabeçalho da requisição.
    -   **Autenticação:** Token JWT deve ser incluído no cabeçalho `Authorization`.
    -   **Corpo da Requisição:**
        -   `name`: Nome do produto (string)
        -   `description`: Descrição do produto (string)
        -   `price`: Preço do produto (number)
        -   `category`: Categoria do produto (string)
        -   `file`: Arquivo de imagem do produto (file) (tamanho maximo: 3 mb)

    -   **Exemplo de chamada `curl`:**

        ```bash
        curl -X POST http://localhost:3000/product \
        -H "Authorization: Bearer <YOUR_TOKEN_HERE>" \
        -H "Content-Type: multipart/form-data" \
        -F "name=Exemplo de Produto" \
        -F "description=Descrição detalhada do produto" \
        -F "price=100.50" \
        -F "category=Eletrônicos" \
        -F "file=@/path/to/image.jpg"
        ```

-   **Listar Produtos por Parâmetros**
    
    -   **Método:** GET
    -   **Endpoint:** `/product`
    -   **Descrição:** Retorna uma lista de produtos com base nos parâmetros fornecidos.
    -   **Parâmetros de Consulta:**
        -   `name`: Nome do produto (string)
        -   `category`: Categoria do produto (string)
        -   `description`: Descrição do produto (string)
        -   `price`: Preço do produto (number)
      ```bash
      Exemplo:

      /product/?name=furadeira&price=149.99
      ```
-   **Buscar Produto por ID**

    
    -   **Método:** GET
    -   **Endpoint:** `/product/:product_id`
    -   **Descrição:** Retorna um produto com base no ID do produto fornecidos por parâmetro.
      ```bash
      Exemplo:

      /product/1
      ```
-   **Atualizar Produto**
    
    -   **Método:** PUT
    -   **Endpoint:** `/product/:id`
    -   **Descrição:** Atualiza os dados de um produto existente com base no ID fornecido.
    -   **Autenticação:** Token JWT deve ser incluído no cabeçalho `Authorization`.
    -   **Parâmetros de Rota:**
        -   `id`: ID do produto (number)
    -   **Corpo da Requisição:**
        -   `name`: Nome do produto (string, opcional)
        -   `description`: Descrição do produto (string, opcional)
        -   `price`: Preço do produto (number, opcional)
        -   `category`: Categoria do produto (string, opcional)
    -   **Exemplo de chamada `curl`:**

        ```bash
        curl -X PUT http://localhost:3000/product/1 \
        -H "Authorization: Bearer <YOUR_TOKEN_HERE>" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Novo Nome do Produto",
            "description": "Descrição atualizada do produto",
            "price": 150.75,
            "category": "Eletrônicos Atualizados"
        }'
        ```

-   **Remover Produto**
    
    -   **Método:** DELETE
    -   **Endpoint:** `/product/:product_id`
    -   **Descrição:** Remove um produto com base no ID fornecido.
    -   **Autenticação:** Token JWT deve ser incluído no cabeçalho `Authorization`.
    -   **Parâmetros de Rota:**
        -   `product_id`: ID do produto (number)
    -   **Exemplo de chamada `curl`:**

        ```bash
        curl -X DELETE http://localhost:3000/product/1 \
        -H "Authorization: Bearer <YOUR_TOKEN_HERE>"
        ```

### Catálogo
-   **Listar todos produtos de usuario**
    
    -   **Método:** GET
    -   **Endpoint:** `/catalog/:user_name`
    -   **Descrição:** Retorna todos os produtos cadastrados por um usuário.
    -   **Autenticação:** Não
        ```bash
        curl -X GET http://localhost:3000/catalog/cristiano_mendes \
        ```

      **Retorno:**
      ```json
        [
          {
            "id": 1,
            "name": "Furadeira de Impacto Bosch GSB 13 RE-M - 750W 127V, em maleta",
            "description": "Motor de alto desempenho de 750 W para atender a todas as necessidades dos usuários\nInterruptor com velocidade variável\nBotão-trava para trabalhos contínuos\nPara mais desempenho de sua ferramenta, use os acessórios Profissionais Bosch\nEmpunhadura emborrachada: agarre seguro e confortável",
            "category": "ferramenta",
            "price": 399.9,
            "image": "https://0x7zklkxioygivfm.public.blob.vercel-storage.com/product-1-HeeHiDWHrTGG4MFzKd2eXoJch29P39.jpg"
          }
        ]
      ```
## Licença

Este projeto é licenciado sob os termos da [Licença MIT](LICENSE).
