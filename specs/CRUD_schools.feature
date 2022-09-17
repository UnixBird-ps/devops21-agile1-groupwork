Feature: Administratörsgränssnitt/Skolor

  Som en administratör vill jag kunna hantera skolor
  via administratörsgränssnittet för att kunna arbeta snabbare och effektivare.


  Scenario: Öppna sidan för registrering av ny skola
    Given Jag är inloggad som administratör och ser listan med skolor
    When  Klickar på länken 'Create'
    Then  Ser ett tomt formulär där jag kan mata in uppgifter om en skola


  Scenario: Registrera ny skola
  Som admin vill jag via användargränssnittet kunna lägga till en skola med uppgifter om skolans 
  name och shortName så att jag har rätt kunduppgifter.
    Given Jag ser ett tomt formulär där jag kan mata in uppgifter om en skola
    When  Matar in "mock.<slumpgenererat-nummer>".'Lunds Tekniska Högskola' i rutan #name
    And   Matar in "mock.<slumpgenererat-nummer>".'LTH' i rutan #shortName
    And   Klickar på knappen 'Save' i Create formuläret
    Then  Ser listan med skolor igen


  Scenario: Läsa skola
  Som admin vill jag via användargränssnittet kunna se en lista över skolor med uppgifter om
  skolans name och shortName så jag har en överblick över uppgifterna.
    Given Jag ser skollistan sorterad på id och skolan jag precis registrerat på första raden
    When  Klickar på länken 'Edit' på den raden
    Then  Skolans uppgifter visas nu i formulärform
    And   Ser att "mock.<slumpgenererat-nummer>".'Lunds Tekniska Högskola' står i rutan #name
    And   Ser att "mock.<slumpgenererat-nummer>".'LTH' står i rutan #shortName


  Scenario: Updatera skola
  Som admin vill jag via användargränssnittet kunna ändra uppgifter för en skola som jag tidigare registrerat så att jag har rätt kunduppgifter
    Given "mock.<slumpgenererat-nummer>".'Lunds Tekniska Högskola' står i rutan #name
    And   "mock.<slumpgenererat-nummer>".'LTH' står i rutan #shortName
    When  Lägger till 'modded.' i början av skolans namn i rutan #name
    And   Lägger till 'modded.' i början av skolans kortnamn i rutan #shortName
    And   Klickar på knappen 'Save' i Edit formuläret
    Then  Ser listan med skolor igen
    # And   "modded.mock.<slumpgenererat-nummer>".'Lunds Tekniska Högskola' står nu som skolans namn
    # And   "modded.mock.<slumpgenererat-nummer>".'LTH' står nu som skolans kortnamn


  # Scenario: Ta bort en skola i list
  # Som admin vill jag via användargränssnittet kunna radera uppgifterna om 
  # skolans name och shortName så att jag har rätt kunduppgifter.
