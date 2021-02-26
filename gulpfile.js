/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	const gulp = require('gulp'),
		ts = require('gulp-typescript'),
		sourcemaps = require('gulp-sourcemaps'),
		eslint = require('gulp-eslint'),
		ngAnnotate = require('@rodziu/gulp-ng-annotate-patched'),
		plumber = require('gulp-plumber'),
		log = require('fancy-log'),
		merge = require('merge2'),
		webpack = require('webpack'),
		webpackStream = require('webpack-stream');

	gulp.task('ts', () => {
		const tsProject = ts.createProject('tsconfig.json'),
			tsResult = gulp.src([
			'src/**/*.ts',
		])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError())
			.pipe(sourcemaps.init())
			.pipe(tsProject());

		return merge([
			tsResult.dts.pipe(gulp.dest('dist')),
			tsResult.js
				.pipe(plumber())
				.pipe(ngAnnotate().on('error', (e) => {
					log('\x1b[31mngAnnotate\x1b[0m ', e.message);
				}))
				.pipe(plumber.stop())
				.pipe(sourcemaps.write())
				.pipe(gulp.dest('.build'))
		]);
	});

	gulp.task('bundle', () => {
		return _bundle(false);
	});

	gulp.task('bundle:prod', () => {
		return _bundle(true);
	});

	function _bundle(production) {
		return gulp.src('dummy', {allowEmpty: true})
			.pipe(webpackStream({
				entry: {
					'angularjs-bootstrap-4': './.build/angularjs-bootstrap-4.js'
				},
				mode: production ? 'production' : 'development',
				externals: {
					angular: 'angular',
					'angular-animate': 'angular-animate'
				},
				output: {
					devtoolNamespace: 'angularBS',
					filename: (pathData) => {
						let name = pathData.chunk.name;
						return name.substring(0, 1).toLowerCase()
							+ name.substring(1).replace(/[A-Z]/g, (letter) => {
								return '-' + letter.toLowerCase();
							})
							+ (production ? '.min' : '') + '.js'
					},
					library: '[name]',
					libraryTarget: 'umd',
					libraryExport: 'default',
					umdNamedDefine: true,
					globalObject: 'window'
				},
				module: {
					rules: [
						{
							test: /\.js$/,
							enforce: 'pre',
							use: ['source-map-loader'],
						},
					],
				},
				devtool: 'source-map'
			}, webpack))
			.pipe(gulp.dest('dist'));
	}

	gulp.task('watch', function() {
		[
			['src/**/*.ts', 'ts'],
		].forEach(([src, task]) => {
			gulp.watch(src, {}, gulp.series(task, 'bundle', 'bundle:prod'));
		});
	});

	//
	exports.default = gulp.series('ts', 'bundle', 'bundle:prod');
}();
