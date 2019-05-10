/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';
	/**
	 * Carousel config
	 */
	angular.module('angularBS.carousel').provider('Carousel', function(){
		this.config = {
			interval: 5000,
			pause: 'hover',
			wrap: true,
			keyboard: true
		};
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.config;
		};
	});
}();
