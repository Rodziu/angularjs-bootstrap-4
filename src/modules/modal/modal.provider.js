/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    function modalProvider() {
        const Modal = this;
        Modal.config = {
            backdrop: 'static',
            keyboard: true,
            transitionDuration: 300,
            backdropTransitionDuration: 150,
            onBeforeChange: angular.noop
        };
        Modal.backdropController = null;
        // noinspection JSUnusedGlobalSymbols
        Modal.$get = function() {
            return Modal;
        };
    }

    /**
	 * Modal default configuration
	 */
    angular.module('angularBS.modal').provider('Modal', modalProvider);
}());
