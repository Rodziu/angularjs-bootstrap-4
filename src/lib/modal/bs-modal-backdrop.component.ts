/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IComponentOptions, IPromise, IQService, ITimeoutService} from 'angular';
import {ModalBackdropFactory} from './modal-backdrop.factory';

export class BSModalBackdropController {
    private $element: JQLite;
    private $q: IQService;
    private readonly $timeout: ITimeoutService;
    private ModalBackdrop: ModalBackdropFactory;
    private isAnimated: () => boolean;
    /**
     * @ngInject
     */
    constructor($element: JQLite, $q: IQService, $timeout: ITimeoutService, ModalBackdrop: ModalBackdropFactory) {
        this.$element = $element;
        this.$q = $q;
        this.$timeout = $timeout;
        this.ModalBackdrop = ModalBackdrop;
    }

    $onInit(): void {
        this.ModalBackdrop.backdropController = this;
        this.isAnimated = this.ModalBackdrop.isAnimated.bind(this.ModalBackdrop);
    }

    $postLink(): void {
        // wait until 'fade' class is added, we don't use $timeout cause we don't need a digest cycle here
        setTimeout(() => {
            this.$element.children()[0].offsetWidth; // force reflow
            this.$element.children().addClass('show');
            this.ModalBackdrop.shown();
        });
    }

    hide(): IPromise<void> {
        const defered = this.$q.defer<void>(),
            backdropElement = this.$element.children();
        backdropElement.removeClass('show');
        if (this.isAnimated()) {
            let transitionFinished = false;
            const transition = function() {
                if (!transitionFinished) {
                    defered.resolve();
                    transitionFinished = true;
                }
            };
            backdropElement[0].addEventListener('transitionend', transition);
            this.$timeout(transition, 150);
        } else {
            defered.resolve();
        }
        return defered.promise;
    }
}

export const bsModalBackdropComponent: IComponentOptions = {
    template: '<div class="modal-backdrop" ng-class="{\'fade\': vm.isAnimated()}"></div>',
    controllerAs: 'vm',
    controller: BSModalBackdropController
};
