// Window Controls
document.getElementById('minimizeBtn').addEventListener('click', () => {
    window.electronAPI.minimize();
});

document.getElementById('maximizeBtn').addEventListener('click', () => {
    window.electronAPI.maximize();
});

document.getElementById('closeBtn').addEventListener('click', () => {
    window.electronAPI.close();
});

// Settings Panel
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsBtn = document.getElementById('settingsBtn');
const settingsClose = document.getElementById('settingsClose');
const minimizeToTrayCheckbox = document.getElementById('minimizeToTray');
const startMinimizedCheckbox = document.getElementById('startMinimized');
const transparencyCheckbox = document.getElementById('transparency');

async function loadSettings() {
    const settings = await window.electronAPI.getSettings();
    minimizeToTrayCheckbox.checked = settings.minimizeToTray;
    startMinimizedCheckbox.checked = settings.startMinimized;
    transparencyCheckbox.checked = settings.transparency;
}

async function saveSettings() {
    await window.electronAPI.saveSettings({
        minimizeToTray: minimizeToTrayCheckbox.checked,
        startMinimized: startMinimizedCheckbox.checked,
        transparency: transparencyCheckbox.checked
    });
}

settingsBtn.addEventListener('click', () => {
    settingsOverlay.classList.add('active');
});

settingsClose.addEventListener('click', () => {
    settingsOverlay.classList.remove('active');
});

settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) {
        settingsOverlay.classList.remove('active');
    }
});

minimizeToTrayCheckbox.addEventListener('change', saveSettings);
startMinimizedCheckbox.addEventListener('change', saveSettings);
transparencyCheckbox.addEventListener('change', saveSettings);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && settingsOverlay.classList.contains('active')) {
        settingsOverlay.classList.remove('active');
    }
});

loadSettings();

// WebView
const webview = document.getElementById('ytmusic');

webview.addEventListener('did-start-loading', () => {
    webview.classList.add('loading');
});

webview.addEventListener('did-stop-loading', () => {
    webview.classList.remove('loading');
});

webview.addEventListener('dom-ready', () => {
    // Inject CSS to hide scrollbars and make room for controls
    webview.insertCSS(`
        /* Hide scrollbars */
        ::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
        }
        
        * {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
        }
        
        /* Move profile icon left to avoid window controls */
        ytmusic-nav-bar .right-content {
            margin-right: 140px !important;
        }
    `);
});

console.log('YouTube Music Desktop - Renderer yüklendi');
