
Feature: Användarautentisering (backend)

Som en användare vill jag kunna bli autentiserad för att systemet ska kunna skilja på olika användarroller med olika rättigheter.

Scenario: Autentisera användare med hjälp av uppgifter från frontend

Given  Alla nödvändiga uppgifter (användarnamn och lösenord) är inte tomma
 When  Uppgifterna har veriefierats mot databasen
 Then  Användaren ska vara autentiserad
