import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("BlogCategories")
export default class BlogCategories  extends ISequence {

  @Column()
  name: string;
}
