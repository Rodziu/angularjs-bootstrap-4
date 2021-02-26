(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("angular-animate"));
	else if(typeof define === 'function' && define.amd)
		define("angularjs-bootstrap-4", ["angular", "angular-animate"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-bootstrap-4"] = factory(require("angular"), require("angular-animate"));
	else
		root["angularjs-bootstrap-4"] = factory(root["angular"], root["angular-animate"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_angular__, __WEBPACK_EXTERNAL_MODULE_angular_animate__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.build/lib/angularBS.module.js":
/*!****************************************!*\
  !*** ./.build/lib/angularBS.module.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBS": () => (/* binding */ angularBS)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _carousel_carousel_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel/carousel.module */ "./.build/lib/carousel/carousel.module.js");
/* harmony import */ var _collapse_collapse_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collapse/collapse.module */ "./.build/lib/collapse/collapse.module.js");
/* harmony import */ var _dropdown_dropdown_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdown/dropdown.module */ "./.build/lib/dropdown/dropdown.module.js");
/* harmony import */ var _modal_modal_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal/modal.module */ "./.build/lib/modal/modal.module.js");
/* harmony import */ var _popover_popover_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popover/popover.module */ "./.build/lib/popover/popover.module.js");
/* harmony import */ var _toasts_toasts_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toasts/toasts.module */ "./.build/lib/toasts/toasts.module.js");
/* harmony import */ var _tooltip_tooltip_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tooltip/tooltip.module */ "./.build/lib/tooltip/tooltip.module.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */








const angularBSModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS', [
    _modal_modal_module__WEBPACK_IMPORTED_MODULE_4__.angularBSModal, _dropdown_dropdown_module__WEBPACK_IMPORTED_MODULE_3__.angularBSDropdown, _tooltip_tooltip_module__WEBPACK_IMPORTED_MODULE_7__.angularBSTooltip, _popover_popover_module__WEBPACK_IMPORTED_MODULE_5__.angularBSPopover, _collapse_collapse_module__WEBPACK_IMPORTED_MODULE_2__.angularBSCollapse,
    _carousel_carousel_module__WEBPACK_IMPORTED_MODULE_1__.angularBSCarousel, _toasts_toasts_module__WEBPACK_IMPORTED_MODULE_6__.angularBSToasts
]);
const angularBS = angularBSModule.name;



/***/ }),

/***/ "./.build/lib/carousel/bs-carousel-indicators.component.js":
/*!*****************************************************************!*\
  !*** ./.build/lib/carousel/bs-carousel-indicators.component.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsCarouselIndicatorsComponent": () => (/* binding */ bsCarouselIndicatorsComponent)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
const bsCarouselIndicatorsComponent = {
    template: '<ol class="carousel-indicators">'
        + '<li ng-repeat="s in ctrl.carousel.slides" ng-click="ctrl.carousel.slideTo($index)" '
        + 'ng-class="{active: $index === ctrl.carousel.currentSlide}"></li>'
        + '</ol>',
    require: {
        carousel: '^bsCarousel'
    },
    controllerAs: 'ctrl'
};



/***/ }),

/***/ "./.build/lib/carousel/bs-carousel-item.directive.js":
/*!***********************************************************!*\
  !*** ./.build/lib/carousel/bs-carousel-item.directive.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsCarouselItemDirective": () => (/* binding */ bsCarouselItemDirective)
/* harmony export */ });
/**
 * @ngInject
 */
class BsCarouselItemDirectiveController {
    constructor($element) {
        this.$element = $element;
    }
    $onInit() {
        this.$element.addClass('carousel-item');
    }
}
BsCarouselItemDirectiveController.$inject = ["$element"];
function bsCarouselItemDirective() {
    return {
        restrict: 'A',
        require: '^bsCarousel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.register(element);
        },
        controller: BsCarouselItemDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/carousel/bs-carousel-nav.directive.js":
/*!**********************************************************!*\
  !*** ./.build/lib/carousel/bs-carousel-nav.directive.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsCarouselNavDirective": () => (/* binding */ bsCarouselNavDirective)
/* harmony export */ });
function bsCarouselNavDirective() {
    return {
        restrict: 'A',
        require: '^bsCarousel',
        link: function (scope, element, attrs, ctrl) {
            element.on('click', function () {
                ctrl.prevNextSlide(attrs['bsCarouselNav'] === 'right');
                scope.$digest();
            });
        }
    };
}



/***/ }),

/***/ "./.build/lib/carousel/bs-carousel.directive.js":
/*!******************************************************!*\
  !*** ./.build/lib/carousel/bs-carousel.directive.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsCarouselDirective": () => (/* binding */ bsCarouselDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

/**
 * @ngInject
 */
class BsCarouselDirectiveController {
    constructor($scope, $element, $attrs, $interval, Carousel) {
        this.carouselInterval = null;
        this.slides = [];
        this.currentSlide = -1;
        this.sliding = false;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$interval = $interval;
        this.Carousel = Carousel;
        this.$element.on('keydown', (e) => {
            if (!this.keyboard
                || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                || /input|textarea/i.test(e.target.tagName)) {
                return;
            }
            if (e.key === 'ArrowLeft') {
                this.prevNextSlide(false);
            }
            else {
                this.prevNextSlide(true);
            }
            $scope.$digest();
            e.preventDefault();
        });
    }
    $onInit() {
        const interval = 'interval' in this.$attrs ? parseInt(this.$attrs['interval']) : this.Carousel.interval, pause = 'pause' in this.$attrs ? this.$attrs['pause'] === 'hover' : this.Carousel.pause;
        if (interval) {
            const cycle = () => {
                this.carouselInterval = this.$interval(() => {
                    this.prevNextSlide(true);
                }, interval);
            };
            if (pause) {
                this.$element.on('mouseenter', () => {
                    this.$interval.cancel(this.carouselInterval);
                });
                this.$element.on('mouseleave', cycle);
            }
            cycle();
        }
    }
    $onChanges() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.wrap)) {
            this.wrap = this.Carousel.wrap;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.keyboard)) {
            this.keyboard = this.Carousel.keyboard;
        }
    }
    $onDestroy() {
        if (this.carouselInterval !== null) {
            this.$interval.cancel(this.carouselInterval);
        }
    }
    register($element) {
        this.slides.push($element);
        if ($element.hasClass('active')) {
            if (~this.currentSlide) {
                this.slides[this.currentSlide].removeClass('active');
            }
            this.currentSlide = this.slides.length - 1;
        }
        else if (!~this.currentSlide) {
            $element.addClass('active');
            this.currentSlide = this.slides.length - 1;
        }
    }
    unregister($element) {
        this.slides.splice(this.slides.indexOf($element, 1));
    }
    prevNextSlide(isNext) {
        const nextIndex = isNext ? this.currentSlide + 1 : this.currentSlide - 1;
        if ((nextIndex >= this.slides.length || nextIndex < 0)
            && !this.wrap) {
            return;
        }
        this.slideTo(nextIndex, isNext ? 'left' : 'right');
    }
    slideTo(index, direction) {
        if (index < 0) {
            index = this.slides.length - 1;
        }
        else if (index >= this.slides.length) {
            index = 0;
        }
        this.changeSlide(index, direction);
    }
    changeSlide(nextSlide, direction) {
        if (nextSlide !== this.currentSlide && !this.sliding) {
            this.sliding = true;
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(direction)) {
                direction = nextSlide > this.currentSlide ? 'left' : 'right';
            }
            const next = this.slides[nextSlide], active = this.slides[this.currentSlide], transition = () => {
                active[0].removeEventListener('transitionend', transition);
                next.removeClass('carousel-item-next carousel-item-prev carousel-item-' + direction)
                    .addClass('active');
                active.removeClass('active carousel-item-' + direction);
                this.sliding = false;
            };
            next.addClass(direction === 'left' ? 'carousel-item-next' : 'carousel-item-prev');
            next[0].offsetWidth; // force reflow
            active.addClass('carousel-item-' + direction);
            next.addClass('carousel-item-' + direction);
            active[0].addEventListener('transitionend', transition);
            this.currentSlide = nextSlide;
        }
    }
}
BsCarouselDirectiveController.$inject = ["$scope", "$element", "$attrs", "$interval", "Carousel"];
function bsCarouselDirective() {
    /**
     * @ngdoc directive
     * @name bsCarousel
     *
     * @param interval
     * @param pause
     * @param {expression|boolean} wrap
     * @param {expression|boolean} keyboard
     */
    return {
        restrict: 'A',
        bindToController: {
            wrap: '<?',
            keyboard: '<?'
        },
        controller: BsCarouselDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/carousel/carousel.module.js":
/*!************************************************!*\
  !*** ./.build/lib/carousel/carousel.module.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBSCarousel": () => (/* binding */ angularBSCarousel)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _carousel_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.provider */ "./.build/lib/carousel/carousel.provider.js");
