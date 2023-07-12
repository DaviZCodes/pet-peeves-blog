"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
//mongoDB db for posts
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    cover: String,
    author: String,
}, {
    timestamps: true,
});
exports.PostModel = (0, mongoose_1.model)("Post", PostSchema);
//# sourceMappingURL=posts.js.map