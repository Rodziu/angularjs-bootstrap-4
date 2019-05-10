/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
angular.module('exampleApp', ['angularBS', 'ngAnimate']).controller('exampleCtrl', ['$rootScope', function($rootScope){
	$rootScope.nav = [];

	$rootScope.modal = {
		exampleModal: false,
		nestedModal: false,
		backdrop: 'static'
	};

	$rootScope.title = 'title<br/><strong>second line</strong>';
}])
/**
 * @ngdoc component
 * @name section
 *
 * @param {string} id
 */
	.component('section', {
		controller: ['$rootScope', '$attrs', function($rootScope, $attrs){
			const ctrl = this;
			ctrl.$onInit = function(){
				$rootScope.nav.push($attrs.id);
			};
		}]
	})
	.directive('title', ['bsTooltipFactory', function(bsTooltipFactory){
		return bsTooltipFactory.customBindingDirective();
	}]);
