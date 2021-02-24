/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {ModalProvider} from './modal.provider';
import {ModalBackdropFactory} from './modal-backdrop.factory';
import {bsModalBackdropComponent} from './bs-modal-backdrop.component';
import {bsModalDirective} from './bs-modal.directive';
import {dismissDirective} from './dismiss.directive';

const modalModule = angular.module('angularBS.modal', [])
    .provider('Modal', ModalProvider)
    .factory('ModalBackdrop', ModalBackdropFactory)
    .component('bsModalBackdrop', bsModalBackdropComponent)
    .directive('bsModal', bsModalDirective)
    .directive('dismiss', dismissDirective);

export const angularBSModal = modalModule.name;
