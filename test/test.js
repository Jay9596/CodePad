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
describe('##CODEPAD TEST##', function () {
  this.timeout(12000)

  beforeEach(() => {
    return app.start()
  })

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })
  describe('Window Tests:', () => {
    it('Opens', () => {
      return app.client.waitUntilWindowLoaded()
        .getWindowCount().should.eventually.equal(1)
    })
    it('Title', () => {
      return app.client.waitUntilWindowLoaded()
        .getTitle().should.eventually.equal('CodePad')
    })
    it('Visibility', () => {
      return app.browserWindow.isVisible()
    })
  })
  describe('Test Window Controls:', () => {
    it('Min Button', () => {
      return app.client.getAttribute('#min-button', 'title').then((btn) => {
        assert.equal(btn, 'Minimize')
      })
    })
    it('Max Button', () => {
      return app.client.getAttribute('#max-button', 'title').then((btn) => {
        assert.equal(btn, 'Maximize')
      })
    })
    it('Close Button', () => {
      return app.client.getAttribute('#close-button', 'title').then((btn) => {
        assert.equal(btn, 'Close')
      })
    })
  })
  describe('Test Menu:', () => {
    it('JS Menu', () => {
      return app.client.getText('*=JS').then((e) => {
        assert.equal(e, '+JS')
      })
    })
    it('CSS Menu', () => {
      return app.client.getText('*=CSS').then((e) => {
        assert.equal(e, '+CSS')
      })
    })
    it('New Button', () => {
      app.client.click('#new').then(() => {
        return app.client.waitUntilWindowLoaded()
          .getWindowCount().should.eventually.equal(2)
      })
    })
    it('Contribute Button', () => {
      return app.client.getAttribute('#contribute', 'href').then((link) => {
        link.should.equal('https://www.github.com/thecodepad/codepad')
      })
    })
    it('Update Button', () => {
      return app.client.getAttribute('#check-updates', 'href').then((link) => {
        link.should.equal('https://github.com/Jay9596/CodePad/releases')
      })
    })
    it('About Button', () => {
      return app.client.getAttribute('#about', 'href').then((link) => {
        link.should.equal('https://thecodepad.github.io/')
      })
    })
  })
  describe('Test Output:', () => {
    it('Output Frame', () => {
      app.client.getTagName('#output').then((output) => {
        output.should.be.equal.to('iframe')
      })
    })
  })
})