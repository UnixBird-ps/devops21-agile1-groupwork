import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(
  /^Jag är på inloggningssidan$/,
  () =>
  {
    cy.visit( 'http://localhost:7666' );
    cy.get( 'form[id="login"]' ).should( 'exist' );
    cy.get( 'form[id="login"]' ).should( 'contain', 'Email' );
    cy.get( 'form[id="login"]' ).should( 'contain', 'Password' );
    cy.get( 'form[id="login"]' ).should( 'contain', 'Login' );
    cy.get( 'input[id="email"]' ).should( 'exist' );
    cy.get( 'input[id="password"]' ).should( 'exist' );
    cy.get( 'input[type="submit"]' ).should( 'exist' );
  }
);

When(
  /^Matar in "([^"]*)" i textrutan #email$/,
  ( emailStr ) =>
  {
    cy.get( 'input[id="email"]' ).type( emailStr );
  }
);

And( 
  /^Matar in "([^"]*)" i textrutan #password$/,
  ( pwStr ) =>
  {
    cy.get( 'input[id="password"]' ).type( pwStr );
  }
);

And( 
  /^Klickar på knappen 'Login'$/,
  () =>
  {
    cy.get( 'form[id="login"]' ).submit();
  }
);

Then( 
  /^Sidan har inte laddat om, jag är fortfarande på inloggningssidan$/,
  () =>
  {
    cy.get( 'form[id="login"]' ).should( 'exist' );
    cy.get( 'table[class="big"]' ).should( 'not.exist' );
  }
);


Then( 
  /^Sidan har laddat om där jag kan se mitt schema$/,
  () =>
  {
    cy.get( 'form[id="login"]' ).should( 'not.exist' );
    cy.get( 'table[class="big"]' ).should( 'exist' );
  }
);
