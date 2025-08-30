import privacyPolicy from "../entities/privacyPolicy";
import { BaseService } from "./base.service";

class privacyPolicyService extends BaseService<privacyPolicy> {
    async FindById(id: string) {
        return await this.GetOne(privacyPolicy, { id: id });
    }

    async GetAll() {
        return await this.Get(privacyPolicy, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(privacyPolicy, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(privacyPolicy, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(privacyPolicy, id);
    }

    async Create(body: any) {
        return await this.Post(privacyPolicy, body);
    }
}

export default new privacyPolicyService();
