/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

export interface ICarouselOptions {
    interval: number,
    pause: 'hover' | null,
    wrap: boolean,
    keyboard: boolean
}

export class CarouselProvider {
    public config: ICarouselOptions = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    };

    $get(): ICarouselOptions {
        return this.config;
    }
}
