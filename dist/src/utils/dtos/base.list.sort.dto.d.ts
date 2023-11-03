import { BaseListDto } from './base.list.dto';
export declare class BaseListSortDto extends BaseListDto {
    orderBy?: string;
    orderId?: 'ASC' | 'DESC';
}
