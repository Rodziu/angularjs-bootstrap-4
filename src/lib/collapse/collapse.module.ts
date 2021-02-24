/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {bsCollapseDirective} from './bs-collapse.directive';
import {bsCollapseGroupDirective} from './bs-collapse-group.directive';

const collapseModule = angular.module('angularBS.collapse', [])
    .directive('bsCollapse', bsCollapseDirective)
    .directive('bsCollapseGroup', bsCollapseGroupDirective);

export const angularBSCollapse = collapseModule.name;
