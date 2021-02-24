import IInjectorService = angular.auto.IInjectorService;
import { IDirective } from 'angular';
/**
 * @ngInject
 */
export declare class BsTooltipFactory {
    private $injector;
    constructor($injector: IInjectorService);
    customBindingDirective(): IDirective;
}
