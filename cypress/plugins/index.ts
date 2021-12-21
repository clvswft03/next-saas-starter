/// <reference types="cypress" />
/// <reference types="node" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (_on: Cypress.PluginEvents, config: any) => {
  // inside config.browsers array each object has information like
  // {
  //   name: 'chrome',
  //   channel: 'canary',
  //   family: 'chromium',
  //   displayName: 'Canary',
  //   version: '80.0.3966.0',
  //   path:
  //    '/Applications/Canary.app/Contents/MacOS/Canary',
  //   majorVersion: 80
  // }
  return {
    browsers: config.browsers.filter(
      (b: Cypress.Browser) =>
        b.family === 'chromium' && b.version && b.version.length > 0,
    ),
  };
};
