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
        const posts = await PostModel.find()
        .sort({createdAt:-1}) //newest only
        .limit(20); //limit of 20

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

  export const deletePostByID = async (req: Request, res: Response) => {
    try {

      const {id} = req.params;

      const post = await PostModel.findByIdAndDelete(id);

      if (!post) {
        return res.sendStatus(404);
      }

      fs.unlinkSync(post.cover!); //delete post image too

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
      
      if (userPosts) {
        return res.status(200).json(userPosts).end();
      }

      else {
        return res.status(400);
      }
    } 
    catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const editPost = async (req: Request, res: Response) => {
    try {

      let newPath = req.body.cover;
      
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newImagePath = path + "." + ext;
  
        try {
          fs.renameSync(path, newImagePath);
          newPath = newImagePath;
        } 
        catch (error) {
          console.log(error);
          return res.sendStatus(500); // Internal Server Error
        }
      }

      const { id, title, content } = req.body;
  
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: id },
        {
          title,
          content,
          cover: newPath,
        },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.sendStatus(404); // Not Found
      }
  
      return res.status(200).json(updatedPost);
    } 
    catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  
  
  
  
  