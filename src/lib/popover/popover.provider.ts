/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {placement} from '../helpers/angularBS.service';

export type popoverDelay = number | {show: number, hide: number};

export interface IPopoverOptions {
    animation: boolean,
    delay: popoverDelay,
    html: boolean,
    placement: placement,
    title: string,
    content: string,
    trigger: 'click' | 'hover' | 'focus' | string
}

export class PopoverProvider {
    public config: IPopoverOptions ={
        animation: true,
        delay: 0,
        html: false,
        placement: 'right',
        title: '',
        content: '',
        trigger: 'click'
    }

    $get(): IPopoverOptions {
        return this.config;
    }
}
