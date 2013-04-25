/**
 * slidebox - Simple Zepto plugin which turns your checkboxes into iPhone like slideboxes
 * Modified by 25th floor
 *
 * Copyright(c) 2011 Michal Kuklis <michal.kuklis@gmail.com>
 * MIT Licensed
 *
 * @version 0.2
 * @author Michal Kuklis <michal.kuklis@gmail.com>
 * @author Thomas Subera <ts@25th-floor.com>
 * @author Jan Michael Auer <ja@25th-floor.com>
 *
 * @see zepto.js framework http://zeptojs.com
 */

(function ($) {

	$.fn.slidebox = function (options) {
		var TMPL = '<label class="slidebox"><span></span></label>';
		// default settings
		var settings = {
			change : function (el, onOff, key, value) { }, // change callback
			speed  : 0.2 // toggle speed
		};

		settings = $.extend(settings, options);

		// toggle element
		function toggle (check) {
			var label = $(this),
				checkbox = label.prev(),
				checked = typeof check == 'boolean' ? !check : checkbox.attr('checked');

			label.toggleClass('onoff', checked);

			if (checked) {
				checkbox.removeAttr('checked');
			} else {
				checkbox.attr('checked', true);
			}

			// execute callback in the context of the checkbox
			settings.change.call(checkbox, checkbox, !checked);
		}

		this.each(function (el) {
			var checkbox = $(this),
				box = $(TMPL);

			checkbox.after(box);
			box.on('click', toggle)
				.on('swipeLeft', function () { toggle.call(this, false); })
				.on('swipeRight', function () { toggle.call(this, true); });

			if (!checkbox.attr('checked')) {
				box.addClass('onoff');
			}
			checkbox.hide();
		});
	}

})(Zepto);

