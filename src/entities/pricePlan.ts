import { Entity, Column } from "typeorm";
import { ISequence } from "./baseModal";
import { PlanTypeEnum } from "../enums/pricePlan"
@Entity("PricePlans")
export default class PricePlan extends ISequence {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column("text")
    features: string;

    @Column("decimal", { precision: 10, scale: 0 })
    price: number;

    @Column({ nullable: true })
    highlightText: string;

    @Column({ default: false })
    highlighted: boolean;

    @Column({ nullable: true })
    buttonText: string;

    @Column({ nullable: true })
    discountText: string;

    @Column({
        type: "enum",
        enum: PlanTypeEnum,
        default: PlanTypeEnum.MONTHLY
    })
    type: PlanTypeEnum;
}   