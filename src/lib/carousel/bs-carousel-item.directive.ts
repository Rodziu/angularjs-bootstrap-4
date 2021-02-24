/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IDirective} from 'angular';

/**
 * @ngInject
 */
class BsCarouselItemDirectiveController {
    private $element: JQLite;

    constructor($element: JQLite) {
        this.$element = $element;
    }

    $onInit() {
        this.$element.addClass('carousel-item');
    }
}

export function bsCarouselItemDirective(): IDirective {
    return {
        restrict: 'A',
        require: '^bsCarousel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.register(element);
        },
        controller: BsCarouselItemDirectiveController
    };
}
