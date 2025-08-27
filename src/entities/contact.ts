import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";
import { ContactTypeEnum } from "../enums/customerTypes.enum";

@Entity('Contacts')
export default class Contact extends ISequence {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column({ nullable: true })
    alternateNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column({
        type: "enum",
        enum: ContactTypeEnum,
        default: ContactTypeEnum.Prospect
    })
    contactType: ContactTypeEnum;
}
