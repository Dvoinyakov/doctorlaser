$(function () {

$('.slider-main').owlCarousel({
    autoplay:true,
    nav: true,
    navText:['<i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>','<i class="fa fa-arrow-circle-o-right"' +
    ' aria-hidden="true"></i>'],
    loop:true,
    items:1,
    smartSpeed:1050
});

    $( ".treatment__button" ).click(function() {
        $( ".treatment__line__hidden" ).slideDown( "slow", function() {

        });
        $( ".treatment__button" ).fadeOut(800, function () {

        });
    });

    // Iterate over each select element
    $('select').each(function () {

        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');

        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.styledSelect.active').each(function () {
                $(this).removeClass('active').next('ul.options').hide();
            });
            $(this).toggleClass('active').next('ul.options').toggle();
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide('slideDown', function () {
                
            });
            /* alert($this.val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide('slideDown', function () {
                
            });
        });

    });


        $('.callbacks__item__date').mask('00/00');
        $('.callbacks__item__time').mask('00:00');
        $('.callback__form__popup__time').mask('00:00');
        $('.callbacks__item__phone').mask('8 (999) 999-99-99');
        $('.footer__callback__form__input').mask('8 (999) 999-99-99');
        $('.callback__form__popup__phone').mask('8 (999) 999-99-99');

// Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });


        $('.header__address__link__to_call_js__call').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#name',


            callbacks: {
                beforeOpen: function() {
                    if($(window).width() < 700) {
                        this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                }
            }
        });

    $('.header__address__link__to__map').magnificPopup();
    $('.footer__address__text').magnificPopup();
    $('.footer__button').magnificPopup();
    $('.page__content__link').magnificPopup();





    ymaps.ready(init);


    function init() {


        var myMap = new ymaps.Map("map", {
            center: [55.567636, 37.487496],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        });
        ymaps.geolocation.get({
            provider: 'browser',
            mapStateAutoApply: true
        }).then(function (result) {
            var usermes = result.geoObjects['position'];
          ymaps.route([
              usermes,
            'Москва,п. Коммунарка, Липовый парк д.9'
        ]).then(function (route) {
            myMap.geoObjects.add(route);
            var points = route.getWayPoints(),
                lastPoint = points.getLength() - 1;
            // Задаем стиль метки - иконки будут красного цвета, и
            // их изображения будут растягиваться под контент.
            points.options.set('preset', 'islands#redStretchyIcon');
            points.get(0).properties.set('iconContent', 'Вы');
            points.get(lastPoint).properties.set('iconContent', 'Клиника Доктор Лазер');

        }, function (error) {
            alert('Возникла ошибка: ' + error.message);
        });
        });
    }

  var ss = $.cookie('cookie_checksite');
    if(ss == 'true') {
        $('body').css('display', 'block');
        $( "#hellopreloader" ).hide( "slow", function() {
        });
          }
    else {
        $('#hellopreloader').css('display', 'block');
        $.cookie('cookie_checksite', 'true');
        var hellopreloader = document.getElementById("hellopreloader_preload");function
        fadeOutnojquery(el){el.style.opacity = 1;var interhellopreloader = setInterval(function(){el.style.opacity = el.style.opacity - 0.05;if (el.style.opacity <=0.05){ clearInterval(interhellopreloader);hellopreloader.style.display = "none";}},16);}window.onload = function(){setTimeout(function(){fadeOutnojquery(hellopreloader);},1000);};
        $('body').css('display', 'block');
    }

});