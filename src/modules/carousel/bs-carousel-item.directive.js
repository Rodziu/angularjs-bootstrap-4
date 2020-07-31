/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsCarouselItem
	 */
    angular.module('angularBS.carousel').directive('bsCarouselItem', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            require: '^bsCarousel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.register(element);
            },
            controller: ['$element', function($element) {
                const ctrl = this;
                ctrl.$onInit = function() {
                    $element.addClass('carousel-item');
                };
            }]
        };
    }]);
}());
