import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";
import { adminEmailStr, adminPwStr } from './user-creds.js';


let tableName = 'teachers';
// let timeUnixEPOCms = Date.now().toString();


Cypress.Commands.add(
    'login',
    (pEmail, pPw) => {
        cy.visit('http://localhost:7666');
        cy.get('form[id="login"] input[id="email"]').type(pEmail);
        cy.get('form[id="login"] input[id="password"]').type(pPw);
        cy.get('form[id="login"] input[type="submit"]').click();
        cy.get('form[id="login"]').should('not.exist');
        cy.get('table[class~="big"]').should('exist');
    }
);


beforeEach(
    () => {
        cy.login(adminEmailStr, adminPwStr)
    }
)


Given(
    /^I am on the teachers home page where i can see the teacher list$/,
    ()=>
   {
        cy.visit(`http://localhost:7666/admin/#/${tableName}`),
        cy.url().should('contain', `/admin/#/${tableName}`),
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=id]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=name]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=shortName]').should('exist');
        cy.get(`div[class~="MuiToolbar-root"] a[href="#/${tableName}/create"]`).click();
   } 
);