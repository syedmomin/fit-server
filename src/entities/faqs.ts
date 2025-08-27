import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("Faqs")
export default class Faq extends ISequence {
  @Column()
  question: string;

  @Column("text")
  answer: string;

  @Column({ default: 0 })
  sortOrder: number;
}
