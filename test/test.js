const assert = require('assert')
const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

var app = new Application({
  path: require('electron'),
  args: [__dirname + '/../app/index.html']
})
global.before(() => {
  chai.should()
  chai.use(chaiAsPromised)
})
describe('CodePad Testing:', function () {
  this.timeout(12000)

  beforeEach(() => {
    return app.start()
  })

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })
  /*
    it('Window Tests:', () => {
      app.start().then(() => {
        return app.browserWindow.isVisible()
      }).then(isVisible => {
        assert.equal(isVisible, true)
      }).then(() => {
        return app.client.getTitle()
      }).then(title => {
        assert.equal(title, 'CodePad')
      }).catch(err => {
        console.log('Test Failed:', err.message)
      })
    })
  */
  describe('Window Tests:', () => {
    it('Opens a window', () => {
      return app.client.waitUntilWindowLoaded()
        .getWindowCount().should.eventually.equal(1)
    })
    it('Test the title', () => {
      return app.client.waitUntilWindowLoaded()
        .getTitle().should.eventually.equal('CodePad')
    })
    it('Test window visibility', () => {
      app.browserWindow.isVisible().then((visible) => {
        console.log('Is window Visible? : ' + visible)
      })
    })
  })
  describe('Test window control', () => {
    it('Tests min Button exists', () => {
      return app.client.getAttribute('#min-button', 'title').then((btn) => {
        assert.equal(btn, 'Minimize')
      })
    })
    it('Test max Button exists', () => {
      return app.client.getAttribute('#max-button', 'title').then((btn) => {
        assert.equal(btn, 'Maximize')
      })
    })
    it('Test close Button exists', () => {
      return app.client.getAttribute('#close-button', 'title').then((btn) => {
        assert.equal(btn, 'Close')
      })
    })
  })
  describe('Test Menu', () => {
    it('Test JS menu', () => {
      return app.client.getText('*=JS').then((e) => {
        assert.equal(e, '+JS')
      })
    })
    it('Test CSS menu', () => {
      return app.client.getText('*=CSS').then((e) => {
        assert.equal(e, '+CSS')
      })
    })
    it('Test new Button', () => {
      app.client.click('#new').then(() => {
        return app.client.waitUntilWindowLoaded()
          .getWindowCount().should.eventually.equal(2)
      })
    })
    it('Test contribute link', () => {
      return app.client.getAttribute('#contribute', 'href').then((link) => {
        link.should.equal('https://www.github.com/thecodepad/codepad')
      })
    })
    it('Test update link', () => {
      return app.client.getAttribute('#check-updates', 'href').then((link) => {
        link.should.equal('https://github.com/Jay9596/CodePad/releases')
      })
    })
    it('Test about link', () => {
      return app.client.getAttribute('#about', 'href').then((link) => {
        link.should.equal('https://thecodepad.github.io/')
      })
    })
    it('Test output window', () => {
      app.client.getTagName('#output').then((output) => {
        output.should.be.equal.to('iframe')
      })
    })
  })
})
