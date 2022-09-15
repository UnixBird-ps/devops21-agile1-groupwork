Feature: Administratörsgränssnitt

  Som en administratör vill jag kunna hantera tabellerna schools, courses, classes och teachers
  via administratörsgränssnittet för att kunna arbeta snabbare och effektivare.

  Scenario: going to create teacher page

    Given i am on the teachers page
    When i click on create #create
    Then the create teacher page open #http://localhost:7666/admin/#/teachers/create

  Scenario: Create teachers
  Som admin vill jag via användargränssnittet kunna lägga till en lärare med uppgifter om lärarens 
  firstName, lastName, initials, phone, email, color, hide, password och roles så att jag har
  rätt kunduppgifter.

    Given i am on the create teacher page
    When i enter the email in the email field
    And i enter password in the password field
    And i choose the role as user in the roles field
    And i click the save button 
    Then i can see the new teacher in the teachers list 


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