/* harmony import */ var _bs_carousel_indicators_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bs-carousel-indicators.component */ "./.build/lib/carousel/bs-carousel-indicators.component.js");
/* harmony import */ var _bs_carousel_item_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bs-carousel-item.directive */ "./.build/lib/carousel/bs-carousel-item.directive.js");
/* harmony import */ var _bs_carousel_nav_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bs-carousel-nav.directive */ "./.build/lib/carousel/bs-carousel-nav.directive.js");
/* harmony import */ var _bs_carousel_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bs-carousel.directive */ "./.build/lib/carousel/bs-carousel.directive.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */






const carouselModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS.carousel', [])
    .provider('Carousel', _carousel_provider__WEBPACK_IMPORTED_MODULE_1__.CarouselProvider)
    .component('bsCarouselIndicators', _bs_carousel_indicators_component__WEBPACK_IMPORTED_MODULE_2__.bsCarouselIndicatorsComponent)
    .directive('bsCarouselItem', _bs_carousel_item_directive__WEBPACK_IMPORTED_MODULE_3__.bsCarouselItemDirective)
    .directive('bsCarouselNav', _bs_carousel_nav_directive__WEBPACK_IMPORTED_MODULE_4__.bsCarouselNavDirective)
    .directive('bsCarousel', _bs_carousel_directive__WEBPACK_IMPORTED_MODULE_5__.bsCarouselDirective);
const angularBSCarousel = carouselModule.name;



/***/ }),

/***/ "./.build/lib/carousel/carousel.provider.js":
/*!**************************************************!*\
  !*** ./.build/lib/carousel/carousel.provider.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CarouselProvider": () => (/* binding */ CarouselProvider)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
class CarouselProvider {
    constructor() {
        this.config = {
            interval: 5000,
            pause: 'hover',
            wrap: true,
            keyboard: true
        };
    }
    $get() {
        return this.config;
    }
}



/***/ }),

/***/ "./.build/lib/collapse/bs-collapse-group.directive.js":
/*!************************************************************!*\
  !*** ./.build/lib/collapse/bs-collapse-group.directive.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BsCollapseGroupDirectiveController": () => (/* binding */ BsCollapseGroupDirectiveController),
/* harmony export */   "bsCollapseGroupDirective": () => (/* binding */ bsCollapseGroupDirective)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
/**
 * @ngInject
 */
class BsCollapseGroupDirectiveController {
    constructor() {
        this.children = [];
    }
    register(bsCollapseCtrl) {
        this.children.push(bsCollapseCtrl);
    }
    unregister(bsCollapseCtrl) {
        this.children.splice(this.children.indexOf(bsCollapseCtrl), 1);
    }
    expand(invokingCtrl) {
        for (let c = 0; c < this.children.length; c++) {
            if (this.children[c] !== invokingCtrl) {
                this.children[c].bsCollapse = true;
            }
        }
    }
}
function bsCollapseGroupDirective() {
    return {
        restrict: 'A',
        controller: BsCollapseGroupDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/collapse/bs-collapse.directive.js":
/*!******************************************************!*\
  !*** ./.build/lib/collapse/bs-collapse.directive.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BsCollapseDirectiveController": () => (/* binding */ BsCollapseDirectiveController),
/* harmony export */   "bsCollapseDirective": () => (/* binding */ bsCollapseDirective)
/* harmony export */ });
/* harmony import */ var angular_animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular-animate */ "angular-animate");
/* harmony import */ var angular_animate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular_animate__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

/**
 * @ngInject
 */
class BsCollapseDirectiveController {
    constructor($scope, $element, $animateCss) {
        this.$scope = $scope;
        this.$element = $element;
        this.$animateCss = $animateCss;
        $scope.$watch(() => {
            return this.bsCollapse;
        }, (nV) => {
            this.bsCollapse = !!nV;
            if (this.bsCollapse) {
                this.collapse();
            }
            else {
                this.expand();
                if (this.group) {
                    this.group.expand(this);
                }
            }
        });
    }
    $onInit() {
        if (this.bsCollapse) {
            this.$element.removeClass('show collapsing').addClass('collapse');
            this.$element.css({ height: null });
        }
        else {
            this.$element.removeClass('collapsing').addClass('collapse show');
        }
    }
    expand() {
        if (!this.$element.hasClass('show')) {
            this.$element.removeClass('collapse').addClass('collapsing');
            if (this.$animateCss) {
                this.$animateCss(this.$element, {
                    addClass: 'show',
                    easing: 'ease',
                    to: {
                        height: this.$element[0].scrollHeight + 'px'
                    }
                }).start()['finally'](() => {
                    this.$element.removeClass('collapsing').addClass('collapse').css({ height: 'auto' });
                });
            }
        }
    }
    collapse() {
        if (this.$element.hasClass('show')) {
            this.$element.css({
                height: this.$element[0].scrollHeight + 'px'
            }).removeClass('collapse').addClass('collapsing');
            this.$animateCss(this.$element, {
                removeClass: 'show',
                to: { height: '0' }
            }).start()['finally'](() => {
                this.$element.css({ height: null });
                this.$element.removeClass('collapsing').addClass('collapse');
            });
        }
    }
}
BsCollapseDirectiveController.$inject = ["$scope", "$element", "$animateCss"];
function bsCollapseDirective() {
    /**
     * @ngdoc directive
     * @name bsCollapse
     *
     * @param {expression|boolean} bsCollapse
     */
    return {
        restrict: 'A',
        bindToController: {
            bsCollapse: '=?'
        },
        require: ['bsCollapse', '?^bsCollapseGroup'],
        link: function (scope, element, attrs, ctrl) {
            if (ctrl[1] !== null) {
                ctrl[1].register(ctrl[0]);
                ctrl[0].group = ctrl[1];
                scope.$on('destroy', () => {
                    ctrl[1].unregister(ctrl[0]);
                });
            }
        },
        controller: BsCollapseDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/collapse/collapse.module.js":
/*!************************************************!*\
  !*** ./.build/lib/collapse/collapse.module.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBSCollapse": () => (/* binding */ angularBSCollapse)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bs_collapse_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bs-collapse.directive */ "./.build/lib/collapse/bs-collapse.directive.js");
/* harmony import */ var _bs_collapse_group_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bs-collapse-group.directive */ "./.build/lib/collapse/bs-collapse-group.directive.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */



const collapseModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS.collapse', [])
    .directive('bsCollapse', _bs_collapse_directive__WEBPACK_IMPORTED_MODULE_1__.bsCollapseDirective)
    .directive('bsCollapseGroup', _bs_collapse_group_directive__WEBPACK_IMPORTED_MODULE_2__.bsCollapseGroupDirective);
const angularBSCollapse = collapseModule.name;



/***/ }),

/***/ "./.build/lib/dropdown/bs-dropdown-boundary.directive.js":
/*!***************************************************************!*\
  !*** ./.build/lib/dropdown/bs-dropdown-boundary.directive.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BsDropdownBoundaryDirectiveController": () => (/* binding */ BsDropdownBoundaryDirectiveController),
/* harmony export */   "bsDropdownBoundaryDirective": () => (/* binding */ bsDropdownBoundaryDirective)
/* harmony export */ });
/**
 * @ngInject
 */
class BsDropdownBoundaryDirectiveController {
    constructor($element) {
        this.$element = $element;
    }
}
BsDropdownBoundaryDirectiveController.$inject = ["$element"];
function bsDropdownBoundaryDirective() {
    return {
        restrict: 'A',
        controller: BsDropdownBoundaryDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/dropdown/bs-dropdown-toggle.directive.js":
/*!*************************************************************!*\
  !*** ./.build/lib/dropdown/bs-dropdown-toggle.directive.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsDropdownToggleDirective": () => (/* binding */ bsDropdownToggleDirective)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
function bsDropdownToggleDirective() {
    return {
        restrict: 'A',
        require: '^bsDropdown',
        link: function (scope, element, attrs, dropdownCtrl) {
            element.on('click', () => {
                scope.$apply(() => {
                    dropdownCtrl.bsDropdown = !dropdownCtrl.bsDropdown;
                });
            });
        }
    };
}



/***/ }),

