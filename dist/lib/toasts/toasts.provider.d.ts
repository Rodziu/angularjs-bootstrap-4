export interface IToastsOptions {
    animation: boolean;
}
export declare class ToastsProvider {
    config: IToastsOptions;
    $get(): IToastsOptions;
}
