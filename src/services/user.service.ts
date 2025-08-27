import User from "../entities/user";
import { BaseService } from "./base.service";

class UserService extends BaseService<User> {

    async FindById(id: string) {
        return await this.GetOne(User, { id: id });
    }

    async GetAll() {
        return await this.Get(User, {});
    }

    async Update(id: string, body: any) {
        return await this.Put(User, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(User, filter);
    }

    async Delete(id: string) {
        return await this.SoftDelete(User, id);
    }

    async Create(body: any) {
        return await this.Post(User, body);
    }
}

export default new UserService();
