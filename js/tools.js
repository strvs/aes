$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curForm = curField.parents().filter('form');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        var curNameArray = curName.split('.');
        var curExt = curNameArray[curNameArray.length - 1];
        curNameArray.pop();
        var curNameText = curNameArray.join('.');
        if (curNameText.length > 10) {
            curNameText = curNameText.substring(0, 10) + '...' + curNameText.slice(-1);
        }
        curField.find('.form-file-name-text').html(curNameText + '.' + curExt);
        curForm.find('.form-files').append(curForm.data('filesCode'));
    });

    $('body').on('click', '.form-file-name-remove', function() {
        var curField = $(this).parents().filter('.form-file');
        curField.remove();
    });

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close, .window-thanks-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.top-region-link a', function(e) {
        $('.top-region').removeClass('open-confirm');
        $('.top-region').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.top-region').length == 0 && $(e.target).parents().filter('.mobile-menu-region').length == 0) {
            $('.top-region').removeClass('open');
        }
    });

    $('body').on('click', '.top-region-confirm-cancel a', function(e) {
        $('.top-region').addClass('open').removeClass('open-confirm');
        e.preventDefault();
    });

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    $('body').on('click', '.top-search-link', function(e) {
        $('html').addClass('search-open');
        e.preventDefault();
    });

    $('body').on('click', '.top-search-window-close a', function(e) {
        $('html').removeClass('search-open');
        e.preventDefault();
    });

    $('.mobile-menu-search a').click(function(e) {
        $('html').removeClass('menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.top-search-link a').trigger('click');
        e.preventDefault();
    });

    $('.header-menu-link a, .footer-menu-link a').click(function(e) {
        var curWidth = $(window).width();
        if (curWidth < 360) {
            curWidth = 360;
        }
        $('html').addClass('menu-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        e.preventDefault();
    });

    $('.menu-close, .mobile-menu-close').click(function(e) {
        $('html').removeClass('menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        e.preventDefault();
    });

    $('.mobile-menu-region a').click(function(e) {
        $('html').removeClass('menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.top-region-link a').trigger('click');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('menu')) {
            $('html').removeClass('menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
        }
    });

    $('.menu-header a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.menu-header li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.menu-header li').index(curLi);
            $('.menu-tab.active').removeClass('active');
            $('.menu-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('[data-fancybox]').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE       : 'Закрыть',
                NEXT        : 'Вперед',
                PREV        : 'Назад'
            }
        }
    });

    $('.content-side ul li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.addClass('with-submenu');
            curLi.append('<div class="content-side-submenu-icon"></div>');
        }
    });

    $('.mobile-menu-content ul li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.addClass('with-submenu');
            curLi.append('<div class="content-side-submenu-icon"></div>');
        }
    });

    $('body').on('click', '.content-side-submenu-icon', function(e) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.news-filter-select-current', function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.news-filter-select.open').removeClass('open');
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.news-filter-select').length == 0) {
            $('.news-filter-select.open').removeClass('open');
        }
    });

    $('body').on('change', '.news-filter-select-list input', function(e) {
        var curSelect = $(this).parents().filter('.news-filter-select');
        curSelect.find('.news-filter-select-current').html($(this).parent().find('span').html());
        curSelect.parents().filter('form').trigger('submit');
    });

    $('body').on('change', '.news-filter-item-date input', function(e) {
        $(this).parents().filter('form').trigger('submit');
    });

    $('.news-filter-reset a').click(function(e) {
        $(this).parents().filter('form').find('input[type="hidden"]').val('');
        $(this).parents().filter('form').find('input[type="text"]').val('');
        $(this).parents().filter('form').find('input[type="radio"]').prop('checked', false);
        $(this).parents().filter('form').trigger('submit');
        e.preventDefault();
    });

    $('body').on('click', '.main-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-menu ul li').index(curLi);
            $('.main-tab.active').removeClass('active');
            $('.main-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
    });

    $('.side-page-link').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
        }
        e.preventDefault();
    });

    $('body').on('click', '.faq-item-title a', function(e) {
        $(this).parent().parent().toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.contacts-offices-item-map a', function(e) {
        var coords = pointers[Number($(this).attr('data-id'))].coords;
        myMap.setCenter(coords);
        $('html, body').animate({'scrollTop': $('.contacts-map').offset().top});
        e.preventDefault();
    });

    $('body').on('click', '.news-detail-share-link a', function(e) {
        $('.news-detail-share').toggleClass('open');
        e.preventDefault();
    });

    $(document).on('click', function(e) {
        if ($(e.target).parents().filter('.news-detail-share').length == 0) {
            $('.news-detail-share').removeClass('open');
        }
    });

    $('body').on('click', '.main-contacts-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-contacts-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-contacts-menu ul li').index(curLi);
            var coords = pointers[curIndex].coords;
            myMap.setCenter(coords);
            $('.main-contacts-info-item.active').removeClass('active');
            $('.main-contacts-info-item').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-map-center-region').click(function() {
        var curID = $(this).attr('data-region');
        $('.main-map-center-window').removeClass('visible');
        $('.main-map-center-window[data-region="' + curID + '"]').addClass('visible');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.main-map-center-region').length == 0 && !$(e.target).hasClass('main-map-center-region') && $(e.target).parents().filter('.main-map-center-window').length == 0) {
            $('.main-map-center-window').removeClass('visible');
        }
    });

    $('.main-map-center-window-close').click(function(e) {
        $('.main-map-center-window').removeClass('visible');
        e.preventDefault();
    });

    $('body').on('click', '.news-detail-gallery > a', function(e) {
        $(this).parents().filter('.news-detail-gallery').find('.news-detail-gallery-list a').eq(0).trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.media-photo-gallery', function(e) {
        $('.news-detail-gallery-list a').eq(0).trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.window-cabinet-region ul li', function(e) {
        var curLi = $(this);
        if (!curLi.hasClass('active')) {
            $('.window-cabinet-region ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.window-cabinet-status').show();
            $('.window-cabinet-btn').hide();
            $('.window-cabinet-type .form-radio input').prop('checked', false);
            $('.window-cabinet-type .form-radio').each(function() {
                var curType = $(this);
                var curValue = curType.find('input').val();
                if (curLi.attr('data-' + curValue) != '') {
                    curType.show();
                } else {
                    curType.hide();
                }
            });
        }
    });

    $('body').on('change', '.window-cabinet-type .form-radio input', function(e) {
        var curValue = $(this).val();
        var curURL = $('.window-cabinet-region ul li.active').attr('data-' + curValue);
        $('.window-cabinet-btn').show();
        $('.window-cabinet-btn a').attr('href', curURL);
    });

});

