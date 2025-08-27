import { Entity, Column, CreateDateColumn } from "typeorm";
import { ISequence } from "./baseModal";
import { BlogCategoriesEnum } from "../enums/blogCategories";

@Entity("Blogs")
export default class Blog extends ISequence {
    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column("text")
    content: string;

    @Column()
    shortDescription: string;

    @Column({ nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    date:Date;

    @Column({
        type: "enum",
        enum: BlogCategoriesEnum,
        default: BlogCategoriesEnum.TRENDS
    })
    categoryId: BlogCategoriesEnum;
}