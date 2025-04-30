
function checkInternetStatus() {
    const alertBox = document.getElementById('offline-alert');
    const fullWindow = document.querySelector(".container");
    if (!navigator.onLine) {
      alertBox.style.display = 'block';
      fullWindow.style.display = "none";
    } else {
      alertBox.style.display = 'none';
      fullWindow.style.display = "block";
    }
  }

  // Boshlang'ich holatni tekshirish
  checkInternetStatus();

  // Online/offline bo'lishini kuzatish
  window.addEventListener('online', checkInternetStatus);
  window.addEventListener('offline', checkInternetStatus);