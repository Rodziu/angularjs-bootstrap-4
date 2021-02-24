/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IAttributes, IComponentOptions, IOnChangesObject, IPromise, IScope, ITimeoutService} from 'angular';
import {ITooltipOptions, tooltipDelay} from './tooltip.provider';
import {AngularBSService, placement} from '../helpers/angularBS.service';
import * as angular from 'angular';

/**
 * @ngInject
 */
class BsTooltipComponentController {
    private $scope: IScope;
    private $element: JQLite;
    private $attrs: IAttributes;
    private readonly $timeout: ITimeoutService;
    private Tooltip: ITooltipOptions;
    private angularBS: AngularBSService;
    private _delay: tooltipDelay;
    private _timeout: IPromise<void> = null;
    private placement: placement;
    private titleVisible: boolean;
    private animation: boolean;
    private delay: tooltipDelay;
    private defaultTitle: string;
    private visible: boolean;
    private parentElement: JQLite;
    private boundary: JQLite;
    private fadeIn: boolean;

    constructor(
        $scope: IScope,
        $element: JQLite,
        $attrs: IAttributes,
        $timeout: ITimeoutService,
        Tooltip: ITooltipOptions,
        angularBS: AngularBSService
    ) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$timeout = $timeout;
        this.Tooltip = Tooltip;
        this.angularBS = angularBS;

        $attrs.$observe('placement', (value) => {
            this.placement = value as string;
        });
        // check if title is not empty
        const title = angular.element($element[0].querySelector('.tooltip-inner'));
        $scope.$watch(() => {
            return title.text().trim();
        }, (nV) => {
            this.titleVisible = nV !== '';
        });
    }

    $onInit(): void {
        if (angular.isUndefined(this.animation)) {
            this.animation = this.Tooltip.animation;
        }
        if (angular.isUndefined(this.delay)) {
            this.delay = this.Tooltip.delay;
        }
        this.placement = this.Tooltip.placement;
        this.defaultTitle = this.Tooltip.title;
        this.$element.children().css({top: 0});
    }

    $onChanges(changes: IOnChangesObject): void {
        if (angular.isDefined(changes.delay)) {
            this._delay = angular.isDefined(changes.delay.currentValue)
                ? changes.delay.currentValue : this.Tooltip.delay;
        }
        if (
            angular.isDefined(changes.visible)
            && changes.visible.previousValue !== changes.visible.currentValue
        ) {
            this.visible = changes.visible.currentValue !== false;
            let delay: number;
            if (angular.isObject(this._delay)) {
                delay = this._delay[this.visible ? 'show' : 'hide'] || this.Tooltip.delay;
            } else {
                delay = this._delay;
            }
            if (this._timeout !== null) {
                this.$timeout.cancel(this._timeout);
            }
            this._timeout = this.$timeout(() => {
                this._timeout = null;
                if (this.visible) {
                    if (this.parentElement) {
                        this.angularBS.positionElement(
                            this.$element.children(), this.parentElement, this.placement,
                            this.boundary !== null ? this.boundary : undefined,
                            'bs-tooltip-'
                        );
                    } else { // static tooltip
                        this.angularBS.setPlacementCSS(this.$element.children(), 'bs-tooltip-', this.placement);
                        this.angularBS.adjustArrow(this.$element.children(), this.placement);
                    }
                    this.fadeIn = this.visible;
                } else {
                    // properly display fade out animation
                    this.visible = true;
                    this.fadeIn = false;
                    const transition = () => {
                        this.visible = false;
                        this.$element.children()[0].removeEventListener('transitionend', transition);
                        this.$scope.$digest();
                    };
                    this.$element.children()[0].addEventListener('transitionend', transition);
                }
            }, delay);
        }
    }
}

/**
 * @ngdoc component
 * @name bsTooltip
 *
 * @param {expression|boolean} visible
 * @param {expression|boolean} animation
 * @param {expression|number} delay
 * @param {expression} parentElement
 * @param {expression} boundary
 * @param placement
 */
export const bsTooltipComponent: IComponentOptions = {
    template: '<div class="tooltip" '
        + 'ng-class="{\'fade\': bsTpCtrl.animation, \'show\': bsTpCtrl.fadeIn}" '
        + 'ng-show="bsTpCtrl.visible || bsTpCtrl.fadeIn">'
        + '<div class="arrow" ng-show="bsTpCtrl.titleVisible"></div>'
        + '<div class="tooltip-inner" ng-transclude ng-show="bsTpCtrl.titleVisible">{{bsTpCtrl.defaultTitle}}</div>'
        + '</div>',
    controllerAs: 'bsTpCtrl',
    bindings: {
        visible: '<',
        animation: '<',
        delay: '<',
        parentElement: '<',
        boundary: '<'
    },
    transclude: true,
    controller: BsTooltipComponentController
};
