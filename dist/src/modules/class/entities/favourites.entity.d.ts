import { BaseModel } from 'src/utils/base.model';
import { User } from '../../user/entity/user.entity';
import { Class } from 'src/modules/class/entities/class.entity';
export declare class Favourites extends BaseModel {
    user: User;
    class: Class;
}
