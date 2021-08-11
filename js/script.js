

//MENU BURGER
$('.wrapper').addClass('loaded');
$('.icon-menu').click(function (event) {
	$(this).toggleClass('active');
	$('.menu__body').toggleClass('active');
	$('body').toggleClass('lock');
});

//TICKETS
$('.way-booking__item_1').click(function () {
	$('.form-booking__row_last').removeClass("active")
});
$('.way-booking__item_2').click(function () {
	$('.form-booking__row_last').addClass("active")
});



$('form#form').submit(function (e) {
	e.preventDefault();// keep page from realoding

	var form = $(this),
		url = form.attr('action'),
		type = form.attr('method'),
		data = {};

	$.ajax({
		url: url,
		type: type,
		data: form.serialize(),
		success: function (response) {
			$('.tickets__container .tickets__items').html(response);
			$(".item-tickets").hover(function () {
				$(this).toggleClass("active");
			});
		}
	});
});


//DATEPICKER
var from = $("#fromDate").datepicker(
	{
		dateFormat: "yy-mm-dd",
		changeMonth: true,
		minDate: 0
	}
)
	.on("change", function () {
		to.datepicker("option", "minDate", getDate(this));
		to.datepicker("setDate", getDate(this))
	}
	),

	to = $("#toDate").datepicker(
		{
			dateFormat: "yy-mm-dd",
			changeMonth: true
		}
	)
		.on("change", function () {
			from.datepicker("option", "maxDate", getDate(this));
		}
		);

function getDate(element) {
	var date;
	var dateFormat = "yy-mm-dd";
	try {
		date = $.datepicker.parseDate(dateFormat, element.value);
	} catch (e) {
		date = null;
	}
	return date;
}

function openCity(evt, cityName) {
	// Declare all variables
	var i,
		tabcontent,
		tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = $(".booking__block");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = $(".tabs-booking__item");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";

}
document.getElementById("defaultOpen").click();

