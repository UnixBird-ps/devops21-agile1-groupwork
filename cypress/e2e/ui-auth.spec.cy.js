describe(
  'Auth via UI',
  () =>
  {

    it(
      'See the login page',
      () =>
      {
        cy.visit( 'http://localhost:7666' );
        cy.get( 'form[id="login"]' ).contains( 'Email' );
        cy.get( 'form[id="login"]' ).contains( 'Password' );
        cy.get( 'form[id="login"]' ).contains( 'Login' );
      }
    );


    it(
      'Submit login creds for unregistered user',
      () =>
      {
        cy.visit( 'http://localhost:7666' );
        cy.get( 'input[id="email"]' ).type( 'unreg@ister.ed' );
        cy.get( 'input[id="password"]' ).type( '123456' );
        cy.get( 'form[id="login"]' ).submit();
        cy.get( 'form[id="login"]' ).should( 'exist' );
      }
    );


    it(
      'Submit login creds for registered user',
      () =>
      {
        cy.visit( 'http://localhost:7666' );
        cy.get( 'input[id="email"]' ).type( 'exempel@nodehill.com' );
        cy.get( 'input[id="password"]' ).type( 'abc123' );
        cy.get( 'form[id="login"]' ).submit();
        cy.get( 'form[id="login"]' ).should( 'not.exist' );
      }
    );

  }
);
