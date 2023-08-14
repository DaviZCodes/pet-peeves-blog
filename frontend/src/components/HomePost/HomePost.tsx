import React from "react";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${_id}`);
  };

  return (
    <div
      className="post-home"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="image">
        <img
          src={"http://localhost:8019/" + cover}
          id="home-img"
          alt="Post Cover"
        />
      </div>
      <div className="post-content">
        <h1>{title}</h1>
        <p className="info">
          <a className="author">{author}</a>
          <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
        </p>
        <p
          id="summary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(contentToShow),
          }}
        />
        {content.length > 306 && <p id="read-more"> Read more</p>}
      </div>
    </div>
  );
};

export default HomePost;
