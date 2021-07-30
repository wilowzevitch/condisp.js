/**
 * condis.js
 * Author: Tisserand david
 * version : 1.0
 * Need JQuery
 */


$(function(){

	var Condisp = Condisp || {};

	Condisp.init = function() {
		$('.condisp').each(function(){
			var tag = $(this).prop('tagName');
			var group = $(this).data('group');
			if ( tag == 'INPUT') {
				if ($(this).attr('type') == 'radio') {
					if ($(this).prop('checked')) {
						var show = $(this).data('show');
						displayParts(show, group);
					}
				} else if ($(this).attr('type') == 'checkbox') {
					var show = $(this).prop('checked') ? $(this).data('show') : "";
					displayParts(show, group);
				}
			} else if (tag == 'SELECT') {
				var show = $(this).find('option:selected').data('show');
				displayParts(show, group);
			}
		});
		$(document).on('change', '.condisp', function(){
			var tag = $(this).prop('tagName');
			var group = $(this).data('group');
			if (tag == 'INPUT') {
				var name = $(this).attr('name');
				var show = $('input[name='+name+']:checked').data('show');
			} else if (tag == 'SELECT') {
				var show = $(this).find('option:selected').data('show');
			}
			displayParts(show, group);
		});
		$(document).on('click', '.btn-condisp', function() {
			if ($(this).data('toggle') != undefined) {
				toggleParts($(this).data('toggle'), $(this).data('group'));
			} else if ($(this).data('show') != undefined) {
				displayParts($(this).data('show'), $(this).data('group'));
			}
		});

		function displayParts (show, group) {
			var elements = show ? show.split('&') : [];
			if (group != undefined) {
				var list = $('[data-group='+group+'][data-condisp]').map(function(idx, elem) {
					return $(elem).data('condisp') ;
				}).get();
				for (var j = 0; j < list.length; j++) {
					if (elements.indexOf(list[j]) < 0)
						$('[data-group='+group+'][data-condisp='+list[j]+']').slideUp('fast');
					else 
						$('[data-group='+group+'][data-condisp='+list[j]+']').slideDown('fast');
				}			
			} else {
				var list = $('[data-condisp]').map(function(idx, elem) {
					return $(elem).data('condisp');
				}).get();
				for (var j = 0; j < list.length; j++) {
					if (elements.indexOf(list[j]) < 0)
						$('[data-condisp='+list[j]+']').slideUp('fast');
					else
						$('[data-condisp='+list[j]+']').slideDown('fast');
				}
			}
		}
		function toggleParts (toggle, group) {
			var elements = toggle ? toggle.split('&') : [];
			if (group != undefined) {
				for (var j = 0; j < elements.length; j++) {
					if ($('[data-group='+group+'][data-condisp='+elements[j]+']').is(':visible')) {
						$('[data-group='+group+'][data-condisp='+elements[j]+']').slideUp('fast');
					} else {
						$('[data-group='+group+'][data-condisp='+elements[j]+']').slideDown('fast');
					}
				}
			} else {
				for (var j = 0; j < elements.length; j++) {
					if ($('[data-condisp='+elements[j]+']').is(':visible')) {
						$('[data-condisp='+elements[j]+']').slideUp('fast');
					} else {
						$('[data-condisp='+elements[j]+']').slideDown('fast');
					}
				}
			}
		}
	}

	Condisp.init();
});
