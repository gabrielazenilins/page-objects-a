Feature: Busca de voos no BlazeDemo
  Como usuário do BlazeDemo
  Eu quero escolher a cidade de origem e de destino
  Para ver os voos disponíveis

  Scenario: Buscar voos entre duas cidades
    Given I am on the home page
    When I select "Paris" as departure city and "Buenos Aires" as destination city
    And I click the Find Flights button
    Then I should see the flights from "Paris" to "Buenos Aires"
