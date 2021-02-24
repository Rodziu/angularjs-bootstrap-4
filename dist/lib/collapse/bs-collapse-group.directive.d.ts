import { IDirective } from 'angular';
import { BsCollapseDirectiveController } from './bs-collapse.directive';
/**
 * @ngInject
 */
export declare class BsCollapseGroupDirectiveController {
    private children;
    register(bsCollapseCtrl: BsCollapseDirectiveController): void;
    unregister(bsCollapseCtrl: BsCollapseDirectiveController): void;
    expand(invokingCtrl: BsCollapseDirectiveController): void;
}
export declare function bsCollapseGroupDirective(): IDirective;
