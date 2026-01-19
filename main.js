const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let lyricsWindow = null;
let tray = null;

// Ayarlar dosyası yolu
const settingsPath = path.join(app.getPath('userData'), 'settings.json');

// Varsayılan ayarlar
const defaultSettings = {
  minimizeToTray: true,
  startMinimized: false,
  transparency: true
};
// Ayarları yükle
function loadSettings() {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      return { ...defaultSettings, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Ayarlar yüklenemedi:', e);
  }
  return defaultSettings;
}

// Ayarları kaydet
function saveSettings(settings) {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  } catch (e) {
    console.error('Ayarlar kaydedilemedi:', e);
  }
}

let settings = loadSettings();

// Uygulama kapanırken kullanılacak flag
app.isQuitting = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'icons', 'icon.ico'),
    frame: false,
    titleBarStyle: 'hidden',
    transparent: settings.transparency,
    backgroundMaterial: settings.transparency ? 'mica' : 'none',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    },
    autoHideMenuBar: true,
    show: false,
    backgroundColor: settings.transparency ? '#00000000' : '#030303'
  });

  // Custom title bar ile HTML yükle
  mainWindow.loadFile('index.html');

  // Pencere hazır olduğunda göster
  mainWindow.once('ready-to-show', () => {
    if (!settings.startMinimized) {
      mainWindow.show();
    }
  });

  // X tuşuna basıldığında ayarlara göre davran
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      if (settings.minimizeToTray) {
        event.preventDefault();
        mainWindow.hide();
        if (lyricsWindow) lyricsWindow.hide();

        if (tray && !app.notificationShown) {
          tray.displayBalloon({
            iconType: 'info',
            title: 'YouTube Music',
            content: 'Uygulama arka planda çalışmaya devam ediyor.'
          });
          app.notificationShown = true;
        }
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (lyricsWindow) {
      lyricsWindow.close();
      lyricsWindow = null;
    }
  });
}



function createTray() {
  const iconPath = path.join(__dirname, 'icons', 'icon.ico');
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: '🎵 YouTube Music', enabled: false },
    { type: 'separator' },
    { label: 'Göster', click: () => { if (mainWindow) { mainWindow.show(); mainWindow.focus(); } } },
    { label: 'Gizle', click: () => { if (mainWindow) mainWindow.hide(); } },
    { type: 'separator' },
    { label: 'Çıkış', click: () => { app.isQuitting = true; app.quit(); } }
  ]);

  tray.setToolTip('YouTube Music');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
}

// IPC olayları - Pencere kontrolleri
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

// Ayarlar
ipcMain.handle('get-settings', () => {
  return settings;
});

ipcMain.handle('save-settings', (event, newSettings) => {
  settings = { ...settings, ...newSettings };
  saveSettings(settings);
  return settings;
});

ipcMain.handle('is-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

// Tek bir örnek kilit mekanizması
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // İkinci bir örnek çalıştırılmaya çalışıldığında
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      if (!mainWindow.isVisible()) mainWindow.show();
      mainWindow.focus();
    }
  });

  // Uygulama hazır olduğunda
  app.whenReady().then(() => {
    createWindow();
    createTray();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('before-quit', () => {
    app.isQuitting = true;
    if (tray) {
      tray.destroy();
      tray = null;
    }
  });
}
