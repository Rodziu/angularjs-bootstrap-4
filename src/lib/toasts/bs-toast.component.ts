/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {ICompileService, IComponentOptions, IOnChangesObject, IScope, ITranscludeFunction} from 'angular';
import {IToastsOptions} from './toasts.provider';
import * as angular from 'angular';

/**
 * @ngInject
 */
class BsToastComponentController {
    private $scope: IScope;
    private $element: JQLite;
    private $compile: ICompileService;
    private Toasts: IToastsOptions;
    private animation: boolean;
    private visible: boolean;
    private fadeIn: boolean;

    constructor(
        $scope: IScope,
        $element: JQLite,
        $transclude: ITranscludeFunction,
        $compile: ICompileService,
        Toasts: IToastsOptions
    ) {
        this.$scope = $scope;
        this.$element = $element;
        this.$compile = $compile;
        this.Toasts = Toasts;

        $transclude((elements, scope) => {
            let header, body;
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].tagName === 'BS-TOAST-HEADER') {
                    header = elements[i];
                } else if (elements[i].tagName === 'BS-TOAST-BODY') {
                    body = elements[i];
                }
            }
            if (header) {
                header = angular.element(header);
                header.addClass('toast-header');
                $element.children().append($compile(header)(scope))
            }
            if (body) {
                body = angular.element(body);
                body.addClass('toast-body d-block');
                $element.children().append($compile(body)(scope))
            }
        });
    }

    $onInit(): void {
        if (angular.isUndefined(this.animation)) {
            this.animation = this.Toasts.animation;
        }
    }

    $onChanges(changes: IOnChangesObject): void {
        if (
            angular.isDefined(changes.visible)
            && changes.visible.previousValue !== changes.visible.currentValue
        ) {
            this.visible = !!changes.visible.currentValue;
            if (this.animation && !this.visible && !changes.visible.isFirstChange()) {
                // properly display fade out animation
                this.visible = true;
                this.fadeIn = false;
                const transition = () => {
                    this.visible = false;
                    this.$element.children()[0].removeEventListener('transitionend', transition);
                    this.$scope.$digest();
                };
                this.$element.children()[0].addEventListener('transitionend', transition);
            } else {
                this.fadeIn = this.visible;
            }
        }
    }
}

/**
 * @ngdoc component
 * @name bsToastHeader
 * @description contents of this element would be transcluded to .toast-header element
 */
/**
 * @ngdoc component
 * @name bsToastBody
 * @description contents of this element would be transcluded to .toast-body element
 */
/**
 * @ngdoc component
 * @name bsToast
 *
 * @param {expression|boolean} visible
 * @param {expression|boolean} animation
 */
export const bsToastComponent: IComponentOptions = {
    template: '<div class="toast" '
        + 'ng-class="{\'fade\': vm.animation, \'show\': vm.fadeIn}" '
        + 'style="display: {{vm.visible || vm.fadeIn ? \'block\' : \'none\'}}">'
        + '</div>',
    controllerAs: 'vm',
    bindings: {
        visible: '<',
        animation: '<'
    },
    transclude: true,
    controller: BsToastComponentController
};
