import { IAttributes, ICompileService, IDirective, IDocumentService, ISCEService, IScope } from 'angular';
import { ITooltipOptions } from './tooltip.provider';
/**
 * @ngInject
 */
export declare class BsTooltipToggleDirectiveController {
    private $scope;
    private $element;
    private $attrs;
    private $document;
    private $sce;
    private Tooltip;
    private _tooltipElement;
    private html;
    private title;
    private bsTooltipToggle;
    private placement;
    constructor($scope: IScope, $element: JQLite, $attrs: IAttributes, $compile: ICompileService, $document: IDocumentService, $sce: ISCEService, Tooltip: ITooltipOptions);
    $onInit(): void;
    $onDestroy(): void;
}
export declare function bsTooltipToggleDirective(): IDirective;
