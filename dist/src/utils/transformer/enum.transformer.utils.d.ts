import { ValueTransformer } from 'typeorm';
export declare class EnumTransformer implements ValueTransformer {
    private genEnum;
    constructor(genericEnum: any);
    to(value: string): number;
    from(value: number): string;
}
