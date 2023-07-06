import React from "react";
import { format } from "date-fns";

interface HomePostProps {
    title: string;
    createdAt: string;
    content: string;
    cover: string;
  }

const HomePost: React.FC<HomePostProps> = ({ title, createdAt, content, cover }) => {
    return (
        <div className="post-home">
        <div className="image">
            <img src={"backend/" + cover} id="home-img" alt="Post Cover" />
        </div>
        <div className="post-content">
            <h1>{title}</h1>
            <p className="info">
            <a className="author">Author</a>
            <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
            </p>
            <p id="summary" dangerouslySetInnerHTML={{ __html: content }}/>
        </div>
        </div>
    );
};


export default HomePost;