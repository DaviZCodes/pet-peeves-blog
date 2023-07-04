import {Request, Response} from "express";
import fs from "fs";
import multer from "multer";
const uploadMiddleware = multer({dest:"uploads/"});
import {PostModel} from "../database/posts";

export const createPost = async (req: Request, res: Response) => {
    try {

      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length -1];
        const newImagePath = path+"."+ext
        fs.renameSync(path, newImagePath);

        const {title, content} = req.body;

        const postDocument = await PostModel.create({
            title,
            content,
            cover: newImagePath, 
        })
        return res.status(200).json(postDocument).end();
      }

    }
     catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.find();

        return res.status(200).json(posts).end();
      }

      catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };