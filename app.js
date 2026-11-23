// --- 5. GÖREV: GİDER ÖZETİ VE GENEL İSTATİSTİKLER ---
const toplamHayvanEl = document.getElementById("toplamHayvanSayisi");
const toplamYemMiktarEl = document.getElementById("toplamYemMiktari");
const toplamYemMaliyetEl = document.getElementById("toplamYemMaliyeti");

function ozetGuncelle() {
  const hayvanlar = JSON.parse(localStorage.getItem("hayvanlar")) || [];
  const yemler = JSON.parse(localStorage.getItem("yemKayitlari")) || [];

  const toplamMiktar = yemler.reduce((toplam, yem) => toplam + Number(yem.miktar), 0);
  const toplamMaliyet = yemler.reduce((toplam, yem) => toplam + Number(yem.tutar), 0);

  toplamHayvanEl.textContent = hayvanlar.length;
  toplamYemMiktarEl.textContent = `${toplamMiktar.toLocaleString("tr-TR")} kg`;
  toplamYemMaliyetEl.textContent = `${toplamMaliyet.toLocaleString("tr-TR")} TL`;
}

// --- 1., 2. ve 4. GÖREV: HAYVAN KAYIT, LİSTELEME VE SİLME ---
const hayvanForm = document.getElementById("hayvanForm");
const mesajKutusu = document.getElementById("mesaj");
const hayvanListesi = document.getElementById("hayvanListesi");
const hayvanTablosu = document.getElementById("hayvanTablosu");
const bosListeMesaji = document.getElementById("bosListeMesaji");

function mesajGoster(metin, uyariMi = false) {
  mesajKutusu.textContent = metin;
  mesajKutusu.classList.remove("gizli", "mesaj-uyari");
  if (uyariMi) {
    mesajKutusu.classList.add("mesaj-uyari");
  }
}

function hayvanSil(id, kupeNo) {
  const onay = confirm(`"${kupeNo}" küpe numaralı hayvan kaydını silmek istediğinize emin misiniz?`);
  if (!onay) return;

  const mevcutHayvanlar = JSON.parse(localStorage.getItem("hayvanlar")) || [];
  const guncelListe = mevcutHayvanlar.filter((hayvan) => hayvan.id !== id);
  localStorage.setItem("hayvanlar", JSON.stringify(guncelListe));

  mesajGoster(`"${kupeNo}" küpe numaralı hayvan kaydı listeden silindi.`, true);
  hayvanlariListele();
  ozetGuncelle();
}

function hayvanlariListele() {
  const hayvanlar = JSON.parse(localStorage.getItem("hayvanlar")) || [];
  hayvanListesi.innerHTML = "";

  if (hayvanlar.length === 0) {
    hayvanTablosu.classList.add("gizli");
    bosListeMesaji.classList.remove("gizli");
    return;
  }

  hayvanlar.sort((a, b) => {
    const turKarsilastirma = a.tur.localeCompare(b.tur, "tr");
    if (turKarsilastirma !== 0) return turKarsilastirma;
    return a.kupeNo.localeCompare(b.kupeNo, "tr");
  });

  bosListeMesaji.classList.add("gizli");
  hayvanTablosu.classList.remove("gizli");

  hayvanlar.forEach((hayvan) => {
    const satir = document.createElement("tr");
    satir.innerHTML = `
      <td>${hayvan.tur}</td>
      <td>${hayvan.kupeNo}</td>
      <td>${hayvan.kayitTarihi}</td>
      <td>
        <button type="button" class="btn-sil" onclick="hayvanSil(${hayvan.id}, '${hayvan.kupeNo.replace(/'/g, "\\'")}')">
          Sil / Çıkar
        </button>
      </td>
    `;
    hayvanListesi.appendChild(satir);
  });
}

hayvanForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const tur = document.getElementById("tur").value;
  const kupeNo = document.getElementById("kupeNo").value.trim();
  const kayitTarihi = document.getElementById("kayitTarihi").value;

  const yeniHayvan = {
    id: Date.now(),
    tur,
    kupeNo,
    kayitTarihi
  };

  const mevcutHayvanlar = JSON.parse(localStorage.getItem("hayvanlar")) || [];
  mevcutHayvanlar.push(yeniHayvan);
  localStorage.setItem("hayvanlar", JSON.stringify(mevcutHayvanlar));

  mesajGoster(`"${kupeNo}" numaralı ${tur} başarıyla kaydedildi!`);
  hayvanForm.reset();
  hayvanlariListele();
  ozetGuncelle();
});

// --- 3. GÖREV: GÜNLÜK YEM TÜKETİMİ GİRİŞİ ---
const yemForm = document.getElementById("yemForm");
const yemMesaj = document.getElementById("yemMesaj");
const yemListesi = document.getElementById("yemListesi");
const yemTablosu = document.getElementById("yemTablosu");
const bosYemMesaji = document.getElementById("bosYemMesaji");

function yemleriListele() {
  const yemler = JSON.parse(localStorage.getItem("yemKayitlari")) || [];
  yemListesi.innerHTML = "";

  if (yemler.length === 0) {
    yemTablosu.classList.add("gizli");
    bosYemMesaji.classList.remove("gizli");
    return;
  }

  yemler.sort((a, b) => b.tarih.localeCompare(a.tarih));

  bosYemMesaji.classList.add("gizli");
  yemTablosu.classList.remove("gizli");

  yemler.forEach((yem) => {
    const satir = document.createElement("tr");
    satir.innerHTML = `
      <td>${yem.tarih}</td>
      <td>${yem.tur}</td>
      <td>${yem.miktar} kg</td>
      <td>${Number(yem.tutar).toLocaleString("tr-TR")} TL</td>
    `;
    yemListesi.appendChild(satir);
  });
}

yemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const tarih = document.getElementById("yemTarih").value;
  const tur = document.getElementById("yemTuru").value;
  const miktar = parseFloat(document.getElementById("yemMiktar").value);
  const tutar = parseFloat(document.getElementById("yemTutar").value);

  const yeniYem = {
    id: Date.now(),
    tarih,
    tur,
    miktar,
    tutar
  };

  const mevcutYemler = JSON.parse(localStorage.getItem("yemKayitlari")) || [];
  mevcutYemler.push(yeniYem);
  localStorage.setItem("yemKayitlari", JSON.stringify(mevcutYemler));

  yemMesaj.textContent = `${tarih} tarihli ${miktar} kg ${tur} (${tutar.toLocaleString("tr-TR")} TL) kaydedildi!`;
  yemMesaj.classList.remove("gizli");

  yemForm.reset();
  yemleriListele();
  ozetGuncelle();
});

// Sayfa açıldığında mevcut verileri ve özetleri yükle
hayvanlariListele();
yemleriListele();
ozetGuncelle();