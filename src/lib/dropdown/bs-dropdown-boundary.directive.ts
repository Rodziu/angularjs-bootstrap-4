/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IDirective} from 'angular';

/**
 * @ngInject
 */
export class BsDropdownBoundaryDirectiveController {
    public $element: JQLite;

    constructor($element: JQLite) {
        this.$element = $element;
    }
}

export function bsDropdownBoundaryDirective(): IDirective {
    return {
        restrict: 'A',
        controller: BsDropdownBoundaryDirectiveController
    };
}
