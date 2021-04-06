var slideIndex = 1;
showSlides(slideIndex);

function myFunction() {
    var x = document.getElementById("head");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(params) {
    showSlides(slideIndex = params);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dot = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = 2;
    }
    for (i = 0; i < slides.length; ++i) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dot.length; ++i) {
        dot[i].className = dot[i].className.replace(" active", " ");
    }
    slides[slideIndex - 1].style.display = "block";
    dot[slideIndex - 1].className += " active";
}