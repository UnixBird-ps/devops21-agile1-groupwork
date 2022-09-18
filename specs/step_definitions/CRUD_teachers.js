import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";
import { gAdminEmailStr, gAdminPwStr } from './crud-cred.js';


let gTableName = 'teachers';
// let gTimeUnixEPOCms = Date.now().toString();
// let gNameStr = '';
// let gShortNameStr = '';

function login() {
    cy.request('POST', '/data/login', { email: gAdminEmailStr, password: gAdminPwStr })
        .then(
            (pResponse) => {
                expect(pResponse.status).to.be.equal(200);
                expect(pResponse.body).to.have.property('loggedIn');
                expect(pResponse.body.loggedIn).to.be.equal(true);
            }
        );
    // Cypress.Commands.add(
    //     'login',
    //     (pEmail, pPw) => {
    //         cy.visit('http://localhost:7666');
    //         cy.get('form[id="login"] input[id="email"]').type(pEmail);
    //         cy.get('form[id="login"] input[id="password"]').type(pPw);
    //         cy.get('form[id="login"] input[type="submit"]').click();
    //         cy.get('form[id="login"]').should('not.exist');
    //         cy.get('table[class~="big"]').should('exist');
    //     }
    // );


    // beforeEach(
    //     () => {
    //         cy.login(adminEmailStr, adminPwStr)
}
// );


Given(
    /^I am on the admin teacher list and i can see all the teachers$/,
    () => {
        // cy.visit(`http://localhost:7666/admin/#/${tableName}`),
        login();
        cy.visit(`/admin/#/${gTableName}`);

        cy.url().should('contain', `/admin/#/${gTableName}`),
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=id]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=firstName]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=lastName]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=initials]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=phone]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=email]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=color]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=roles]').should('exist');
        cy.get('table[class~="RaDatagrid-table"] thead tr span[data-field=hide]').should('exist');
        // cy.get(`div[class~="MuiToolbar-root"] a[href="#/${tableName}/create"]`).click();
    }
);

When(
    /^I click on the 'Create' knapp$/,
    () => {
        cy.get(`div[class~="MuiToolbar-root"] a[href="#/${gTableName}/create"]`).click();
    }
);

Then(
    /^I can see the create teacher formal structure$/,
    () => {
        cy.get('div[class~="RaCreate-main"] form').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="email"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="email"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="password"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="password"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="firstName"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="firstName"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="lastName"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="lastName"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="initials"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="initials"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="phone"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="phone"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="color"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="color"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="roles"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="roles"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form input[id="hide"]').should('exist');
        cy.get('div[class~="RaCreate-main"] form input[id="hide"]').should('be.empty');
        cy.get('div[class~="RaCreate-main"] form button[type="submit"]').should('be.disabled');
    }
);



