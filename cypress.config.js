const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    viewportHeight: 900,
    viewportWidth: 1600,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
