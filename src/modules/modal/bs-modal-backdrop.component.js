/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	class BSModalBackdropController {
		/**
		 * @ngInject
		 * @param $element
		 * @param $q
		 * @param $timeout
		 * @param ModalBackdrop
		 */
		constructor($element, $q, $timeout, ModalBackdrop){
			this.$element = $element;
			this.$q = $q;
			this.$timeout = $timeout;
			this.ModalBackdrop = ModalBackdrop;
		}

		$onInit(){
			this.ModalBackdrop.backdropController = this;
			this.isAnimated = this.ModalBackdrop.isAnimated;
		}

		$postLink(){
			// wait until 'fade' class is added, we don't use $timeout cause we don't need a digest cycle here
			setTimeout(() => {
				this.$element.children()[0].offsetWidth; // force reflow
				this.$element.children().addClass('show');
				this.ModalBackdrop.shown();
			});
		}

		hide(){
			const defered = this.$q.defer(),
				backdropElement = this.$element.children();
			backdropElement.removeClass('show');
			if(this.isAnimated()){
				let transitionFinished = false;
				const transition = function(){
					if(!transitionFinished){
						defered.resolve();
						transitionFinished = true;
					}
				};
				backdropElement[0].addEventListener('transitionend', transition);
				this.$timeout(transition, 150);
			}else{
				defered.resolve();
			}
			return defered.promise;
		}
	}

	/**
	 * @ngdoc component
	 * @name bsModalBackdrop
	 */
	angular.module('angularBS.modal').component('bsModalBackdrop', {
		template: '<div class="modal-backdrop" ng-class="{\'fade\': vm.isAnimated()}"></div>',
		controllerAs: 'vm',
		controller: BSModalBackdropController
	});
}();
