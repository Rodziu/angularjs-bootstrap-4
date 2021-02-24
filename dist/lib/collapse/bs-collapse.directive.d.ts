import { IDirective, IScope } from 'angular';
import * as angular from 'angular';
import 'angular-animate';
/**
 * @ngInject
 */
export declare class BsCollapseDirectiveController {
    private $scope;
    private $element;
    private readonly $animateCss;
    private bsCollapse;
    private group;
    constructor($scope: IScope, $element: JQLite, $animateCss: angular.animate.IAnimateCssService);
    $onInit(): void;
    private expand;
    private collapse;
}
export declare function bsCollapseDirective(): IDirective;
