/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	/**
	 * @ngInject
	 */
	function bsToastComponentController($scope, $element, $transclude, $compile, Toasts){
		const ctrl = this;
		// transclude
		$transclude(function(elements, scope){
			let header, body;
			for(let i = 0; i < elements.length; i++){
				if(elements[i].tagName === 'BS-TOAST-HEADER'){
					header = elements[i];
				}else if(elements[i].tagName === 'BS-TOAST-BODY'){
					body = elements[i];
				}
			}
			if(header){
				header = angular.element(header);
				header.addClass('toast-header');
				$element.children().append($compile(header)(scope))
			}
			if(body){
				body = angular.element(body);
				body.addClass('toast-body d-block');
				$element.children().append($compile(body)(scope))
			}
		});
		//
		ctrl.$onInit = function(){
			if(angular.isUndefined(ctrl.animation)){
				ctrl.animation = Toasts.animation;
			}
			if(angular.isUndefined(ctrl.autohide)){
				ctrl.autohide = Toasts.autohide;
			}
			if(angular.isUndefined(ctrl.delay)){
				ctrl.delay = Toasts.delay;
			}
		};
		//

		ctrl.$onChanges = function(changes){
			if(
				angular.isDefined(changes.visible)
				&& changes.visible.previousValue !== changes.visible.currentValue
			){
				ctrl.visible = !!changes.visible.currentValue;
				if(ctrl.animation && !ctrl.visible && !changes.visible.isFirstChange()){
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
					ctrl.fadeIn = ctrl.visible;
				}
			}
		};
	}

	/**
	 * @ngdoc component
	 * @name bsToastHeader
	 * @description contents of this element would be transcluded to .toast-header element
	 */
	/**
	 * @ngdoc component
	 * @name bsToastBody
	 * @description contents of this element would be transcluded to .toast-body element
	 */
	/**
	 * @ngdoc component
	 * @name bsToast
	 *
	 * @param {expression|boolean} visible
	 * @param {expression|boolean} animation
	 */
	angular.module('angularBS.toasts').component('bsToast', {
		template: '<div class="toast" ' +
			'ng-class="{\'fade\': vm.animation, \'show\': vm.fadeIn}" ' +
			'style="display: {{vm.visible || vm.fadeIn ? \'block\' : \'none\'}}">' +
			'</div>',
		controllerAs: 'vm',
		bindings: {
			visible: '<',
			animation: '<'
		},
		transclude: true,
		controller: bsToastComponentController
	});
}();
