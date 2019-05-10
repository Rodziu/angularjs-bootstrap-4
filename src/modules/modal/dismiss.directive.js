/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function dismissDirectiveController(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			require: '^bsModal',
			link: function(scope, element, attrs, bsModal){
				element.on('click', function(){
					bsModal.bsModal = false;
					bsModal.$scope.$digest();
				});
			}
		};
	}

	/**
	 * @ngdoc directive
	 * @name dismiss
	 */
	angular.module('angularBS.modal').directive('dismiss', dismissDirectiveController);
}();
