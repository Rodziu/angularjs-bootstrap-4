/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsCarouselNav
	 * @param {string} bsCarouselNav
	 */
    angular.module('angularBS.carousel').directive('bsCarouselNav', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            require: '^bsCarousel',
            link: function(scope, element, attrs, ctrl) {
                element.on('click', function() {
                    ctrl.prevNextSlide(attrs['bsCarouselNav'] === 'right');
                    scope.$digest();
                });
            }
        };
    }]);
}());
