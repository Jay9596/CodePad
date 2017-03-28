const assert = require('assert')
const Application = require('spectron').Application

describe('CodePad Testing:', function () {
  this.timeout(12000)

  beforeEach(() => {
    this.app = new Application({
      path: require('electron'),
      args: [__dirname + '/../app/index.html']
    })
    return this.app.start()
  })
  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })
  it('Window Tests:', () => {
    this.app.start().then(() => {
      return this.app.browserWindow.isVisible()
    }).then(isVisible => {
      assert.equal(isVisible, true)
    }).then(() => {
      return this.app.client.getTitle()
    }).then(title => {
      assert.equal(title, 'CodePad')
    }).then(() => {
      return this.app.stop()
    }).catch(err => {
      console.log('Test Failed:', err.message)
    })
  })
})