/***/ "./.build/lib/dropdown/bs-dropdown.directive.js":
/*!******************************************************!*\
  !*** ./.build/lib/dropdown/bs-dropdown.directive.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsDropdownDirective": () => (/* binding */ bsDropdownDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @ngInject
 */
class BSDropdownDirectiveController {
    constructor($scope, $element, $document, angularBS) {
        this.$scope = $scope;
        this.$element = $element;
        this.$document = $document;
        this.angularBS = angularBS;
    }
    $onInit() {
        this.bsDropdown = !!this.bsDropdown;
        this.$element.addClass('dropdown');
        this.$document.on('click', this._onClick.bind(this));
        this.$element.on('keydown', this._keydown.bind(this));
    }
    $doCheck() {
        if (this._bsDropdown !== this.bsDropdown) {
            this._bsDropdown = this.bsDropdown;
            if (this.bsDropdown) {
                this.$element.addClass('show');
                angular__WEBPACK_IMPORTED_MODULE_0__.element(this.$element[0].querySelectorAll('.dropdown-menu')).addClass('show');
                if (this.boundary || this.boundaryElement) {
                    this.reposition();
                }
            }
            else {
                if (this.boundary || this.boundaryElement) {
                    this.$element.removeClass('dropup');
                }
                this.$element.removeClass('show');
                angular__WEBPACK_IMPORTED_MODULE_0__.element(this.$element[0].querySelectorAll('.dropdown-menu')).removeClass('show');
            }
        }
    }
    $onDestroy() {
        this.$document.off('click', this._onClick.bind(this));
        this.$element.off('keydown', this._keydown.bind(this));
    }
    _onClick(e) {
        if (this.bsDropdown && !this.$element[0].contains(e.target)) {
            this.$scope.$apply(() => {
                this.bsDropdown = false;
            });
        }
    }
    _keydown(e) {
        if (this.bsDropdown && e.key === 'Escape') {
            this.$scope.$apply(() => {
                this.bsDropdown = false;
            });
            return;
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const items = this.$element[0].querySelectorAll('.dropdown-menu a:not(.disabled)');
            let idx = -1;
            for (let i = 0; i < items.length; i++) {
                if (items[i].contains(e.target)) {
                    idx = i;
                    break;
                }
            }
            if (e.key === 'ArrowUp' && idx > 0) {
                idx--;
            }
            else if (e.key === 'ArrowDown' && idx < items.length - 1) {
                idx++;
            }
            if (!~idx) {
                idx = 0;
            }
            items[idx].focus();
        }
    }
    reposition() {
        const boundaryElement = this.boundary ? this.boundary.$element[0] : this.boundaryElement[0], boundaryOffset = this.angularBS.offset(boundaryElement), menuOffset = this.angularBS.offset(this.$element[0].querySelector('.dropdown-menu'));
        if (menuOffset.height + menuOffset.top > boundaryOffset.height + boundaryOffset.top) {
            this.$element.addClass('dropup');
        }
        else {
            this.$element.removeClass('dropup');
        }
    }
}
BSDropdownDirectiveController.$inject = ["$scope", "$element", "$document", "angularBS"];
function bsDropdownDirective() {
    /**
     * @ngdoc directive
     * @name bsDropdown
     * @property {expression|boolean} bsDropdown
     */
    return {
        restrict: 'A',
        require: {
            boundary: '?^bsDropdownBoundary'
        },
        bindToController: {
            bsDropdown: '=?',
            boundaryElement: '<?'
        },
        controller: BSDropdownDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/dropdown/dropdown.module.js":
/*!************************************************!*\
  !*** ./.build/lib/dropdown/dropdown.module.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBSDropdown": () => (/* binding */ angularBSDropdown)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_helpers_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/helpers.module */ "./.build/lib/helpers/helpers.module.js");
/* harmony import */ var _bs_dropdown_boundary_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bs-dropdown-boundary.directive */ "./.build/lib/dropdown/bs-dropdown-boundary.directive.js");
/* harmony import */ var _bs_dropdown_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bs-dropdown.directive */ "./.build/lib/dropdown/bs-dropdown.directive.js");
/* harmony import */ var _bs_dropdown_toggle_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bs-dropdown-toggle.directive */ "./.build/lib/dropdown/bs-dropdown-toggle.directive.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */





const dropdownModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS.dropdown', [_helpers_helpers_module__WEBPACK_IMPORTED_MODULE_1__.helpers])
    .directive('bsDropdownBoundary', _bs_dropdown_boundary_directive__WEBPACK_IMPORTED_MODULE_2__.bsDropdownBoundaryDirective)
    .directive('bsDropdown', _bs_dropdown_directive__WEBPACK_IMPORTED_MODULE_3__.bsDropdownDirective)
    .directive('bsDropdownToggle', _bs_dropdown_toggle_directive__WEBPACK_IMPORTED_MODULE_4__.bsDropdownToggleDirective);
const angularBSDropdown = dropdownModule.name;



/***/ }),

/***/ "./.build/lib/helpers/angularBS.service.js":
/*!*************************************************!*\
  !*** ./.build/lib/helpers/angularBS.service.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AngularBSService": () => (/* binding */ AngularBSService)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

class AngularBSService {
    /**
     * Get element width, height, position from top and left of document/window,
     */
    offset(element) {
        const elemBCR = element.getBoundingClientRect(), elemStyle = element['currentStyle'] || window.getComputedStyle(element);
        return {
            width: Math.ceil(angular__WEBPACK_IMPORTED_MODULE_0__.isNumber(elemBCR.width) ? elemBCR.width : element.offsetWidth)
                + parseInt(elemStyle.getPropertyValue('margin-left'))
                + parseInt(elemStyle.getPropertyValue('margin-right')),
            height: Math.ceil(angular__WEBPACK_IMPORTED_MODULE_0__.isNumber(elemBCR.height) ? elemBCR.height : element.offsetHeight)
                + parseInt(elemStyle.getPropertyValue('margin-top'))
                + parseInt(elemStyle.getPropertyValue('margin-bottom')),
            top: Math.ceil(elemBCR.top + (window.pageYOffset || document.documentElement.scrollTop)),
            left: Math.ceil(elemBCR.left + (window.pageXOffset || document.documentElement.scrollLeft)),
        };
    }
    /**
     * Removes all placement classes on given element
     */
    setPlacementCSS(element, prefix, placement) {
        const placements = ['top', 'left', 'right', 'bottom'];
        for (let p = 0; p < placements.length; p++) {
            element.removeClass(prefix + placements[p]);
        }
        element.addClass(prefix + placement);
    }
    /**
     * Position element aside of positionTo on given side (placement)
     * @param element
     * @param positionTo
     * @param placement
     * @param [boundaryElement] - defaults to document|window
     * @param cssPrefix
     * @returns {{top: number, left: number, position: string}}
     */
    positionElement(element, positionTo, placement, boundaryElement, cssPrefix) {
        const splitPlacement = placement.split(' ');
        let top = 0, left = 0, arrowTop = '50%', realPlacement = 'left', offset = this.offset(element[0]);
        const offsetTo = this.offset(positionTo[0]), placements = ['right', 'top', 'bottom'], auto = !!~splitPlacement.indexOf('auto'), calcPosition = () => {
            switch (realPlacement) {
                case 'bottom':
                    top = (offsetTo.top + offsetTo.height);
                    left = ((offsetTo.left + (offsetTo.width / 2)) - (offset.width / 2));
                    break;
                case 'top':
                    top = (offsetTo.top - offset.height);
                    left = ((offsetTo.left + (offsetTo.width / 2)) - (offset.width / 2));
                    break;
                case 'left':
                    top = (offsetTo.top + ((offsetTo.height - offset.height) / 2));
                    left = (offsetTo.left - offset.width);
                    break;
                case 'right':
                    top = (offsetTo.top + ((offsetTo.height - offset.height) / 2));
                    left = (offsetTo.left + offsetTo.width);
                    break;
            }
            this.setPlacementCSS(element, cssPrefix, realPlacement);
            // check to see if element has been resized after adding the placement
            const newOffset = this.offset(element[0]);
            if (newOffset.height !== offset.height || newOffset.width !== offset.width) {
                offset = newOffset;
                calcPosition();
            }
        };
        for (let p = 0; p < placements.length; p++) {
            if (~splitPlacement.indexOf(placements[p])) {
                realPlacement = placements[p];
                break;
            }
        }
        calcPosition();
        // get boundary offset
        const bo = angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(boundaryElement) ? this.offset(boundaryElement[0]) : {
            top: window.pageYOffset || document.documentElement.scrollTop,
            left: 0,
            width: Math.max(window.innerWidth, document.body.clientWidth),
            height: Math.max(window.innerHeight, document.body.clientHeight)
        };
        // change side if element would be outside of given viewport
        if (auto) {
            let newPlacement = realPlacement;
            switch (realPlacement) {
                case 'left':
                    if (left < bo.left) {
                        newPlacement = 'right';
                    }
                    break;
                case 'right':
                    if (left + offset.width + 10 > bo.left + bo.width) {
                        newPlacement = 'left';
                    }
                    break;
                case 'bottom':
                    if (top + offset.height + 10 > bo.top + bo.height) {
                        newPlacement = 'top';
                    }
                    break;
                case 'top':
                    if (top < bo.top) {
                        newPlacement = 'bottom';
                    }
                    break;
            }
            if (newPlacement !== realPlacement) {
                realPlacement = newPlacement;
                calcPosition();
            }
        }
        // adjust arrow position
        const arrow = angular__WEBPACK_IMPORTED_MODULE_0__.element(element[0].querySelector('.arrow'));
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(arrow)) {
            switch (realPlacement) {
                case 'left':
                case 'right':
                    if (top < bo.top) {
                        top = bo.top;
                        arrowTop = (offsetTo.top + offsetTo.height / 2) + 'px';
                    }
                    else if (top + offset.height > bo.top + bo.height) {
                        top = bo.top + bo.height - offset.height;
                        let arrowTopN = offsetTo.top + offsetTo.height / 2 - top;
                        if (arrowTopN > offset.height - 15) {
                            arrowTopN = offset.height - 15;
                        }
                        arrowTop = arrowTopN + 'px';
                    }
                    arrow.css('top', arrowTop);
                    break;
                case 'bottom':
                    arrow.css('top', '');
                    break;
                case 'top':
                    arrow.css('top', 'auto');
                    break;
            }
        }
        this.adjustArrow(element, realPlacement);
        // apply element position
        element.css({
            top: '0px',
            left: '0px',
            transform: 'translate3d(' + left + 'px, ' + top + 'px, 0px)'
        });
    }
    /**
     * Properly set arrow position of tooltip/popover element
     */
    adjustArrow(element, placement) {
        const arrow = angular__WEBPACK_IMPORTED_MODULE_0__.element(element[0].querySelector('.arrow'));
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(arrow)) {
            switch (placement) {
                case 'top':
                case 'bottom':
                    arrow.css('left', 'calc(50% - ' + (this.offset(arrow[0]).width / 2 + 'px)'));
                    break;
                case 'left':
                case 'right':
                    arrow.css('top', 'calc(50% - ' + (this.offset(arrow[0]).height / 2 + 'px)'));
                    break;
            }
        }
    }
}