$.fn.datepicker.language['ru'] =  {
    days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
    daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsShort: ['янв.','фев.','мар.','апр.','мая','июн.','июл.','авг.','сен.','окт.','ноя.','дек.'],
    today: 'Сегодня',
    clear: 'Очистить',
    dateFormat: 'd M yyyy',
    timeFormat: 'hh:ii',
    firstDay: 1
};

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input-date-range-input').attr('autocomplete', 'off');

    curForm.find('.form-input-date-range-input').each(function() {
        var startDateText = $(this).parent().find('.form-input-date-range-start').val();
        var startDate = null;
        if (startDateText != '') {
            var startDateArray = startDateText.split('.');
            startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1, Number(startDateArray[0]));
        }

        var endDateText = $(this).parent().find('.form-input-date-range-end').val();
        var endDate = null;
        if (endDateText != '') {
            var endDateArray = endDateText.split('.');
            endDate = new Date(Number(endDateArray[2]), Number(endDateArray[1]) - 1, Number(endDateArray[0]));
        }

        $(this).datepicker({
            language: 'ru',
            range: true,
            multipleDatesSeparator: ' - ',
            onSelect: function(formattedDate, date, inst) {
                if (date.length == 2) {
                    var curBlock = $(inst.el).parent();
                    curBlock.find('.form-input-date-range-start').val(date[0].getDate() + '.' + (date[0].getMonth() + 1) + '.' + date[0].getFullYear());
                    curBlock.find('.form-input-date-range-end').val(date[1].getDate() + '.' + (date[1].getMonth() + 1) + '.' + date[1].getFullYear());
                    $(inst.el).trigger('change');
                }
            }
        });
        $(this).data('datepicker').selectDate([startDate, endDate]);
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                var formData = new FormData(form);

                windowOpen($(form).attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length > 0) {
        windowClose();
    }

    var curPadding = $('.wrapper').width();
    var curWidth = $(window).width();
    if (curWidth < 360) {
        curWidth = 360;
    }
    var curScroll = $(window).scrollTop();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});
    $('body').append('<div class="window"><div class="window-loading"></div></div>')
    $('.wrapper').css({'top': -curScroll});
    $('.wrapper').data('curScroll', curScroll);
    $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

    if (window.scrollifyInitialized) {
        $.scrollify.disable();
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        $('.window').append('<div class="window-container window-container-preload"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        windowPosition();

        $('.window-container-preload').removeClass('window-container-preload');

        $('.window form').each(function() {
            initForm($(this));
        });

        $('.window-cabinet-region ul li.active', function(e) {
            var curLi = $(this);
            $('.window-cabinet-status').show();
            $('.window-cabinet-btn').hide();
            $('.window-cabinet-type .form-radio input').prop('checked', false);
            $('.window-cabinet-type .form-radio').each(function() {
                var curType = $(this);
                var curValue = curType.find('input').val();
                if (curLi.attr('data-' + curValue) != '') {
                    curType.show();
                } else {
                    curType.hide();
                }
            });
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 144) {
            $('.window-container').css({'top': '77px', 'margin-top': 0, 'padding-bottom': '77px'});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $('meta[name="viewport"]').attr('content', 'width=device-width');
    }
}

$(window).on('load resize', function() {
    if ($(window).width() > 1199) {
        $('.main-filials, .main-tab .galleries, .main-contacts-menu ul, .content-menu ul').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });
    } else {
        $('.main-filials, .main-tab .galleries').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    adaptiveHeight: true,
                    dots: false
                });
            }
        });

        $('.main-contacts-menu ul, .content-menu ul').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    adaptiveHeight: true,
                    variableWidth: true,
                    dots: false
                });
            }
        });
    }
});

