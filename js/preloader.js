$(window).on('load', function() {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('fast');
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})
