import {Router} from "express";
import multer from "multer";
const uploadMiddleware = multer({dest:"uploads/"})
import {createPost, getPosts, getPostByID, deletePostByID, getUserPosts, editPost} from "../controllers/posts";

export default (router: Router) => {
    router.post("/posts", uploadMiddleware.single("image"), createPost);
    router.get("/posts", getPosts);
    router.get("/posts/:id", getPostByID);
    router.put("/posts", uploadMiddleware.single("image"), editPost);
    router.delete("/posts/:id", deletePostByID);
    router.get("/user-posts/:username", getUserPosts);
}