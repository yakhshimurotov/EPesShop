
const errorAnimate = document.querySelectorAll(".error");

function startAnimate() {
    gsap.from(errorAnimate, {
        duration: 1,
        scale: .9,
        ease: "elastic",
    });
 };

startAnimate();