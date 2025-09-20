"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanTypeArray = exports.PlanTypeEnum = void 0;
var PlanTypeEnum;
(function (PlanTypeEnum) {
    PlanTypeEnum[PlanTypeEnum["MONTHLY"] = 10] = "MONTHLY";
    PlanTypeEnum[PlanTypeEnum["ANNUAL"] = 20] = "ANNUAL";
})(PlanTypeEnum || (exports.PlanTypeEnum = PlanTypeEnum = {}));
exports.PlanTypeArray = [
    { id: PlanTypeEnum.MONTHLY, text: "Monthly" },
    { id: PlanTypeEnum.ANNUAL, text: "Annual" },
];
