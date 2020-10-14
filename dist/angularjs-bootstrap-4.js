/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
angular.module('angularBS', [
    'angularBS.modal', 'angularBS.dropdown', 'angularBS.tooltip', 'angularBS.popover', 'angularBS.collapse',
    'angularBS.carousel', 'angularBS.toasts'
]);

/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    angular.module('angularBS.carousel', []);
}());

/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    angular.module('angularBS.collapse', []);
}());

/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    angular.module('angularBS.dropdown', []);
}());

/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    /**
	 * angularBS Service
	 */
    angular.module('angularBS.helpers', []).factory('angularBS', [function() {
        const angularBS = {
            /**
			 * Get element width, height, position from top and left of document/window,
			 * @param element
			 * @returns {{width: number, height: number, top: number, left: number}}
			 */
            offset(element) {
                const elemBCR = element.getBoundingClientRect(),
                    elemStyle = element['currentStyle'] || window.getComputedStyle(element);
                return {
                    width: Math.ceil(angular.isNumber(elemBCR.width) ? elemBCR.width : element.offsetWidth)
						+ parseInt(elemStyle.getPropertyValue('margin-left'))
						+ parseInt(elemStyle.getPropertyValue('margin-right')),
                    height: Math.ceil(angular.isNumber(elemBCR.height) ? elemBCR.height : element.offsetHeight)
						+ parseInt(elemStyle.getPropertyValue('margin-top'))
						+ parseInt(elemStyle.getPropertyValue('margin-bottom')),
                    top: Math.ceil(elemBCR.top + (window.pageYOffset || document.documentElement.scrollTop)),
                    left: Math.ceil(elemBCR.left + (window.pageXOffset || document.documentElement.scrollLeft)),
                };
            },
            /**
			 * Removes all placement classes on given element
			 * @param element
			 * @param prefix
			 * @param placement
			 */
            setPlacementCSS(element, prefix, placement) {
                const placements = ['top', 'left', 'right', 'bottom'];
                for (let p = 0; p < placements.length; p++) {
                    element.removeClass(prefix + placements[p]);
                }
                element.addClass(prefix + placement);
            },
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
                placement = placement.split(' ');
                let top = 0, left = 0,
                    arrowTop = '50%',
                    realPlacement = 'left',
                    offset = angularBS.offset(element[0]);
                const offsetTo = angularBS.offset(positionTo[0]),
                    placements = ['right', 'top', 'bottom'],
                    auto = !!~placement.indexOf('auto'),
                    calcPosition = function() {
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
                        angularBS.setPlacementCSS(element, cssPrefix, realPlacement);
                        // check to see if element has been resized after adding the placement
                        const newOffset = angularBS.offset(element[0]);
                        if (newOffset.height !== offset.height || newOffset.width !== offset.width) {
                            offset = newOffset;
                            calcPosition();
                        }
                    };
                for (let p = 0; p < placements.length; p++) {
                    if (~placement.indexOf(placements[p])) {
                        realPlacement = placements[p];
                        break;
                    }
                }
                calcPosition();
                // get boundary offset
                const bo = angular.isDefined(boundaryElement) ? angularBS.offset(boundaryElement[0]) : {
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
                const arrow = angular.element(element[0].querySelector('.arrow'));
                if (angular.isDefined(arrow)) {
                    switch (realPlacement) {
                        case 'left':
                        case 'right':
                            if (top < bo.top) {
                                top = bo.top;
                                arrowTop = offsetTo.top + offsetTo.height / 2;
                                arrowTop += 'px';
                            } else if (top + offset.height > bo.top + bo.height) {
                                top = bo.top + bo.height - offset.height;
                                arrowTop = offsetTo.top + offsetTo.height / 2 - top;
                                if (arrowTop > offset.height - 15) {
                                    arrowTop = offset.height - 15;
                                }
                                arrowTop += 'px';
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
                angularBS.adjustArrow(element, realPlacement);
                // apply element position
                element.css({
                    top: '0px',
                    left: '0px',
                    transform: 'translate3d(' + left + 'px, ' + top + 'px, 0px)'
                });
            },
            /**
			 * Properly set arrow position of tooltip/popover element
			 * @param element
			 * @param placement
			 */
            adjustArrow(element, placement) {
                const arrow = angular.element(element[0].querySelector('.arrow'));
                if (angular.isDefined(arrow)) {
                    switch (placement) {
                        case 'top':
                        case 'bottom':
                            arrow.css('left', 'calc(50% - ' + (angularBS.offset(arrow[0]).width / 2 + 'px)'));
                            break;
                        case 'left':
                        case 'right':
                            arrow.css('top', 'calc(50% - ' + (angularBS.offset(arrow[0]).height / 2 + 'px)'));
                            break;
                    }
                }
            }
        };
        return angularBS;
    }]);
}());

/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    angular.module('angularBS.modal', []);
}());

