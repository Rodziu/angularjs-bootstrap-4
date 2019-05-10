/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function bsModalDirectiveController($document){
		return {
			restrict: 'A',
			bindToController: {
				bsModal: '='
			},
			controller: [
				'$scope', '$element', '$attrs', '$timeout', 'Modal', 'ModalBackdrop',
				function($scope, $element, $attrs, $timeout, Modal, ModalBackdrop){
					let backdrop = Modal.config.backdrop,
						keyboard = Modal.config.keyboard;
					const ctrl = this,
						show = function(){
							if(!$element.hasClass('show')){
								$element.css({display: 'block'});
								$element[0].offsetWidth; // force reflow
								ModalBackdrop.show(backdrop, $element.hasClass('fade')).then(function(){
									$element.addClass('show');
								});
							}
						},
						hide = function(){
							if($element.hasClass('show')){
								$element.removeClass('show');
								let transitionEnded = false;
								const callback = function(){
										ModalBackdrop.hide();
										$element.css({display: ''});
									},
									transition = function(){
										if(!transitionEnded){
											$element[0].removeEventListener('transitionend', transition);
											callback();
											transitionEnded = true;
										}
									};
								if($element.hasClass('fade')){
									$element[0].addEventListener('transitionend', transition);
									$timeout(transition, 300);
								}else{
									callback();
								}
							}
						},
						keydown = function(e){
							if(keyboard && e.which === 27){
								ctrl.bsModal = false;
								$scope.$digest();
							}
						};
					//
					$attrs.$observe('backdrop', /**
					 * @param {String} value
					 */
					function(value){
						backdrop = value === 'static' ? 'static' : !(value === 'false' || !value);
					});
					//
					$attrs.$observe('keyboard', function(value){
						keyboard = !!value;
					});
					// backdrop click
					$element.on('click', function(e){
						if(backdrop === true && e.target === $element[0]){ // .modal covers whole page
							ctrl.bsModal = false;
							$scope.$digest();
						}
					});
					// keyboard esc
					$document.on('keydown', keydown);
					/**
					 */
					$scope.$watch(function(){
						return ctrl.bsModal;
					}, function(nV){
						if(nV){
							show();
						}else{
							hide();
						}
					});
					/**
					 */
					ctrl.$onDestroy = function(){
						if(ctrl.bsModal){
							hide();
						}
						$document.off('keydown', keydown);
					};
					ctrl.$scope = $scope;
				}
			]
		};
	}

	/**
	 * @ngdoc directive
	 * @name bsModal
	 *
	 * @param {expression} bsModal
	 * @param {string|boolean} backdrop
	 * @param {boolean} keyboard
	 */
	angular.module('angularBS.modal').directive('bsModal', bsModalDirectiveController);
}();
