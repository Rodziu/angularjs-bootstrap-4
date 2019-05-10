/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function bsCarouselDirectiveController($scope, $element, $attrs, $interval, Carousel){
		let sliding = false,
			carouselInterval = null;
		const ctrl = this,
			changeSlide = function(nextSlide, direction){
				if(nextSlide !== ctrl.currentSlide && !sliding){
					sliding = true;
					if(angular.isUndefined(direction)){
						direction = nextSlide > ctrl.currentSlide ? 'left' : 'right';
					}
					const next = ctrl.slides[nextSlide],
						active = ctrl.slides[ctrl.currentSlide],
						transition = function(){
							active[0].removeEventListener('transitionend', transition);
							next.removeClass(
								'carousel-item-next carousel-item-prev carousel-item-' + direction)
								.addClass('active');
							active.removeClass('active carousel-item-' + direction);
							sliding = false;
						};
					next.addClass(direction === 'left' ? 'carousel-item-next' : 'carousel-item-prev');
					next[0].offsetWidth; // force reflow
					active.addClass('carousel-item-' + direction);
					next.addClass('carousel-item-' + direction);
					active[0].addEventListener('transitionend', transition);
					ctrl.currentSlide = nextSlide;
				}
			};
		/**
		 */
		ctrl.$onInit = function(){
			ctrl.slides = [];
			ctrl.currentSlide = -1;
			const interval = 'interval' in $attrs ? parseInt($attrs['interval']) : Carousel.interval,
				pause = 'pause' in $attrs ? $attrs['pause'] === 'hover' : Carousel.pause;
			if(interval){
				const cycle = () => {
					carouselInterval = $interval(() => {
						ctrl.prevNextSlide(true);
					}, interval);
				};
				if(pause){
					$element.on('mouseenter', () => {
						$interval.cancel(carouselInterval);
					});
					$element.on('mouseleave', cycle);
				}
				cycle();
			}
		};
		/**
		 */
		ctrl.$onChanges = function(){
			if(angular.isUndefined(ctrl.wrap)){
				ctrl.wrap = Carousel.wrap;
			}
			if(angular.isUndefined(ctrl.keyboard)){
				ctrl.keyboard = Carousel.keyboard;
			}
		};
		/**
		 * @param $element
		 */
		ctrl.register = function($element){
			ctrl.slides.push($element);
			if($element.hasClass('active')){
				if(~ctrl.currentSlide){
					ctrl.slides[ctrl.currentSlide].removeClass('active');
				}
				ctrl.currentSlide = ctrl.slides.length - 1;
			}else if(!~ctrl.currentSlide){
				$element.addClass('active');
				ctrl.currentSlide = ctrl.slides.length - 1;
			}
		};
		/**
		 * @param {number} index
		 * @param {string} direction
		 */
		ctrl.slideTo = function(index, direction){
			if(index < 0){
				index = ctrl.slides.length - 1;
			}else if(index >= ctrl.slides.length){
				index = 0;
			}
			changeSlide(index, direction);
		};
		/**
		 * @param {boolean} isNext
		 */
		ctrl.prevNextSlide = function(isNext){
			const nextIndex = isNext ? ctrl.currentSlide + 1 : ctrl.currentSlide - 1;
			if(
				(nextIndex >= ctrl.slides.length || nextIndex < 0)
				&& !ctrl.wrap
			){
				return;
			}
			ctrl.slideTo(nextIndex, isNext ? 'left' : 'right');
		};
		/**
		 * @param $element
		 */
		ctrl.unregister = function($element){
			ctrl.slides.splice(ctrl.slides.indexOf($element, 1));
		};
		/**
		 */
		ctrl.$onDestroy = function(){
			if(carouselInterval !== null){
				$interval.cancel(carouselInterval);
			}
		};
		$element.on('keydown', function(e){
			if(
				!ctrl.keyboard
				|| (e.which !== 37 && e.which !== 39)
				|| /input|textarea/i.test(e.target.tagName)
			){
				return;
			}
			if(e.which === 37){
				ctrl.prevNextSlide(false);
			}else{
				ctrl.prevNextSlide(true);
			}
			$scope.$digest();
			e.preventDefault();
		});
	}

	/**
	 * @ngdoc directive
	 * @name bsCarousel
	 *
	 * @param {number} interval
	 * @param {string|null} pause
	 * @param {expression|boolean} wrap
	 * @param {expression|boolean} keyboard
	 */
	angular.module('angularBS.carousel').directive('bsCarousel', [function(){
		return {
			restrict: 'A',
			bindToController: {
				wrap: '<?',
				keyboard: '<?'
			},
			controller: bsCarouselDirectiveController
		};
	}]);
}();
