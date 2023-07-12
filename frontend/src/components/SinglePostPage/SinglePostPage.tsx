import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { format } from "date-fns";
import "./SinglePostPage.scss"
import { UserContext } from "../UserContext/UserContext";
import { Link, useNavigate } from "react-router-dom";

interface PostInfo {
    _id: string;
    title: string;
    author: string;
    createdAt: string;
    cover: string;
    content: string;
  }

function SinglePostPage() {
    const navigate = useNavigate();
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState<PostInfo | null>(null);

    //fetch the single post
    useEffect(() => {
        const fetchSinglePost = async (): Promise<void> => {
            try {
                const response = await axios.get(`http://localhost:8019/posts/${id}`);

                if (response.status === 200) {
                    setPostInfo(response.data);
                }
            }
            catch(error) {
                console.log(error);
            }
        };

        fetchSinglePost();
    }, []);

    if (!postInfo) {
        return null;
    }

    return (
        <div className="specific-post-page">
            <div className="post-content">
                <h1>{postInfo.title}</h1>
                <p className="info">
                    <a className="author">{postInfo.author}</a>
                    {userInfo === postInfo.author && (
                        <div>
                            <Link to = {`/edit/${postInfo._id}`} id = "edit-post">Edit Post</Link>
                        </div>
                    )}
                    <br></br>
                    <time>{format(new Date(postInfo.createdAt), "MMM d, yyyy")}</time>
                </p>
            </div>
            <div className="image">
                <img src={`http://localhost:8019/${postInfo.cover}`} id="home-img" alt="Post Cover" />
            </div>
             <div className="post-content">
                <p id="summary" dangerouslySetInnerHTML={{ __html: postInfo.content }}/>
            </div>
        </div>
    )
}

export default SinglePostPage;