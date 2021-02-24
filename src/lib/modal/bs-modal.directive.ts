/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


import {IDirective, IDocumentService, IScope, ITimeoutService} from 'angular';
import IInjectorService = angular.auto.IInjectorService;
import {ModalBackdropFactory} from './modal-backdrop.factory';
import {ModalProvider} from './modal.provider';
import * as angular from 'angular';

/**
 * @ngInject
 */
export class BSModalController {
    private readonly $timeout: ITimeoutService;
    private $document: IDocumentService;
    private $injector: IInjectorService;
    private Modal: ModalProvider;
    private ModalBackdrop: ModalBackdropFactory;
    private _keydownHandler: (JQueryEventObject) => void;
    private _bsModal: boolean;
    private onBeforeChange: () => boolean;
    public $scope: IScope;
    public $element: JQLite;
    public backdrop: 'static' | boolean;
    public keyboard: boolean;
    public bsModal: boolean;

    constructor(
        $scope: IScope,
        $element: JQLite,
        $timeout: ITimeoutService,
        $document: IDocumentService,
        $injector: IInjectorService,
        Modal: ModalProvider,
        ModalBackdrop: ModalBackdropFactory
    ) {
        this.$scope = $scope;
        this.$element = $element;
        this.$timeout = $timeout;
        this.$document = $document;
        this.$injector = $injector;
        this.Modal = Modal;
        this.ModalBackdrop = ModalBackdrop;
    }


    $onInit(): void {
        if (angular.isUndefined(this.keyboard)) {
            this.keyboard = this.Modal.config.keyboard;
        }
        if (angular.isUndefined(this.backdrop)) {
            this.backdrop = this.Modal.config.backdrop;
        }
        // backdrop click
        this.$element.on('click', (e) => {
            if (window.getSelection().type === 'Range') {
                return;
            }
            if (this.backdrop === true && e.target === this.$element[0]) { // .modal covers whole page
                this.$scope.$apply(() => {
                    this.hide();
                });
            }
        });
        // keyboard esc
        this._keydownHandler = (e) => this._onKeydown(e);
        this.$document.on('keydown', this._keydownHandler);
    }

    $doCheck(): void {
        if (this._bsModal !== this.bsModal) {
            this._bsModal = this.bsModal;
            if (this.bsModal) {
                this._doShow();
            } else {
                this._doHide();
            }
        }
    }

    $onDestroy(): void {
        if (this.bsModal) {
            this._doHide();
        }
        this.$document.off('keydown', this._keydownHandler);
    }

    _onKeydown(e: JQueryKeyEventObject): void {
        if (this.keyboard && e.key === 'Escape') {
            this.$scope.$apply(() => {
                this.hide();
            });
        }
    }

    _doShow(): void {
        if (!this.$element.hasClass('show')) {
            this.$element.css({display: 'block'});
            this.$element[0].offsetWidth; // force reflow
            this.ModalBackdrop
                .show(!!this.backdrop, this.$element.hasClass('fade'))
                .then(() => {
                    this.$element.addClass('show');
                });
        }
    }

    _doHide(): void {
        if (this.$element.hasClass('show')) {
            this.$element.removeClass('show');
            let transitionEnded = false;
            const callback = () => {
                    this.ModalBackdrop.hide();
                    this.$element.css({display: ''});
                },
                transition = () => {
                    if (!transitionEnded) {
                        this.$element[0].removeEventListener('transitionend', transition);
                        callback();
                        transitionEnded = true;
                    }
                };
            if (this.$element.hasClass('fade')) {
                this.$element[0].addEventListener('transitionend', transition);
                this.$timeout(transition, 300);
            } else {
                callback();
            }
        }
    }

    _shouldChange(): boolean {
        let ret = this.onBeforeChange();
        if (ret !== false) {
            ret = this.$injector.invoke(this.Modal.config.onBeforeChange, this);
        }
        return ret !== false;
    }

    show(): void {
        if (this.bsModal) {
            return;
        }
        if (this._shouldChange()) {
            this.bsModal = this._bsModal = true;
            this._doShow();
        }
    }

    hide(): void {
        if (!this.bsModal) {
            return;
        }
        if (this._shouldChange()) {
            this.bsModal = this._bsModal = false;
            this._doHide();
        }
    }
}

export function bsModalDirective(): IDirective {
    /**
     * @ngdoc directive
     * @name bsModal
     *
     * @param {expression} bsModal
     * @param {string|boolean} backdrop
     * @param {boolean} keyboard
     * @param {Function} onBeforeChange
     */
    return {
        restrict: 'A',
        scope: true,
        bindToController: {
            bsModal: '=',
            keyboard: '<?',
            backdrop: '<?',
            onBeforeChange: '&'
        },
        controller: BSModalController,
        controllerAs: 'bsModal'
    };
}
