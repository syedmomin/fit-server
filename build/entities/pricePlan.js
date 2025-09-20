"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const baseModal_1 = require("./baseModal");
const pricePlan_1 = require("../enums/pricePlan");
let PricePlan = class PricePlan extends baseModal_1.ISequence {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PricePlan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PricePlan.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], PricePlan.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 0 }),
    __metadata("design:type", Number)
], PricePlan.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PricePlan.prototype, "highlightText", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PricePlan.prototype, "highlighted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PricePlan.prototype, "buttonText", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PricePlan.prototype, "discountText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: pricePlan_1.PlanTypeEnum,
        default: pricePlan_1.PlanTypeEnum.MONTHLY
    }),
    __metadata("design:type", Number)
], PricePlan.prototype, "type", void 0);
PricePlan = __decorate([
    (0, typeorm_1.Entity)("PricePlans")
], PricePlan);
exports.default = PricePlan;
