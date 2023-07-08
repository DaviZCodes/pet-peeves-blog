import React, {useState, useEffect, useContext} from "react";
import "./Profile.scss"
import { UserContext } from '../UserContext/UserContext';
import sadCat from "./images/cat sad.png";
import loadingGif from "./images/spinning loading.gif";
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
    const [showCatAndPost, setShowCatAndPost] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [fetchingPostsText, setFetchingPostsText] = useState<boolean>(true);

   //fetch all of your own posts to profile
    useEffect(() => {
        const fetchUserPosts = async (): Promise<void> => {
        try {

            const response = await axios.get(`http://localhost:8019/user-posts/${userInfo!}`);
        
            if (response.status === 200) {
                setPosts(response.data);

                if (posts.length != 0) {
                    setShowCatAndPost(false);
                    setFetchingPostsText(false);
                }
            }
        } 
        catch (error) {
            console.log(error);
        }
        };
        fetchUserPosts();
    }, );

    //first show no cat, only show fetching, if not fetched after 2 seconds, show cat
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowCatAndPost(true);
          setFetchingPostsText(false);
        }, 2000);
    
        return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts before 2 seconds
    
      }, []);


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
            {fetchingPostsText && (
                <>
                <p>Fetching your posts...</p>
                <div style = {{marginTop: "30px"}}>
                    <img src = {loadingGif} id = "loading"></img>
                </div>
                </>
            )}
            {!showCatAndPost && (
                <>
                <div className="page-line"></div>
                    {posts.map((post) => (
                    <div key={post._id} className="post">

                        <h1 id = "post-title">{post.title}</h1>
                        {userInfo === post.author && (
                        <div>
                            <Link to = {`/edit/${post._id}`} id = "edit-post">Edit Post</Link>
                        </div>
                             )}

                        <img src = {`http://localhost:8019/${post.cover}`} id = "profile-post-img"></img>

                        <div className="post-content">
                            <p id="summary" dangerouslySetInnerHTML={{ __html: post.content }}/>
                        </div>
                        <div className="page-line"></div>
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