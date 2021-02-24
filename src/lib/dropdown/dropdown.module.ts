/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {helpers} from '../helpers/helpers.module';
import {bsDropdownBoundaryDirective} from './bs-dropdown-boundary.directive';
import {bsDropdownDirective} from './bs-dropdown.directive';
import {bsDropdownToggleDirective} from './bs-dropdown-toggle.directive';

const dropdownModule = angular.module('angularBS.dropdown', [helpers])
    .directive('bsDropdownBoundary', bsDropdownBoundaryDirective)
    .directive('bsDropdown', bsDropdownDirective)
    .directive('bsDropdownToggle', bsDropdownToggleDirective);

export const angularBSDropdown = dropdownModule.name;
