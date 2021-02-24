/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IDirective} from 'angular';

class BsTooltipBoundaryDirectiveController {
    private $element: JQLite;

    constructor($element: JQLite) {
        this.$element = $element;
    }
}

export function bsTooltipBoundaryDirective(): IDirective {
    return {
        restrict: 'A',
        controller: BsTooltipBoundaryDirectiveController
    };
}
