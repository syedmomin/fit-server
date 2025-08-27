import BlogCategories from "../entities/blogCategories";
import { BaseService } from "./base.service";

class BlogCategoriesService extends BaseService<BlogCategories> {
  async FindById(id: string) {
           return await this.GetOne(BlogCategories, { id: id });
       }
   
       async GetAll() {
           return await this.Get(BlogCategories, {});
       }
   
       async Update(id: number, body: any) {
           return await this.Put(BlogCategories, id, body);
       }
   
       async IsExist(filter: any) {
           return await this.GetOne(BlogCategories, filter);
       }
   
       async Delete(id: number) {
           return await this.SoftDelete(BlogCategories, id);
       }
   
       async Create(body: any) {
           return await this.Post(BlogCategories, body);
       }
}

export default new BlogCategoriesService();
