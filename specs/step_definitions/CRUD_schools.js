
import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";
import { gAdminEmailStr, gAdminPwStr } from './user-creds.js';


let gTableName = 'schools';
let gTimeUnixEPOCms = '';
let gNameStr = '';
let gShortNameStr = '';


function login()
{
  cy.request( 'POST', '/data/login', { email : gAdminEmailStr, password : gAdminPwStr } )
  .then(
    ( pResponse ) =>
    {
      expect( pResponse.status ).to.be.equal( 200 );
      expect( pResponse.body ).to.have.property( 'loggedIn' );
      expect( pResponse.body.loggedIn ).to.be.equal( true );
    }
  );
}


Given(
  /^Jag är inloggad som administratör och ser listan med skolor$/,
  () =>
  {
    login();
    cy.visit( `/admin/#/${gTableName}` );
    cy.url().should( 'contain', `/admin/#/${gTableName}` )
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]' ).should( 'exist' );
  }
);


When(
/^Klickar på '([^"]*)' i verktygsfältet ovanför listan$/,
  ( pClickableStr ) =>
  {
    cy.get( 'div[class~="MuiToolbar-root"] a,button[class~=MuiButton-root][class~=MuiButton-text][class~=MuiButton-textPrimary][class~=MuiButtonBase-root]' )
    .contains( pClickableStr )
    .click();
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
    login();
    cy.visit( `/admin/#/${gTableName}` );
    cy.get( `div[class~="MuiToolbar-root"] a[href="#/${gTableName}/create"]` ).click();
    cy.get( 'div[class~="RaCreate-main"] form' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).should( 'be.empty' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).should( 'exist' );
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).should( 'be.empty' );
    cy.get( 'div[class~="RaCreate-main"] form button[type="submit"]' ).should( 'be.disabled' );
  }
);


When(
  /^Matar in "mock.<slumpgenererat-nummer>.'([^"]*)'" i rutan #name$/,
  ( pNameStr ) =>
  {
    gTimeUnixEPOCms = Date.now().toString();
    cy.get( 'div[class~="RaCreate-main"] form input[id="name"]' ).type( `mock.${gTimeUnixEPOCms}.${pNameStr}` );
    gNameStr = pNameStr;
  }
);


And( 
  /^Matar in "mock.<slumpgenererat-nummer>.'([^"]*)'" i rutan #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaCreate-main"] form input[id="shortName"]' ).type( `mock.${gTimeUnixEPOCms}.${pShortNameStr}` );
    gShortNameStr = pShortNameStr;
  }
);


And( 
  /^Klickar på '([^"]*)' i Create formuläret$/,
  ( pClickableStr ) =>
  {
    cy.get( 'div[class~="RaCreate-main"] form button' )
    .contains( pClickableStr )
    .click();
  }
);


Then( 
  /^Ser listan med skolor igen$/,
  () =>
  {
    cy.get( 'div[class~="RaCreate-main"] button[type="submit"]' ).should( 'not.exist' );
    cy.get( `div[class~="MuiToolbar-root"] a[href="#/${gTableName}/create"]` ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]' ).should( 'exist' );
  }
);


Given(
  /^Jag ser skollistan sorterad på id och skolan jag precis registrerat på första raden$/,
  () =>
  {
    login();
    cy.visit( `/admin/#/${gTableName}?sort=id&order=DESC` );
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(3) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        expect( text ).to.be.equal( `mock.${gTimeUnixEPOCms}.${gNameStr}` );
      }
    );
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(4) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        expect( text ).to.be.equal( `mock.${gTimeUnixEPOCms}.${gShortNameStr}` );
      }
    );
  }
);


When(
  /^Klickar på '([^"]*)' på den raden$/,
  ( pClickableStr ) =>
  {
    cy.get( `table[class~=RaDatagrid-table] tbody tr:first td:last a`)
    .contains( pClickableStr )
    .click();
  }
);


Then(
  /^Skolans uppgifter visas nu i formulärform$/,
  () =>
  {
    cy.get( 'div[class~="RaEdit-main"] form button[type="submit"]' )
    .should( 'exist' )
    .should( 'be.disabled' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'exist' );
  }
);


And(
  /^Ser att "mock.<slumpgenererat-nummer>.'([^"]*)'" står i rutan #name$/,
  ( pNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'have.value', `mock.${gTimeUnixEPOCms}.${pNameStr}` );
  }
);


And(
  /^Ser att "mock.<slumpgenererat-nummer>.'([^"]*)'" står i rutan #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'have.value', `mock.${gTimeUnixEPOCms}.${pShortNameStr}` );
  }
);


