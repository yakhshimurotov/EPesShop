
const errorAnimate = document.querySelectorAll(".error");

function startAnimate() {
    gsap.from(errorAnimate, {
        duration: 1,
        scale: .9,
        ease: "elastic",
    });
 };

startAnimate();

<<<<<<< HEAD
// const fileInput = document.getElementById('fileInput');
// const preview = document.getElementById('preview');

// const img = fileInput.addEventListener('change', () => {
//   const file = fileInput.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function(e) {
//       preview.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   }
// });

// export {img};
=======
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

const img = fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

export {img};
>>>>>>> 074e028981809ca37f4f1d31654a44041a87a811
