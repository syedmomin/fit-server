import { Request, Response } from "express";
import fs from "fs";

const uploadFile = {
  singleImage: async function (req: Request, res: Response) {
    try {
      const { filePath, imageName, file } = req.body;
      const path = `./website/assets/images/${filePath}${imageName}`;
      const imgdata = file;
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");
      fs.writeFileSync(path, base64Data, { encoding: "base64" });

      return res.send({
        code: 200,
        status: true,
        message: "File is uploaded!",
      });
    } catch (error:any) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },

  multiImage: async function (req: Request, res: Response) {
    try {
      const { file, imageName } = req.body;
      if (!file || file.length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
      }

      file.forEach((imgData: string, index: number) => {
        const filePath = `./website/assets/images/order/${imageName[index]}`;
        const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, "");
        fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
      });

      return res.status(200).json({
        code: 200,
        status: true,
        message: "Files are uploaded successfully!",
      });
    } catch (error:any) {
      return res.status(500).json({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
};

export default uploadFile;
