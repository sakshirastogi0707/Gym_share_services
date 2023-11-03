import { BaseModel } from 'src/utils/base.model';
import { Instructor } from './instructor.entity';
export declare class Certificate extends BaseModel {
    orderId: number;
    name: string;
    pdfFile: string;
    isActive: boolean;
    instructor: Instructor;
}
