/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IDirective} from 'angular';
import {BsCollapseDirectiveController} from './bs-collapse.directive';

/**
 * @ngInject
 */
export class BsCollapseGroupDirectiveController {
    private children = [];

    register(bsCollapseCtrl: BsCollapseDirectiveController): void {
        this.children.push(bsCollapseCtrl);
    }

    unregister(bsCollapseCtrl: BsCollapseDirectiveController): void {
        this.children.splice(this.children.indexOf(bsCollapseCtrl), 1);
    }

    expand(invokingCtrl: BsCollapseDirectiveController): void {
        for (let c = 0; c < this.children.length; c++) {
            if (this.children[c] !== invokingCtrl) {
                this.children[c].bsCollapse = true;
            }
        }
    }
}

export function bsCollapseGroupDirective(): IDirective {
    return {
        restrict: 'A',
        controller: BsCollapseGroupDirectiveController
    };
}
