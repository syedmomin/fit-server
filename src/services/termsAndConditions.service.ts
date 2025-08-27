import TermsAndConditions from "../entities/termsAndCondition";
import { BaseService } from "./base.service";

class TermsAndConditionsService extends BaseService<TermsAndConditions> {
    async FindById(id: string) {
        return await this.GetOne(TermsAndConditions, { id: id });
    }

    async GetAll() {
        return await this.Get(TermsAndConditions, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(TermsAndConditions, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(TermsAndConditions, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(TermsAndConditions, id);
    }

    async Create(body: any) {
        return await this.Post(TermsAndConditions, body);
    }
}

export default new TermsAndConditionsService();
