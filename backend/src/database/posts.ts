//mongoDB db for posts
import {Schema, model} from "mongoose";

const PostSchema = new Schema({
    title: String,
    content: String,
    cover: String,
}, {
    timestamps: true,
});

export const PostModel = model("Post", PostSchema);