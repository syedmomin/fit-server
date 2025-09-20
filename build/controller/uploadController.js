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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const uploadFile = {
    singleImage: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filePath, imageName, file } = req.body;
                const path = `./website/assets/images/${filePath}${imageName}`;
                const imgdata = file;
                const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                fs_1.default.writeFileSync(path, base64Data, { encoding: "base64" });
                return res.send({
                    code: 200,
                    status: true,
                    message: "File is uploaded!",
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
    },
    multiImage: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { file, imageName } = req.body;
                if (!file || file.length === 0) {
                    return res.status(400).json({ message: "No files were uploaded." });
                }
                file.forEach((imgData, index) => {
                    const filePath = `./website/assets/images/order/${imageName[index]}`;
                    const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                    fs_1.default.writeFileSync(filePath, base64Data, { encoding: "base64" });
                });
                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: "Files are uploaded successfully!",
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    code: 500,
                    message: error.message,
                });
            }
        });
    },
};
exports.default = uploadFile;
