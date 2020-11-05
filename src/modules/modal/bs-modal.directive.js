/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    /**
     * @ngInject
     */
    class BSModalController {
        constructor($scope, $element, $timeout, $document, $injector, Modal, ModalBackdrop) {
            this.$scope = $scope;
            this.$element = $element;
            this.$timeout = $timeout;
            this.$document = $document;
            this.$injector = $injector;
            this.Modal = Modal;
            this.ModalBackdrop = ModalBackdrop;
        }


        $onInit() {
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

        $doCheck() {
            if (this._bsModal !== this.bsModal) {
                this._bsModal = this.bsModal;
                if (this.bsModal) {
                    this._doShow();
                } else {
                    this._doHide();
                }
            }
        }

        $onDestroy() {
            if (this.bsModal) {
                this._doHide();
            }
            this.$document.off('keydown', this._keydownHandler);
        }

        _onKeydown(e) {
            if (this.keyboard && e.key === 'Escape') {
                this.$scope.$apply(() => {
                    this.hide();
                });
            }
        }

        _doShow() {
            if (!this.$element.hasClass('show')) {
                this.$element.css({display: 'block'});
                this.$element[0].offsetWidth; // force reflow
                this.ModalBackdrop.show(this.backdrop, this.$element.hasClass('fade')).then(() => {
                    this.$element.addClass('show');
                });
            }
        }

        _doHide() {
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

        _shouldChange() {
            let ret = this.onBeforeChange();
            if (ret !== false) {
                ret = this.$injector.invoke(this.Modal.config.onBeforeChange, this);
            }
            return ret !== false;
        }

        show() {
            if (this.bsModal) {
                return;
            }
            if (this._shouldChange()) {
                this.bsModal = this._bsModal = true;
                this._doShow();
            }
        }

        hide() {
            if (!this.bsModal) {
                return;
            }
            if (this._shouldChange()) {
                this.bsModal = this._bsModal = false;
                this._doHide();
            }
        }
    }

    function bsModalDirectiveController() {
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

    /**
     * @ngdoc directive
     * @name bsModal
     *
     * @param {expression} bsModal
     * @param {string|boolean} backdrop
     * @param {boolean} keyboard
     */
    angular.module('angularBS.modal').directive('bsModal', bsModalDirectiveController);
}());
