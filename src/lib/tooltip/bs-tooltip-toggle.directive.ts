/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IAttributes, ICompileService, IDirective, IDocumentService, ISCEService, IScope} from 'angular';
import {ITooltipOptions} from './tooltip.provider';
import * as angular from 'angular';
import {placement} from '../helpers/angularBS.service';

interface IBSTooltipScope extends IScope {
    bsTpCtrl: BsTooltipToggleDirectiveController
}

export class BsTooltipToggleDirectiveController {
    private $scope: IScope;
    private $element: JQLite;
    private $attrs: IAttributes;
    private $document: IDocumentService;
    private $sce: ISCEService;
    private Tooltip: ITooltipOptions;
    private _tooltipElement: JQLite = null;
    private html: boolean;
    private title: string;
    private bsTooltipToggle: boolean;
    private placement: placement;

    constructor(
        $scope: IScope,
        $element: JQLite,
        $attrs: IAttributes,
        $compile: ICompileService,
        $document: IDocumentService,
        $sce: ISCEService,
        Tooltip: ITooltipOptions
    ) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$document = $document;
        this.$sce = $sce;
        this.Tooltip = Tooltip;

        $attrs.$observe('title', (value) => {
            if (!(angular.isDefined(this.html) && this.html) || Tooltip.html) {
                value = (value as string).replace(/[\u00A0-\u9999<>&'"]/gim, (i) => {
                    return '&#' + i.charCodeAt(0) + ';'
                });
            }
            this.title = $sce.trustAsHtml(value);
            $element.attr('title', '');
        });

        const watcher = $scope.$watch(() => {
            return this.bsTooltipToggle;
        }, (nV) => {
            if (nV) {
                $compile(
                    '<bs-tooltip visible="bsTpCtrl.bsTooltipToggle" animation="bsTpCtrl.animation" '
                    + 'delay="bsTpCtrl.delay" placement="{{bsTpCtrl.placement}}" '
                    + 'parent-element="bsTpCtrl.$element" '
                    + 'boundary="bsTpCtrl.boundary">'
                    + '<span ng-bind-html="bsTpCtrl.title"></span></bs-tooltip>'
                )($scope.$new(), (newElement, newScope: IBSTooltipScope) => {
                    newScope.bsTpCtrl = this;
                    $document.find('body').append(newElement);
                    this._tooltipElement = newElement;
                });
                watcher(); // create tooltip element once and leave it be
            }
        });
    }

    $onInit(): void {
        if (angular.isUndefined(this.bsTooltipToggle)) {
            this.bsTooltipToggle = false;
        }
        const triggers = (angular.isUndefined(this.$attrs.trigger) ? this.Tooltip.trigger : this.$attrs.trigger)
                .split(' '),
            open = () => {
                this.bsTooltipToggle = true;
                this.$scope.$digest();
            },
            close = () => {
                this.bsTooltipToggle = false;
                this.$scope.$digest();
            };
        if (~triggers.indexOf('hover')) {
            this.$element.on('mouseenter', open);
            this.$element.on('mouseleave', close);
        }
        if (~triggers.indexOf('focus')) {
            this.$element.on('focus', open);
            this.$element.on('blur', close);
        }
        if (~triggers.indexOf('click')) {
            this.$element.on('click', () => {
                this.bsTooltipToggle = !this.bsTooltipToggle;
                this.$scope.$digest();
            });
        }
        this.placement = angular.isUndefined(this.$attrs.placement) ? this.Tooltip.placement : this.$attrs.placement;
        this.title = this.$sce.trustAsHtml(this.Tooltip.title);
    }

    $onDestroy(): void {
        if (this._tooltipElement !== null) {
            this._tooltipElement.remove();
        }
    }
}

export function bsTooltipToggleDirective(): IDirective {
    /**
     * @ngdoc directive
     * @name bsTooltipToggle
     *
     * @param {expression|boolean} bsTooltipToggle
     * @param {expression|boolean} animation
     * @param {expression|number} delay
     * @param {expression|boolean} html
     * @param placement
     * @param title
     * @param trigger
     */
    return {
        restrict: 'A',
        bindToController: {
            bsTooltipToggle: '=?',
            animation: '<?',
            delay: '<?',
            html: '<?'
        },
        require: ['?^bsTooltipBoundary', 'bsTooltipToggle'],
        controllerAs: 'bsTpCtrl',
        link: function(scope, element, attrs, ctrl) {
            ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
        },
        controller: BsTooltipToggleDirectiveController
    };
}
