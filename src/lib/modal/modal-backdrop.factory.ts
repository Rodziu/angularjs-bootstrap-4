/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {ICompileService, IDeferred, IDocumentService, IPromise, IQService, IRootScopeService, IScope} from 'angular';
import * as angular from 'angular';
import {BSModalBackdropController} from './bs-modal-backdrop.component';

interface IBackdropScope extends IScope {
    isVisible: () => boolean
}

/**
 * @ngInject
 */
export class ModalBackdropFactory {
    private $q: IQService;
    private _isVisible = false;
    private _isAnimated = false;
    private _backDropPromise: IDeferred<void>;
    private _openModals = 0;
    private _bodyElement: JQLite;
    public backdropController: BSModalBackdropController;

    constructor($document: IDocumentService, $compile: ICompileService, $rootScope: IRootScopeService, $q: IQService) {
        this.$q = $q;

        this._bodyElement = $document.find('body');
        const backdropElement = angular.element('<bs-modal-backdrop ng-if="isVisible()"></bs-modal-backdrop>'),
            backdropScope = $rootScope.$new(true) as IBackdropScope;
        // create backdrop element in body
        backdropScope.isVisible = this.isVisible.bind(this);
        $compile(backdropElement)(backdropScope);
        this._bodyElement.append(backdropElement);
    }

    isVisible(): boolean {
        return this._isVisible;
    }

    isAnimated(): boolean {
        return this._isAnimated;
    }

    show(backdrop: boolean, animate: boolean): IPromise<void> {
        this._openModals++;
        this._backDropPromise = this.$q.defer<void>();
        this._isAnimated = !!animate;
        this._bodyElement.addClass('modal-open');
        if (backdrop && !this._isVisible) {
            this._isVisible = true;
        } else {
            this._backDropPromise.resolve();
        }
        return this._backDropPromise.promise;
    }

    shown(): void {
        this._backDropPromise.resolve();
    }

    hide(): void {
        this._openModals--;
        if (this._openModals < 0) {
            this._openModals = 0;
        }
        if (this._openModals === 0) {
            if (angular.isDefined(this.backdropController)) {
                this.backdropController.hide().then(this._doHide);
            } else {
                this._doHide();
            }
        }
    }

    private _doHide = () => {
        this._isVisible = false;
        this._bodyElement.removeClass('modal-open');
    }
}
