import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("TermsAndConditions")
export default class TermsAndConditions extends ISequence {
    @Column("text")
    content: string;
}