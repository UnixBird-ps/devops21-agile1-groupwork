import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";
import { adminEmailStr, adminPwStr } from './user-creds.js';


let tableName = 'schools';
let timeUnixEPOCms = Date.now().toString();


function login( pUsernameStr, pPwStr )
{
  cy.request( 'POST', '/data/login', { email : pUsernameStr, password : pPwStr } )
  .then(
    ( pResponse ) =>
    {
      expect( pResponse.status ).to.be.equal( 200 );
      expect( pResponse.body ).to.have.property( 'loggedIn', true );
    }
  );

  // cy.visit( '/' );
  // cy.get( 'form[id="login"] input[id="email"]' ).type( pUsernameStr );
  // cy.get( 'form[id="login"] input[id="password"]' ).type( pPwStr );
  // cy.get( 'form[id="login"] input[type="submit"]' ).click();
  // cy.get( 'form[id="login"]' ).should( 'not.exist' );
  // cy.get( 'table[class~="big"]' ).should( 'exist' );
}


Given(
  /^Jag är inloggad som administratör och ser listan med skolor$/,
  () =>
  {
    login( adminEmailStr, adminPwStr );
    cy.visit( `/admin/#/${tableName}` );

    cy.url().should( 'contain', `/admin/#/${tableName}` )
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]' ).should( 'exist' );
  }
);


When(
/^Klickar på länken 'Create'$/,
  () =>
  {
    cy.get( `div[class~="MuiToolbar-root"] a[href="#/${tableName}/create"]` ).click();
  }
);


Then(
/^Ser ett tomt formulär där jag kan mata in uppgifter om en skola$/,
  () =>
  {
    cy.get( 'div[class~="RaCreate-main"] form' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).should( 'be.empty' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).should( 'be.empty' );
    cy.get( 'div[class~="RaCreate-main"] form button[type="submit"]' ).should( 'be.disabled' );
  }
);


Given(
  /^Jag ser ett tomt formulär där jag kan mata in uppgifter om en skola$/,
  () =>
  {
    login( adminEmailStr, adminPwStr );
    cy.visit( `/admin/#/${tableName}` );
    cy.get( `div[class~="MuiToolbar-root"] a[href="#/${tableName}/create"]` ).click();
    cy.get( 'div[class~="RaCreate-main"] form' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).should( 'be.empty' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).should( 'be.empty' );
    cy.get( 'div[class~="RaCreate-main"] form button[type="submit"]' ).should( 'be.disabled' );
  }
);


When(
  /^Matar in "mock.<slumpgenererat-nummer>".'([^"]*)' i rutan #name$/,
  ( pNameStr ) =>
  {
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).type( `mock.${timeUnixEPOCms}.${pNameStr}` );
  }
);


And( 
  /^Matar in "mock.<slumpgenererat-nummer>".'([^"]*)' i rutan #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).type( `mock.${timeUnixEPOCms}.${pShortNameStr}` );
  }
);


And( 
  /^Klickar på knappen 'Save' i Create formuläret$/,
  () =>
  {
    cy.get( 'div[class~="RaCreate-main"] form button[type="submit"]' ).click();
  }
);


Then( 
  /^Ser listan med skolor igen$/,
  () =>
  {
    cy.get( 'div[class~="RaCreate-main"] button[type="submit"]' ).should( 'not.exist' );
    cy.get( 'div[class~="MuiToolbar-root"] a[href="#/schools/create"]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]' ).should( 'exist' );
  }
);


Given(
  /^Jag ser skollistan sorterad på id och skolan jag precis registrerat på första raden$/,
  () =>
  {
    login( adminEmailStr, adminPwStr );
    cy.visit( `/admin/#/${tableName}?sort=id&order=DESC` );
  }
);


When(
  /^Klickar på länken '([^"]*)' på den raden$/,
  () =>
  {
    cy.get( `table[class~=RaDatagrid-table] tbody tr:first td:last a`).click();
  }
);


Then(
  /^Skolans uppgifter visas nu i formulärform$/,
  () =>
  {
    cy.get( 'div[class~="RaEdit-main"] form button[type="submit"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form button[type="submit"]' ).should( 'be.disabled' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'exist' );
  }
);


And(
  /^Ser att "mock.<slumpgenererat-nummer>".'([^"]*)' står i rutan #name$/,
  ( pNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'have.value', `mock.${timeUnixEPOCms}.${pNameStr}` );
  }
);


And(
  /^Ser att "mock.<slumpgenererat-nummer>".'([^"]*)' står i rutan #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'have.value', `mock.${timeUnixEPOCms}.${pShortNameStr}` );
  }
);


Given(
  /^"mock.<slumpgenererat-nummer>".'([^"]*)' står i rutan #name$/,
  ( pNameStr ) =>
  {
    login( adminEmailStr, adminPwStr );
    cy.visit( `/admin/#/${tableName}?sort=id&order=DESC` );
    cy.get( `table[class~=RaDatagrid-table] tbody tr:first td:last a`).click();
    cy.get( 'div[class~="RaEdit-main"] input[id="name"]' ).should( 'have.value', `mock.${timeUnixEPOCms}.${pNameStr}` );
  }
);


And(
  /^"mock.<slumpgenererat-nummer>".'([^"]*)' står i rutan #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'have.value', `mock.${timeUnixEPOCms}.${pShortNameStr}` );
  }
);


When(
  /^Lägger till '([^"]*)' i början av skolans namn i rutan #name$/,
  ( pNewPrefixStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' )
      .invoke( 'val' )
      .then(
        ( lCurrentValStr ) =>
        {
          cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).clear();
          cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).type( `${pNewPrefixStr}${lCurrentValStr}` );
        }
      )
  }
);


And(
  /^Lägger till '([^"]*)' i början av skolans kortnamn i rutan #shortName$/,
  ( pNewPrefixStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' )
      .invoke( 'val' )
      .then(
        ( lCurrentValStr ) =>
        {
          cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).clear();
          cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).type( `${pNewPrefixStr}${lCurrentValStr}` );
        }
      )
  }
);


And( 
  /^Klickar på knappen 'Save' i Edit formuläret$/,
  () =>
  {
    cy.get( 'div[class~="RaEdit-main"] form button[type="submit"]' ).click();
  }
);


Then(
  /^Ser listan med skolor igen, ser att uppgifter är ändrade$/,
  () =>
  {
    cy.visit( `/admin/#/${tableName}?sort=id&order=DESC` );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]' ).should( 'exist' );
  }
);

/*
*/
