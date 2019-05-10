/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';

	function bsPopoverToggleDirectiveController(
		$scope, $element, $attrs, $compile, $timeout, $document, $sce, Popover
	){
		const ctrl = this,
			documentClick = function(e){
				if(!$element[0].contains(e.target)){
					ctrl.bsPopoverToggle = false;
					$scope.$digest();
				}
			};
		let popoverElement = null;
		//
		ctrl.$onInit = function(){
			if(angular.isUndefined(ctrl.bsPopoverToggle)){
				ctrl.bsPopoverToggle = false;
			}
			const triggers = (angular.isUndefined($attrs.trigger) ? Popover.trigger : $attrs.trigger)
					.split(' '),
				open = function(){
					ctrl.bsPopoverToggle = true;
					$scope.$digest();
				},
				close = function(){
					ctrl.bsPopoverToggle = false;
					$scope.$digest();
				};
			if(~triggers.indexOf('hover')){
				$element.on('mouseenter', open);
				$element.on('mouseleave', close);
			}
			if(~triggers.indexOf('focus')){
				$element.on('click', open);
				$document.on('click', documentClick);
			}
			if(~triggers.indexOf('click')){
				$element.on('click', function(){
					ctrl.bsPopoverToggle = !ctrl.bsPopoverToggle;
					$scope.$digest();
				});
			}
			ctrl.placement = angular.isUndefined($attrs.placement) ? Popover.placement : $attrs.placement;
			ctrl.$element = $element;
			ctrl.title = $sce.trustAsHtml(Popover.title);
			ctrl.content = $sce.trustAsHtml(Popover.content);
		};
		//
		$attrs.$observe('title', function(value){
			if(!(angular.isDefined(ctrl.html) && ctrl.html) || Popover.html){
				value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i){
					return '&#' + i.charCodeAt(0) + ';'
				});
			}
			ctrl.title = $sce.trustAsHtml(value);
			$element.attr('title', '');
		});
		//
		$attrs.$observe('content', function(value){
			if(!(angular.isDefined(ctrl.html) && ctrl.html) || Popover.html){
				value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i){
					return '&#' + i.charCodeAt(0) + ';'
				});
			}
			ctrl.content = $sce.trustAsHtml(value);
		});
		//
		const watcher = $scope.$watch(function(){
			return ctrl.bsPopoverToggle;
		}, function(nV){
			if(nV){
				ctrl.bsPopoverToggle = false;
				$compile(
					'<bs-popover visible="bsPpCtrl.bsPopoverToggle" animation="bsPpCtrl.animation" ' +
					'delay="bsPpCtrl.delay" placement="{{bsPpCtrl.placement}}" ' +
					'parent-element="bsPpCtrl.$element" ' +
					'boundary="bsPpCtrl.boundary">' +
					'<bs-popover-title ng-bind-html="bsPpCtrl.title"></bs-popover-title>' +
					'<bs-popover-content ng-bind-html="bsPpCtrl.content"></bs-popover-content>' +
					'</bs-popover>'
				)($scope.$new(), function(newElement, newScope){
					newScope.bsPpCtrl = ctrl;
					$document.find('body').append(newElement);
					popoverElement = newElement;
					// we delay popover display a little, to properly calculate its dimensions after its created
					$timeout(() => {
						ctrl.bsPopoverToggle = true;
					}, 50);
				});
				watcher(); // create popover element once and leave it be
			}
		});
		//
		ctrl.$onDestroy = function(){
			if(popoverElement !== null){
				popoverElement.remove();
			}
			$document.off('click', documentClick);
		};
	}

	/**
	 * @ngdoc directive
	 * @name bsPopoverToggle
	 *
	 * @param {expression|boolean} bsPopoverToggle
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression|boolean} html
	 * @param {string} placement
	 * @param {string} title
	 * @param {string} content
	 * @param {string} trigger
	 */
	angular.module('angularBS.popover').directive('bsPopoverToggle', [function(){
		return {
			restrict: 'A',
			bindToController: {
				bsPopoverToggle: '=?',
				animation: '<?',
				delay: '<?',
				html: '<?'
			},
			require: ['?^bsPopoverBoundary', 'bsPopoverToggle'],
			controllerAs: 'bsPpCtrl',
			link: function(scope, element, attrs, ctrl){
				ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
			},
			controller: bsPopoverToggleDirectiveController
		};
	}]);
}();
