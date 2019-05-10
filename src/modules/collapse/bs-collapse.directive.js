/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name bsCollapse
	 *
	 * @param {expression|boolean} bsCollapse
	 */
	angular.module('angularBS.collapse').directive('bsCollapse', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			bindToController: {
				bsCollapse: '=?'
			},
			require: ['bsCollapse', '?^bsCollapseGroup'],
			link: function(scope, element, attrs, ctrl){
				if(ctrl[1] !== null){
					ctrl[1].register(ctrl[0]);
					ctrl[0].group = ctrl[1];
					scope.$on('destroy', () => {
						ctrl[1].unregister(ctrl[0]);
					});
				}
			},
			controller: ['$scope', '$element', '$animateCss', function($scope, $element, $animateCss){
				const ctrl = this,
					expand = function(){
						if(!$element.hasClass('show')){
							$element.removeClass('collapse').addClass('collapsing');
							if($animateCss){
								$animateCss($element, {
									addClass: 'show',
									easing: 'ease',
									to: {
										height: $element[0].scrollHeight + 'px'
									}
								}).start()['finally'](() => {
									$element.removeClass('collapsing').addClass('collapse').css({height: 'auto'});
								});
							}
						}
					},
					collapse = function(){
						if($element.hasClass('show')){
							$element.css({
								height: $element[0].scrollHeight + 'px'
							}).removeClass('collapse').addClass('collapsing');
							$animateCss($element, {
								removeClass: 'show',
								to: {height: '0'}
							}).start()['finally'](() => {
								$element.css({height: 0});
								$element.removeClass('collapsing').addClass('collapse');
							});
						}
					};
				/**
				 */
				ctrl.$onInit = function(){
					if(ctrl.bsCollapse){
						$element.removeClass('in collapsing').addClass('collapse');
						$element.css({height: 0});
					}else{
						$element.removeClass('collapsing').addClass('collapse in');
					}
				};
				/**
				 */
				$scope.$watch(() => {
					return ctrl.bsCollapse;
				}, (nV) => {
					ctrl.bsCollapse = !!nV;
					if(ctrl.bsCollapse){
						collapse();
					}else{
						expand();
						if(ctrl.group){
							ctrl.group.expand(ctrl);
						}
					}
				})
			}]
		};
	}]);
}();
