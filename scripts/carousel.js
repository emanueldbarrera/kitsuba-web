/* This file uses vanilla js because why not */

var slideContainer = document.querySelector(".slide-container");
var buttonContainer = document.querySelector(".slide-buttons");

function createSlide(slideNumber) {
    slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = 'images/carousel-{}.png'.replace('{}', slideNumber + 1);
    slide.style.transform = 'translateX(' + slideNumber + '00%)';
    return slide;
}

function generateCarousel(slidesQuantity) {
    var slide = '<div class="slide"></div>';
    
    for(var i = 0; i < slidesQuantity; i++) {
        slideContainer.appendChild(createSlide(i));
    }
}

function animateCarousel(toPos) {
    slideContainer.style.transform = 'translateX(' + toPos + '%)'
}

function drawSlideButtons(slidesQuantity){
    
    for(var i = 0; i < slidesQuantity; i++) {
        buttonElement = document.createElement("div");
        buttonElement.className = "slide-button";
        buttonElement.setAttribute("slide-number", i);
        if (i == 0) {
            buttonElement.className = buttonElement.className + ' slide-button--selected'
        }
        buttonElement.addEventListener("click", function(){
            var buttons = document.querySelectorAll(".slide-button");
            for (var j = 0; j < buttons.length; j++){
                buttons[j].className = 'slide-button';
            }
            this.className = buttonElement.className + ' slide-button--selected';
            animateCarousel(this.getAttribute("slide-number")*-100);
        });
        buttonContainer.appendChild(buttonElement);
    }
    
}

function init() {
    slides = 3;
    generateCarousel(slides);
    drawSlideButtons(slides);
}

init();