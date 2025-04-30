
  const uzsInput = document.getElementById("uzsInput");
  const loader = document.getElementById('loader');
  const input = document.getElementById("codeInput");

  
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
    }, 1000); // 3 sekund kutadi
  });
  
  uzsInput.addEventListener("input", function (e) {
    let value = e.target.value;

    // Raqamdan boshqa belgilarni olib tashlaymiz
    value = value.replace(/\D/g, "");

    // Bo‘sh bo‘lsa chiqamiz
    if (!value) {
      e.target.value = "";
      return;
    }

    // Formatlab qaytaramiz (masalan: 1000000 → 1 000 000)
    e.target.value = new Intl.NumberFormat("uz-UZ").format(value);
  });

  input.addEventListener("input", function () {
    // Faqat raqam kiritish
    this.value = this.value.replace(/\D/g, "");

    // Agar 4 tadan ko‘p bo‘lsa, faqat birinchi 4 tasini oladi
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4);
    }
  });
