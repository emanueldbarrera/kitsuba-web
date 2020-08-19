var shouldHide = true;

function hideNotification() {
    shouldHide = false;
    $('.notification').removeClass('notification--show');
}

function showNotification(message) {
    hideNotification();
    shouldHide = true;
    $('.notification').html(message);
    $('.notification').addClass('notification--show');
    setTimeout(function(){
        if (shouldHide) {
            hideNotification();
            shouldHide = true;
        }
    }, 2500);
}

$('.form__send').on('click', function(e){
    e.preventDefault();
    let captchaResponse = grecaptcha.getResponse();
    if (
        $('#name').val().length <= 0 ||
        $('#email').val().length <= 0 ||
        $('#message').val().length <= 0 ||
        captchaResponse.length <= 0
    ) {
        showNotification('Please complete all fields...');
        return;
    }
    $('.form__send').attr('disabled', 'disabled');
    $.ajax('/contact.php', {
        method: 'POST',
        data: {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val(),
            captcha: captchaResponse
        }
    }).then(
        function success() {
            showNotification('Message sent!');
            $('.form__send').removeAttr('disabled');
            grecaptcha.reset();
        },
        function fail(response) {
            if (response.responseText && JSON.parse(response.responseText)['error'] == 1001) {
                showNotification('Please complete the captcha challenge.');
                grecaptcha.reset();
            } else {
                showNotification('Could not set message. Try again.');
            }
            $('.form__send').removeAttr('disabled');
        }
    );
});