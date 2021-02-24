import { placement } from '../helpers/angularBS.service';
export declare type popoverDelay = number | {
    show: number;
    hide: number;
};
export interface IPopoverOptions {
    animation: boolean;
    delay: popoverDelay;
    html: boolean;
    placement: placement;
    title: string;
    content: string;
    trigger: 'click' | 'hover' | 'focus' | string;
}
export declare class PopoverProvider {
    config: IPopoverOptions;
    $get(): IPopoverOptions;
}
