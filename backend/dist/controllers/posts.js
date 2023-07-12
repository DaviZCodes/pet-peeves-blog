"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPost = exports.getUserPosts = exports.deletePostByID = exports.getPostByID = exports.getPosts = exports.createPost = void 0;
const fs_1 = __importDefault(require("fs"));
const posts_1 = require("../database/posts");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.sendStatus(400);
        }
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newImagePath = path + "." + ext;
        fs_1.default.renameSync(path, newImagePath);
        const { title, content, author } = req.body;
        const postDocument = yield posts_1.PostModel.create({
            title,
            content,
            cover: newImagePath,
            author,
        });
        //credientials include will result into creating a second empty post after create post
        return res.status(200).json(postDocument).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield posts_1.PostModel.find()
            .sort({ createdAt: -1 }) //newest only
            .limit(20); //limit of 20
        return res.status(200).json(posts).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getPosts = getPosts;
const getPostByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield posts_1.PostModel.findById(id).populate("author");
        return res.status(200).json(post).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getPostByID = getPostByID;
const deletePostByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield posts_1.PostModel.findByIdAndDelete(id);
        if (!post) {
            return res.sendStatus(404);
        }
        fs_1.default.unlinkSync(post.cover); //delete post image too
        return res.status(200).json(post).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.deletePostByID = deletePostByID;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const decodedUserId = decodeURIComponent(username); // Decode the user ID
        const userPosts = yield posts_1.PostModel.find({ author: decodedUserId });
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
});
exports.getUserPosts = getUserPosts;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newPath = req.body.cover;
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split(".");
            const ext = parts[parts.length - 1];
            const newImagePath = path + "." + ext;
            try {
                fs_1.default.renameSync(path, newImagePath);
                newPath = newImagePath;
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(500); // Internal Server Error
            }
        }
        const { id, title, content } = req.body;
        const updatedPost = yield posts_1.PostModel.findOneAndUpdate({ _id: id }, {
            title,
            content,
            cover: newPath,
        }, { new: true });
        if (!updatedPost) {
            return res.sendStatus(404); // Not Found
        }
        return res.status(200).json(updatedPost);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.editPost = editPost;
//# sourceMappingURL=posts.js.map