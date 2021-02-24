import { IDirective, IDocumentService, IScope, ITimeoutService } from 'angular';
import IInjectorService = angular.auto.IInjectorService;
import { ModalBackdropFactory } from './modal-backdrop.factory';
import { ModalProvider } from './modal.provider';
import * as angular from 'angular';
/**
 * @ngInject
 */
export declare class BSModalController {
    private readonly $timeout;
    private $document;
    private $injector;
    private Modal;
    private ModalBackdrop;
    private _keydownHandler;
    private _bsModal;
    private onBeforeChange;
    $scope: IScope;
    $element: JQLite;
    backdrop: 'static' | boolean;
    keyboard: boolean;
    bsModal: boolean;
    constructor($scope: IScope, $element: JQLite, $timeout: ITimeoutService, $document: IDocumentService, $injector: IInjectorService, Modal: ModalProvider, ModalBackdrop: ModalBackdropFactory);
    $onInit(): void;
    $doCheck(): void;
    $onDestroy(): void;
    _onKeydown(e: JQueryKeyEventObject): void;
    _doShow(): void;
    _doHide(): void;
    _shouldChange(): boolean;
    show(): void;
    hide(): void;
}
export declare function bsModalDirective(): IDirective;
