//FORMS
function forms() {
	//FIELDS
	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			} else {
				this.value = $(this).attr('data-value');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				this.value = '';
			};
		});
		$(this).blur(function () {
			if (this.value == '') {
				if (!$(this).hasClass('l')) {
					this.value = $(this).attr('data-value');
				}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'text');
				};
			};
			if ($(this).hasClass('vn')) {
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});
}
forms();

//VALIDATE FORMS
$('form button[type=submit]').click(function () {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('.req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);

		if (ms != null && ms != '') {
			showMessageByClass(ms);
			return false;
		}
	} else {
		return false;
	}
});
function formValidate(input) {
	var er = 0;
	var form = input.parents('form');
	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr('type') == 'checkbox') {
		if (input.prop('checked') == true) {
			input.removeClass('err').parent().removeClass('err');
		} else {
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}
function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen('message.' + ms, '');
}
function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}
function addError(input) {
	input.addClass('err');
	input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.data('error');
		} else {
			error = input.data('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}
function addFormError(form, error_text) {
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}
function removeError(input) {
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form) {
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}

//SLIDERS
if ($('.slider-reviews').length > 0) {
	$('.slider-reviews').slick({
		//autoplay: true,
		//infinite: false,
		dots: false,
		arrows: true,
		accessibility: false,
		slidesToShow: 1,
		autoplaySpeed: 3000,
		adaptiveHeight: true,
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
}
//SLIDERS

//MENU BURGER
$('.wrapper').addClass('loaded');
$('.icon-menu__item').click(function (event) {
  $(this).toggleClass('active');
  $('.menu__body').toggleClass('active');
  $('body').toggleClass('lock');
});

//INTERACTIVE BACKGROUND
function ibg() {
  $.each($('.ibg'), function (index, val) {
    if ($(this).find('img').length > 0) {
      $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
    }
  });
}
ibg();

//SLIDERS
if ($('.slider__body').length > 0) {
  $('.slider__body').slick({
    dots: true,
    arrows: false,
    accessibility: false,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplaySpeed: 3000,
    nextArrow: '<button type="button" class="slick-next"></button>',
    prevArrow: '<button type="button" class="slick-prev"></button>',
    responsive: [{
      breakpoint: 768,
      settings: {}
    }]
  });
}

// Header
const headerElement = document.querySelector('.header');

const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove('_scroll');
  } else {
    headerElement.classList.add('_scroll');
  }
}

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);


function openCity(evt, cityName) {
  // Declare all variables
  var i,
    tabcontent,
    tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = $(".stress__content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = $(".stress__link").parent();
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";

}
document.getElementById("defaultStart").click();
function openBlock(evt, cityName) {
  // Declare all variables
  var i,
    tabcontent,
    tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = $(".line-text, .press__quote p");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = $(".press__item");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  // document.getElementById(cityName).style.display = "block";
  let itemsT = document.querySelectorAll(`.${cityName}`)
  itemsT.forEach(item => {
    item.style.display = "block";
  });
  evt.currentTarget.className += " active";

}

document.getElementById("defaultItem").click();


// $('.fullscreen-bg__brands div').animated("fadeInUp", "fadeOutUp");
$('.footer__left').animated("fadeInLeft", "fadeOutLeft");
$('.block-first__body').animated("fadeInLeft", "fadeOutLeft");
$('.footer__right').animated("fadeInRight", "fadeOutRight");
$('.block-second__body').animated("fadeInRight", "fadeOutRight");
$('.cdb__column:nth-child(1)').animated("fadeInLeft", "fadeOutLeft", 'hide');
$('.cdb__column:nth-child(2)').animated("fadeInRight", "fadeOutRight", 'hide');


