/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    function bsDropdownToggleDirectiveController() {
        return {
            restrict: 'A',
            require: '^bsDropdown',
            link: function(scope, element, attrs, dropdownCtrl) {
                element.on('click', () => {
                    scope.$apply(() => {
                        dropdownCtrl.bsDropdown = !dropdownCtrl.bsDropdown;
                    });
                });
            }
        };
    }

    /**
	 * @ngdoc directive
	 * @name bsDropdownToggle
	 */
    angular.module('angularBS.dropdown').directive('bsDropdownToggle', bsDropdownToggleDirectiveController);
}());
