/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IAttributes, IDirective, IIntervalService, IScope} from 'angular';
import {ICarouselOptions} from './carousel.provider';
import * as angular from 'angular';

type direction = 'left' | 'right';

/**
 * @ngInject
 */
class BsCarouselDirectiveController {
    private $scope: IScope;
    private $element: JQLite;
    private readonly $attrs: IAttributes;
    private readonly $interval: IIntervalService;
    private Carousel: ICarouselOptions;
    private carouselInterval = null;
    private slides = [];
    private currentSlide = -1;
    private sliding = false;
    private wrap: boolean;
    private keyboard: boolean;

    constructor(
        $scope: IScope, $element: JQLite, $attrs: IAttributes, $interval: IIntervalService,
        Carousel: ICarouselOptions
    ) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$interval = $interval;
        this.Carousel = Carousel;

        this.$element.on('keydown', (e) => {
            if (
                !this.keyboard
                || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                || /input|textarea/i.test(e.target.tagName)
            ) {
                return;
            }
            if (e.key === 'ArrowLeft') {
                this.prevNextSlide(false);
            } else {
                this.prevNextSlide(true);
            }
            $scope.$digest();
            e.preventDefault();
        });
    }

    $onInit(): void {
        const interval = 'interval' in this.$attrs ? parseInt(this.$attrs['interval']) : this.Carousel.interval,
            pause = 'pause' in this.$attrs ? this.$attrs['pause'] === 'hover' : this.Carousel.pause;
        if (interval) {
            const cycle = () => {
                this.carouselInterval = this.$interval(() => {
                    this.prevNextSlide(true);
                }, interval);
            };
            if (pause) {
                this.$element.on('mouseenter', () => {
                    this.$interval.cancel(this.carouselInterval);
                });
                this.$element.on('mouseleave', cycle);
            }
            cycle();
        }
    }

    $onChanges(): void {
        if (angular.isUndefined(this.wrap)) {
            this.wrap = this.Carousel.wrap;
        }
        if (angular.isUndefined(this.keyboard)) {
            this.keyboard = this.Carousel.keyboard;
        }
    }

    $onDestroy() {
        if (this.carouselInterval !== null) {
            this.$interval.cancel(this.carouselInterval);
        }
    }

    register($element: JQLite): void {
        this.slides.push($element);
        if ($element.hasClass('active')) {
            if (~this.currentSlide) {
                this.slides[this.currentSlide].removeClass('active');
            }
            this.currentSlide = this.slides.length - 1;
        } else if (!~this.currentSlide) {
            $element.addClass('active');
            this.currentSlide = this.slides.length - 1;
        }
    }

    unregister($element: JQLite): void {
        this.slides.splice(this.slides.indexOf($element, 1));
    }

    prevNextSlide(isNext: boolean): void {
        const nextIndex = isNext ? this.currentSlide + 1 : this.currentSlide - 1;
        if (
            (nextIndex >= this.slides.length || nextIndex < 0)
            && !this.wrap
        ) {
            return;
        }
        this.slideTo(nextIndex, isNext ? 'left' : 'right');
    }

    slideTo(index: number, direction: direction): void {
        if (index < 0) {
            index = this.slides.length - 1;
        } else if (index >= this.slides.length) {
            index = 0;
        }
        this.changeSlide(index, direction);
    }

    private changeSlide(nextSlide: number, direction?: direction) {
        if (nextSlide !== this.currentSlide && !this.sliding) {
            this.sliding = true;
            if (angular.isUndefined(direction)) {
                direction = nextSlide > this.currentSlide ? 'left' : 'right';
            }
            const next = this.slides[nextSlide],
                active = this.slides[this.currentSlide],
                transition = () => {
                    active[0].removeEventListener('transitionend', transition);
                    next.removeClass(
                        'carousel-item-next carousel-item-prev carousel-item-' + direction)
                        .addClass('active');
                    active.removeClass('active carousel-item-' + direction);
                    this.sliding = false;
                };
            next.addClass(direction === 'left' ? 'carousel-item-next' : 'carousel-item-prev');
            next[0].offsetWidth; // force reflow
            active.addClass('carousel-item-' + direction);
            next.addClass('carousel-item-' + direction);
            active[0].addEventListener('transitionend', transition);
            this.currentSlide = nextSlide;
        }
    }
}

export function bsCarouselDirective(): IDirective {
    /**
     * @ngdoc directive
     * @name bsCarousel
     *
     * @param interval
     * @param pause
     * @param {expression|boolean} wrap
     * @param {expression|boolean} keyboard
     */
    return {
        restrict: 'A',
        bindToController: {
            wrap: '<?',
            keyboard: '<?'
        },
        controller: BsCarouselDirectiveController
    };
}
