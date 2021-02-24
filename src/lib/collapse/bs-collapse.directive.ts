/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IDirective, IScope} from 'angular';
import * as angular from 'angular';
import 'angular-animate';
import {BsCollapseGroupDirectiveController} from './bs-collapse-group.directive';

/**
 * @ngInject
 */
export class BsCollapseDirectiveController {
    private $scope: IScope;
    private $element: JQLite;
    private readonly $animateCss: angular.animate.IAnimateCssService;
    private bsCollapse: boolean;
    private group: BsCollapseGroupDirectiveController;

    constructor($scope: IScope, $element: JQLite, $animateCss: angular.animate.IAnimateCssService) {
        this.$scope = $scope;
        this.$element = $element;
        this.$animateCss = $animateCss;

        $scope.$watch(() => {
            return this.bsCollapse;
        }, (nV) => {
            this.bsCollapse = !!nV;
            if (this.bsCollapse) {
                this.collapse();
            } else {
                this.expand();
                if (this.group) {
                    this.group.expand(this);
                }
            }
        })
    }

    $onInit(): void {
        if (this.bsCollapse) {
            this.$element.removeClass('show collapsing').addClass('collapse');
            this.$element.css({height: null});
        } else {
            this.$element.removeClass('collapsing').addClass('collapse show');
        }
    }


    private expand(): void {
        if (!this.$element.hasClass('show')) {
            this.$element.removeClass('collapse').addClass('collapsing');
            if (this.$animateCss) {
                this.$animateCss(this.$element, {
                    addClass: 'show',
                    easing: 'ease',
                    to: {
                        height: this.$element[0].scrollHeight + 'px'
                    }
                }).start()['finally'](() => {
                    this.$element.removeClass('collapsing').addClass('collapse').css({height: 'auto'});
                });
            }
        }
    }
    private collapse(): void {
        if (this.$element.hasClass('show')) {
            this.$element.css({
                height: this.$element[0].scrollHeight + 'px'
            }).removeClass('collapse').addClass('collapsing');
            this.$animateCss(this.$element, {
                removeClass: 'show',
                to: {height: '0'}
            }).start()['finally'](() => {
                this.$element.css({height: null});
                this.$element.removeClass('collapsing').addClass('collapse');
            });
        }
    }
}

export function bsCollapseDirective(): IDirective {
    /**
     * @ngdoc directive
     * @name bsCollapse
     *
     * @param {expression|boolean} bsCollapse
     */
    return {
        restrict: 'A',
        bindToController: {
            bsCollapse: '=?'
        },
        require: ['bsCollapse', '?^bsCollapseGroup'],
        link: function(scope, element, attrs, ctrl) {
            if (ctrl[1] !== null) {
                ctrl[1].register(ctrl[0]);
                ctrl[0].group = ctrl[1];
                scope.$on('destroy', () => {
                    ctrl[1].unregister(ctrl[0]);
                });
            }
        },
        controller: BsCollapseDirectiveController
    };
}
