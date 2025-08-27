import ContactForm from "../entities/contactForm";
import { BaseService } from "./base.service";

class ContactFormService extends BaseService<ContactForm> {

    async FindById(id: string) {
        return await this.GetOne(ContactForm, { id: id });
    }

    async GetAll() {
        return await this.Get(ContactForm, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(ContactForm, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(ContactForm, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(ContactForm, id);
    }

    async Create(body: any) {
        return await this.Post(ContactForm, body);
    }
}

export default new ContactFormService();
