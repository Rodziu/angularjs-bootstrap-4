/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    function bsTooltipToggleDirectiveController($scope, $element, $attrs, $compile, $document, $sce, Tooltip) {
        const ctrl = this;
        let tooltipElement = null;
        //
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.bsTooltipToggle)) {
                ctrl.bsTooltipToggle = false;
            }
            const triggers = (angular.isUndefined($attrs.trigger) ? Tooltip.trigger : $attrs.trigger)
                    .split(' '),
                open = function() {
                    ctrl.bsTooltipToggle = true;
                    $scope.$digest();
                },
                close = function() {
                    ctrl.bsTooltipToggle = false;
                    $scope.$digest();
                };
            if (~triggers.indexOf('hover')) {
                $element.on('mouseenter', open);
                $element.on('mouseleave', close);
            }
            if (~triggers.indexOf('focus')) {
                $element.on('focus', open);
                $element.on('blur', close);
            }
            if (~triggers.indexOf('click')) {
                $element.on('click', function() {
                    ctrl.bsTooltipToggle = !ctrl.bsTooltipToggle;
                    $scope.$digest();
                });
            }
            ctrl.placement = angular.isUndefined($attrs.placement) ? Tooltip.placement : $attrs.placement;
            ctrl.$element = $element;
            ctrl.title = $sce.trustAsHtml(Tooltip.title);
        };
        //
        $attrs.$observe('title', function(value) {
            if (!(angular.isDefined(ctrl.html) && ctrl.html) || Tooltip.html) {
                value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i) {
                    return '&#' + i.charCodeAt(0) + ';'
                });
            }
            ctrl.title = $sce.trustAsHtml(value);
            $element.attr('title', '');
        });
        //
        const watcher = $scope.$watch(function() {
            return ctrl.bsTooltipToggle;
        }, function(nV) {
            if (nV) {
                $compile(
                    '<bs-tooltip visible="bsTpCtrl.bsTooltipToggle" animation="bsTpCtrl.animation" '
					+ 'delay="bsTpCtrl.delay" placement="{{bsTpCtrl.placement}}" '
					+ 'parent-element="bsTpCtrl.$element" '
					+ 'boundary="bsTpCtrl.boundary">'
					+ '<span ng-bind-html="bsTpCtrl.title"></span></bs-tooltip>'
                )($scope.$new(), function(newElement, newScope) {
                    newScope.bsTpCtrl = ctrl;
                    $document.find('body').append(newElement);
                    tooltipElement = newElement;
                });
                watcher(); // create tooltip element once and leave it be
            }
        });
        //
        ctrl.$onDestroy = function() {
            if (tooltipElement !== null) {
                tooltipElement.remove();
            }
        };
    }

    /**
	 * @ngdoc directive
	 * @name bsTooltipToggle
	 *
	 * @param {expression|boolean} bsTooltipToggle
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression|boolean} html
	 * @param {string} placement
	 * @param {string} title
	 * @param {string} trigger
	 */
    angular.module('angularBS.tooltip').directive('bsTooltipToggle', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            bindToController: {
                bsTooltipToggle: '=?',
                animation: '<?',
                delay: '<?',
                html: '<?'
            },
            require: ['?^bsTooltipBoundary', 'bsTooltipToggle'],
            controllerAs: 'bsTpCtrl',
            link: function(scope, element, attrs, ctrl) {
                ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
            },
            controller: bsTooltipToggleDirectiveController
        };
    }]);
}());
