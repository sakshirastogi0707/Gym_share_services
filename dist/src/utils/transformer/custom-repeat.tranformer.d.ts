import { ValueTransformer } from 'typeorm';
export declare class CustomRepeatTransformer implements ValueTransformer {
    to(value: any): any;
    from(value: any): any;
}
