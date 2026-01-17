# 🎵 YouTube Music Desktop

Windows için özel olarak tasarlanmış, gelişmiş özelliklere sahip, modern ve şık bir YouTube Music masaüstü istemcisi.

![YouTube Music Desktop Logo](icons/icon.png)

## ✨ Özellikler

Bu uygulama, standart web deneyiminin ötesine geçerek masaüstü için optimize edilmiştir:

- **💎 Modern ve Şeffaf Arayüz:** Windows 11 Mica efekti destekli, çerçevesiz ve şık tasarım.
- **🖼️ Yerel Pencere Kontrolleri:** YouTube Music arayüzü ile bütünleşik, dikkat dağıtmayan entegre pencere butonları.
- **🔔 Sistem Tepsisi (Tray) Desteği:** 
  - Uygulamayı kapattığınızda (`X`) tamamen kapanmaz, Discord gibi sistem tepsisine küçülür.
  - Arka planda müzik çalmaya devam eder.
- **🖱️ Gelişmiş Navigasyon:** Tıklanabilir alan sorunları giderilmiş, optimize edilmiş kullanıcı deneyimi.
- **📦 Taşınabilir (Portable):** Kurulum gerektirmez, istediğiniz yerde çalıştırın.
- **⚙️ Özelleştirilebilir Ayarlar:**
  - Tepsiye küçültme seçeneği
  - Başlangıçta gizli başlatma
  - Şeffaflık efektini açıp kapatma

## 🚀 İndirme ve Kurulum

En son sürümü [Releases](https://github.com/Alchemei/youtube-music-desktop-app/releases) sayfasından indirebilirsiniz.

### Kurulumsuz Kullanım (Portable)
1. `YouTubeMusic-Portable-v2.zip` dosyasını indirin.
2. ZIP dosyasını klasöre çıkartın.
3. `YouTube Music.exe` dosyasını çalıştırın.

*Not: Uygulamanın çalışması için yanındaki dosyalar gereklidir. Sadece exe dosyasını masaüstüne almayınız, kısayol oluşturunuz.*

## 🛠️ Geliştirme

Bu projeyi geliştirmek veya kaynak kodundan çalıştırmak isterseniz:

### Gereksinimler
- [Node.js](https://nodejs.org/) (Sürüm 18 veya üzeri)
- [Git](https://git-scm.com/)

### Kurulum Adımları

1. Repoyu klonlayın:
```bash
git clone https://github.com/Alchemei/youtube-music-desktop-app.git
cd youtube-music-desktop-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı geliştirme modunda çalıştırın:
```bash
npm start
```

4. Exe dosyası oluşturun:
```bash
npm run package
```

## 📝 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---
**Geliştirici:** [Alchemei](https://github.com/Alchemei)
