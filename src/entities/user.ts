import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { BaseModal } from "./baseModal";
import bcrypt from "bcrypt";
import { UserRoleEnum } from "../enums/userRole";

@Entity('Users')
export default class User extends BaseModal {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true, })
    profileImage: string;

    @Column()
    name: string;

    @Column({ unique: true, nullable: true })
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: "enum",
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: UserRoleEnum;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    emailVerify: boolean;

    @Column({ default: false })
    phoneVerify: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 12);
        }
    }
}