/***/ }),

/***/ "./.build/lib/helpers/helpers.module.js":
/*!**********************************************!*\
  !*** ./.build/lib/helpers/helpers.module.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helpers": () => (/* binding */ helpers)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angularBS_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./angularBS.service */ "./.build/lib/helpers/angularBS.service.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


const helpersModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS.helpers', [])
    .factory('angularBS', _angularBS_service__WEBPACK_IMPORTED_MODULE_1__.AngularBSService);
const helpers = helpersModule.name;



/***/ }),

/***/ "./.build/lib/modal/bs-modal-backdrop.component.js":
/*!*********************************************************!*\
  !*** ./.build/lib/modal/bs-modal-backdrop.component.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BSModalBackdropController": () => (/* binding */ BSModalBackdropController),
/* harmony export */   "bsModalBackdropComponent": () => (/* binding */ bsModalBackdropComponent)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
class BSModalBackdropController {
    /**
     * @ngInject
     */
    constructor($element, $q, $timeout, ModalBackdrop) {
        this.$element = $element;
        this.$q = $q;
        this.$timeout = $timeout;
        this.ModalBackdrop = ModalBackdrop;
    }
    $onInit() {
        this.ModalBackdrop.backdropController = this;
        this.isAnimated = this.ModalBackdrop.isAnimated.bind(this.ModalBackdrop);
    }
    $postLink() {
        // wait until 'fade' class is added, we don't use $timeout cause we don't need a digest cycle here
        setTimeout(() => {
            this.$element.children()[0].offsetWidth; // force reflow
            this.$element.children().addClass('show');
            this.ModalBackdrop.shown();
        });
    }
    hide() {
        const defered = this.$q.defer(), backdropElement = this.$element.children();
        backdropElement.removeClass('show');
        if (this.isAnimated()) {
            let transitionFinished = false;
            const transition = function () {
                if (!transitionFinished) {
                    defered.resolve();
                    transitionFinished = true;
                }
            };
            backdropElement[0].addEventListener('transitionend', transition);
            this.$timeout(transition, 150);
        }
        else {
            defered.resolve();
        }
        return defered.promise;
    }
}
BSModalBackdropController.$inject = ["$element", "$q", "$timeout", "ModalBackdrop"];
const bsModalBackdropComponent = {
    template: '<div class="modal-backdrop" ng-class="{\'fade\': vm.isAnimated()}"></div>',
    controllerAs: 'vm',
    controller: BSModalBackdropController
};



/***/ }),

/***/ "./.build/lib/modal/bs-modal.directive.js":
/*!************************************************!*\
  !*** ./.build/lib/modal/bs-modal.directive.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BSModalController": () => (/* binding */ BSModalController),
/* harmony export */   "bsModalDirective": () => (/* binding */ bsModalDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

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
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.keyboard)) {
            this.keyboard = this.Modal.config.keyboard;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.backdrop)) {
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
            }
            else {
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
            this.$element.css({ display: 'block' });
            this.$element[0].offsetWidth; // force reflow
            this.ModalBackdrop
                .show(!!this.backdrop, this.$element.hasClass('fade'))
                .then(() => {
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
                this.$element.css({ display: '' });
            }, transition = () => {
                if (!transitionEnded) {
                    this.$element[0].removeEventListener('transitionend', transition);
                    callback();
                    transitionEnded = true;
                }
            };
            if (this.$element.hasClass('fade')) {
                this.$element[0].addEventListener('transitionend', transition);
                this.$timeout(transition, 300);
            }
            else {
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
BSModalController.$inject = ["$scope", "$element", "$timeout", "$document", "$injector", "Modal", "ModalBackdrop"];
function bsModalDirective() {
    /**
     * @ngdoc directive
     * @name bsModal
     *
     * @param {expression} bsModal
     * @param {string|boolean} backdrop
     * @param {boolean} keyboard
     * @param {Function} onBeforeChange
     */
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



/***/ }),

/***/ "./.build/lib/modal/dismiss.directive.js":
/*!***********************************************!*\
  !*** ./.build/lib/modal/dismiss.directive.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dismissDirective": () => (/* binding */ dismissDirective)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
function dismissDirective() {
    return {
        restrict: 'A',
        require: '^bsModal',
        link: function (scope, element, attrs, bsModal) {
            element.on('click', function () {
                scope.$apply(() => {
                    bsModal.hide();
                });
            });
        }
    };
}



/***/ }),

/***/ "./.build/lib/modal/modal-backdrop.factory.js":
/*!****************************************************!*\
  !*** ./.build/lib/modal/modal-backdrop.factory.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalBackdropFactory": () => (/* binding */ ModalBackdropFactory)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @ngInject
 */
class ModalBackdropFactory {
    constructor($document, $compile, $rootScope, $q) {
        this._isVisible = false;
        this._isAnimated = false;
        this._openModals = 0;
        this._doHide = () => {
            this._isVisible = false;
            this._bodyElement.removeClass('modal-open');
        };
        this.$q = $q;
        this._bodyElement = $document.find('body');
        const backdropElement = angular__WEBPACK_IMPORTED_MODULE_0__.element('<bs-modal-backdrop ng-if="isVisible()"></bs-modal-backdrop>'), backdropScope = $rootScope.$new(true);
        // create backdrop element in body
        backdropScope.isVisible = this.isVisible.bind(this);
        $compile(backdropElement)(backdropScope);
        this._bodyElement.append(backdropElement);
    }
    isVisible() {
        return this._isVisible;
    }
    isAnimated() {
        return this._isAnimated;
    }
    show(backdrop, animate) {
        this._openModals++;
        this._backDropPromise = this.$q.defer();
        this._isAnimated = !!animate;
        this._bodyElement.addClass('modal-open');
        if (backdrop && !this._isVisible) {
            this._isVisible = true;
        }
        else {
            this._backDropPromise.resolve();
        }
        return this._backDropPromise.promise;
    }
    shown() {
        this._backDropPromise.resolve();
    }
    hide() {
        this._openModals--;
        if (this._openModals < 0) {
            this._openModals = 0;
        }
        if (this._openModals === 0) {
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(this.backdropController)) {
                this.backdropController.hide().then(this._doHide);
            }
            else {
                this._doHide();
            }
        }
    }
}
ModalBackdropFactory.$inject = ["$document", "$compile", "$rootScope", "$q"];



