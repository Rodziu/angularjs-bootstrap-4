import IInjectorService = angular.auto.IInjectorService;
import { IDirective } from 'angular';
export declare class BsTooltipFactory {
    private $injector;
    constructor($injector: IInjectorService);
    customBindingDirective(): IDirective;
}
