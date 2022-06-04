# Objetivo
Projeto que realizei durante meus estudos em React.

O objetivo foi consolidar conhecimentos do ciclo de vida do React e padrões para criação de testes unitários e integrados, a fim de garantir boa qualidade e cobertura de código (com base em cenários executados pelo usuário)

![piramide-testes](/wiki/piramide-testes.png)

Além disso, como gerar outputs (jest reports e sonarqube):

![sonar](/wiki/sonar.png)

# Aplicação referência para testes em React 
"Gerenciador de estudos" é o nome dessa aplicação. Foi criada com arquitetura "client-side" utilizando apenas React e, basicamente, permite, aos moldes de um CRUD, a manutenção do cadastro de estudos que para que o usuário planeja realizar.  

Por ser dedicado a fins didáticos, não foi criado uma aplicação backend para hospedar uma base de dados, então os registros estão apenas disponíveis durante a utilização da página da aplicação.

# Arquitetura
![arquitetura](/wiki/arquitetura-referencia-testes-unitarios-integrados-react.png)

# Comandos para execução

## npm install
Adiciona as dependências necessárias

## npm run test
Executa os testes unitários e integrados

## node sonarqube-scanner.js 
Converte o relatório gerados pelo jest ao executar os testes para o formato esperado pelo Sonar. Além disso, já envia as informações para a instância configura no arquivo 'sonarqube-scanner.js'.
Para configurar uma instância local do Sonar, siga os passos na documentação disponível na seção de Referências.

## npm start
Sobe a aplicação em localhost:3000

# Referências

[React Js do zero ao avançado na pratica
](https://www.udemy.com/course/curso-reactjs/learn/lecture/32057304?start=15#overview)

[React unit testing with Jest & React-testing-library
](https://www.youtube.com/watch?v=3e1GHCA3GP0&t=422s&ab_channel=techsith)

[React Testing Library Tutorial #11 - Integration Tests
](https://www.youtube.com/watch?v=6wbnwsKrnYU&ab_channel=TheNetNinja)

[How to set up SonarQube locally on a React Project](https://javascript.plainenglish.io/how-to-set-up-sonarqube-locally-on-a-react-typescript-project-ec02cd8e2626)

