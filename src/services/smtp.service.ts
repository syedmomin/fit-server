import SMTP from "../entities/smtp";
import { BaseService } from "./base.service";

class SMTPService extends BaseService<SMTP> {
    async FindById(id: string) {
        return await this.GetOne(SMTP, { id: id });
    }

    async GetAll() {
        return await this.Get(SMTP, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(SMTP, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(SMTP, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(SMTP, id);
    }

    async Create(body: any) {
        return await this.Post(SMTP, body);
    }
}

export default new SMTPService();
