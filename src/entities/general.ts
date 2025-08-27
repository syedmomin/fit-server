import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("GeneralSettings")
export default class GeneralSettings extends ISequence {
    @Column()
    logo: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;
}
