Feature: Administratörsgränssnitt/Skolor

  Som en administratör vill jag kunna hantera skolor
  via administratörsgränssnittet för att kunna arbeta snabbare och effektivare.


  Background: Är inloggad som administratör
    Given Jag är inloggad som administratör och ser listan med skolor


  Scenario: Registrera ny skola
  Som admin vill jag via användargränssnittet kunna lägga till en skola med uppgifter om skolans 
  name och shortName så att jag har rätt kunduppgifter.
    Given Jag ser ett tomt formulär där jag kan mata in uppgifter om en skola
    When  Matar in "mock.<slumpgenererat-nummer>".'Lunds Tekniska Högskola' i #name
    And   Matar in "mock.<slumpgenererat-nummer>".'LTH' i #shortName
    And   Klickar på knappen 'Save'
    Then  Ser listan med skolor igen


  Scenario: Läsa skola
  Som admin vill jag via användargränssnittet kunna se en lista över skolor med uppgifter om
  skolans name och shortName så jag har en överblick över uppgifterna.
    Given Jag ser skollistan sorterad på id och skolan jag precis registrerat på första raden
    When  Klickar på Edit på den raden
    Then  Skolans uppgifter visas nu i formulärform
    And   Ser att "mock.<slumpgenererat-nummer>".'Lunds Tekniska Högskola' står i #name
    And   Ser att "mock.<slumpgenererat-nummer>".'LTH' står i #shortName


  # Scenario: Updatera skola
  # Som admin vill jag via användargränssnittet kunna uppdatera uppgifterna om 
  # en skolas name och shortName så att jag har rätt kunduppgifter.

  # Scenario: Ta bort en skola i list
  # Som admin vill jag via användargränssnittet kunna radera uppgifterna om 
  # skolans name och shortName så att jag har rätt kunduppgifter.
