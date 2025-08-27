import SocialMedia from "../entities/socialMedia";
import { BaseService } from "./base.service";

class SocialMediaService extends BaseService<SocialMedia> {
    async FindById(id: string) {
        return await this.GetOne(SocialMedia, { id: id });
    }

    async GetAll() {
        return await this.Get(SocialMedia, {});
    }

    async Update(id: number, body: any) {
        return await this.Put(SocialMedia, id, body);
    }

    async IsExist(filter: any) {
        return await this.GetOne(SocialMedia, filter);
    }

    async Delete(id: number) {
        return await this.SoftDelete(SocialMedia, id);
    }

    async Create(body: any) {
        return await this.Post(SocialMedia, body);
    }
}

export default new SocialMediaService();
