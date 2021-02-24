/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

export interface IToastsOptions {
    animation: boolean
}

export class ToastsProvider {
    public config: IToastsOptions = {
        animation: true
    }

    $get(): IToastsOptions {
        return this.config;
    }
}
