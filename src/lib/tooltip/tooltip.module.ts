/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {helpers} from '../helpers/helpers.module';
import * as angular from 'angular';
import {TooltipProvider} from './tooltip.provider';
import {bsTooltipBoundaryDirective} from './bs-tooltip-boundary.directive';
import {BsTooltipFactory} from './bs-tooltip.factory';
import {bsTooltipToggleDirective} from './bs-tooltip-toggle.directive';
import {bsTooltipComponent} from './bs-tooltip.component';

const tooltipModule = angular.module('angularBS.tooltip', [helpers])
    .provider('Tooltip', TooltipProvider)
    .factory('bsTooltipFactory',  BsTooltipFactory)
    .directive('bsTooltipBoundary', bsTooltipBoundaryDirective)
    .directive('bsTooltipToggle', bsTooltipToggleDirective)
    .component('bsTooltip', bsTooltipComponent);

export const angularBSTooltip = tooltipModule.name;
