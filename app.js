const hayvanForm = document.getElementById("hayvanForm");
const mesajKutusu = document.getElementById("mesaj");

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
});