/***/ }),

/***/ "./.build/lib/modal/modal.module.js":
/*!******************************************!*\
  !*** ./.build/lib/modal/modal.module.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBSModal": () => (/* binding */ angularBSModal)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.provider */ "./.build/lib/modal/modal.provider.js");
/* harmony import */ var _modal_backdrop_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-backdrop.factory */ "./.build/lib/modal/modal-backdrop.factory.js");
/* harmony import */ var _bs_modal_backdrop_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bs-modal-backdrop.component */ "./.build/lib/modal/bs-modal-backdrop.component.js");
/* harmony import */ var _bs_modal_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bs-modal.directive */ "./.build/lib/modal/bs-modal.directive.js");
/* harmony import */ var _dismiss_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dismiss.directive */ "./.build/lib/modal/dismiss.directive.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */






const modalModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS.modal', [])
    .provider('Modal', _modal_provider__WEBPACK_IMPORTED_MODULE_1__.ModalProvider)
    .factory('ModalBackdrop', _modal_backdrop_factory__WEBPACK_IMPORTED_MODULE_2__.ModalBackdropFactory)
    .component('bsModalBackdrop', _bs_modal_backdrop_component__WEBPACK_IMPORTED_MODULE_3__.bsModalBackdropComponent)
    .directive('bsModal', _bs_modal_directive__WEBPACK_IMPORTED_MODULE_4__.bsModalDirective)
    .directive('dismiss', _dismiss_directive__WEBPACK_IMPORTED_MODULE_5__.dismissDirective);
const angularBSModal = modalModule.name;



/***/ }),

/***/ "./.build/lib/modal/modal.provider.js":
/*!********************************************!*\
  !*** ./.build/lib/modal/modal.provider.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalProvider": () => (/* binding */ ModalProvider)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
class ModalProvider {
    constructor() {
        this.config = {
            backdrop: 'static',
            keyboard: true,
            transitionDuration: 300,
            backdropTransitionDuration: 150,
            onBeforeChange: () => true
        };
        this.backdropController = null;
    }
    $get() {
        return this;
    }
}



/***/ }),

/***/ "./.build/lib/popover/bs-popover-boundary.directive.js":
/*!*************************************************************!*\
  !*** ./.build/lib/popover/bs-popover-boundary.directive.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BsPopoverBoundaryDirectiveController": () => (/* binding */ BsPopoverBoundaryDirectiveController),
/* harmony export */   "bsPopoverBoundaryDirective": () => (/* binding */ bsPopoverBoundaryDirective)
/* harmony export */ });
/**
 * @ngInject
 */
class BsPopoverBoundaryDirectiveController {
    constructor($element) {
        this.$element = $element;
    }
}
BsPopoverBoundaryDirectiveController.$inject = ["$element"];
function bsPopoverBoundaryDirective() {
    return {
        restrict: 'A',
        controller: BsPopoverBoundaryDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/popover/bs-popover-toggle.directive.js":
/*!***********************************************************!*\
  !*** ./.build/lib/popover/bs-popover-toggle.directive.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsPopoverToggleDirective": () => (/* binding */ bsPopoverToggleDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

/**
 * @ngInject
 */
class BsPopoverToggleDirectiveController {
    constructor($scope, $element, $attrs, $compile, $timeout, $document, $sce, Popover) {
        this.popoverElement = null;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.$document = $document;
        this.$sce = $sce;
        this.Popover = Popover;
        this.documentClick = (e) => {
            if (!$element[0].contains(e.target)) {
                this.bsPopoverToggle = false;
                this.$scope.$digest();
            }
        };
        ['title', 'content'].forEach((attr) => {
            $attrs.$observe(attr, (value) => {
                if (!(angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(this.html) && this.html) || Popover.html) {
                    value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function (i) {
                        return '&#' + i.charCodeAt(0) + ';';
                    });
                }
                this[attr] = $sce.trustAsHtml(value);
                if (attr === 'title') {
                    $element.attr('title', '');
                }
            });
        });
        const watcher = this.$scope.$watch(() => {
            return this.bsPopoverToggle;
        }, (nV) => {
            if (nV) {
                this.bsPopoverToggle = false;
                this.$compile('<bs-popover visible="bsPpCtrl.bsPopoverToggle" animation="bsPpCtrl.animation" '
                    + 'delay="bsPpCtrl.delay" placement="{{bsPpCtrl.placement}}" '
                    + 'parent-element="bsPpCtrl.$element" '
                    + 'boundary="bsPpCtrl.boundary">'
                    + '<bs-popover-title ng-bind-html="bsPpCtrl.title"></bs-popover-title>'
                    + '<bs-popover-content ng-bind-html="bsPpCtrl.content"></bs-popover-content>'
                    + '</bs-popover>')(this.$scope.$new(), (newElement, newScope) => {
                    newScope.bsPpCtrl = this;
                    $document.find('body').append(newElement);
                    this.popoverElement = newElement;
                    // we delay popover display a little, to properly calculate its dimensions after its created
                    $timeout(() => {
                        this.bsPopoverToggle = true;
                    }, 50);
                });
                watcher(); // create popover element once and leave it be
            }
        });
    }
    $onInit() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.bsPopoverToggle)) {
            this.bsPopoverToggle = false;
        }
        const triggers = (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.$attrs.trigger) ? this.Popover.trigger : this.$attrs.trigger)
            .split(' '), open = () => {
            this.bsPopoverToggle = true;
            this.$scope.$digest();
        }, close = () => {
            this.bsPopoverToggle = false;
            this.$scope.$digest();
        };
        if (~triggers.indexOf('hover')) {
            this.$element.on('mouseenter', open);
            this.$element.on('mouseleave', close);
        }
        if (~triggers.indexOf('focus')) {
            this.$element.on('click', open);
            this.$document.on('click', this.documentClick);
        }
        if (~triggers.indexOf('click')) {
            this.$element.on('click', () => {
                this.bsPopoverToggle = !this.bsPopoverToggle;
                this.$scope.$digest();
            });
        }
        this.placement = angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.$attrs.placement) ? this.Popover.placement : this.$attrs.placement;
        this.title = this.$sce.trustAsHtml(this.Popover.title);
        this.content = this.$sce.trustAsHtml(this.Popover.content);
    }
    $onDestroy() {
        if (this.popoverElement !== null) {
            this.popoverElement.remove();
        }
        this.$document.off('click', this.documentClick);
    }
}
BsPopoverToggleDirectiveController.$inject = ["$scope", "$element", "$attrs", "$compile", "$timeout", "$document", "$sce", "Popover"];
function bsPopoverToggleDirective() {
    /**
     * @ngdoc directive
     * @name bsPopoverToggle
     *
     * @param {expression|boolean} bsPopoverToggle
     * @param {expression|boolean} animation
     * @param {expression|number} delay
     * @param {expression|boolean} html
     * @param placement
     * @param title
     * @param trigger
     */
    return {
        restrict: 'A',
        bindToController: {
            bsPopoverToggle: '=?',
            animation: '<?',
            delay: '<?',
            html: '<?'
        },
        require: ['?^bsPopoverBoundary', 'bsPopoverToggle'],
        controllerAs: 'bsPpCtrl',
        link: function (scope, element, attrs, ctrl) {
            ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
        },
        controller: BsPopoverToggleDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/popover/bs-popover.component.js":
/*!****************************************************!*\
  !*** ./.build/lib/popover/bs-popover.component.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsPopoverComponent": () => (/* binding */ bsPopoverComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

/**
 * @ngInject
 */
class BsPopoverComponentController {
    constructor($scope, $element, $attrs, $timeout, Popover, angularBS) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$timeout = $timeout;
        this.Popover = Popover;
        this.angularBS = angularBS;
        //
        $attrs.$observe('placement', (value) => {
            this.placement = value;
        });
        // check if title & content are not empty
        const title = angular__WEBPACK_IMPORTED_MODULE_0__.element($element[0].querySelector('.popover-header')), content = angular__WEBPACK_IMPORTED_MODULE_0__.element($element[0].querySelector('.popover-body'));
        $scope.$watch(() => {
            return title.text().trim();
        }, (nV) => {
            this.titleVisible = nV !== '';
        });
        $scope.$watch(() => {
            return content.text().trim();
        }, (nV) => {
            this.contentVisible = nV !== '';
        });
    }
    $onInit() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.animation)) {
            this.animation = this.Popover.animation;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.delay)) {
            this.delay = this.Popover.delay;
        }
        this.placement = this.Popover.placement;
        this.defaultTitle = this.Popover.title;
        this.defaultContent = this.Popover.content;
    }
    $onChanges(changes) {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(changes.delay)) {
            this._delay = angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(changes.delay.currentValue)
                ? changes.delay.currentValue : this.Popover.delay;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(changes.visible)
            && changes.visible.previousValue !== changes.visible.currentValue) {
            this.visible = changes.visible.currentValue !== false;
            let delay;
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isObject(this._delay)) {
                delay = this._delay[this.visible ? 'show' : 'hide'] || this.Popover.delay;
            }
            else {
                delay = this._delay;
            }
            if (this.timeout !== null) {
                this.$timeout.cancel(this.timeout);
            }
            this.timeout = this.$timeout(() => {
                this.timeout = null;
                if (this.visible) {
                    if (this.parentElement) {
                        this.angularBS.positionElement(this.$element.children(), this.parentElement, this.placement, this.boundary !== null ? this.boundary : undefined, 'bs-popover-');
                    }
                    else { // static popover
                        this.angularBS.setPlacementCSS(this.$element.children(), 'bs-popover-', this.placement);
                        this.angularBS.adjustArrow(this.$element.children(), this.placement);
                    }
                    this.fadeIn = this.visible;
                }
                else if (this.animation && !changes.visible.isFirstChange()) {
                    // properly display fade out animation
                    this.visible = true;
                    this.fadeIn = false;
                    const transition = () => {
                        this.visible = false;
                        this.$element.children()[0].removeEventListener('transitionend', transition);
                        this.$scope.$digest();
                    };
                    this.$element.children()[0].addEventListener('transitionend', transition);
                }
                else {
                    this.fadeIn = false;
                }
            }, delay);
        }
    }
}
BsPopoverComponentController.$inject = ["$scope", "$element", "$attrs", "$timeout", "Popover", "angularBS"];
/**
 * @ngdoc component
 * @name bsPopoverTitle
 * @description contents of this element would be transcluded to .popover-title element
 */
