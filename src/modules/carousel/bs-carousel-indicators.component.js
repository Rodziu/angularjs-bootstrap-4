/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';
	/**
	 * @ngdoc component
	 * @name bsCarouselIndicators
	 */
	angular.module('angularBS.carousel').component('bsCarouselIndicators', {
		template: '<ol class="carousel-indicators">' +
			'<li ng-repeat="s in ctrl.carousel.slides" ng-click="ctrl.carousel.slideTo($index)" ' +
			'ng-class="{active: $index === ctrl.carousel.currentSlide}"></li>' +
			'</ol>',
		require: {
			carousel: '^bsCarousel'
		},
		controllerAs: 'ctrl'
	});
}();
