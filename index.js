const menubar = require('menubar')
const mb = menubar({
  icon: __dirname + '/Icon-Template.png',
  preloadWindow: true,
  width: 420,
  'window-position': 'topRight'
})
const gs = require('electron').globalShortcut
const ipc = require('electron').ipcMain
const Menu = require('menu')

mb.on('ready', function () {
  var menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

ipc.on('shortcutSet', function (evt, shortcut) {
  gs.unregisterAll()

  try {
    gs.register(shortcut, function () {
      mb.window.isVisible() ? mb.hideWindow() : mb.showWindow()
    })
  } catch (err) {
    mb.window.webContents.send('optionsError', err)
  }
})

const template = [
  {
    label: 'Mojibar',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      },
      {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.reload() }
      },
      {
        label: 'Preferance',
        accelerator: 'Command+,',
        click: function () { mb.window.webContents.send('open-preference') }
      },
      {
        label: 'Quit App',
        accelerator: 'Command+Q',
        selector: 'terminate:'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function () { mb.window.toggleDevTools() }
      }
    ]
  }
]
