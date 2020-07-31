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
                    width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : element.offsetWidth)
						+ parseInt(elemStyle.getPropertyValue('margin-left'))
						+ parseInt(elemStyle.getPropertyValue('margin-right')),
                    height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : element.offsetHeight)
						+ parseInt(elemStyle.getPropertyValue('margin-top'))
						+ parseInt(elemStyle.getPropertyValue('margin-bottom')),
                    top: Math.round(elemBCR.top + (window.pageYOffset || document.documentElement.scrollTop)),
                    left: Math.round(elemBCR.left + (window.pageXOffset || document.documentElement.scrollLeft)),
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
