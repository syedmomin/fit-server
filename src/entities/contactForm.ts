import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("ContactForms")
export default class ContactForm extends ISequence {
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column("varchar", { length: 13 })
  phone: string;

  @Column()
  message: string;
}
