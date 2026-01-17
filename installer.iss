; YouTube Music Installer Script
; Inno Setup Script

[Setup]
AppName=YouTube Music
AppVersion=1.0.0
AppPublisher=User
DefaultDirName={autopf}\YouTube Music
DefaultGroupName=YouTube Music
OutputDir=installer
OutputBaseFilename=YouTube Music Setup
Compression=lzma2
SolidCompression=yes
SetupIconFile=icons\icon.ico
UninstallDisplayIcon={app}\YouTube Music.exe
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

[Files]
Source: "dist\YouTube Music-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\YouTube Music"; Filename: "{app}\YouTube Music.exe"
Name: "{group}\Uninstall YouTube Music"; Filename: "{uninstallexe}"
Name: "{autodesktop}\YouTube Music"; Filename: "{app}\YouTube Music.exe"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional icons:"

[Run]
Filename: "{app}\YouTube Music.exe"; Description: "Launch YouTube Music"; Flags: nowait postinstall skipifsilent
