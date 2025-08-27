import { BaseEntity } from "typeorm";
import Logger from "../utility/logger";

export class BaseService<T extends BaseEntity> {

  protected async GetOne(modal: { new(): T; findOne: Function }, filter: any = {}, relations?: string[], isDeleted: boolean = false): Promise<T | undefined> {
    try {
      let getDetails: any = {};
      getDetails.where = { ...filter, isDeleted };
      if (relations) {
        getDetails.relations = relations;
      }
      return await modal.findOne(getDetails);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  protected async Get(modal: { new(): T; find: Function }, filter: any = {}, relations?: string[], isDeleted: boolean = false): Promise<T[]> {
    try {
      let getDetails: any = {};
      getDetails.where = { ...filter, isDeleted };
      if (relations) {
        getDetails.relations = relations;
      }
      return await modal.find(getDetails);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  protected async Post(modal: { new(): T; create: Function }, body: any): Promise<T> {
    try {
      const create = modal.create({ ...body });
      return await create.save();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  protected async Put(modal: { new(): T; update: Function; findOne: Function }, id: any, filter: any): Promise<T | undefined> {
    try {
      await modal.update(id, { ...filter });
      // Return updated entity
      return await modal.findOne({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  protected async SoftDelete(modal: { new(): T; update: Function }, id: any, filter?: any): Promise<any> {
    try {
      const body = { ...(filter || {}), isDeleted: true };
      return await modal.update(id, body);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async HardDelete(modal: { new(): T; delete: Function }, id: any): Promise<any> {
    try {
      return await modal.delete({ id });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}
