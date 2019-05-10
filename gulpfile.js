/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	const gulp = require('gulp'),
		concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps');

	const ngAnnotate = require('@rodziu/gulp-ng-annotate-patched'),
		uglify = require('gulp-uglify-es').default,
		eslint = require('gulp-eslint');

	function jsTask(){
		return gulp.src([
			'src/**/*.module.js',
			'src/**/*.js'
		])
			.pipe(ngAnnotate())
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError())
			.pipe(concat('angularjs-bootstrap-4.js'))
			.pipe(gulp.dest('dist'))
			.pipe(rename('angularjs-bootstrap-4.min.js'))
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(sourcemaps.write('./', {includeContent: false}))
			.pipe(gulp.dest('dist'));
	}

	//
	exports.default = jsTask;
}();
