import { placement } from '../helpers/angularBS.service';
export declare type tooltipDelay = number | {
    show: number;
    hide: number;
};
export interface ITooltipOptions {
    animation: boolean;
    delay: tooltipDelay;
    placement: placement;
    html: boolean;
    title: string;
    trigger: 'click' | 'hover' | 'focus' | string;
}
export declare class TooltipProvider {
    config: ITooltipOptions;
    $get(): ITooltipOptions;
}
