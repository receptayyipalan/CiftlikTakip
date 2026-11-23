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
    tur: tur,
    kupeNo: kupeNo,
    kayitTarihi: kayitTarihi
  };

  const mevcutHayvanlar = JSON.parse(localStorage.getItem("hayvanlar")) || [];
  mevcutHayvanlar.push(yeniHayvan);
  localStorage.setItem("hayvanlar", JSON.stringify(mevcutHayvanlar));

  mesajKutusu.textContent = `"${kupeNo}" numaralı ${tur} başarıyla kaydedildi! (Toplam kayıt: ${mevcutHayvanlar.length})`;
  mesajKutusu.classList.remove("gizli");

  hayvanForm.reset();
  hayvanlariListele();
});

hayvanlariListele();