//Animate CSS + WayPoints javaScript Plugin
//Example: $(".element").animated("zoomInUp", "zoomOutDown");
(function ($) {
	$.fn.animated = function (inEffect, outEffect, opacity) {
		var jQueryObject = $(this);
		inEffect = 'animate__' + inEffect;
		outEffect = 'animate__' + outEffect;
		jQueryObject.css("opacity", "0").addClass("animate__animated");

		jQueryObject.waypoint(function (dir) {
			if (dir === "down") {
				jQueryObject.removeClass(outEffect).addClass(inEffect).css("opacity", "1");
			} else {
				if (opacity != 'hide') {

					jQueryObject.removeClass(inEffect).addClass(outEffect).css("opacity", "1");

				}

			};
		}, {
			offset: "80%"
		});

		jQueryObject.waypoint(function (dir) {
			if (dir === "down") {
				if (opacity != 'hide') {
					jQueryObject.removeClass(inEffect).addClass(outEffect).css("opacity", "1");
				}
			} else {
				jQueryObject.removeClass(outEffect).addClass(inEffect).css("opacity", "1");
			};
		}, {
			offset: -$(window).height()
		});
	};
})(jQuery);

