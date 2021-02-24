/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {helpers} from '../helpers/helpers.module';
import {PopoverProvider} from './popover.provider';
import {bsPopoverBoundaryDirective} from './bs-popover-boundary.directive';
import {bsPopoverComponent} from './bs-popover.component';
import {bsPopoverToggleDirective} from './bs-popover-toggle.directive';

const popoverModule = angular.module('angularBS.popover', [helpers])
    .provider('Popover', PopoverProvider)
    .directive('bsPopoverBoundary', bsPopoverBoundaryDirective)
    .component('bsPopover', bsPopoverComponent)
    .directive('bsPopoverToggle', bsPopoverToggleDirective);

export const angularBSPopover = popoverModule.name;