function createContactsMap() {
    for (var i = 0; i < pointers.length; i++) {
        var curPoint = pointers[i];
        if (curPoint.main) {
            var myPlacemark = new ymaps.Placemark(curPoint.coords, {}, {
                iconLayout: 'default#image',
                iconImageHref: iconMain,
                iconImageSize: [72, 82],
                iconImageOffset: [-36, -82]
            });
        } else {
            var myPlacemark = new ymaps.Placemark(curPoint.coords, {}, {
                iconLayout: 'default#image',
                iconImageHref: iconOffice,
                iconImageSize: [46, 54],
                iconImageOffset: [-23, -54]
            });
        }
        myMap.geoObjects.add(myPlacemark);
        if (curPoint.main) {
            myMap.setCenter(curPoint.coords);
        }
        var newHTML =   '<div class="contacts-offices-item"><div class="contacts-offices-item-inner">' +
                            '<div class="contacts-offices-item-title">' + curPoint.title + '</div>' +
                            '<div class="contacts-offices-item-address">' + curPoint.address + '</div>' +
                            '<div class="contacts-offices-item-contacts">';
        if (curPoint.phones_f != '') {
            newHTML +=          '<div class="contacts-offices-item-phone">Физ. лицам: <span>' + curPoint.phones_f + '</span></div>';
        }
        if (curPoint.phones_y != '') {
            newHTML +=          '<div class="contacts-offices-item-phone">Юр. лицам: <span>' + curPoint.phones_y + '</span></div>';
        }
        if (curPoint.schedule != '') {
            newHTML +=          '<div class="contacts-offices-item-schedule">' + curPoint.schedule + '</div>';
        }
        newHTML +=          '</div>' +
                            '<div class="contacts-offices-item-map"><a href="#" data-id="' + i + '">Показать на карте</a></div>' +
                        '</div></div>';
        $('.contacts-offices-inner').append(newHTML);
    }
}

