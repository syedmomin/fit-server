"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoriesArray = exports.BlogCategoriesEnum = void 0;
var BlogCategoriesEnum;
(function (BlogCategoriesEnum) {
    BlogCategoriesEnum[BlogCategoriesEnum["TRENDS"] = 1] = "TRENDS";
    BlogCategoriesEnum[BlogCategoriesEnum["LIFESTYLE"] = 2] = "LIFESTYLE";
    BlogCategoriesEnum[BlogCategoriesEnum["HEALTH"] = 3] = "HEALTH";
    BlogCategoriesEnum[BlogCategoriesEnum["TRAINING"] = 4] = "TRAINING";
    BlogCategoriesEnum[BlogCategoriesEnum["FOOD"] = 5] = "FOOD";
    BlogCategoriesEnum[BlogCategoriesEnum["INSIGHTS"] = 6] = "INSIGHTS";
    BlogCategoriesEnum[BlogCategoriesEnum["NUTRITION"] = 7] = "NUTRITION";
    BlogCategoriesEnum[BlogCategoriesEnum["FITNESS"] = 8] = "FITNESS";
    BlogCategoriesEnum[BlogCategoriesEnum["WELLNESS"] = 9] = "WELLNESS";
})(BlogCategoriesEnum || (exports.BlogCategoriesEnum = BlogCategoriesEnum = {}));
exports.BlogCategoriesArray = [
    { id: BlogCategoriesEnum.TRENDS, text: "Trends" },
    { id: BlogCategoriesEnum.LIFESTYLE, text: "Lifestyle" },
    { id: BlogCategoriesEnum.HEALTH, text: "Health" },
    { id: BlogCategoriesEnum.TRAINING, text: "Training" },
    { id: BlogCategoriesEnum.FOOD, text: "Food" },
    { id: BlogCategoriesEnum.INSIGHTS, text: "Insights" },
    { id: BlogCategoriesEnum.NUTRITION, text: "Nutrition" },
    { id: BlogCategoriesEnum.FITNESS, text: "Fitness" },
    { id: BlogCategoriesEnum.WELLNESS, text: "Wellness" }
];
