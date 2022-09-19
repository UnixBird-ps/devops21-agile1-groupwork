Feature: Administratörsgränssnittet/Skolor

  Som en administratör vill jag kunna hantera skolor
  via administratörsgränssnittet för att kunna arbeta snabbare och effektivare.


  Scenario: Öppna sidan för registrering av ny skola
    Given Jag är inloggad som administratör och ser listan med skolor
    When  Klickar på 'Create' i verktygsfältet ovanför listan
    Then  Ser ett tomt formulär där jag kan mata in uppgifter om en skola


  Scenario: Registrera ny skola
  Som admin vill jag via användargränssnittet kunna lägga till en skola med uppgifter om skolans 
  name och shortName så att jag har rätt kunduppgifter.
    Given Jag ser ett tomt formulär där jag kan mata in uppgifter om en skola
    When  Matar in "mock.<slumpgenererat-nummer>.'Lunds Tekniska Högskola'" i rutan #name
    And   Matar in "mock.<slumpgenererat-nummer>.'LTH'" i rutan #shortName
    And   Klickar på 'Save' i Create formuläret
    Then  Ser listan med skolor igen


  Scenario: Läsa skola
  Som admin vill jag via användargränssnittet kunna se en lista över skolor med uppgifter om
  skolans name och shortName så jag har en överblick över uppgifterna.
    Given Jag ser skollistan sorterad på id och skolan jag precis registrerat på första raden
    When  Klickar på 'Edit' på den raden
    Then  Skolans uppgifter visas nu i formulärform
    And   Ser att "mock.<slumpgenererat-nummer>.'Lunds Tekniska Högskola'" står i rutan #name
    And   Ser att "mock.<slumpgenererat-nummer>.'LTH'" står i rutan #shortName


  Scenario: Uppdatera skola
  Som admin vill jag via användargränssnittet kunna ändra uppgifter för en skola som jag tidigare registrerat så att jag har rätt kunduppgifter
    Given "mock.<slumpgenererat-nummer>.'Lunds Tekniska Högskola'" står i rutan #name
    And   "mock.<slumpgenererat-nummer>.'LTH'" står i rutan #shortName
    When  Lägger till 'modded.' i början av skolans namn i rutan #name
    And   Lägger till 'modded.' i början av skolans kortnamn i rutan #shortName
    And   Klickar på 'Save' i Edit formuläret
    Then  Ser listan igen och uppgifter jag precis redigerat på första raden
    And   Ser att 'modded.' har lagts till i #name och #shortName


  Scenario: Ta bort en skola via formuläret
  Som admin vill jag kunna ta bort uppgifter om en skola via formuläret så att jag har rätt kunduppgifter
    Given "modded.mock.<slumpgenererat-nummer>.'Lunds Tekniska Högskola'" står i rutan #name
    And   "modded.mock.<slumpgenererat-nummer>.'LTH'" står i rutan #shortName
    When  Klickar på 'Delete' i verktygsfältet under formuläret
    Then  Ser skollistan sorterad på id och skolan är borttagen


  Scenario: Registrera ny skola igen för att dema borttagning direkt i listan
  Som admin vill jag via användargränssnittet kunna lägga till en skola med uppgifter om skolans 
  name och shortName så att jag har rätt kunduppgifter.
    Given Jag ser ett tomt formulär där jag kan mata in uppgifter om en skola
    When  Matar in "mock.<slumpgenererat-nummer>.'Lunds Tekniska Högskola'" i rutan #name
    And   Matar in "mock.<slumpgenererat-nummer>.'LTH'" i rutan #shortName
    And   Klickar på 'Save' i Create formuläret
    Then  Ser listan med skolor igen


  Scenario: Ta bort en skola direkt i listan
  Som admin vill jag kunna ta bort uppgifter om en skola direkt i listan så att jag har rätt kunduppgifter.
    Given Jag ser skollistan sorterad på id och skolan jag precis registrerat på första raden
    When  Klickar på kryssrutan på den raden
    And   Klickar på 'Delete' i verktygsfältet ovanför listan
    Then  Ser skollistan sorterad på id och skolan är borttagen
