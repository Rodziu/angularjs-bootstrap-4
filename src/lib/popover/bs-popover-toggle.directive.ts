/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


import {
    IAttributes,
    ICompileService,
    IDirective,
    IDocumentService,
    ISCEService,
    IScope,
    ITimeoutService
} from 'angular';
import {IPopoverOptions} from './popover.provider';
import * as angular from 'angular';
import {placement} from '../helpers/angularBS.service';

interface IBSPopoverElementScope extends IScope {
    bsPpCtrl: BsPopoverToggleDirectiveController
}

/**
 * @ngInject
 */
class BsPopoverToggleDirectiveController {
    private $scope: IScope;
    private $element: JQLite;
    private $attrs: IAttributes;
    private readonly $compile: ICompileService;
    private $timeout: ITimeoutService;
    private $document: IDocumentService;
    private $sce: ISCEService;
    private Popover: IPopoverOptions;
    private bsPopoverToggle: boolean;
    private placement: placement;
    private title: string;
    private content: string;
    private readonly documentClick: (JQueryEventObject) => void;
    private html: string;
    private popoverElement: JQLite = null;

    constructor(
        $scope: IScope,
        $element: JQLite,
        $attrs: IAttributes,
        $compile: ICompileService,
        $timeout: ITimeoutService,
        $document: IDocumentService,
        $sce: ISCEService,
        Popover: IPopoverOptions
    ) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.$document = $document;
        this.$sce = $sce;
        this.Popover = Popover;

        this.documentClick = (e: JQueryMouseEventObject) => {
            if (!$element[0].contains(e.target)) {
                this.bsPopoverToggle = false;
                this.$scope.$digest();
            }
        };

        ['title', 'content'].forEach((attr) => {
            $attrs.$observe(attr, (value) => {
                if (!(angular.isDefined(this.html) && this.html) || Popover.html) {
                    value = (value as string).replace(/[\u00A0-\u9999<>&'"]/gim, function(i) {
                        return '&#' + i.charCodeAt(0) + ';'
                    });
                }
                this[attr] = $sce.trustAsHtml(value);
                if (attr === 'title') {
                    $element.attr('title', '');
                }
            });
        });

        const watcher = this.$scope.$watch(() => {
            return this.bsPopoverToggle;
        }, (nV) => {
            if (nV) {
                this.bsPopoverToggle = false;
                this.$compile(
                    '<bs-popover visible="bsPpCtrl.bsPopoverToggle" animation="bsPpCtrl.animation" '
                    + 'delay="bsPpCtrl.delay" placement="{{bsPpCtrl.placement}}" '
                    + 'parent-element="bsPpCtrl.$element" '
                    + 'boundary="bsPpCtrl.boundary">'
                    + '<bs-popover-title ng-bind-html="bsPpCtrl.title"></bs-popover-title>'
                    + '<bs-popover-content ng-bind-html="bsPpCtrl.content"></bs-popover-content>'
                    + '</bs-popover>'
                )(this.$scope.$new(), (newElement, newScope: IBSPopoverElementScope) => {
                    newScope.bsPpCtrl = this;
                    $document.find('body').append(newElement);
                    this.popoverElement = newElement;
                    // we delay popover display a little, to properly calculate its dimensions after its created
                    $timeout(() => {
                        this.bsPopoverToggle = true;
                    }, 50);
                });
                watcher(); // create popover element once and leave it be
            }
        });
    }

    $onInit(): void {
        if (angular.isUndefined(this.bsPopoverToggle)) {
            this.bsPopoverToggle = false;
        }
        const triggers = (angular.isUndefined(this.$attrs.trigger) ? this.Popover.trigger : this.$attrs.trigger)
                .split(' '),
            open = () => {
                this.bsPopoverToggle = true;
                this.$scope.$digest();
            },
            close = () => {
                this.bsPopoverToggle = false;
                this.$scope.$digest();
            };
        if (~triggers.indexOf('hover')) {
            this.$element.on('mouseenter', open);
            this.$element.on('mouseleave', close);
        }
        if (~triggers.indexOf('focus')) {
            this.$element.on('click', open);
            this.$document.on('click', this.documentClick);
        }
        if (~triggers.indexOf('click')) {
            this.$element.on('click', () => {
                this.bsPopoverToggle = !this.bsPopoverToggle;
                this.$scope.$digest();
            });
        }
        this.placement = angular.isUndefined(this.$attrs.placement) ? this.Popover.placement : this.$attrs.placement;
        this.title = this.$sce.trustAsHtml(this.Popover.title);
        this.content = this.$sce.trustAsHtml(this.Popover.content);
    }

    $onDestroy(): void {
        if (this.popoverElement !== null) {
            this.popoverElement.remove();
        }
        this.$document.off('click', this.documentClick);
    }
}

export function bsPopoverToggleDirective(): IDirective {
    /**
     * @ngdoc directive
     * @name bsPopoverToggle
     *
     * @param {expression|boolean} bsPopoverToggle
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
            bsPopoverToggle: '=?',
            animation: '<?',
            delay: '<?',
            html: '<?'
        },
        require: ['?^bsPopoverBoundary', 'bsPopoverToggle'],
        controllerAs: 'bsPpCtrl',
        link: function(scope, element, attrs, ctrl) {
            ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
        },
        controller: BsPopoverToggleDirectiveController
    };
}
