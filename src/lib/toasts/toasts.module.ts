/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {ToastsProvider} from './toasts.provider';
import {bsToastComponent} from './bs-toast.component';

const toastsModule = angular.module('angularBS.toasts', [])
    .provider('Toasts', ToastsProvider)
    .component('bsToast', bsToastComponent);

export const angularBSToasts = toastsModule.name;
