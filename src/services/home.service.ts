import Home from "../entities/home";
import { BaseService } from "./base.service";

class HomeService extends BaseService<Home> {
    async FindById(id: string) {
        return await this.GetOne(Home, { id: id });
    }

    async GetAll() {
        return await this.Get(Home, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(Home, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(Home, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(Home, id);
    }

    async Create(body: any) {
        return await this.Post(Home, body);
    }
}

export default new HomeService();
