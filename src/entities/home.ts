import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";

@Entity("Home")
export default class Home extends ISequence {
    @Column()
    title: string;

    @Column()
    subTitle: string;

    @Column()
    description: string;

    @Column()
    bannerImage: string;
}
