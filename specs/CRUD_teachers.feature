Feature: Administratörsgränssnitt

  Som en administratör vill jag kunna hantera tabellerna schools, courses, classes och teachers
  via administratörsgränssnittet för att kunna arbeta snabbare och effektivare.

  Scenario: going to create teacher page

    Given I am on the admin teacher list and i can see all the teachers
    When I click on the 'Create' knapp 
    Then I can see the create teacher formal structure

  Scenario: Create a new teacher
  Som admin vill jag via användargränssnittet kunna lägga till en lärare med uppgifter om lärarens 
  firstName, lastName, initials, phone, email, color, hide, password och roles så att jag har
  rätt kunduppgifter.

    Given I on the page where the is a formal structure to create new teacher
    When  I enter in "mock.<slumpgenererat-nummer>.'Tony Montana@gmail.com'" i field #email
    And   I enter in "mock.<slumpgenererat-nummer>.'TMA123'" i field #password
    And   I enter in "mock.<slumpgenererat-nummer>.'Tony'" i field #name
    And   I enter in "mock.<slumpgenererat-nummer>.'Monatan'" i field #lastName
    And   I enter in "mock.<slumpgenererat-nummer>.'TM'" i field #initials
    And   I enter in "mock.<slumpgenererat-nummer>.'073000400'" i field #phone
    And   I choose the "mock.<slumpgenererat-nummer>.'yellow'" i field #color
    And   I scroll down to enter "mock.<slumpgenererat-nummer>.'user'" in field #roles
    And   I leave it as default "mock.<slumpgenererat-nummer>.'no'" in field #hide
    And   I click the knapp 'Save' for new teacher
    Then  I can see the teachers list with the new teacher


  Scenario: Read teachers

  Som admin vill jag via användargränssnittet kunna se en lista över lärare med uppgifter om lärarens 
  firstName, lastName, initials, phone, email, color, hide, password och roles
  så att jag har en överblick över uppgifterna.

  Scenario: Update teachers

  Som admin vill jag via användargränssnittet kunna uppdatera uppgifterna om lärarens firstName,
  lastName, initials, phone, email, color, hide, password och roles
  så att jag har rätt kunduppgifter.

  Scenario: Delete teachers

  Som admin vill jag via användargränssnittet kunna radera uppgifterna om lärarens firstName,
  lastName, initials, phone, email, color, hide, password och roles så att jag har rätt kunduppgifter.