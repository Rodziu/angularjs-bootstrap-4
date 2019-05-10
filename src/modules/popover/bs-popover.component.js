/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function bsPopoverComponentController($scope, $element, $attrs, $timeout, Popover, angularBS){
		const ctrl = this;
		let delay, timeout = null;
		//
		ctrl.$onInit = function(){
			if(angular.isUndefined(ctrl.animation)){
				ctrl.animation = Popover.animation;
			}
			if(angular.isUndefined(ctrl.delay)){
				ctrl.delay = Popover.delay;
			}
			ctrl.placement = Popover.placement;
			ctrl.defaultTitle = Popover.title;
			ctrl.defaultContent = Popover.content;
		};
		//
		ctrl.$onChanges = function(changes){
			if(angular.isDefined(changes.delay)){
				delay = angular.isDefined(changes.delay.currentValue)
					? changes.delay.currentValue : Popover.delay;
			}
			if(
				angular.isDefined(changes.visible)
				&& changes.visible.previousValue !== changes.visible.currentValue
			){
				ctrl.visible = changes.visible.currentValue !== false;
				if(angular.isObject(delay)){
					delay = delay[ctrl.visible ? 'show' : 'hide'] || Popover.delay;
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
								'bs-popover-'
							);
						}else{ // static popover
							angularBS.setPlacementCSS($element.children(), 'bs-popover-', ctrl.placement);
							angularBS.adjustArrow($element.children(), ctrl.placement);
						}
						ctrl.fadeIn = ctrl.visible;
					}else if(ctrl.animation && !changes.visible.isFirstChange()){
						// properly display fade out animation
						ctrl.visible = true;
						ctrl.fadeIn = false;
						const transition = function(){
							ctrl.visible = false;
							$element.children()[0].removeEventListener('transitionend', transition);
							$scope.$digest();
						};
						$element.children()[0].addEventListener('transitionend', transition);
					}else{
						ctrl.fadeIn = false;
					}
				}, delay);
			}
		};
		//
		$attrs.$observe('placement', function(value){
			ctrl.placement = value;
		});
		// check if title & content are not empty
		const title = angular.element($element[0].querySelector('.popover-header')),
			content = angular.element($element[0].querySelector('.popover-body'));
		$scope.$watch(function(){
			return title.text().trim();
		}, function(nV){
			ctrl.titleVisible = nV !== '';
		});
		$scope.$watch(function(){
			return content.text().trim();
		}, function(nV){
			ctrl.contentVisible = nV !== '';
		});
	}

	/**
	 * @ngdoc component
	 * @name bsPopoverTitle
	 * @description contents of this element would be transcluded to .popover-title element
	 */
	/**
	 * @ngdoc component
	 * @name bsPopoverContent
	 * @description contents of this element would be transcluded to .popover-content element
	 */
	/**
	 * @ngdoc component
	 * @name bsPopover
	 *
	 * @param {expression|boolean} visible
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression} parentElement
	 * @param {expression} boundary
	 * @param {string} placement
	 */
	angular.module('angularBS.popover').component('bsPopover', {
		template: '<div class="popover" ' +
			'ng-class="{\'fade\': bsPpCtrl.animation, \'show\': bsPpCtrl.fadeIn}" ' +
			'style="display: {{bsPpCtrl.visible || bsPpCtrl.fadeIn ? \'block\' : \'none\'}}" ' +
			'ng-show="bsPpCtrl.visible || bsPpCtrl.fadeIn">' +
			'<div class="arrow"></div>' +
			'<div class="popover-header" ng-transclude="title" ng-show="bsPpCtrl.titleVisible">{{bsPpCtrl.defaultTitle}}</div>' +
			'<div class="popover-body" ng-transclude="content" ng-show="bsPpCtrl.contentVisible">{{bsPpCtrl.defaultContent}}</div>' +
			'</div>',
		controllerAs: 'bsPpCtrl',
		bindings: {
			visible: '<',
			animation: '<',
			delay: '<',
			parentElement: '<',
			boundary: '<'
		},
		transclude: {
			title: '?bsPopoverTitle',
			content: '?bsPopoverContent'
		},
		controller: bsPopoverComponentController
	});
}();