/**
 * @ngdoc component
 * @name bsPopoverContent
 * @description contents of this element would be transcluded to .popover-content element
 */
/**
 * @ngdoc component
 * @name bsPopover
 *
 * @param {expression|boolean} visible
 * @param {expression|boolean} animation
 * @param {expression|number} delay
 * @param {expression} parentElement
 * @param {expression} boundary
 * @param {string} placement
 */
const bsPopoverComponent = {
    template: '<div class="popover" '
        + 'ng-class="{\'fade\': bsPpCtrl.animation, \'show\': bsPpCtrl.fadeIn}" '
        + 'style="display: {{bsPpCtrl.visible || bsPpCtrl.fadeIn ? \'block\' : \'none\'}}" '
        + 'ng-show="bsPpCtrl.visible || bsPpCtrl.fadeIn">'
        + '<div class="arrow"></div>'
        + '<div class="popover-header" ng-transclude="title" ng-show="bsPpCtrl.titleVisible">'
        + '{{bsPpCtrl.defaultTitle}}'
        + '</div>'
        + '<div class="popover-body" ng-transclude="content" ng-show="bsPpCtrl.contentVisible">'
        + '{{bsPpCtrl.defaultContent}}'
        + '</div>'
        + '</div>',
    controllerAs: 'bsPpCtrl',
    bindings: {
        visible: '<',
        animation: '<',
        delay: '<',
        parentElement: '<',
        boundary: '<'
    },
    transclude: {
        title: '?bsPopoverTitle',
        content: '?bsPopoverContent'
    },
    controller: BsPopoverComponentController
};



/***/ }),

/***/ "./.build/lib/popover/popover.module.js":
/*!**********************************************!*\
  !*** ./.build/lib/popover/popover.module.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBSPopover": () => (/* binding */ angularBSPopover)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_helpers_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/helpers.module */ "./.build/lib/helpers/helpers.module.js");
/* harmony import */ var _popover_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popover.provider */ "./.build/lib/popover/popover.provider.js");
/* harmony import */ var _bs_popover_boundary_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bs-popover-boundary.directive */ "./.build/lib/popover/bs-popover-boundary.directive.js");
/* harmony import */ var _bs_popover_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bs-popover.component */ "./.build/lib/popover/bs-popover.component.js");
/* harmony import */ var _bs_popover_toggle_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bs-popover-toggle.directive */ "./.build/lib/popover/bs-popover-toggle.directive.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */






const popoverModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS.popover', [_helpers_helpers_module__WEBPACK_IMPORTED_MODULE_1__.helpers])
    .provider('Popover', _popover_provider__WEBPACK_IMPORTED_MODULE_2__.PopoverProvider)
    .directive('bsPopoverBoundary', _bs_popover_boundary_directive__WEBPACK_IMPORTED_MODULE_3__.bsPopoverBoundaryDirective)
    .component('bsPopover', _bs_popover_component__WEBPACK_IMPORTED_MODULE_4__.bsPopoverComponent)
    .directive('bsPopoverToggle', _bs_popover_toggle_directive__WEBPACK_IMPORTED_MODULE_5__.bsPopoverToggleDirective);
const angularBSPopover = popoverModule.name;



/***/ }),

/***/ "./.build/lib/popover/popover.provider.js":
/*!************************************************!*\
  !*** ./.build/lib/popover/popover.provider.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopoverProvider": () => (/* binding */ PopoverProvider)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
class PopoverProvider {
    constructor() {
        this.config = {
            animation: true,
            delay: 0,
            html: false,
            placement: 'right',
            title: '',
            content: '',
            trigger: 'click'
        };
    }
    $get() {
        return this.config;
    }
}



/***/ }),

/***/ "./.build/lib/toasts/bs-toast.component.js":
/*!*************************************************!*\
  !*** ./.build/lib/toasts/bs-toast.component.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsToastComponent": () => (/* binding */ bsToastComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @ngInject
 */
class BsToastComponentController {
    constructor($scope, $element, $transclude, $compile, Toasts) {
        this.$scope = $scope;
        this.$element = $element;
        this.$compile = $compile;
        this.Toasts = Toasts;
        $transclude((elements, scope) => {
            let header, body;
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].tagName === 'BS-TOAST-HEADER') {
                    header = elements[i];
                }
                else if (elements[i].tagName === 'BS-TOAST-BODY') {
                    body = elements[i];
                }
            }
            if (header) {
                header = angular__WEBPACK_IMPORTED_MODULE_0__.element(header);
                header.addClass('toast-header');
                $element.children().append($compile(header)(scope));
            }
            if (body) {
                body = angular__WEBPACK_IMPORTED_MODULE_0__.element(body);
                body.addClass('toast-body d-block');
                $element.children().append($compile(body)(scope));
            }
        });
    }
    $onInit() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.animation)) {
            this.animation = this.Toasts.animation;
        }
    }
    $onChanges(changes) {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(changes.visible)
            && changes.visible.previousValue !== changes.visible.currentValue) {
            this.visible = !!changes.visible.currentValue;
            if (this.animation && !this.visible && !changes.visible.isFirstChange()) {
                // properly display fade out animation
                this.visible = true;
                this.fadeIn = false;
                const transition = () => {
                    this.visible = false;
                    this.$element.children()[0].removeEventListener('transitionend', transition);
                    this.$scope.$digest();
                };
                this.$element.children()[0].addEventListener('transitionend', transition);
            }
            else {
                this.fadeIn = this.visible;
            }
        }
    }
}
BsToastComponentController.$inject = ["$scope", "$element", "$transclude", "$compile", "Toasts"];
/**
 * @ngdoc component
 * @name bsToastHeader
 * @description contents of this element would be transcluded to .toast-header element
 */
/**
 * @ngdoc component
 * @name bsToastBody
 * @description contents of this element would be transcluded to .toast-body element
 */
