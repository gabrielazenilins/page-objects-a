Feature: Login no BlazeDemo
  Como usuário do BlazeDemo
  Eu quero fazer login com meu e-mail e senha
  Para acessar minha conta

  Scenario: Login com credenciais válidas
    Given I am on the login page
    When I enter my email and password
    Then I click the login button