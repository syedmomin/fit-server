import Contact from "../entities/contact";
import { BaseService } from "./base.service";

class ContactService extends BaseService<Contact> {

    async FindById(id: string) {
        return await this.GetOne(Contact, { id: id });
    }

    async GetAll() {
        return await this.Get(Contact, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(Contact, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(Contact, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(Contact, id);
    }

    async Create(body: any) {
        return await this.Post(Contact, body);
    }
}

export default new ContactService();
