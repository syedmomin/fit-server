import Faq from "../entities/faqs";
import { BaseService } from "./base.service";

class FaqService extends BaseService<Faq> {
    async FindById(id: string) {
        return await this.GetOne(Faq, { id: id });
    }

    async GetAll() {
        return await this.Get(Faq, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(Faq, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(Faq, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(Faq, id);
    }

    async Create(body: any) {
        return await this.Post(Faq, body);
    }
}

export default new FaqService();
