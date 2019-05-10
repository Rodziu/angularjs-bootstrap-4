/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';
	/**
	 * @ngdoc factory
	 * @name bsTooltipFactory
	 */
	angular.module('angularBS.tooltip').factory('bsTooltipFactory', ['$injector', function($injector){
		return {
			customBindingDirective: function(){
				return {
					restrict: 'A',
					require: '?^bsTooltipBoundary',
					compile: function(element, attrs){
						if(!('bsTooltipToggle' in attrs) && !('bsPopoverToggle' in attrs)){
							return function(scope, element, attrs, ctrl){
								const directive = $injector.get('bsTooltipToggleDirective')[0],
									bsTooltipToggleCtrl = $injector.instantiate(directive.controller, {
										'$scope': scope,
										'$element': element,
										'$attrs': attrs
									});
								directive.compile(
									element, scope, attrs, [ctrl, bsTooltipToggleCtrl]
								)(
									scope, element, attrs, [ctrl, bsTooltipToggleCtrl]
								);
								bsTooltipToggleCtrl.$onInit();
								scope.$on('$destroy', function(){
									bsTooltipToggleCtrl.$onDestroy();
								});
							}
						}
					}
				}
			}
		};
	}]);
}();
