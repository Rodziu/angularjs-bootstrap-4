import { Injectable } from 'angular';
import { BSModalController } from './bs-modal.directive';
interface IModalOptions {
    backdrop: 'static' | boolean;
    keyboard: boolean;
    transitionDuration: number;
    backdropTransitionDuration: number;
    onBeforeChange: Injectable<(this: BSModalController) => boolean>;
}
export declare class ModalProvider {
    config: IModalOptions;
    backdropController: any;
    $get(): this;
}
export {};
