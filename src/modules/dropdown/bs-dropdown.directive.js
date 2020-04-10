/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function bsDropdownDirectiveController(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			bindToController: {
				bsDropdown: '=?'
			},
			controller: ['$scope', '$document', '$element', function($scope, $document, $element){
				const ctrl = this,
					onClick = function(e){
						if(ctrl.bsDropdown && !$element[0].contains(e.target)){
							ctrl.bsDropdown = false;
							$scope.$digest();
						}
					},
					keydown = function(e){
						if(ctrl.bsDropdown && e.which === 27){
							ctrl.bsDropdown = false;
							$scope.$digest();
							return;
						}
						if(e.which === 38 || e.which === 40){
							const items = $element[0].querySelectorAll('.dropdown-menu li:not(.disabled) a');
							let idx = -1;
							for(let i = 0; i < items.length; i++){
								if(items[i].contains(e.target)){
									idx = i;
									break;
								}
							}
							if(e.which === 38 && idx > 0){
								idx--;
							}else if(e.which === 40 && idx < items.length - 1){
								idx++;
							}
							if(!~idx){
								idx = 0;
							}
							items[idx].focus();
						}
					};
				/**
				 */
				ctrl.$onInit = function(){
					ctrl.bsDropdown = !!ctrl.bsDropdown;
					$element.addClass('dropdown');
				};
				/**
				 */
				$scope.$watch(function(){
					return ctrl.bsDropdown;
				}, function(nV){
					if(nV){
						$element.addClass('show');
						angular.element($element[0].querySelectorAll('.dropdown-menu')).addClass('show');
					}else{
						$element.removeClass('show');
						angular.element($element[0].querySelectorAll('.dropdown-menu')).removeClass('show');
					}
				});
				/**
				 */
				ctrl.$onDestroy = function(){
					$document.off('click', onClick);
					$element.off('keydown', keydown);
				};
				$document.on('click', onClick);
        $element.on('keydown', keydown);
			}]
		};
	}

	/**
	 * @ngdoc directive
	 * @name bsDropdown
	 * @property {expression|boolean} bsDropdown
	 */
	angular.module('angularBS.dropdown').directive('bsDropdown', bsDropdownDirectiveController);
}();
