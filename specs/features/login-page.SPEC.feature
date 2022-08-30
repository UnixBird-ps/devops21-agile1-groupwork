
Feature: Inloggning (UI)

Som en användare vill jag kunna logga in på sidan för att autentisera mig mot systemet.

Scenario: Logga in

Given  Sidan har laddats in. Jag är utloggad. Ser textrutorna #user och #password, och knappen #login.
 When  Matar in mitt användarnam i #user
  And  Matar in mitt lösenord i #password
  And  Klickar på #login
 Then  Sidan har laddat om där jag kan se mitt schema

Scenario: Logga ut
# Finns den?
