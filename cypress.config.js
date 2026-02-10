const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Base URL da API (backend)
    baseUrl: "http://localhost:8400",

    specPattern: "cypress/e2e/**/*.cy.js",

    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {

    },

    video: false,
  },
});