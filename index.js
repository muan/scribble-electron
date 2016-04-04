const menubar = require('menubar')
const mb = menubar({
  icon: __dirname + '/Icon-Template.png',
  preloadWindow: true,
  width: 420,
  'window-position': 'topRight'
})
const gs = require('electron').globalShortcut

mb.on('ready', function () {
  gs.register("command+shift+'", function () {
    mb.window.isVisible() ? mb.hideWindow() : mb.showWindow()
  })
})
