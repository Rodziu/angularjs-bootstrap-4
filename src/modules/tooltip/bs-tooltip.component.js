/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function bsTooltipComponentController($scope, $element, $attrs, $timeout, Tooltip, angularBS){
		const ctrl = this;
		let delay, timeout = null;
		//
		ctrl.$onInit = function(){
			if(angular.isUndefined(ctrl.animation)){
				ctrl.animation = Tooltip.animation;
			}
			if(angular.isUndefined(ctrl.delay)){
				ctrl.delay = Tooltip.delay;
			}
			ctrl.placement = Tooltip.placement;
			ctrl.defaultTitle = Tooltip.title;
			$element.children().css({top: 0});
		};
		//
		ctrl.$onChanges = function(changes){
			if(angular.isDefined(changes.delay)){
				delay = angular.isDefined(changes.delay.currentValue)
					? changes.delay.currentValue : Tooltip.delay;
			}
			if(
				angular.isDefined(changes.visible)
				&& changes.visible.previousValue !== changes.visible.currentValue
			){
				ctrl.visible = changes.visible.currentValue !== false;
				if(angular.isObject(delay)){
					delay = delay[ctrl.visible ? 'show' : 'hide'] || Tooltip.delay;
				}
				if(timeout !== null){
					$timeout.cancel(timeout);
				}
				timeout = $timeout(function(){
					timeout = null;
					if(ctrl.visible){
						if(ctrl.parentElement){
							angularBS.positionElement(
								$element.children(), ctrl.parentElement, ctrl.placement,
								ctrl.boundary !== null ? ctrl.boundary : undefined,
								'bs-tooltip-'
							);
						}else{ // static tooltip
							angularBS.setPlacementCSS($element.children(), 'bs-tooltip-', ctrl.placement);
							angularBS.adjustArrow($element.children(), ctrl.placement);
						}
						ctrl.fadeIn = ctrl.visible;
					}else{
						// properly display fade out animation
						ctrl.visible = true;
						ctrl.fadeIn = false;
						const transition = function(){
							ctrl.visible = false;
							$element.children()[0].removeEventListener('transitionend', transition);
							$scope.$digest();
						};
						$element.children()[0].addEventListener('transitionend', transition);
					}
				}, delay);
			}
		};
		//
		$attrs.$observe('placement', function(value){
			ctrl.placement = value;
		});
		// check if title is not empty
		const title = angular.element($element[0].querySelector('.tooltip-inner'));
		$scope.$watch(function(){
			return title.text().trim();
		}, function(nV){
			ctrl.titleVisible = nV !== '';
		});
	}

	/**
	 * @ngdoc component
	 * @name bsTooltip
	 *
	 * @param {expression|boolean} visible
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression} parentElement
	 * @param {expression} boundary
	 * @param {string} placement
	 */
	angular.module('angularBS.tooltip').component('bsTooltip', {
		template: '<div class="tooltip" ' +
			'ng-class="{\'fade\': bsTpCtrl.animation, \'show\': bsTpCtrl.fadeIn}" ' +
			'ng-show="bsTpCtrl.visible || bsTpCtrl.fadeIn">' +
			'<div class="arrow" ng-show="bsTpCtrl.titleVisible"></div>' +
			'<div class="tooltip-inner" ng-transclude ng-show="bsTpCtrl.titleVisible">{{bsTpCtrl.defaultTitle}}</div>' +
			'</div>',
		controllerAs: 'bsTpCtrl',
		bindings: {
			visible: '<',
			animation: '<',
			delay: '<',
			parentElement: '<',
			boundary: '<'
		},
		transclude: true,
		controller: bsTooltipComponentController
	});
}();
