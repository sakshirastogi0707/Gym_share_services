import { ValueTransformer } from 'typeorm';
export declare class TimeStringNumTransformer implements ValueTransformer {
    to(value: string): number;
    from(value: number): string;
}
