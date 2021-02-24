import { IComponentOptions, IPromise, IQService, ITimeoutService } from 'angular';
import { ModalBackdropFactory } from './modal-backdrop.factory';
export declare class BSModalBackdropController {
    private $element;
    private $q;
    private readonly $timeout;
    private ModalBackdrop;
    private isAnimated;
    /**
     * @ngInject
     */
    constructor($element: JQLite, $q: IQService, $timeout: ITimeoutService, ModalBackdrop: ModalBackdropFactory);
    $onInit(): void;
    $postLink(): void;
    hide(): IPromise<void>;
}
export declare const bsModalBackdropComponent: IComponentOptions;
