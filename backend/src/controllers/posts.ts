import {Request, Response} from "express";
import fs from "fs";
import {PostModel} from "../database/posts";

export const createPost = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.sendStatus(400);
      }
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length -1];
        const newImagePath = path+"."+ext
        fs.renameSync(path, newImagePath);

        const {title, content, author} = req.body;

        const postDocument = await PostModel.create({
            title,
            content,
            cover: newImagePath, 
            author,
        },
        );

        //credientials include will result into creating a second empty post after create post

        return res.status(200).json(postDocument).end();


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