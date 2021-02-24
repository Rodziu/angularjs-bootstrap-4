/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {
    IAttributes,
    IComponentOptions,
    IOnChangesObject,
    IPromise,
    IScope,
    ITimeoutService
} from 'angular';
import {IPopoverOptions, popoverDelay} from './popover.provider';
import {AngularBSService, placement} from '../helpers/angularBS.service';
import * as angular from 'angular';

class BsPopoverComponentController {
    private $scope: IScope;
    private $element: JQLite;
    private $attrs: IAttributes;
    private readonly $timeout: ITimeoutService;
    private Popover: IPopoverOptions;
    private angularBS: AngularBSService;
    private titleVisible: boolean;
    private contentVisible: boolean;
    private animation: boolean;
    private delay: popoverDelay;
    private placement: placement;
    private defaultTitle: string;
    private defaultContent: string;
    private _delay: popoverDelay;
    private visible: boolean;
    private timeout: null | IPromise<void>;
    private parentElement: JQLite;
    private boundary: JQLite;
    private fadeIn: boolean;

    constructor(
        $scope: IScope,
        $element: JQLite,
        $attrs: IAttributes,
        $timeout: ITimeoutService,
        Popover: IPopoverOptions,
        angularBS: AngularBSService
    ) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$timeout = $timeout;
        this.Popover = Popover;
        this.angularBS = angularBS;

        //
        $attrs.$observe('placement', (value) => {
            this.placement = value as string;
        });
        // check if title & content are not empty
        const title = angular.element($element[0].querySelector('.popover-header')),
            content = angular.element($element[0].querySelector('.popover-body'));

        $scope.$watch(() => {
            return title.text().trim();
        }, (nV) => {
            this.titleVisible = nV !== '';
        });

        $scope.$watch(() => {
            return content.text().trim();
        }, (nV) => {
            this.contentVisible = nV !== '';
        });
    }

    $onInit(): void {
        if (angular.isUndefined(this.animation)) {
            this.animation = this.Popover.animation;
        }
        if (angular.isUndefined(this.delay)) {
            this.delay = this.Popover.delay;
        }
        this.placement = this.Popover.placement;
        this.defaultTitle = this.Popover.title;
        this.defaultContent = this.Popover.content;
    }

    $onChanges(changes: IOnChangesObject): void {
        if (angular.isDefined(changes.delay)) {
            this._delay = angular.isDefined(changes.delay.currentValue)
                ? changes.delay.currentValue : this.Popover.delay;
        }
        if (
            angular.isDefined(changes.visible)
            && changes.visible.previousValue !== changes.visible.currentValue
        ) {
            this.visible = changes.visible.currentValue !== false;
            let delay: number;
            if (angular.isObject(this._delay)) {
                delay = this._delay[this.visible ? 'show' : 'hide'] || this.Popover.delay;
            } else {
                delay = this._delay;
            }
            if (this.timeout !== null) {
                this.$timeout.cancel(this.timeout);
            }
            this.timeout = this.$timeout(() => {
                this.timeout = null;
                if (this.visible) {
                    if (this.parentElement) {
                        this.angularBS.positionElement(
                            this.$element.children(), this.parentElement, this.placement,
                            this.boundary !== null ? this.boundary : undefined,
                            'bs-popover-'
                        );
                    } else { // static popover
                        this.angularBS.setPlacementCSS(this.$element.children(), 'bs-popover-', this.placement);
                        this.angularBS.adjustArrow(this.$element.children(), this.placement);
                    }
                    this.fadeIn = this.visible;
                } else if (this.animation && !changes.visible.isFirstChange()) {
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
                    this.fadeIn = false;
                }
            }, delay);
        }
    }
}

/**
 * @ngdoc component
 * @name bsPopoverTitle
 * @description contents of this element would be transcluded to .popover-title element
 */
/**
 * @ngdoc component
 * @name bsPopoverContent
 * @description contents of this element would be transcluded to .popover-content element
 */

/**
 * @ngdoc component
 * @name bsPopover
 *
 * @param {expression|boolean} visible
 * @param {expression|boolean} animation
 * @param {expression|number} delay
 * @param {expression} parentElement
 * @param {expression} boundary
 * @param {string} placement
 */
export const bsPopoverComponent: IComponentOptions = {
    template: '<div class="popover" '
        + 'ng-class="{\'fade\': bsPpCtrl.animation, \'show\': bsPpCtrl.fadeIn}" '
        + 'style="display: {{bsPpCtrl.visible || bsPpCtrl.fadeIn ? \'block\' : \'none\'}}" '
        + 'ng-show="bsPpCtrl.visible || bsPpCtrl.fadeIn">'
        + '<div class="arrow"></div>'
        + '<div class="popover-header" ng-transclude="title" ng-show="bsPpCtrl.titleVisible">'
        + '{{bsPpCtrl.defaultTitle}}'
        + '</div>'
        + '<div class="popover-body" ng-transclude="content" ng-show="bsPpCtrl.contentVisible">'
        + '{{bsPpCtrl.defaultContent}}'
        + '</div>'
        + '</div>',
    controllerAs: 'bsPpCtrl',
    bindings: {
        visible: '<',
        animation: '<',
        delay: '<',
        parentElement: '<',
        boundary: '<'
    },
    transclude: {
        title: '?bsPopoverTitle',
        content: '?bsPopoverContent'
    },
    controller: BsPopoverComponentController
};
