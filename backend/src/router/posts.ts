import {Router} from "express";
import multer from "multer";
const uploadMiddleware = multer({dest:"uploads/"})
import {createPost, getPosts, getPostByID, getUserPosts, editPost} from "../controllers/posts";

export default (router: Router) => {
    router.post("/posts", uploadMiddleware.single("image"), createPost);
    router.get("/posts", getPosts);
    router.get("/posts/:id", getPostByID);
    router.get("/user-posts/:user", getUserPosts);
    router.put("/posts/:id", uploadMiddleware.single("image"), editPost);
}