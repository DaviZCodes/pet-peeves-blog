import {useState, useEffect, useContext} from "react";
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
  
          if (response.data.length === 0) {
            setTimeout(() => {
                setShowCatAndPost(true);
                setFetchingPostsText(false);
              }, 500);

          } else {
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
  }, [userInfo]);


    useEffect(() => {
        // Change title of tab
        document.title = 'Profile!';
    
        if (!userInfo) {
          const timeoutId = setTimeout(() => {
            navigate('/login');
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [userInfo, navigate]);

    return (
        <div className="profile">
            <h1>Welcome back,&nbsp; 
                <span id = "profile-username">{userInfo}</span>
                .
            </h1>

            <h2>Below are your posts:</h2>
            <br></br>
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
                    {posts.map((post, index) => (
                    <div key={post._id}>
                        <h1 id = "post-title">{post.title}</h1>

                        {userInfo === post.author && (
                            <div className = "#edit-post-container">
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