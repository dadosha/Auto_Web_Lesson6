const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: 1,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  configLaptop: {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  configMobile: {
    viewportWidth: 720,
    viewportHeight: 1080,
  },
});
