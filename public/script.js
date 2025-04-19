
  const uzsInput = document.getElementById("uzsInput");
  const loader = document.getElementById('loader');

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