/**
 * @ngdoc component
 * @name bsToast
 *
 * @param {expression|boolean} visible
 * @param {expression|boolean} animation
 */
const bsToastComponent = {
    template: '<div class="toast" '
        + 'ng-class="{\'fade\': vm.animation, \'show\': vm.fadeIn}" '
        + 'style="display: {{vm.visible || vm.fadeIn ? \'block\' : \'none\'}}">'
        + '</div>',
    controllerAs: 'vm',
    bindings: {
        visible: '<',
        animation: '<'
    },
    transclude: true,
    controller: BsToastComponentController
};



/***/ }),

/***/ "./.build/lib/toasts/toasts.module.js":
/*!********************************************!*\
  !*** ./.build/lib/toasts/toasts.module.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBSToasts": () => (/* binding */ angularBSToasts)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _toasts_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toasts.provider */ "./.build/lib/toasts/toasts.provider.js");
/* harmony import */ var _bs_toast_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bs-toast.component */ "./.build/lib/toasts/bs-toast.component.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */



const toastsModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('angularBS.toasts', [])
    .provider('Toasts', _toasts_provider__WEBPACK_IMPORTED_MODULE_1__.ToastsProvider)
    .component('bsToast', _bs_toast_component__WEBPACK_IMPORTED_MODULE_2__.bsToastComponent);
const angularBSToasts = toastsModule.name;



/***/ }),

/***/ "./.build/lib/toasts/toasts.provider.js":
/*!**********************************************!*\
  !*** ./.build/lib/toasts/toasts.provider.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToastsProvider": () => (/* binding */ ToastsProvider)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
class ToastsProvider {
    constructor() {
        this.config = {
            animation: true
        };
    }
    $get() {
        return this.config;
    }
}



/***/ }),

/***/ "./.build/lib/tooltip/bs-tooltip-boundary.directive.js":
/*!*************************************************************!*\
  !*** ./.build/lib/tooltip/bs-tooltip-boundary.directive.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsTooltipBoundaryDirective": () => (/* binding */ bsTooltipBoundaryDirective)
/* harmony export */ });
/**
 * @ngInject
 */
class BsTooltipBoundaryDirectiveController {
    constructor($element) {
        this.$element = $element;
    }
}
BsTooltipBoundaryDirectiveController.$inject = ["$element"];
function bsTooltipBoundaryDirective() {
    return {
        restrict: 'A',
        controller: BsTooltipBoundaryDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/tooltip/bs-tooltip-toggle.directive.js":
/*!***********************************************************!*\
  !*** ./.build/lib/tooltip/bs-tooltip-toggle.directive.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BsTooltipToggleDirectiveController": () => (/* binding */ BsTooltipToggleDirectiveController),
/* harmony export */   "bsTooltipToggleDirective": () => (/* binding */ bsTooltipToggleDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

/**
 * @ngInject
 */
class BsTooltipToggleDirectiveController {
    constructor($scope, $element, $attrs, $compile, $document, $sce, Tooltip) {
        this._tooltipElement = null;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$document = $document;
        this.$sce = $sce;
        this.Tooltip = Tooltip;
        $attrs.$observe('title', (value) => {
            if (!(angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(this.html) && this.html) || Tooltip.html) {
                value = value.replace(/[\u00A0-\u9999<>&'"]/gim, (i) => {
                    return '&#' + i.charCodeAt(0) + ';';
                });
            }
            this.title = $sce.trustAsHtml(value);
            $element.attr('title', '');
        });
        const watcher = $scope.$watch(() => {
            return this.bsTooltipToggle;
        }, (nV) => {
            if (nV) {
                $compile('<bs-tooltip visible="bsTpCtrl.bsTooltipToggle" animation="bsTpCtrl.animation" '
                    + 'delay="bsTpCtrl.delay" placement="{{bsTpCtrl.placement}}" '
                    + 'parent-element="bsTpCtrl.$element" '
                    + 'boundary="bsTpCtrl.boundary">'
                    + '<span ng-bind-html="bsTpCtrl.title"></span></bs-tooltip>')($scope.$new(), (newElement, newScope) => {
                    newScope.bsTpCtrl = this;
                    $document.find('body').append(newElement);
                    this._tooltipElement = newElement;
                });
                watcher(); // create tooltip element once and leave it be
            }
        });
    }
    $onInit() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.bsTooltipToggle)) {
            this.bsTooltipToggle = false;
        }
        const triggers = (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.$attrs.trigger) ? this.Tooltip.trigger : this.$attrs.trigger)
            .split(' '), open = () => {
            this.bsTooltipToggle = true;
            this.$scope.$digest();
        }, close = () => {
            this.bsTooltipToggle = false;
            this.$scope.$digest();
        };
        if (~triggers.indexOf('hover')) {
            this.$element.on('mouseenter', open);
            this.$element.on('mouseleave', close);
        }
        if (~triggers.indexOf('focus')) {
            this.$element.on('focus', open);
            this.$element.on('blur', close);
        }
        if (~triggers.indexOf('click')) {
            this.$element.on('click', () => {
                this.bsTooltipToggle = !this.bsTooltipToggle;
                this.$scope.$digest();
            });
        }
        this.placement = angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.$attrs.placement) ? this.Tooltip.placement : this.$attrs.placement;
        this.title = this.$sce.trustAsHtml(this.Tooltip.title);
    }
    $onDestroy() {
        if (this._tooltipElement !== null) {
            this._tooltipElement.remove();
        }
    }
}
BsTooltipToggleDirectiveController.$inject = ["$scope", "$element", "$attrs", "$compile", "$document", "$sce", "Tooltip"];
function bsTooltipToggleDirective() {
    /**
     * @ngdoc directive
     * @name bsTooltipToggle
     *
     * @param {expression|boolean} bsTooltipToggle
     * @param {expression|boolean} animation
     * @param {expression|number} delay
     * @param {expression|boolean} html
     * @param placement
     * @param title
     * @param trigger
     */
    return {
        restrict: 'A',
        bindToController: {
            bsTooltipToggle: '=?',
            animation: '<?',
            delay: '<?',
            html: '<?'
        },
        require: ['?^bsTooltipBoundary', 'bsTooltipToggle'],
        controllerAs: 'bsTpCtrl',
        link: function (scope, element, attrs, ctrl) {
            ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
        },
        controller: BsTooltipToggleDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/tooltip/bs-tooltip.component.js":
/*!****************************************************!*\
  !*** ./.build/lib/tooltip/bs-tooltip.component.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsTooltipComponent": () => (/* binding */ bsTooltipComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

/**
 * @ngInject
 */
class BsTooltipComponentController {
    constructor($scope, $element, $attrs, $timeout, Tooltip, angularBS) {
        this._timeout = null;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$timeout = $timeout;
        this.Tooltip = Tooltip;
        this.angularBS = angularBS;
        $attrs.$observe('placement', (value) => {
            this.placement = value;
        });
        // check if title is not empty
        const title = angular__WEBPACK_IMPORTED_MODULE_0__.element($element[0].querySelector('.tooltip-inner'));
        $scope.$watch(() => {
            return title.text().trim();
        }, (nV) => {
            this.titleVisible = nV !== '';
        });
    }
    $onInit() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.animation)) {
            this.animation = this.Tooltip.animation;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.delay)) {
            this.delay = this.Tooltip.delay;
        }
        this.placement = this.Tooltip.placement;
        this.defaultTitle = this.Tooltip.title;
        this.$element.children().css({ top: 0 });
    }
    $onChanges(changes) {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(changes.delay)) {
            this._delay = angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(changes.delay.currentValue)
                ? changes.delay.currentValue : this.Tooltip.delay;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(changes.visible)
            && changes.visible.previousValue !== changes.visible.currentValue) {
            this.visible = changes.visible.currentValue !== false;
            let delay;
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isObject(this._delay)) {
                delay = this._delay[this.visible ? 'show' : 'hide'] || this.Tooltip.delay;
            }
            else {
                delay = this._delay;
            }
            if (this._timeout !== null) {
                this.$timeout.cancel(this._timeout);
            }
            this._timeout = this.$timeout(() => {
                this._timeout = null;
                if (this.visible) {
                    if (this.parentElement) {
                        this.angularBS.positionElement(this.$element.children(), this.parentElement, this.placement, this.boundary !== null ? this.boundary : undefined, 'bs-tooltip-');
                    }
                    else { // static tooltip
                        this.angularBS.setPlacementCSS(this.$element.children(), 'bs-tooltip-', this.placement);
                        this.angularBS.adjustArrow(this.$element.children(), this.placement);
                    }
                    this.fadeIn = this.visible;
                }
                else {
                    // properly display fade out animation
                    this.visible = true;
                    this.fadeIn = false;
                    const transition = () => {
                        this.visible = false;
                        this.$element.children()[0].removeEventListener('transitionend', transition);
                        this.$scope.$digest();
                    };
                    this.$element.children()[0].addEventListener('transitionend', transition);
                }
            }, delay);
        }
    }
}
BsTooltipComponentController.$inject = ["$scope", "$element", "$attrs", "$timeout", "Tooltip", "angularBS"];
/**
 * @ngdoc component
 * @name bsTooltip
 *
 * @param {expression|boolean} visible
 * @param {expression|boolean} animation
 * @param {expression|number} delay
 * @param {expression} parentElement
 * @param {expression} boundary
 * @param placement
 */
