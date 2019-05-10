/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name bsTooltipBoundary
	 */
	angular.module('angularBS.tooltip').directive('bsTooltipBoundary', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			controller: ['$element', function($element){
				this.$element = $element;
			}]
		};
	}]);
}();
