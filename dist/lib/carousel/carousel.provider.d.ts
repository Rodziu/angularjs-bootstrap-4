export interface ICarouselOptions {
    interval: number;
    pause: 'hover' | null;
    wrap: boolean;
    keyboard: boolean;
}
export declare class CarouselProvider {
    config: ICarouselOptions;
    $get(): ICarouselOptions;
}
