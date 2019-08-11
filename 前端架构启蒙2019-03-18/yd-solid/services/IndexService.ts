import {IIndex} from "../interface/IIndex";
import {Model} from "../models/User";
import {provide, TAGS} from "../ioc/ioc"
@provide(TAGS.IndexService)
export class IndexService implements IIndex {
    private userStorage : Model.User[] = [
        {
            email: "yuanzhijia@yidengxuetang.com",
            name: "老袁"
        }, {
            email: "yuanzhijia@yidengfe.com",
            name: "老王"
        }
    ];
    public getUser(id : string) : Model.User {
        let result: Model.User;
        result = this.userStorage[id];
        return result;
    }
}