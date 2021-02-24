/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {angularBSCarousel} from './carousel/carousel.module';
import {angularBSCollapse} from './collapse/collapse.module';
import {angularBSDropdown} from './dropdown/dropdown.module';
import {angularBSModal} from './modal/modal.module';
import {angularBSPopover} from './popover/popover.module';
import {angularBSToasts} from './toasts/toasts.module';
import {angularBSTooltip} from './tooltip/tooltip.module';

const angularBSModule = angular.module('angularBS', [
    angularBSModal, angularBSDropdown, angularBSTooltip, angularBSPopover, angularBSCollapse,
    angularBSCarousel, angularBSToasts
]);

export const angularBS = angularBSModule.name;
