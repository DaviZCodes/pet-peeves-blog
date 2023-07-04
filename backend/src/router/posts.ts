import {Router} from "express";
import multer from "multer";
const uploadMiddleware = multer({dest:"uploads/"})
import {posts} from "../controllers/users";

export default (router: Router) => {
    router.post("/posts", uploadMiddleware.single("image"), posts);
}