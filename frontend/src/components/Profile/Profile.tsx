import React, {useState, useEffect, useContext} from "react";
import "./Profile.scss"
import { UserContext } from '../UserContext/UserContext';
import sadCat from "./images/cat sad.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Post {
    _id: string;
    title: string;
    content: string;
    cover: string;
    createdAt: string;
    author: string;
  }

function Profile() {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [showCatAndPost, setShowCatAndPost] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);

   //fetch all posts by Saad Ali to profile
    useEffect(() => {
        const fetchUserPosts = async (): Promise<void> => {
        try {
            const response = await axios.get(`http://localhost:8019/user-posts/${encodeURIComponent(userInfo!)}`);
        
            if (response.status === 200) {
            setPosts(response.data);
            setShowCatAndPost(false);
            }
        } catch (error) {
            console.log(error);
        }
        };
        fetchUserPosts();
    }, [userInfo]);


    useEffect(() => {
        //change title of tab
        document.title = "Profile!";

        if (!userInfo) {
            navigate("/login");
        }
    }, [])

    return (
        <div className="profile">
            <h1>Welcome back, "{userInfo}".</h1>

            <h2>Below are your posts:</h2>
            {!showCatAndPost && (
                <>
                    {posts.map((post) => (
                    <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <img src = {post.cover}></img>
                    </div>
                    ))}
                </>
                )}
            {showCatAndPost && (
            <>
            <Link to = "/post">
                <img src = {sadCat} alt = "Crying cat" id = "sad-cat"></img>
            </Link>
            
            <p id = "no-posts">You currently have no posts. Once you create a&nbsp;<Link to = "/post" id = "post">post </Link>, it will appear here.</p>
            </>
            )
}

        </div>
    );
}

export default Profile;