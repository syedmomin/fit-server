"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactTypeArray = exports.ContactTypeEnum = void 0;
var ContactTypeEnum;
(function (ContactTypeEnum) {
    ContactTypeEnum[ContactTypeEnum["Prospect"] = 10] = "Prospect";
    ContactTypeEnum[ContactTypeEnum["Simple"] = 20] = "Simple";
    ContactTypeEnum[ContactTypeEnum["Premium"] = 30] = "Premium";
})(ContactTypeEnum || (exports.ContactTypeEnum = ContactTypeEnum = {}));
exports.ContactTypeArray = [
    { id: ContactTypeEnum.Prospect, text: "Prospect" },
    { id: ContactTypeEnum.Simple, text: "Simple" },
    { id: ContactTypeEnum.Premium, text: "Premium" },
];
