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
);


Given(
    /^I am on the admin teacher list and i can see all the teachers$/,
    () => {
        cy.visit(`http://localhost:7666/admin/#/${tableName}`),
        cy.url().should('contain', `/admin/#/${tableName}`),
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=id]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=firstName]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=lastName]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=initials]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=phone]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=email]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=color]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=roles]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=hide]').should('exist');
        cy.get(`div[class~="MuiToolbar-root"] a[href="#/${tableName}/create"]`).click();
    }
);