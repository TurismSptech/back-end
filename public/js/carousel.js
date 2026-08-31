let slides = document.querySelectorAll(".slide");
let bolinha = document.querySelectorAll(".indica");
let i = 0;

function nextSlide() {
    i++;
    if (i >= slides.length) {
        i = 0;
    }
    showSlide(i);
}

setInterval(nextSlide, 4000);

function showSlide(i) {
    // Remove "active" de todos os slides
    for (let j = 0; j < slides.length; j++) {
        slides[j].classList.remove("active");
    }

    // Remove "active" de todos os bolinha
    for (let j = 0; j < bolinha.length; j++) {
        bolinha[j].classList.remove("active");
    }

    // Ativa o slide atual
    slides[i].classList.add("active");

    // Ativa o dot atual
    bolinha[i].classList.add("active");
}