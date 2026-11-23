// --- 1. ve 2. GÖREV: HAYVAN KAYIT VE LİSTELEME ---
const hayvanForm = document.getElementById("hayvanForm");
const mesajKutusu = document.getElementById("mesaj");
const hayvanListesi = document.getElementById("hayvanListesi");
const hayvanTablosu = document.getElementById("hayvanTablosu");
const bosListeMesaji = document.getElementById("bosListeMesaji");

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

  mesajKutusu.textContent = `"${kupeNo}" numaralı ${tur} başarıyla kaydedildi!`;
  mesajKutusu.classList.remove("gizli");

  hayvanForm.reset();
  hayvanlariListele();
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
});

// Sayfa açıldığında mevcut verileri yükle
hayvanlariListele();
yemleriListele();