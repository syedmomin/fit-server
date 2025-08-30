import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("privacyPolicy")
export default class privacyPolicy extends ISequence {
    @Column("text")
    content: string;
}