const faker = require('faker');

module.exports = {
  'Sign Up Test': function test(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(`${devServer}/join`)
      .waitForElementVisible('#app', 5000)
      .setValue('input[name="name"]', faker.name.findName())
      .setValue('input[name="email"]', faker.internet.email())
      .setValue('input[name="password"]', 'secret12345')
      .setValue('input[name="password-confirmation"]', 'secret12345')
      .waitForElementVisible('button.submit', 5000)
      .click('button.submit')
      .waitForElementVisible('.snackbar', 5000)
      .assert.containsText('.snackbar', 'Successfully signed up')
      .click('.snackbar button')
      .pause(1000)
      .click('.navbar-item.logout')
      .waitForElementVisible('.snackbar', 5000)
      .assert.containsText('.snackbar', 'Successfully logged out')
      .end();
  },
};
