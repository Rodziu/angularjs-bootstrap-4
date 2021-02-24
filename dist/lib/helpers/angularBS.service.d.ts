/// <reference types="angular" />
export interface IElementOffset {
    width: number;
    height: number;
    top: number;
    left: number;
}
export declare type placement = 'top' | 'left' | 'right' | 'bottom' | string;
export declare class AngularBSService {
    /**
     * Get element width, height, position from top and left of document/window,
     */
    offset(element: HTMLElement): IElementOffset;
    /**
     * Removes all placement classes on given element
     */
    setPlacementCSS(element: JQLite, prefix: string, placement: placement): void;
    /**
     * Position element aside of positionTo on given side (placement)
     * @param element
     * @param positionTo
     * @param placement
     * @param [boundaryElement] - defaults to document|window
     * @param cssPrefix
     * @returns {{top: number, left: number, position: string}}
     */
    positionElement(element: JQLite, positionTo: JQLite, placement: placement, boundaryElement?: JQLite, cssPrefix?: string): void;
    /**
     * Properly set arrow position of tooltip/popover element
     */
    adjustArrow(element: JQLite, placement: placement): void;
}