/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    angular.module('angularBS.popover', ['angularBS.helpers']);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    angular.module('angularBS.toasts', []);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    angular.module('angularBS.tooltip', ['angularBS.helpers']);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc component
	 * @name bsCarouselIndicators
	 */
    angular.module('angularBS.carousel').component('bsCarouselIndicators', {
        template: '<ol class="carousel-indicators">'
			+ '<li ng-repeat="s in ctrl.carousel.slides" ng-click="ctrl.carousel.slideTo($index)" '
			+ 'ng-class="{active: $index === ctrl.carousel.currentSlide}"></li>'
			+ '</ol>',
        require: {
            carousel: '^bsCarousel'
        },
        controllerAs: 'ctrl'
    });
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsCarouselItem
	 */
    angular.module('angularBS.carousel').directive('bsCarouselItem', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            require: '^bsCarousel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.register(element);
            },
            controller: ['$element', function($element) {
                const ctrl = this;
                ctrl.$onInit = function() {
                    $element.addClass('carousel-item');
                };
            }]
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsCarouselNav
	 * @param {string} bsCarouselNav
	 */
    angular.module('angularBS.carousel').directive('bsCarouselNav', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            require: '^bsCarousel',
            link: function(scope, element, attrs, ctrl) {
                element.on('click', function() {
                    ctrl.prevNextSlide(attrs['bsCarouselNav'] === 'right');
                    scope.$digest();
                });
            }
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    bsCarouselDirectiveController.$inject = ["$scope", "$element", "$attrs", "$interval", "Carousel"];
    function bsCarouselDirectiveController($scope, $element, $attrs, $interval, Carousel) {
        let sliding = false,
            carouselInterval = null;
        const ctrl = this,
            changeSlide = function(nextSlide, direction) {
                if (nextSlide !== ctrl.currentSlide && !sliding) {
                    sliding = true;
                    if (angular.isUndefined(direction)) {
                        direction = nextSlide > ctrl.currentSlide ? 'left' : 'right';
                    }
                    const next = ctrl.slides[nextSlide],
                        active = ctrl.slides[ctrl.currentSlide],
                        transition = function() {
                            active[0].removeEventListener('transitionend', transition);
                            next.removeClass(
                                'carousel-item-next carousel-item-prev carousel-item-' + direction)
                                .addClass('active');
                            active.removeClass('active carousel-item-' + direction);
                            sliding = false;
                        };
                    next.addClass(direction === 'left' ? 'carousel-item-next' : 'carousel-item-prev');
                    next[0].offsetWidth; // force reflow
                    active.addClass('carousel-item-' + direction);
                    next.addClass('carousel-item-' + direction);
                    active[0].addEventListener('transitionend', transition);
                    ctrl.currentSlide = nextSlide;
                }
            };
        /**
		 */
        ctrl.$onInit = function() {
            ctrl.slides = [];
            ctrl.currentSlide = -1;
            const interval = 'interval' in $attrs ? parseInt($attrs['interval']) : Carousel.interval,
                pause = 'pause' in $attrs ? $attrs['pause'] === 'hover' : Carousel.pause;
            if (interval) {
                const cycle = () => {
                    carouselInterval = $interval(() => {
                        ctrl.prevNextSlide(true);
                    }, interval);
                };
                if (pause) {
                    $element.on('mouseenter', () => {
                        $interval.cancel(carouselInterval);
                    });
                    $element.on('mouseleave', cycle);
                }
                cycle();
            }
        };
        /**
		 */
        ctrl.$onChanges = function() {
            if (angular.isUndefined(ctrl.wrap)) {
                ctrl.wrap = Carousel.wrap;
            }
            if (angular.isUndefined(ctrl.keyboard)) {
                ctrl.keyboard = Carousel.keyboard;
            }
        };
        /**
		 * @param $element
		 */
        ctrl.register = function($element) {
            ctrl.slides.push($element);
            if ($element.hasClass('active')) {
                if (~ctrl.currentSlide) {
                    ctrl.slides[ctrl.currentSlide].removeClass('active');
                }
                ctrl.currentSlide = ctrl.slides.length - 1;
            } else if (!~ctrl.currentSlide) {
                $element.addClass('active');
                ctrl.currentSlide = ctrl.slides.length - 1;
            }
        };
        /**
		 * @param {number} index
		 * @param {string} direction
		 */
        ctrl.slideTo = function(index, direction) {
            if (index < 0) {
                index = ctrl.slides.length - 1;
            } else if (index >= ctrl.slides.length) {
                index = 0;
            }
            changeSlide(index, direction);
        };
        /**
		 * @param {boolean} isNext
		 */
        ctrl.prevNextSlide = function(isNext) {
            const nextIndex = isNext ? ctrl.currentSlide + 1 : ctrl.currentSlide - 1;
            if (
                (nextIndex >= ctrl.slides.length || nextIndex < 0)
				&& !ctrl.wrap
            ) {
                return;
            }
            ctrl.slideTo(nextIndex, isNext ? 'left' : 'right');
        };
        /**
		 * @param $element
		 */
        ctrl.unregister = function($element) {
            ctrl.slides.splice(ctrl.slides.indexOf($element, 1));
        };
        /**
		 */
        ctrl.$onDestroy = function() {
            if (carouselInterval !== null) {
                $interval.cancel(carouselInterval);
            }
        };
        $element.on('keydown', function(e) {
            if (
                !ctrl.keyboard
				|| (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
				|| /input|textarea/i.test(e.target.tagName)
            ) {
                return;
            }
            if (e.key === 'ArrowLeft') {
                ctrl.prevNextSlide(false);
            } else {
                ctrl.prevNextSlide(true);
            }
            $scope.$digest();
            e.preventDefault();
        });
    }

    /**
	 * @ngdoc directive
	 * @name bsCarousel
	 *
	 * @param {number} interval
	 * @param {string|null} pause
	 * @param {expression|boolean} wrap
	 * @param {expression|boolean} keyboard
	 */
    angular.module('angularBS.carousel').directive('bsCarousel', [function() {
        return {
            restrict: 'A',
            bindToController: {
                wrap: '<?',
                keyboard: '<?'
            },
            controller: bsCarouselDirectiveController
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * Carousel config
	 */
    angular.module('angularBS.carousel').provider('Carousel', function() {
        this.config = {
            interval: 5000,
            pause: 'hover',
            wrap: true,
            keyboard: true
        };
        // noinspection JSUnusedGlobalSymbols
        this.$get = function() {
            return this.config;
        };
    });
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsCollapseGroup
	 */
    angular.module('angularBS.collapse').directive('bsCollapseGroup', [function() {
        return {
            restrict: 'A',
            controller: [function() {
                const ctrl = this,
                    children = [];
                /**
				 * @param bsCollapseCtrl
				 */
                ctrl.register = function(bsCollapseCtrl) {
                    children.push(bsCollapseCtrl);
                };
                /**
				 * @param bsCollapseCtrl
				 */
                ctrl.unregister = function(bsCollapseCtrl) {
                    children.splice(children.indexOf(bsCollapseCtrl), 1);
                };
                /**
				 * @param invokingCtrl
				 */
                ctrl.expand = function(invokingCtrl) {
                    for (let c = 0; c < children.length; c++) {
                        if (children[c] !== invokingCtrl) {
                            children[c].bsCollapse = true;
                        }
                    }
                };
            }]
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsCollapse
	 *
	 * @param {expression|boolean} bsCollapse
	 */
    angular.module('angularBS.collapse').directive('bsCollapse', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            bindToController: {
                bsCollapse: '=?'
            },
            require: ['bsCollapse', '?^bsCollapseGroup'],
            link: function(scope, element, attrs, ctrl) {
                if (ctrl[1] !== null) {
                    ctrl[1].register(ctrl[0]);
                    ctrl[0].group = ctrl[1];
                    scope.$on('destroy', () => {
                        ctrl[1].unregister(ctrl[0]);
                    });
                }
            },
            controller: ['$scope', '$element', '$animateCss', function($scope, $element, $animateCss) {
                const ctrl = this,
                    expand = function() {
                        if (!$element.hasClass('show')) {
                            $element.removeClass('collapse').addClass('collapsing');
                            if ($animateCss) {
                                $animateCss($element, {
                                    addClass: 'show',
                                    easing: 'ease',
                                    to: {
                                        height: $element[0].scrollHeight + 'px'
                                    }
                                }).start()['finally'](() => {
                                    $element.removeClass('collapsing').addClass('collapse').css({height: 'auto'});
                                });
                            }
                        }
                    },
                    collapse = function() {
                        if ($element.hasClass('show')) {
                            $element.css({
                                height: $element[0].scrollHeight + 'px'
                            }).removeClass('collapse').addClass('collapsing');
                            $animateCss($element, {
                                removeClass: 'show',
                                to: {height: '0'}
                            }).start()['finally'](() => {
                                $element.css({height: null});
                                $element.removeClass('collapsing').addClass('collapse');
                            });
                        }
                    };
                /**
				 */
                ctrl.$onInit = function() {
                    if (ctrl.bsCollapse) {
                        $element.removeClass('show collapsing').addClass('collapse');
                        $element.css({height: null});
                    } else {
                        $element.removeClass('collapsing').addClass('collapse show');
                    }
                };
                /**
				 */
                $scope.$watch(() => {
                    return ctrl.bsCollapse;
                }, (nV) => {
                    ctrl.bsCollapse = !!nV;
                    if (ctrl.bsCollapse) {
                        collapse();
                    } else {
                        expand();
                        if (ctrl.group) {
                            ctrl.group.expand(ctrl);
                        }
                    }
                })
            }]
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsDropdownBoundary
	 */
    angular.module('angularBS.dropdown').directive('bsDropdownBoundary', [function() {
        return {
            restrict: 'A',
            controller: ['$element', function($element) {
                this.$element = $element;
            }]
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    function bsDropdownToggleDirectiveController() {
        return {
            restrict: 'A',
            require: '^bsDropdown',
            link: function(scope, element, attrs, dropdownCtrl) {
                element.on('click', () => {
                    scope.$apply(() => {
                        dropdownCtrl.bsDropdown = !dropdownCtrl.bsDropdown;
                    });
                });
            }
        };
    }

    /**
	 * @ngdoc directive
	 * @name bsDropdownToggle
	 */
    angular.module('angularBS.dropdown').directive('bsDropdownToggle', bsDropdownToggleDirectiveController);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

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
                    angular.element(this.$element[0].querySelectorAll('.dropdown-menu')).addClass('show');
                    if (this.boundary || this.boundaryElement) {
                        this.reposition();
                    }
                } else {
                    if (this.boundary || this.boundaryElement) {
                        this.$element.removeClass('dropup');
                    }
                    this.$element.removeClass('show');
                    angular.element(this.$element[0].querySelectorAll('.dropdown-menu')).removeClass('show');
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
                } else if (e.key === 'ArrowDown' && idx < items.length - 1) {
                    idx++;
                }
                if (!~idx) {
                    idx = 0;
                }
                items[idx].focus();
            }
        }

        reposition() {
            const boundaryElement = this.boundary ? this.boundary.$element[0] : this.boundaryElement[0],
                boundaryOffset = this.angularBS.offset(boundaryElement),
                menuOffset = this.angularBS.offset(this.$element[0].querySelector('.dropdown-menu'));
            if (menuOffset.height + menuOffset.top > boundaryOffset.height + boundaryOffset.top) {
                this.$element.addClass('dropup');
            } else {
                this.$element.removeClass('dropup');
            }
        }
    }
    BSDropdownDirectiveController.$inject = ["$scope", "$element", "$document", "angularBS"];

    function bsDropdownDirective() {
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

    /**
     * @ngdoc directive
     * @name bsDropdown
     * @property {expression|boolean} bsDropdown
     */
    angular.module('angularBS.dropdown').directive('bsDropdown', bsDropdownDirective);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    class BSModalBackdropController {
        /**
		 * @ngInject
		 * @param $element
		 * @param $q
		 * @param $timeout
		 * @param ModalBackdrop
		 */
        constructor($element, $q, $timeout, ModalBackdrop) {
            this.$element = $element;
            this.$q = $q;
            this.$timeout = $timeout;
            this.ModalBackdrop = ModalBackdrop;
        }

        $onInit() {
            this.ModalBackdrop.backdropController = this;
            this.isAnimated = this.ModalBackdrop.isAnimated;
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
            const defered = this.$q.defer(),
                backdropElement = this.$element.children();
            backdropElement.removeClass('show');
            if (this.isAnimated()) {
                let transitionFinished = false;
                const transition = function() {
                    if (!transitionFinished) {
                        defered.resolve();
                        transitionFinished = true;
                    }
                };
                backdropElement[0].addEventListener('transitionend', transition);
                this.$timeout(transition, 150);
            } else {
                defered.resolve();
            }
            return defered.promise;
        }
    }
    BSModalBackdropController.$inject = ["$element", "$q", "$timeout", "ModalBackdrop"];

    /**
	 * @ngdoc component
	 * @name bsModalBackdrop
	 */
    angular.module('angularBS.modal').component('bsModalBackdrop', {
        template: '<div class="modal-backdrop" ng-class="{\'fade\': vm.isAnimated()}"></div>',
        controllerAs: 'vm',
        controller: BSModalBackdropController
    });
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    bsModalController.$inject = ["$scope", "$element", "$attrs", "$timeout", "$document", "$q", "$injector", "Modal", "ModalBackdrop"];
    function bsModalController($scope, $element, $attrs, $timeout, $document, $q, $injector, Modal, ModalBackdrop) {
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
        };

        ctrl.$onChanges = function(changes) {
            if ('backdrop' in changes) {
                backdrop = this.backdrop === 'static' ? 'static' : this.backdrop;
            }
        };

        ctrl.$doCheck = function() {
            if (_isOpen !== ctrl.bsModal) {
                let ret = ctrl.onBeforeChange({bsModalController: ctrl});
                if (ret !== false) {
                    ret = Modal.config.onBeforeChange(ctrl, $injector);
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
        // backdrop click
        $element.on('click', function(e) {
            if (window.getSelection().type === 'Range') {
                return;
            }
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
                backdrop: '<?',
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

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    function dismissDirectiveController() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            require: '^bsModal',
            link: function(scope, element, attrs, bsModal) {
                element.on('click', function() {
                    bsModal.bsModal = false;
                    bsModal.$scope.$digest();
                });
            }
        };
    }

    /**
	 * @ngdoc directive
	 * @name dismiss
	 */
    angular.module('angularBS.modal').directive('dismiss', dismissDirectiveController);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    modalBackdropFactory.$inject = ["$document", "$compile", "$rootScope", "$q"];
    function modalBackdropFactory($document, $compile, $rootScope, $q) {
        let isVisible = false,
            isAnimated = false,
            backDropPromise,
            openModals = 0;
        const bodyElement = $document.find('body'),
            backdropElement = angular.element('<bs-modal-backdrop ng-if="isVisible()"></bs-modal-backdrop>'),
            backdropScope = $rootScope.$new(true),
            _doHide = () => {
                isVisible = false;
                bodyElement.removeClass('modal-open');
            },
            ModalBackdrop = {
                isVisible: function() {
                    return isVisible;
                },
                isAnimated: function() {
                    return isAnimated;
                },
                show: function(backdrop, animate) {
                    openModals++;
                    backDropPromise = $q.defer();
                    isAnimated = !!animate;
                    bodyElement.addClass('modal-open');
                    if (backdrop && !isVisible) {
                        isVisible = true;
                    } else {
                        backDropPromise.resolve();
                    }
                    return backDropPromise.promise;
                },
                shown: function() {
                    backDropPromise.resolve();
                },
                hide: function() {
                    openModals--;
                    if (openModals < 0) {
                        openModals = 0;
                    }
                    if (openModals === 0) {
                        if (angular.isDefined(this.backdropController)) {
                            this.backdropController.hide().then(_doHide);
                        } else {
                            _doHide();
                        }
                    }
                }
            };
        // create backdrop element in body
        backdropScope.isVisible = ModalBackdrop.isVisible;
        $compile(backdropElement)(backdropScope);
        bodyElement.append(backdropElement);
        return ModalBackdrop;
    }

    /**
	 * @ngdoc factory
	 * @name ModalBackdrop
	 */
    angular.module('angularBS.modal').factory('ModalBackdrop', modalBackdropFactory);
}());

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

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsPopoverBoundary
	 */
    angular.module('angularBS.popover').directive('bsPopoverBoundary', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            controller: ['$element', function($element) {
                this.$element = $element;
            }]
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    bsPopoverToggleDirectiveController.$inject = ["$scope", "$element", "$attrs", "$compile", "$timeout", "$document", "$sce", "Popover"];
    function bsPopoverToggleDirectiveController(
        $scope, $element, $attrs, $compile, $timeout, $document, $sce, Popover
    ) {
        const ctrl = this,
            documentClick = function(e) {
                if (!$element[0].contains(e.target)) {
                    ctrl.bsPopoverToggle = false;
                    $scope.$digest();
                }
            };
        let popoverElement = null;
        //
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.bsPopoverToggle)) {
                ctrl.bsPopoverToggle = false;
            }
            const triggers = (angular.isUndefined($attrs.trigger) ? Popover.trigger : $attrs.trigger)
                    .split(' '),
                open = function() {
                    ctrl.bsPopoverToggle = true;
                    $scope.$digest();
                },
                close = function() {
                    ctrl.bsPopoverToggle = false;
                    $scope.$digest();
                };
            if (~triggers.indexOf('hover')) {
                $element.on('mouseenter', open);
                $element.on('mouseleave', close);
            }
            if (~triggers.indexOf('focus')) {
                $element.on('click', open);
                $document.on('click', documentClick);
            }
            if (~triggers.indexOf('click')) {
                $element.on('click', function() {
                    ctrl.bsPopoverToggle = !ctrl.bsPopoverToggle;
                    $scope.$digest();
                });
            }
            ctrl.placement = angular.isUndefined($attrs.placement) ? Popover.placement : $attrs.placement;
            ctrl.$element = $element;
            ctrl.title = $sce.trustAsHtml(Popover.title);
            ctrl.content = $sce.trustAsHtml(Popover.content);
        };
        //
        ['title', 'content'].forEach((attr) => {
            $attrs.$observe(attr, function(value) {
                if (!(angular.isDefined(ctrl.html) && ctrl.html) || Popover.html) {
                    value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i) {
                        return '&#' + i.charCodeAt(0) + ';'
                    });
                }
                ctrl[attr] = $sce.trustAsHtml(value);
                if (attr === 'title') {
                    $element.attr('title', '');
                }
            });
        })
        //
        const watcher = $scope.$watch(function() {
            return ctrl.bsPopoverToggle;
        }, function(nV) {
            if (nV) {
                ctrl.bsPopoverToggle = false;
                $compile(
                    '<bs-popover visible="bsPpCtrl.bsPopoverToggle" animation="bsPpCtrl.animation" '
					+ 'delay="bsPpCtrl.delay" placement="{{bsPpCtrl.placement}}" '
					+ 'parent-element="bsPpCtrl.$element" '
					+ 'boundary="bsPpCtrl.boundary">'
					+ '<bs-popover-title ng-bind-html="bsPpCtrl.title"></bs-popover-title>'
					+ '<bs-popover-content ng-bind-html="bsPpCtrl.content"></bs-popover-content>'
					+ '</bs-popover>'
                )($scope.$new(), function(newElement, newScope) {
                    newScope.bsPpCtrl = ctrl;
                    $document.find('body').append(newElement);
                    popoverElement = newElement;
                    // we delay popover display a little, to properly calculate its dimensions after its created
                    $timeout(() => {
                        ctrl.bsPopoverToggle = true;
                    }, 50);
                });
                watcher(); // create popover element once and leave it be
            }
        });
        //
        ctrl.$onDestroy = function() {
            if (popoverElement !== null) {
                popoverElement.remove();
            }
            $document.off('click', documentClick);
        };
    }

    /**
	 * @ngdoc directive
	 * @name bsPopoverToggle
	 *
	 * @param {expression|boolean} bsPopoverToggle
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression|boolean} html
	 * @param {string} placement
	 * @param {string} title
	 * @param {string} content
	 * @param {string} trigger
	 */
    angular.module('angularBS.popover').directive('bsPopoverToggle', [function() {
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
            link: function(scope, element, attrs, ctrl) {
                ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
            },
            controller: bsPopoverToggleDirectiveController
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    bsPopoverComponentController.$inject = ["$scope", "$element", "$attrs", "$timeout", "Popover", "angularBS"];
    function bsPopoverComponentController($scope, $element, $attrs, $timeout, Popover, angularBS) {
        const ctrl = this;
        let delay, timeout = null;
        //
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.animation)) {
                ctrl.animation = Popover.animation;
            }
            if (angular.isUndefined(ctrl.delay)) {
                ctrl.delay = Popover.delay;
            }
            ctrl.placement = Popover.placement;
            ctrl.defaultTitle = Popover.title;
            ctrl.defaultContent = Popover.content;
        };
        //
        ctrl.$onChanges = function(changes) {
            if (angular.isDefined(changes.delay)) {
                delay = angular.isDefined(changes.delay.currentValue)
                    ? changes.delay.currentValue : Popover.delay;
            }
            if (
                angular.isDefined(changes.visible)
				&& changes.visible.previousValue !== changes.visible.currentValue
            ) {
                ctrl.visible = changes.visible.currentValue !== false;
                if (angular.isObject(delay)) {
                    delay = delay[ctrl.visible ? 'show' : 'hide'] || Popover.delay;
                }
                if (timeout !== null) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(function() {
                    timeout = null;
                    if (ctrl.visible) {
                        if (ctrl.parentElement) {
                            angularBS.positionElement(
                                $element.children(), ctrl.parentElement, ctrl.placement,
                                ctrl.boundary !== null ? ctrl.boundary : undefined,
                                'bs-popover-'
                            );
                        } else { // static popover
                            angularBS.setPlacementCSS($element.children(), 'bs-popover-', ctrl.placement);
                            angularBS.adjustArrow($element.children(), ctrl.placement);
                        }
                        ctrl.fadeIn = ctrl.visible;
                    } else if (ctrl.animation && !changes.visible.isFirstChange()) {
                        // properly display fade out animation
                        ctrl.visible = true;
                        ctrl.fadeIn = false;
                        const transition = function() {
                            ctrl.visible = false;
                            $element.children()[0].removeEventListener('transitionend', transition);
                            $scope.$digest();
                        };
                        $element.children()[0].addEventListener('transitionend', transition);
                    } else {
                        ctrl.fadeIn = false;
                    }
                }, delay);
            }
        };
        //
        $attrs.$observe('placement', function(value) {
            ctrl.placement = value;
        });
        // check if title & content are not empty
        const title = angular.element($element[0].querySelector('.popover-header')),
            content = angular.element($element[0].querySelector('.popover-body'));
        $scope.$watch(function() {
            return title.text().trim();
        }, function(nV) {
            ctrl.titleVisible = nV !== '';
        });
        $scope.$watch(function() {
            return content.text().trim();
        }, function(nV) {
            ctrl.contentVisible = nV !== '';
        });
    }

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
    angular.module('angularBS.popover').component('bsPopover', {
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
        controller: bsPopoverComponentController
    });
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!(function() {
    'use strict';
    /**
	 * Popover default config
	 */
    angular.module('angularBS.popover').provider('Popover', function() {
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
        this.$get = function() {
            return this.config;
        };
    });
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    /**
	 * @ngInject
	 */
    bsToastComponentController.$inject = ["$scope", "$element", "$transclude", "$compile", "Toasts"];
    function bsToastComponentController($scope, $element, $transclude, $compile, Toasts) {
        const ctrl = this;
        // transclude
        $transclude(function(elements, scope) {
            let header, body;
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].tagName === 'BS-TOAST-HEADER') {
                    header = elements[i];
                } else if (elements[i].tagName === 'BS-TOAST-BODY') {
                    body = elements[i];
                }
            }
            if (header) {
                header = angular.element(header);
                header.addClass('toast-header');
                $element.children().append($compile(header)(scope))
            }
            if (body) {
                body = angular.element(body);
                body.addClass('toast-body d-block');
                $element.children().append($compile(body)(scope))
            }
        });
        //
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.animation)) {
                ctrl.animation = Toasts.animation;
            }
            if (angular.isUndefined(ctrl.autohide)) {
                ctrl.autohide = Toasts.autohide;
            }
            if (angular.isUndefined(ctrl.delay)) {
                ctrl.delay = Toasts.delay;
            }
        };
        //

        ctrl.$onChanges = function(changes) {
            if (
                angular.isDefined(changes.visible)
				&& changes.visible.previousValue !== changes.visible.currentValue
            ) {
                ctrl.visible = !!changes.visible.currentValue;
                if (ctrl.animation && !ctrl.visible && !changes.visible.isFirstChange()) {
                    // properly display fade out animation
                    ctrl.visible = true;
                    ctrl.fadeIn = false;
                    const transition = function() {
                        ctrl.visible = false;
                        $element.children()[0].removeEventListener('transitionend', transition);
                        $scope.$digest();
                    };
                    $element.children()[0].addEventListener('transitionend', transition);
                } else {
                    ctrl.fadeIn = ctrl.visible;
                }
            }
        };
    }

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
    angular.module('angularBS.toasts').component('bsToast', {
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
        controller: bsToastComponentController
    });
}());

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

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name bsTooltipBoundary
	 */
    angular.module('angularBS.tooltip').directive('bsTooltipBoundary', [function() {
        // noinspection JSUnusedGlobalSymbols
        return {
            restrict: 'A',
            controller: ['$element', function($element) {
                this.$element = $element;
            }]
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    bsTooltipToggleDirectiveController.$inject = ["$scope", "$element", "$attrs", "$compile", "$document", "$sce", "Tooltip"];
    function bsTooltipToggleDirectiveController($scope, $element, $attrs, $compile, $document, $sce, Tooltip) {
        const ctrl = this;
        let tooltipElement = null;
        //
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.bsTooltipToggle)) {
                ctrl.bsTooltipToggle = false;
            }
            const triggers = (angular.isUndefined($attrs.trigger) ? Tooltip.trigger : $attrs.trigger)
                    .split(' '),
                open = function() {
                    ctrl.bsTooltipToggle = true;
                    $scope.$digest();
                },
                close = function() {
                    ctrl.bsTooltipToggle = false;
                    $scope.$digest();
                };
            if (~triggers.indexOf('hover')) {
                $element.on('mouseenter', open);
                $element.on('mouseleave', close);
            }
            if (~triggers.indexOf('focus')) {
                $element.on('focus', open);
                $element.on('blur', close);
            }
            if (~triggers.indexOf('click')) {
                $element.on('click', function() {
                    ctrl.bsTooltipToggle = !ctrl.bsTooltipToggle;
                    $scope.$digest();
                });
            }
            ctrl.placement = angular.isUndefined($attrs.placement) ? Tooltip.placement : $attrs.placement;
            ctrl.$element = $element;
            ctrl.title = $sce.trustAsHtml(Tooltip.title);
        };
        //
        $attrs.$observe('title', function(value) {
            if (!(angular.isDefined(ctrl.html) && ctrl.html) || Tooltip.html) {
                value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i) {
                    return '&#' + i.charCodeAt(0) + ';'
                });
            }
            ctrl.title = $sce.trustAsHtml(value);
            $element.attr('title', '');
        });
        //
        const watcher = $scope.$watch(function() {
            return ctrl.bsTooltipToggle;
        }, function(nV) {
            if (nV) {
                $compile(
                    '<bs-tooltip visible="bsTpCtrl.bsTooltipToggle" animation="bsTpCtrl.animation" '
					+ 'delay="bsTpCtrl.delay" placement="{{bsTpCtrl.placement}}" '
					+ 'parent-element="bsTpCtrl.$element" '
					+ 'boundary="bsTpCtrl.boundary">'
					+ '<span ng-bind-html="bsTpCtrl.title"></span></bs-tooltip>'
                )($scope.$new(), function(newElement, newScope) {
                    newScope.bsTpCtrl = ctrl;
                    $document.find('body').append(newElement);
                    tooltipElement = newElement;
                });
                watcher(); // create tooltip element once and leave it be
            }
        });
        //
        ctrl.$onDestroy = function() {
            if (tooltipElement !== null) {
                tooltipElement.remove();
            }
        };
    }

    /**
	 * @ngdoc directive
	 * @name bsTooltipToggle
	 *
	 * @param {expression|boolean} bsTooltipToggle
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression|boolean} html
	 * @param {string} placement
	 * @param {string} title
	 * @param {string} trigger
	 */
    angular.module('angularBS.tooltip').directive('bsTooltipToggle', [function() {
        // noinspection JSUnusedGlobalSymbols
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
            link: function(scope, element, attrs, ctrl) {
                ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
            },
            controller: bsTooltipToggleDirectiveController
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';

    bsTooltipComponentController.$inject = ["$scope", "$element", "$attrs", "$timeout", "Tooltip", "angularBS"];
    function bsTooltipComponentController($scope, $element, $attrs, $timeout, Tooltip, angularBS) {
        const ctrl = this;
        let delay, timeout = null;
        //
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.animation)) {
                ctrl.animation = Tooltip.animation;
            }
            if (angular.isUndefined(ctrl.delay)) {
                ctrl.delay = Tooltip.delay;
            }
            ctrl.placement = Tooltip.placement;
            ctrl.defaultTitle = Tooltip.title;
            $element.children().css({top: 0});
        };
        //
        ctrl.$onChanges = function(changes) {
            if (angular.isDefined(changes.delay)) {
                delay = angular.isDefined(changes.delay.currentValue)
                    ? changes.delay.currentValue : Tooltip.delay;
            }
            if (
                angular.isDefined(changes.visible)
				&& changes.visible.previousValue !== changes.visible.currentValue
            ) {
                ctrl.visible = changes.visible.currentValue !== false;
                if (angular.isObject(delay)) {
                    delay = delay[ctrl.visible ? 'show' : 'hide'] || Tooltip.delay;
                }
                if (timeout !== null) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(function() {
                    timeout = null;
                    if (ctrl.visible) {
                        if (ctrl.parentElement) {
                            angularBS.positionElement(
                                $element.children(), ctrl.parentElement, ctrl.placement,
                                ctrl.boundary !== null ? ctrl.boundary : undefined,
                                'bs-tooltip-'
                            );
                        } else { // static tooltip
                            angularBS.setPlacementCSS($element.children(), 'bs-tooltip-', ctrl.placement);
                            angularBS.adjustArrow($element.children(), ctrl.placement);
                        }
                        ctrl.fadeIn = ctrl.visible;
                    } else {
                        // properly display fade out animation
                        ctrl.visible = true;
                        ctrl.fadeIn = false;
                        const transition = function() {
                            ctrl.visible = false;
                            $element.children()[0].removeEventListener('transitionend', transition);
                            $scope.$digest();
                        };
                        $element.children()[0].addEventListener('transitionend', transition);
                    }
                }, delay);
            }
        };
        //
        $attrs.$observe('placement', function(value) {
            ctrl.placement = value;
        });
        // check if title is not empty
        const title = angular.element($element[0].querySelector('.tooltip-inner'));
        $scope.$watch(function() {
            return title.text().trim();
        }, function(nV) {
            ctrl.titleVisible = nV !== '';
        });
    }

    /**
	 * @ngdoc component
	 * @name bsTooltip
	 *
	 * @param {expression|boolean} visible
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression} parentElement
	 * @param {expression} boundary
	 * @param {string} placement
	 */
    angular.module('angularBS.tooltip').component('bsTooltip', {
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
        controller: bsTooltipComponentController
    });
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * @ngdoc factory
	 * @name bsTooltipFactory
	 */
    angular.module('angularBS.tooltip').factory('bsTooltipFactory', ['$injector', function($injector) {
        return {
            customBindingDirective: function() {
                return {
                    restrict: 'A',
                    require: '?^bsTooltipBoundary',
                    compile: function(element, attrs) {
                        if (!('bsTooltipToggle' in attrs) && !('bsPopoverToggle' in attrs)) {
                            return function(scope, element, attrs, ctrl) {
                                const directive = $injector.get('bsTooltipToggleDirective')[0],
                                    bsTooltipToggleCtrl = $injector.instantiate(directive.controller, {
                                        '$scope': scope,
                                        '$element': element,
                                        '$attrs': attrs
                                    });
                                directive.compile(
                                    element, scope, attrs, [ctrl, bsTooltipToggleCtrl]
                                )(
                                    scope, element, attrs, [ctrl, bsTooltipToggleCtrl]
                                );
                                bsTooltipToggleCtrl.$onInit();
                                element.on('$destroy', function() {
                                    bsTooltipToggleCtrl.$onDestroy();
                                });
                            }
                        }
                    }
                }
            }
        };
    }]);
}());

/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!(function() {
    'use strict';
    /**
	 * Tooltip default configuration
	 */
    angular.module('angularBS.tooltip').provider('Tooltip', function() {
        this.config = {
            animation: true,
            delay: 0,
            placement: 'bottom',
            html: false,
            title: '',
            trigger: 'hover focus'
        };
        // noinspection JSUnusedGlobalSymbols
        this.$get = function() {
            return this.config;
        };
    });
}());
