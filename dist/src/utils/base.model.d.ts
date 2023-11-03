import { BaseEntity } from 'typeorm';
export declare class BaseModel extends BaseEntity {
    id: bigint;
    createdAt: Date;
    modifiedAt: Date;
}