function createMainContactsMap() {
    var activeIndex = $('.main-contacts-menu li').index($('.main-contacts-menu li.active'));

    for (var i = 0; i < pointers.length; i++) {
        var curPoint = pointers[i];
        var myPlacemark = new ymaps.Placemark(curPoint.coords, {
                hintContent: curPoint.title,
                balloonLink: i
            }, {
            iconLayout: 'default#image',
            iconImageHref: iconMain,
            iconImageSize: [72, 82],
            iconImageOffset: [-36, -82]
        });
        myPlacemark.events.add('click', function(e) {
            var curPlacemark = e.get('target');
            var curIndex = curPlacemark.properties.get('balloonLink');
            $('.main-contacts-info-item.active').removeClass('active');
            $('.main-contacts-info-item').eq(curIndex).addClass('active');
            if ($(window).scrollTop() > $('.main-contacts-map').offset().top) {
                $('html, body').animate({'scrollTop': $('.main-contacts-map').offset().top});
            }
        });
        myMap.geoObjects.add(myPlacemark);
        var activeClass = '';
        if (i == activeIndex) {
            myMap.setCenter(curPoint.coords);
            activeClass = ' active';
        }
        var newHTML =   '<div class="main-contacts-info-item' + activeClass + '">' +
                            '<div class="main-contacts-info-photo"><img src="' + curPoint.photo + '" alt="" /></div>' +
                            '<div class="main-contacts-info-title">' + curPoint.title + '</div>' +
                            '<div class="main-contacts-info-address">' + curPoint.address + '</div>' +
                            '<div class="main-contacts-info-phone">' + curPoint.phone + '</div>' +
                            '<div class="main-contacts-info-email">' + curPoint.email + '</div>' +
                            '<div class="main-contacts-info-link"><a href="' + curPoint.link + '">Подробные контакты</a></div>' +
                        '</div>';
        $('.main-contacts-info').append(newHTML);
    }

}

function createRegionContactsMap() {
    var curLength = pointers.length;
    for (var i = 0; i < curLength; i++) {
        var curPoint = pointers[i];
        if (curPoint.main) {
            var myPlacemark = new ymaps.Placemark(curPoint.coords, {
                hintContent: curPoint.title,
                balloonLink: i
            }, {
                iconLayout: 'default#image',
                iconImageHref: iconMain,
                iconImageSize: [72, 82],
                iconImageOffset: [-36, -82]
            });
        } else {
            var myPlacemark = new ymaps.Placemark(curPoint.coords, {
                hintContent: curPoint.title,
                balloonLink: i
            }, {
                iconLayout: 'default#image',
                iconImageHref: iconOffice,
                iconImageSize: [46, 54],
                iconImageOffset: [-23, -54]
            });
        }
        myPlacemark.events.add('click', function(e) {
            var curPlacemark = e.get('target');
            var curIndex = curPlacemark.properties.get('balloonLink');
            $('.main-contacts-info-item.active').removeClass('active');
            $('.main-contacts-info-item').eq(curIndex).addClass('active');
            if ($(window).scrollTop() > $('.main-contacts-map').offset().top) {
                $('html, body').animate({'scrollTop': $('.main-contacts-map').offset().top});
            }
        });
        myMap.geoObjects.add(myPlacemark);
        var activeClass = '';
        if (curPoint.main) {
            myMap.setCenter(curPoint.coords);
            activeClass = ' active';
        }
        var newHTML =   '<div class="main-contacts-info-item' + activeClass + '">' +
                            '<div class="main-contacts-info-photo"><img src="' + curPoint.photo + '" alt="" /><span>' + (i + 1) + '/' + curLength + '</span></div>' +
                            '<div class="main-contacts-info-title">' + curPoint.title + '</div>' +
                            '<div class="main-contacts-info-address">' + curPoint.address + '</div>' +
                            '<div class="main-contacts-info-phone">' + curPoint.phone + '</div>' +
                            '<div class="main-contacts-info-email">' + curPoint.email + '</div>' +
                            '<div class="main-contacts-info-link"><a href="' + curPoint.link + '">Подробные контакты</a></div>' +
                        '</div>';
        $('.main-contacts-info').append(newHTML);
    }

    $('.main-region-info-map-point').each(function() {
        $(this).css({'animation-delay': Math.floor(Math.random() * 5000) + 'ms'});
    });
}

$(window).on('load resize scroll', function() {
    var curScroll = $(window).scrollTop();
    var curHeight = $(window).height();

    $('.tsifrovizatsiya-block-photo').each(function() {
        var curItem = $(this);
        if (curItem.offset().top < curScroll + curHeight) {
            curItem.addClass('animated');
        }
    });
});