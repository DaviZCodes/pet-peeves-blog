import React from "react";
import { format } from "date-fns";

interface HomePostProps {
    title: string;
    createdAt: string;
    content: string;
    cover: string;
    author: string;
  } 

  const HomePost: React.FC<HomePostProps> = ({
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
            <img src={"http://localhost:8019/" + cover} id="home-img" alt="Post Cover" />
        </div>
        <div className="post-content">
            <h1>{title}</h1>
            <p className="info">
                <a className="author">{author}</a>
                <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
            </p>
            <p id="summary" dangerouslySetInnerHTML={{ __html: contentToShow  }}/>
            {content.length > 600 && <p id = "read-more"> Read more</p>}
        </div>
        </div>
    );
};


export default HomePost;