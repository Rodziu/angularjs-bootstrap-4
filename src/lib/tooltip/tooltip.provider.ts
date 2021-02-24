/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {placement} from '../helpers/angularBS.service';

export type tooltipDelay = number | { show: number, hide: number };

export interface ITooltipOptions {
    animation: boolean,
    delay: tooltipDelay,
    placement: placement,
    html: boolean,
    title: string,
    trigger: 'click' | 'hover' | 'focus' | string
}

export class TooltipProvider {
    public config: ITooltipOptions = {
        animation: true,
        delay: 0,
        placement: 'bottom',
        html: false,
        title: '',
        trigger: 'hover focus'
    }

    $get(): ITooltipOptions {
        return this.config;
    }
}
