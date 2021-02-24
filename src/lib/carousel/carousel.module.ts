/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {CarouselProvider} from './carousel.provider';
import {bsCarouselIndicatorsComponent} from './bs-carousel-indicators.component';
import {bsCarouselItemDirective} from './bs-carousel-item.directive';
import {bsCarouselNavDirective} from './bs-carousel-nav.directive';
import {bsCarouselDirective} from './bs-carousel.directive';

const carouselModule = angular.module('angularBS.carousel', [])
    .provider('Carousel', CarouselProvider)
    .component('bsCarouselIndicators', bsCarouselIndicatorsComponent)
    .directive('bsCarouselItem', bsCarouselItemDirective)
    .directive('bsCarouselNav', bsCarouselNavDirective)
    .directive('bsCarousel', bsCarouselDirective);

export const angularBSCarousel = carouselModule.name;
