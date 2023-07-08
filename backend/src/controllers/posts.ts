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

  export const getPostByID = async (req: Request, res: Response) => {
    try {

        const {id} = req.params;

        const post = await PostModel.findById(id).populate("author");

        return res.status(200).json(post).end();
      }

      catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  
  export const getUserPosts = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const decodedUserId = decodeURIComponent(username); // Decode the user ID
  
      const userPosts = await PostModel.find({ author: decodedUserId });
  
      return res.status(200).json(userPosts);
    } 
    catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const editPost = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.sendStatus(400);
      }

      const { id, title, content, author } = req.body;
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newImagePath = path + "." + ext;
      fs.renameSync(path, newImagePath);
  
      const postDoc = await PostModel.findById(id);
      if (!postDoc) {
        return res.sendStatus(404);
      }
  
      postDoc.title = title;
      postDoc.content = content;
      postDoc.cover = newImagePath;
      postDoc.author = author;
  
      await postDoc.save();
  
      return res.status(200).json(postDoc).end();
    } 

    catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  
  
  
  
  
  