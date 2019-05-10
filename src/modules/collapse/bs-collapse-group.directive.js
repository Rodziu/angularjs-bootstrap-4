/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name bsCollapseGroup
	 */
	angular.module('angularBS.collapse').directive('bsCollapseGroup', [function(){
		return {
			restrict: 'A',
			controller: [function(){
				const ctrl = this,
					children = [];
				/**
				 * @param bsCollapseCtrl
				 */
				ctrl.register = function(bsCollapseCtrl){
					children.push(bsCollapseCtrl);
				};
				/**
				 * @param bsCollapseCtrl
				 */
				ctrl.unregister = function(bsCollapseCtrl){
					children.splice(children.indexOf(bsCollapseCtrl), 1);
				};
				/**
				 * @param invokingCtrl
				 */
				ctrl.expand = function(invokingCtrl){
					for(let c = 0; c < children.length; c++){
						if(children[c] !== invokingCtrl){
							children[c].bsCollapse = true;
						}
					}
				};
			}]
		};
	}]);
}();
