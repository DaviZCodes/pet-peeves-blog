import {Router} from "express";
import multer from "multer";
const uploadMiddleware = multer({dest:"uploads/"})
import {createPost, getPosts} from "../controllers/posts";

export default (router: Router) => {
    router.post("/posts", uploadMiddleware.single("image"), createPost);
    router.get("/posts", getPosts);
}