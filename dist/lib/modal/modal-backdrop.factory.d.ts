import { ICompileService, IDocumentService, IPromise, IQService, IRootScopeService } from 'angular';
import { BSModalBackdropController } from './bs-modal-backdrop.component';
/**
 * @ngInject
 */
export declare class ModalBackdropFactory {
    private $q;
    private _isVisible;
    private _isAnimated;
    private _backDropPromise;
    private _openModals;
    private _bodyElement;
    backdropController: BSModalBackdropController;
    constructor($document: IDocumentService, $compile: ICompileService, $rootScope: IRootScopeService, $q: IQService);
    isVisible(): boolean;
    isAnimated(): boolean;
    show(backdrop: boolean, animate: boolean): IPromise<void>;
    shown(): void;
    hide(): void;
    private _doHide;
}
