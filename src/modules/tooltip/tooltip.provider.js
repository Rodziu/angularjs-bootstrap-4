/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';
	/**
	 * Tooltip default configuration
	 */
	angular.module('angularBS.tooltip').provider('Tooltip', function(){
		this.config = {
			animation: true,
			delay: 0,
			placement: 'bottom',
			html: false,
			title: "",
			trigger: 'hover focus'
		};
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.config;
		};
	});
}();
