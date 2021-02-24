/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {AngularBSService} from './angularBS.service';

const helpersModule = angular.module('angularBS.helpers', [])
    .factory('angularBS', AngularBSService);

export const helpers = helpersModule.name;
