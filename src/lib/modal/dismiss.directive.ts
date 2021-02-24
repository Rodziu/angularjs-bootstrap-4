/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


import {IDirective} from 'angular';

export function dismissDirective(): IDirective {
    return {
        restrict: 'A',
        require: '^bsModal',
        link: function(scope, element, attrs, bsModal) {
            element.on('click', function() {
                scope.$apply(() => {
                    bsModal.hide();
                });
            });
        }
    };
}
