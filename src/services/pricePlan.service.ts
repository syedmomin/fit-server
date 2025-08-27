import PricePlan from "../entities/pricePlan";
import { BaseService } from "./base.service";

class PricePlanService extends BaseService<PricePlan> {
    async FindById(id: string) {
        return await this.GetOne(PricePlan, { id: id });
    }

    async GetAll() {
        return await this.Get(PricePlan, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(PricePlan, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(PricePlan, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(PricePlan, id);
    }

    async Create(body: any) {
        return await this.Post(PricePlan, body);
    }
}

export default new PricePlanService();
