/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	/**
	 * Popover default config
	 */
	angular.module('angularBS.popover').provider('Popover', function(){
		this.config = {
			animation: true,
			delay: 0,
			html: false,
			placement: 'right',
			title: '',
			content: '',
			trigger: 'click'
		};
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.config;
		};
	});
}();
