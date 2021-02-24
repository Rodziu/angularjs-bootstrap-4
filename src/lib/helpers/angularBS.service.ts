/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import * as angular from 'angular';

export interface IElementOffset {
    width: number,
    height: number,
    top: number,
    left: number
}

export type placement = 'top' | 'left' | 'right' | 'bottom' | string;

export class AngularBSService {
    /**
     * Get element width, height, position from top and left of document/window,
     */
    offset(element: HTMLElement): IElementOffset {
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
    }

    /**
     * Removes all placement classes on given element
     */
    setPlacementCSS(element: JQLite, prefix: string, placement: placement): void {
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
    positionElement(
        element: JQLite,
        positionTo: JQLite,
        placement: placement,
        boundaryElement?: JQLite,
        cssPrefix?: string
    ): void {
        const splitPlacement = placement.split(' ');
        let top = 0, left = 0,
            arrowTop = '50%',
            realPlacement: placement = 'left',
            offset = this.offset(element[0]);
        const offsetTo = this.offset(positionTo[0]),
            placements: placement[] = ['right', 'top', 'bottom'],
            auto = !!~splitPlacement.indexOf('auto'),
            calcPosition = () => {
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
        const bo = angular.isDefined(boundaryElement) ? this.offset(boundaryElement[0]) : {
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
                        arrowTop = (offsetTo.top + offsetTo.height / 2) + 'px';
                    } else if (top + offset.height > bo.top + bo.height) {
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
    adjustArrow(element: JQLite, placement: placement): void {
        const arrow = angular.element(element[0].querySelector('.arrow'));
        if (angular.isDefined(arrow)) {
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
