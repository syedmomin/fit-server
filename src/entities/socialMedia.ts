import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("SocialMedia")
export default class SocialMedia extends ISequence {
    @Column()
    facebook: string;

    @Column()
    instagram: string;

    @Column()
    twitter: string;

    @Column()
    youtube: string;

    @Column()
    linkedin: string;
}