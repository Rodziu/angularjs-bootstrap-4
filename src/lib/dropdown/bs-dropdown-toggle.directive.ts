/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IDirective} from 'angular';

export function bsDropdownToggleDirective(): IDirective {
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
