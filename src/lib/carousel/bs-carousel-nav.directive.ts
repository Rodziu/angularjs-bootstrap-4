/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IDirective} from 'angular';

export function bsCarouselNavDirective(): IDirective {
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
}
