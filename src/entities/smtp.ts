import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("SmtpSettings")
export default class SmtpSettings extends ISequence {
    @Column()
    host: string;

    @Column()
    port: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    fromEmail: string;
}