const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Pencere kontrolleri
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    isMaximized: () => ipcRenderer.invoke('is-maximized'),

    // Lyrics kontrolleri
    toggleLyrics: () => ipcRenderer.send('toggle-lyrics'),
    closeLyrics: () => ipcRenderer.send('lyrics-close'),
    minimizeLyrics: () => ipcRenderer.send('lyrics-minimize'),
    updateSongInfo: (songInfo) => ipcRenderer.send('update-song-info', songInfo),
    onSongUpdated: (callback) => ipcRenderer.on('song-updated', (event, songInfo) => callback(songInfo)),

    // Ayarlar
    getSettings: () => ipcRenderer.invoke('get-settings'),
    saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings)
});

console.log('YouTube Music Desktop - Preload script yüklendi');
