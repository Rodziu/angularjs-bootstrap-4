/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    function bsModalController($scope, $element, $attrs, $timeout, $document, $q, Modal, ModalBackdrop) {
        let backdrop = Modal.config.backdrop;
        const ctrl = this,
            show = function() {
                if (!$element.hasClass('show')) {
                    $element.css({display: 'block'});
                    $element[0].offsetWidth; // force reflow
                    ModalBackdrop.show(backdrop, $element.hasClass('fade')).then(function() {
                        $element.addClass('show');
                    });
                }
            },
            hide = function() {
                if ($element.hasClass('show')) {
                    $element.removeClass('show');
                    let transitionEnded = false;
                    const callback = function() {
                            ModalBackdrop.hide();
                            $element.css({display: ''});
                        },
                        transition = function() {
                            if (!transitionEnded) {
                                $element[0].removeEventListener('transitionend', transition);
                                callback();
                                transitionEnded = true;
                            }
                        };
                    if ($element.hasClass('fade')) {
                        $element[0].addEventListener('transitionend', transition);
                        $timeout(transition, 300);
                    } else {
                        callback();
                    }
                }
            },
            keydown = function(e) {
                if (ctrl.keyboard && e.key === 'Escape') {
                    ctrl.bsModal = false;
                    $scope.$digest();
                }
            };

        let _isOpen;

        ctrl.$scope = $scope; // used in dismiss directive

        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.keyboard)) {
                ctrl.keyboard = Modal.config.keyboard;
            }
            _isOpen = ctrl.bsModal;
        };

        ctrl.$doCheck = function() {
            if (_isOpen !== ctrl.bsModal) {
                let ret = ctrl.onBeforeChange({bsModalController: ctrl});
                if (ret !== false) {
                    ret = Modal.config.onBeforeChange(ctrl);
                }
                if (ret !== false) {
                    _isOpen = ctrl.bsModal;
                    if (_isOpen) {
                        show();
                    } else {
                        hide();
                    }
                } else {
                    ctrl.bsModal = _isOpen;
                }
            }
        };
        /**
         */
        ctrl.$onDestroy = function() {
            if (ctrl.bsModal) {
                hide();
            }
            $document.off('keydown', keydown);
        };
        //
        $attrs.$observe('backdrop', function(value) {
            backdrop = value === 'static' ? 'static' : !(value === 'false' || !value);
        });
        // backdrop click
        $element.on('click', function(e) {
            if (backdrop === true && e.target === $element[0]) { // .modal covers whole page
                ctrl.bsModal = false;
                $scope.$digest();
            }
        });
        // keyboard esc
        $document.on('keydown', keydown);
    }

    function bsModalDirectiveController() {
        return {
            restrict: 'A',
            bindToController: {
                bsModal: '=',
                keyboard: '<?',
                onBeforeChange: '&'
            },
            controller: bsModalController
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
