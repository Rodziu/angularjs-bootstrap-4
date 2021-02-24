/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IDirective, IDocumentService, IScope} from 'angular';
import {AngularBSService} from '../helpers/angularBS.service';
import {BsDropdownBoundaryDirectiveController} from './bs-dropdown-boundary.directive';
import * as angular from 'angular';

/**
 * @ngInject
 */
class BSDropdownDirectiveController {
    private $scope: IScope;
    private $element: JQLite;
    private $document: IDocumentService;
    private angularBS: AngularBSService;
    private bsDropdown: boolean;
    private _bsDropdown: boolean;
    private boundary: BsDropdownBoundaryDirectiveController;
    private boundaryElement: JQLite;

    constructor($scope: IScope, $element: JQLite, $document: IDocumentService, angularBS: AngularBSService) {
        this.$scope = $scope;
        this.$element = $element;
        this.$document = $document;
        this.angularBS = angularBS;
    }

    $onInit(): void {
        this.bsDropdown = !!this.bsDropdown;
        this.$element.addClass('dropdown');
        this.$document.on('click', this._onClick.bind(this));
        this.$element.on('keydown', this._keydown.bind(this));
    }

    $doCheck(): void {
        if (this._bsDropdown !== this.bsDropdown) {
            this._bsDropdown = this.bsDropdown;
            if (this.bsDropdown) {
                this.$element.addClass('show');
                angular.element(this.$element[0].querySelectorAll('.dropdown-menu')).addClass('show');
                if (this.boundary || this.boundaryElement) {
                    this.reposition();
                }
            } else {
                if (this.boundary || this.boundaryElement) {
                    this.$element.removeClass('dropup');
                }
                this.$element.removeClass('show');
                angular.element(this.$element[0].querySelectorAll('.dropdown-menu')).removeClass('show');
            }
        }
    }

    $onDestroy(): void {
        this.$document.off('click', this._onClick.bind(this));
        this.$element.off('keydown', this._keydown.bind(this));
    }

    _onClick(e: JQueryMouseEventObject): void {
        if (this.bsDropdown && !this.$element[0].contains(e.target)) {
            this.$scope.$apply(() => {
                this.bsDropdown = false;
            });
        }
    }

    _keydown(e: JQueryKeyEventObject): void {
        if (this.bsDropdown && e.key === 'Escape') {
            this.$scope.$apply(() => {
                this.bsDropdown = false;
            });
            return;
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const items = this.$element[0].querySelectorAll<HTMLAnchorElement>(
                '.dropdown-menu a:not(.disabled)'
            );
            let idx = -1;
            for (let i = 0; i < items.length; i++) {
                if (items[i].contains(e.target)) {
                    idx = i;
                    break;
                }
            }
            if (e.key === 'ArrowUp' && idx > 0) {
                idx--;
            } else if (e.key === 'ArrowDown' && idx < items.length - 1) {
                idx++;
            }
            if (!~idx) {
                idx = 0;
            }
            items[idx].focus();
        }
    }

    reposition(): void {
        const boundaryElement = this.boundary ? this.boundary.$element[0] : this.boundaryElement[0],
            boundaryOffset = this.angularBS.offset(boundaryElement),
            menuOffset = this.angularBS.offset(this.$element[0].querySelector('.dropdown-menu'));
        if (menuOffset.height + menuOffset.top > boundaryOffset.height + boundaryOffset.top) {
            this.$element.addClass('dropup');
        } else {
            this.$element.removeClass('dropup');
        }
    }
}

export function bsDropdownDirective(): IDirective {
    /**
     * @ngdoc directive
     * @name bsDropdown
     * @property {expression|boolean} bsDropdown
     */
    return {
        restrict: 'A',
        require: {
            boundary: '?^bsDropdownBoundary'
        },
        bindToController: {
            bsDropdown: '=?',
            boundaryElement: '<?'
        },
        controller: BSDropdownDirectiveController
    };
}
