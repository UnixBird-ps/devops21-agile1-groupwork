import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";
import { adminEmailStr, adminPwStr } from './user-creds.js';


let tableName = 'schools';
let timeUnixEPOCms = Date.now().toString();


Cypress.Commands.add(
  'login',
  ( pEmail, pPw ) =>
  {
    cy.visit( 'http://localhost:7666' );
    cy.get( 'form[id="login"] input[id="email"]' ).type( pEmail );
    cy.get( 'form[id="login"] input[id="password"]' ).type( pPw );
    cy.get( 'form[id="login"] input[type="submit"]' ).click();
    cy.get( 'form[id="login"]' ).should( 'not.exist' );
    cy.get( 'table[class~="big"]' ).should( 'exist' );
  }
);


beforeEach(
  () =>
  {
    cy.login( adminEmailStr, adminPwStr )
  }
)


Given(
  /^Jag är inloggad som administratör och ser listan med skolor$/,
  () =>
  {
    cy.visit( `http://localhost:7666/admin/#/${tableName}` );
    cy.url().should( 'contain', `/admin/#/${tableName}` )
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]' ).should( 'exist' );
    cy.get( `div[class~="MuiToolbar-root"] a[href="#/${tableName}/create"]` ).click();
  }
);


Given(
  /^Jag ser ett tomt formulär där jag kan mata in uppgifter om en skola$/,
  () =>
  {
    cy.get( 'div[class~="RaCreate-main"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] input[id="shortName"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] button[type="submit"]' ).should( 'be.disabled' );
  }
);


When(
  /^Matar in "mock.<slumpgenererat-nummer>".'([^"]*)' i #name$/,
  ( pNameStr ) =>
  {
    cy.get( 'div[class~="RaCreate-main"] input[id="name"]' ).type( `mock.${timeUnixEPOCms}.${pNameStr}` );
  }
);


And( 
  /^Matar in "mock.<slumpgenererat-nummer>".'([^"]*)' i #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaCreate-main"] input[id="shortName"]' ).type( `mock.${timeUnixEPOCms}.${pShortNameStr}` );
  }
);


And( 
  /^Klickar på knappen 'Save'$/,
  () =>
  {
    cy.get( 'div[class~="RaCreate-main"] button[type="submit"]' ).click();
  }
);


Then( 
  /^Ser listan med skolor igen$/,
  () =>
  {
    cy.get( 'div[class~="RaCreate-main"] button[type="submit"]' ).should( 'not.exist' );
    cy.get( 'div[class~="MuiToolbar-root"] a[href="#/schools/create"]' ).should( 'exist' );
  }
);


Given(
  /^Jag ser skollistan sorterad på id och skolan jag precis registrerat på första raden$/,
  () =>
  {
    cy.visit( `http://localhost:7666/admin/#/${tableName}?filter=%7B%7D&order=DESC&page=1&sort=id` );
    cy.get( 'table[class~="RaDatagrid-table"]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]' ).should( 'exist' );
  }
);


When(
  /^Klickar på Edit på den raden$/,
  () =>
  {
    cy.get( 'table[class~="RaDatagrid-table"] tbody tr td a[aria-label="Edit"]' ).first().click();
    // .click();
  }
);


Then(
  /^Skolans uppgifter visas nu i formulärform$/,
  () =>
  {
    cy.get( 'div[class~="RaEdit-main"] button[type="submit"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] button[type="submit"]' ).should( 'be.disabled' );
  }
);


And(
  /^Ser att "mock.<slumpgenererat-nummer>".'([^"]*)' står i #name$/,
  ( pNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] input[id="name"]' ).should( 'have.value', `mock.${timeUnixEPOCms}.${pNameStr}` );
  }
);


And(
  /^Ser att "mock.<slumpgenererat-nummer>".'([^"]*)' står i #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] input[id="shortName"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] input[id="shortName"]' ).should( 'have.value', `mock.${timeUnixEPOCms}.${pShortNameStr}` );
  }
);
