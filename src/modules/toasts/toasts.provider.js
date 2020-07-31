/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    function toastsProvider() {
        this.config = {
            animation: true
        };

        this.$get = function() {
            return this.config;
        };
    }

    angular.module('angularBS.toasts').provider('Toasts', toastsProvider);
}());
