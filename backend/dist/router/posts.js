"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uploadMiddleware = (0, multer_1.default)({ dest: "uploads/" });
const posts_1 = require("../controllers/posts");
exports.default = (router) => {
    router.post("/posts", uploadMiddleware.single("image"), posts_1.createPost);
    router.get("/posts", posts_1.getPosts);
    router.get("/posts/:id", posts_1.getPostByID);
    router.put("/posts", uploadMiddleware.single("image"), posts_1.editPost);
    router.delete("/posts/:id", posts_1.deletePostByID);
    router.get("/user-posts/:username", posts_1.getUserPosts);
};
//# sourceMappingURL=posts.js.map