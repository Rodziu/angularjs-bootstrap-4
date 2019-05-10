/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function bsDropdownToggleDirectiveController(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			require: '^bsDropdown',
			link: function(scope, element, attrs, dropdownCtrl){
				element.on('click', function(){
					dropdownCtrl.bsDropdown = !dropdownCtrl.bsDropdown;
					scope.$digest();
				});
			}
		};
	}

	/**
	 * @ngdoc directive
	 * @name bsDropdownToggle
	 */
	angular.module('angularBS.dropdown').directive('bsDropdownToggle', bsDropdownToggleDirectiveController);
}();
