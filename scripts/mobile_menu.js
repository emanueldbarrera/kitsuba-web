// Mobile hamburger menu button behavior
$('.header__button-mobile').on('click', function() {
    if (!isMobile()) {
        return;
    }
    var isButtonListDisplayed = $('.header__button-list').css('display') != 'none';
    if (isButtonListDisplayed) {
        $('.header__button-list').css('display', 'none');
    } else {
        $('.header__button-list').css('display', 'flex');
    }
});

// Menu options behavior
$('.header__button-list > li').on('click', function() {
    if (!isMobile()) {
        return;
    }
    $('.header__button-list').css('display', 'none');
});

function isMobile() {
    return !window.matchMedia("(min-width: 600px)").matches;
}