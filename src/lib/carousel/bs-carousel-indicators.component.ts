/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IComponentOptions} from 'angular';

export const bsCarouselIndicatorsComponent: IComponentOptions = {
    template: '<ol class="carousel-indicators">'
        + '<li ng-repeat="s in ctrl.carousel.slides" ng-click="ctrl.carousel.slideTo($index)" '
        + 'ng-class="{active: $index === ctrl.carousel.currentSlide}"></li>'
        + '</ol>',
    require: {
        carousel: '^bsCarousel'
    },
    controllerAs: 'ctrl'
};
