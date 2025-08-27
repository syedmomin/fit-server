import Blog from "../entities/blog";
import { BaseService } from "./base.service";

class BlogsService extends BaseService<Blog> {

     async FindById(id: string) {
          return await this.GetOne(Blog, { id: id });
      }
  
      async GetAll() {
          return await this.Get(Blog, {});
      }
  
      async Update(id: number, body: any) {
          return await this.Put(Blog, id, body);
      }
  
      async IsExist(filter: any) {
          return await this.GetOne(Blog, filter);
      }
  
      async Delete(id: number) {
          return await this.SoftDelete(Blog, id);
      }
  
      async Create(body: any) {
          return await this.Post(Blog, body);
      }
}

export default new BlogsService();
