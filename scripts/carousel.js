/* This file uses vanilla js because why not */

var slideContainer = document.querySelector(".slide-container");
var buttonContainer = document.querySelector(".slide-buttons");
var shouldAutoMoveCarousel = true;
var currentSlide = 0;
var slides = 3;

function createSlide(slideNumber) {
    slideNumberImage = Math.abs(slideNumber % slides);
    slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = 'url("images/carousel-{}.jpg")'.replace('{}', slideNumberImage + 1);
    slide.style.transform = 'translateX(' + slideNumber + '00%)';
    return slide;
}

function generateCarousel(slidesQuantity) {    
    for(var i = 0; i < slidesQuantity; i++) {
        slideContainer.appendChild(createSlide(i));
    }
}

function animateCarousel(slide) {
    if (slide >= slides || slide <= 0) {
        slideContainer.appendChild(createSlide(slide));
    }
    slideContainer.style.transform = 'translateX(' + slide*-100 + '%)';
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
            var slideNumber = this.getAttribute("slide-number");
            slideNumber = currentSlide - Math.abs(currentSlide % slides) + parseInt(slideNumber);
            animateCarousel(slideNumber);
            currentSlide = slideNumber;
            shouldAutoMoveCarousel = false;
        });
        buttonContainer.appendChild(buttonElement);
    }
}

function manuallyMoveCarousel(slide) {
    currentSlide = slide;
    currentSlide = currentSlide;
    animateCarousel(currentSlide);
    var buttons = document.querySelectorAll(".slide-button");
    for (var i = 0; i < buttons.length; i++){
        if (i == Math.abs(currentSlide%slides)) {
            buttons[i].className = buttonElement.className + ' slide-button--selected';
        } else {
            buttons[i].className = 'slide-button';
        }
    }
}

function autoMoveCarousel() {
    setInterval(function(){
        if(shouldAutoMoveCarousel){
            manuallyMoveCarousel(currentSlide+1);
        } else {
            shouldAutoMoveCarousel = true;
        }
    }, 3500);
}

function init() {
    generateCarousel(slides);
    drawSlideButtons(slides);
    autoMoveCarousel();
}

init();