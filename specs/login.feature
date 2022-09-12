
Feature: Inloggning


Scenario: Loggar in med oregistrerade uppgifter

Given  Jag är på inloggningssidan
 When  Matar in "unreg@ister.ed" i textrutan #email
  And  Matar in "123456" i textrutan #password
  And  Klickar på knappen 'Login'
 Then  Sidan har inte laddat om, jag är fortfarande på inloggningssidan


Scenario: Loggar in med uppgifter för en registrerad användare

Given  Jag är på inloggningssidan
 When  Matar in "exempel@nodehill.com" i textrutan #email
  And  Matar in "123456" i textrutan #password
  And  Klickar på knappen 'Login'
 Then  Sidan har laddat om där jag kan se mitt schema

