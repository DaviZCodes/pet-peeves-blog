import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface HomePostProps {
    _id: string;
    title: string;
    createdAt: string;
    content: string;
    cover: string;
    author: string;
  } 

  const HomePost: React.FC<HomePostProps> = ({
    _id,
    title,
    createdAt,
    content,
    cover,
    author,
  }) => {
    const truncatedContent =
      content.length > 306 ? content.slice(0, 306) + "..." : content;
  
    const contentToShow = content.length > 306 ? truncatedContent : content;

    return (
        <div className="post-home">
        <div className="image">
            <Link to = {`/posts/${_id}`}>
            <img src={"http://localhost:8019/" + cover} id="home-img" alt="Post Cover" />
            </Link>
        </div>
        <div className="post-content">
            <Link to = {`/posts/${_id}`}>
                <h1>{title}</h1>
            </Link>
            <p className="info">
                <a className="author">{author}</a>
                <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
            </p>
            <Link to = {`/posts/${_id}`}>
                <p id="summary" dangerouslySetInnerHTML={{ __html: contentToShow  }}/>
                {content.length > 600 && <p id = "read-more"> Read more</p>}
            </Link>
        </div>
        </div>
    );
};


export default HomePost;