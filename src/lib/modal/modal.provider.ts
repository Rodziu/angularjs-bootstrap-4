/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {Injectable} from 'angular';
import {BSModalController} from './bs-modal.directive';

interface IModalOptions {
    backdrop: 'static' | boolean,
    keyboard: boolean,
    transitionDuration: number,
    backdropTransitionDuration: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onBeforeChange: Injectable<(this: BSModalController, ...args: any[]) => boolean>
}

export class ModalProvider {
    public config: IModalOptions = {
        backdrop: 'static',
        keyboard: true,
        transitionDuration: 300,
        backdropTransitionDuration: 150,
        onBeforeChange: () => true
    }

    public backdropController = null;

    $get(): this {
        return this;
    }
}