Given(
  /^"mock.<slumpgenererat-nummer>.'([^"]*)'" står i rutan #name$/,
  ( pNameStr ) =>
  {
    login();
    cy.visit( `/admin/#/${gTableName}?sort=id&order=DESC` );
    cy.get( `table[class~=RaDatagrid-table] tbody tr:first td:last a`).click();
    cy.get( 'div[class~="RaEdit-main"] form' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form button[type="submit"]' ).should( 'be.disabled' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'have.value', `mock.${gTimeUnixEPOCms}.${pNameStr}` );
  }
);


And(
  /^"mock.<slumpgenererat-nummer>.'([^"]*)'" står i rutan #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'have.value', `mock.${gTimeUnixEPOCms}.${pShortNameStr}` );
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
  /^Klickar på '([^"]*)' i Edit formuläret$/, // 'Save'
  ( pClickableStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form button' )
    .contains( pClickableStr )
    .click();
  }
);


Then(
  /^Ser listan igen och uppgifter jag precis redigerat på första raden$/,
  () =>
  {
    cy.visit( `/admin/#/${gTableName}?sort=id&order=DESC` );
    cy.get( 'table[class~=RaDatagrid-table] thead tr span[data-field=id]' ).should( 'exist' );
    cy.get( 'table[class~=RaDatagrid-table] thead tr span[data-field=name]' ).should( 'exist' );
    cy.get( 'table[class~=RaDatagrid-table] thead tr span[data-field=shortName]' ).should( 'exist' );
  }
);


And(
  /^Ser att '([^"]*)' har lagts till i #name och #shortName$/,
  ( pModStr ) =>
  {
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(3) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        expect( text ).to.be.equal( `${pModStr}mock.${gTimeUnixEPOCms}.${gNameStr}` );
      }
    );
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(4) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        expect( text ).to.be.equal( `${pModStr}mock.${gTimeUnixEPOCms}.${gShortNameStr}` );
      }
    );

    cy.pause();

  }
);



Given(
  /^"modded.mock.<slumpgenererat-nummer>.'([^"]*)'" står i rutan #name$/,
  ( pNameStr ) =>
  {
    login();
    cy.visit( `/admin/#/${gTableName}?sort=id&order=DESC` );
    cy.get( `table[class~=RaDatagrid-table] tbody tr:first td:last a`).click();

    // cy.pause();

    cy.get( 'div[class~="RaEdit-main"] form' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'exist' );
    cy.get( 'div[class~="RaEdit-main"] form button[type="submit"]' ).should( 'be.disabled' );
    cy.get( 'div[class~="RaEdit-main"] form input[id="name"]' ).should( 'have.value', `modded.mock.${gTimeUnixEPOCms}.${pNameStr}` );
  }
);


And(
  /^"modded.mock.<slumpgenererat-nummer>.'([^"]*)'" står i rutan #shortName$/,
  ( pShortNameStr ) =>
  {
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'not.have.value', `mock.${gTimeUnixEPOCms}.${pShortNameStr}` );
    cy.get( 'div[class~="RaEdit-main"] form input[id="shortName"]' ).should( 'have.value', `modded.mock.${gTimeUnixEPOCms}.${pShortNameStr}` );
  }
);


When(
  /^Klickar på '([^"]*)' i verktygsfältet under formuläret$/,
  ( pClickableStr ) =>
  {
    cy.get( `div[class~="RaToolbar-defaultToolbar"] button` )
    .contains( pClickableStr )
    .click();
  }
);


Given(
  /^Jag ser skollistan sorterad på id och uppgifter jag precis redigerat, på första raden$/,
  () =>
  {
    login();
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(3) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        expect( text ).to.be.equal( `modded.mock.${gTimeUnixEPOCms}.${gNameStr}` );
      }
    );
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(4) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        expect( text ).to.be.equal( `modded.mock.${gTimeUnixEPOCms}.${gShortNameStr}` );
      }
    );
  }
);


When(
  /^Klickar på kryssrutan på den raden$/,
  () =>
  {
    cy.get( `table[class~=RaDatagrid-table] tbody tr:first td:first span input`).click();
  }
);


Then(
  /^Ser skollistan sorterad på id och skolan är borttagen$/,
  () =>
  {
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(3) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        console.log( text );
        expect( text ).not.to.contain( `mock.${gTimeUnixEPOCms}.${gNameStr}` );
      }
    );
    cy.get( 'table[class~=RaDatagrid-table] tbody tr:first td:nth-child(4) span' )
    .invoke( 'text' )
    .then(
      ( text ) =>
      {
        console.log( text );
        expect( text ).not.to.contain( `mock.${gTimeUnixEPOCms}.${gShortNameStr}` );
      }
    );
  }
);


/*
*/
