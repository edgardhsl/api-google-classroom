<br/>
<p align="center">
  <h1 align="center">api-google-classroom</h1>

  <h3 align="center">Serviço para consumir mensagens do Apache Kafka e integrar os dados com o Google Classroom.</h3>

  <p align="center">
    Um serviço consumidor que processa e integra dados com o Google Classroom.
    <br/>
    <br/>
    <br/>
    <a href="https://github.com/edgardhsl/api-google-classroom/issues">Report Bug</a>
    .
    <a href="https://github.com/edgardhsl/api-google-classroom/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/edgardhsl/api-google-classroom?color=dark-green) ![Forks](https://img.shields.io/github/forks/edgardhsl/api-google-classroom?style=social) ![Stargazers](https://img.shields.io/github/stars/edgardhsl/api-google-classroom?style=social) ![Issues](https://img.shields.io/github/issues/edgardhsl/api-google-classroom) 

## Sumário

* [Sobre o projeto](#sobre-o-projeto)
* [Primeiros passos](#primeiros-passos)
  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
* [Uso da aplicação](#uso-da-aplicação)
* [Contribuição](#contribuição)
* [Autores](#autores)

## Sobre o projeto

Este projeto é um dos três microsserviços que estão sendo desenvolvidos para a disciplina de TCC 2. 

O objetivo deste serviço é consumir dados relacionados a cursos, disciplinas e atividades de tópicos no Apache Kafka, processando e integrando esses dados com o ambiente Google Classroom.

## Primeiros passos

Abaixo segue as instruções de como executar o projeto em seu ambiente.

### Pré-requisitos

Para que as dependências sejam instaladas, você precisa instalar o npm.

O npm é o gerenciador de pacotes padrão para o ambiente de tempo de execução JavaScript Node.js.

* npm

```sh
npm install npm@latest -g
```

### Instalação

#### 1. Clone the repo

```sh
git clone https://github.com/edgardhsl/api-google-classroom.git
```

#### 2. Instale as dependências do projeto

```sh
npm install
```

#### 3. Configure suas credenciais do API do Google Classroom e salve no arquivo: `src/app/config/credentials.json`

Para saber como gerar esse arquivo veja este link: [Criar credenciais de acesso](https://developers.google.com/workspace/guides/create-credentials?hl=pt-br)
Logo após iniciar o serviço, clique no link de autorização que aparecerá no terminal:

```sh
 npm run dev

> api-google-classroom@1.2.0 dev
> ts-node -r tsconfig-paths/register ./src/main.ts --inspect

 É necessário configurar a autorização para o uso da API do Google Classroom, para isso clique no link abaixo:

 http://localhost:4444/auth/authorize
```
Então abrirá o navegador para selecionar em qual conta da Google irá gerar o token de autorização, por fim irá exibir uma tela de sucesso.


#### 4. Configure os dados dos brokers do Apache Kafka no arquivo: `src/app/config/kafka_brokers.json`

```JS
[
    {
        "host": "127.0.0.1",
        "port": "9092"
    }
]
```

## Uso da aplicação

Você pode executar o projeto com o comando abaixo:
`npm run dev`

## Contribuição



### Creating A Pull Request

1. Fazer um Fork do Projeto.
2. Crie sua branch do recurso (`git checkout -b feature/AmazingFeature`)
3. Faça o commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Envie para a sua branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull-Request

## Autores

* **Edgard H. Santos Lopes** - *Graduando em Sistemas de Informação* - [Edgard H. Santos Lopes](https://github.com/edgardhsl) - *Projeto completo*
