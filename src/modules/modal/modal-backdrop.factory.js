/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function modalBackdropFactory($document, $compile, $rootScope, $q){
		let isVisible = false,
			isAnimated = false,
			backDropPromise,
			openModals = 0;
		const bodyElement = $document.find('body'),
			backdropElement = angular.element('<bs-modal-backdrop ng-if="isVisible()"></bs-modal-backdrop>'),
			backdropScope = $rootScope.$new(true),
			ModalBackdrop = {
				isVisible: function(){
					return isVisible;
				},
				isAnimated: function(){
					return isAnimated;
				},
				show: function(backdrop, animate){
					openModals++;
					backDropPromise = $q.defer();
					isAnimated = !!animate;
					bodyElement.addClass('modal-open');
					if(backdrop && !isVisible){
						isVisible = true;
					}else{
						backDropPromise.resolve();
					}
					return backDropPromise.promise;
				},
				shown: function(){
					backDropPromise.resolve();
				},
				hide: function(){
					openModals--;
					if(openModals < 0){
						openModals = 0;
					}
					if(angular.isDefined(this.backdropController) && openModals === 0){
						this.backdropController.hide().then(function(){
							isVisible = false;
							bodyElement.removeClass('modal-open');
						});
					}
				}
			};
		// create backdrop element in body
		backdropScope.isVisible = ModalBackdrop.isVisible;
		$compile(backdropElement)(backdropScope);
		bodyElement.append(backdropElement);
		return ModalBackdrop;
	}

	/**
	 * @ngdoc factory
	 * @name ModalBackdrop
	 */
	angular.module('angularBS.modal').factory('ModalBackdrop', modalBackdropFactory);
}();
