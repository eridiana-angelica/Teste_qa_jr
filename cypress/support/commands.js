// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("api", (method, path, body) => {
  return cy.request({
    method,
    url: path,
    body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("expectJsonHeaders", (res) => {
  expect(res.headers).to.have.property("content-type");
  expect(res.headers["content-type"]).to.include("application/json");
});

Cypress.Commands.add("expectCorsHeaders", (res) => {
  expect(res.headers).to.have.property("access-control-allow-origin");
});