const bsTooltipComponent = {
    template: '<div class="tooltip" '
        + 'ng-class="{\'fade\': bsTpCtrl.animation, \'show\': bsTpCtrl.fadeIn}" '
        + 'ng-show="bsTpCtrl.visible || bsTpCtrl.fadeIn">'
        + '<div class="arrow" ng-show="bsTpCtrl.titleVisible"></div>'
        + '<div class="tooltip-inner" ng-transclude ng-show="bsTpCtrl.titleVisible">{{bsTpCtrl.defaultTitle}}</div>'
        + '</div>',
    controllerAs: 'bsTpCtrl',
    bindings: {
        visible: '<',
        animation: '<',
        delay: '<',
        parentElement: '<',
        boundary: '<'
    },
    transclude: true,
    controller: BsTooltipComponentController
};



/***/ }),

/***/ "./.build/lib/tooltip/bs-tooltip.factory.js":
/*!**************************************************!*\
  !*** ./.build/lib/tooltip/bs-tooltip.factory.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BsTooltipFactory": () => (/* binding */ BsTooltipFactory)
/* harmony export */ });
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
/**
 * @ngInject
 */
class BsTooltipFactory {
    constructor($injector) {
        this.$injector = $injector;
    }
    customBindingDirective() {
        return {
            restrict: 'A',
            require: '?^bsTooltipBoundary',
            compile: (element, attrs) => {
                if (!('bsTooltipToggle' in attrs) && !('bsPopoverToggle' in attrs)) {
                    return (scope, element, attrs, ctrl) => {
                        const directive = this.$injector.get('bsTooltipToggleDirective')[0], bsTooltipToggleCtrl = this.$injector.instantiate(directive.controller, {
                            '$scope': scope,
                            '$element': element,
                            '$attrs': attrs
                        });
                        directive.compile(element, scope, attrs, [ctrl, bsTooltipToggleCtrl])(scope, element, attrs, [ctrl, bsTooltipToggleCtrl]);
                        bsTooltipToggleCtrl.$onInit();
                        element.on('$destroy', function () {
                            bsTooltipToggleCtrl.$onDestroy();
                        });
                    };
                }
            }
        };
    }
}
BsTooltipFactory.$inject = ["$injector"];



/***/ }),

/***/ "./.build/lib/tooltip/tooltip.module.js":
/*!**********************************************!*\
  !*** ./.build/lib/tooltip/tooltip.module.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularBSTooltip": () => (/* binding */ angularBSTooltip)
/* harmony export */ });
/* harmony import */ var _helpers_helpers_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/helpers.module */ "./.build/lib/helpers/helpers.module.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tooltip_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip.provider */ "./.build/lib/tooltip/tooltip.provider.js");
/* harmony import */ var _bs_tooltip_boundary_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bs-tooltip-boundary.directive */ "./.build/lib/tooltip/bs-tooltip-boundary.directive.js");
/* harmony import */ var _bs_tooltip_factory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bs-tooltip.factory */ "./.build/lib/tooltip/bs-tooltip.factory.js");
/* harmony import */ var _bs_tooltip_toggle_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bs-tooltip-toggle.directive */ "./.build/lib/tooltip/bs-tooltip-toggle.directive.js");
/* harmony import */ var _bs_tooltip_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bs-tooltip.component */ "./.build/lib/tooltip/bs-tooltip.component.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */







const tooltipModule = angular__WEBPACK_IMPORTED_MODULE_1__.module('angularBS.tooltip', [_helpers_helpers_module__WEBPACK_IMPORTED_MODULE_0__.helpers])
    .provider('Tooltip', _tooltip_provider__WEBPACK_IMPORTED_MODULE_2__.TooltipProvider)
    .factory('bsTooltipFactory', _bs_tooltip_factory__WEBPACK_IMPORTED_MODULE_4__.BsTooltipFactory)
    .directive('bsTooltipBoundary', _bs_tooltip_boundary_directive__WEBPACK_IMPORTED_MODULE_3__.bsTooltipBoundaryDirective)
    .directive('bsTooltipToggle', _bs_tooltip_toggle_directive__WEBPACK_IMPORTED_MODULE_5__.bsTooltipToggleDirective)
    .component('bsTooltip', _bs_tooltip_component__WEBPACK_IMPORTED_MODULE_6__.bsTooltipComponent);
const angularBSTooltip = tooltipModule.name;



/***/ }),

/***/ "./.build/lib/tooltip/tooltip.provider.js":
/*!************************************************!*\
  !*** ./.build/lib/tooltip/tooltip.provider.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TooltipProvider": () => (/* binding */ TooltipProvider)
/* harmony export */ });
class TooltipProvider {
    constructor() {
        this.config = {
            animation: true,
            delay: 0,
            placement: 'bottom',
            html: false,
            title: '',
            trigger: 'hover focus'
        };
    }
    $get() {
        return this.config;
    }
}



/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ }),

/***/ "angular-animate":
/*!**********************************!*\
  !*** external "angular-animate" ***!
  \**********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular_animate__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./.build/angularjs-bootstrap-4.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CarouselProvider": () => (/* reexport safe */ _lib_carousel_carousel_provider__WEBPACK_IMPORTED_MODULE_1__.CarouselProvider),
/* harmony export */   "AngularBSService": () => (/* reexport safe */ _lib_helpers_angularBS_service__WEBPACK_IMPORTED_MODULE_2__.AngularBSService),
/* harmony export */   "ModalProvider": () => (/* reexport safe */ _lib_modal_modal_provider__WEBPACK_IMPORTED_MODULE_3__.ModalProvider),
/* harmony export */   "BSModalController": () => (/* reexport safe */ _lib_modal_bs_modal_directive__WEBPACK_IMPORTED_MODULE_4__.BSModalController),
/* harmony export */   "PopoverProvider": () => (/* reexport safe */ _lib_popover_popover_provider__WEBPACK_IMPORTED_MODULE_5__.PopoverProvider),
/* harmony export */   "ToastsProvider": () => (/* reexport safe */ _lib_toasts_toasts_provider__WEBPACK_IMPORTED_MODULE_6__.ToastsProvider),
/* harmony export */   "TooltipProvider": () => (/* reexport safe */ _lib_tooltip_tooltip_provider__WEBPACK_IMPORTED_MODULE_7__.TooltipProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_angularBS_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/angularBS.module */ "./.build/lib/angularBS.module.js");
/* harmony import */ var _lib_carousel_carousel_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/carousel/carousel.provider */ "./.build/lib/carousel/carousel.provider.js");
/* harmony import */ var _lib_helpers_angularBS_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/helpers/angularBS.service */ "./.build/lib/helpers/angularBS.service.js");
/* harmony import */ var _lib_modal_modal_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/modal/modal.provider */ "./.build/lib/modal/modal.provider.js");
/* harmony import */ var _lib_modal_bs_modal_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/modal/bs-modal.directive */ "./.build/lib/modal/bs-modal.directive.js");
/* harmony import */ var _lib_popover_popover_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/popover/popover.provider */ "./.build/lib/popover/popover.provider.js");
/* harmony import */ var _lib_toasts_toasts_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/toasts/toasts.provider */ "./.build/lib/toasts/toasts.provider.js");
/* harmony import */ var _lib_tooltip_tooltip_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/tooltip/tooltip.provider */ "./.build/lib/tooltip/tooltip.provider.js");
/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_angularBS_module__WEBPACK_IMPORTED_MODULE_0__.angularBS);


})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=angularjs-bootstrap-4.js.map