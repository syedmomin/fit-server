"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_service_1 = __importDefault(require("../services/contact.service"));
class collection {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, address, alternateNumber, city, country, customerType, } = req.body;
                const existingCustomer = yield contact_service_1.default.IsExist({ phone });
                if (existingCustomer) {
                    return res.status(400).send({
                        status: false,
                        code: 400,
                        message: "This Customer Already Exists!",
                    });
                }
                const newCustomer = yield contact_service_1.default.Create(Object.assign({}, req.body));
                res.status(200).send({
                    code: 200,
                    status: true,
                    message: "Add customer Successfully",
                    data: newCustomer,
                });
            }
            catch (error) {
                res.status(500).send({
                    status: false,
                    code: 500,
                    message: error.message,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { id } = _a, updateColumns = __rest(_a, ["id"]);
                const existingCustomer = yield contact_service_1.default.FindById(id);
                if (!existingCustomer) {
                    return res.status(404).send({
                        status: false,
                        code: 404,
                        message: "Customer not found",
                    });
                }
                yield contact_service_1.default.Update(id, updateColumns);
                res.status(200).send({
                    code: 200,
                    status: true,
                    message: "Update customer Successfully",
                    data: existingCustomer,
                });
            }
            catch (error) {
                res.status(500).send({
                    status: false,
                    code: 500,
                    message: error.message,
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const existingCustomer = yield contact_service_1.default.FindById(id);
                if (!existingCustomer) {
                    return res.status(404).send({
                        status: false,
                        code: 404,
                        message: "Customer not found",
                    });
                }
                yield contact_service_1.default.Delete(id);
                res.status(200).send({
                    code: 200,
                    status: true,
                    message: "Delete customer Successfully",
                });
            }
            catch (error) {
                res.status(500).send({
                    status: false,
                    code: 500,
                    message: error.message,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield contact_service_1.default.GetAll();
                if (customers.length > 0) {
                    res.status(200).send({
                        code: 200,
                        status: true,
                        message: "Get all customer",
                        data: customers,
                    });
                }
                else {
                    res.status(206).send({
                        code: 206,
                        status: false,
                        message: "customer Not Exist!",
                    });
                }
            }
            catch (error) {
                res.status(500).send({
                    status: false,
                    code: 500,
                    message: error.message,
                });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const existingCustomer = yield contact_service_1.default.FindById(id);
                if (!existingCustomer) {
                    return res.status(404).send({
                        status: false,
                        code: 404,
                        message: "Customer not found",
                    });
                }
                res.status(200).send({
                    code: 200,
                    status: true,
                    message: "Get customer",
                    data: existingCustomer,
                });
            }
            catch (error) {
                res.status(500).send({
                    status: false,
                    code: 500,
                    message: error.message,
                });
            }
        });
    }
}
;
exports.default = new collection();
