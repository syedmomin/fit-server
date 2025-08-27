import GeneralSettings from "../entities/general";
import { BaseService } from "./base.service";

class GeneralSettingsService extends BaseService<GeneralSettings> {
    async FindById(id: string) {
        return await this.GetOne(GeneralSettings, { id: id });
    }

    async GetAll() {
        return await this.Get(GeneralSettings, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(GeneralSettings, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(GeneralSettings, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(GeneralSettings, id);
    }

    async Create(body: any) {
        return await this.Post(GeneralSettings, body);
    }
}

export default new GeneralSettingsService();