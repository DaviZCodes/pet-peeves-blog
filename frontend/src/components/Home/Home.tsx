import "./Home.scss"
import HomePost from "../HomePost/HomePost";
import {useState, useEffect} from "react";
import refreshpage from "./images/refreshpage.png"
import axios from "axios";

interface Post {
    title: string;
    content: string;
    cover: string;
    createdAt: string;
    author: string;
  }

function Home() {
    //state for posts
    const [posts, setPosts] = useState<Post[]>([]);

    //fetch all the new posts
    useEffect(() => {
        const fetchPosts = async (): Promise<void> => {
            try {
                const response = await axios.get("http://localhost:8019/posts");

                if (response.status === 200) {
                    setPosts(response.data);
                    console.log("these are the posts", response.data);
                }
            }
            catch(error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, [])

    //change tab title
    useEffect(() => {
        document.title = "Pet Peeves!";
    }, [])

    //refresh page
    const handleRefresh = () => {
        window.location.reload(); // Reloads the current page
      };
    

    return (
        <div className="home">

            <div className="header-container">
                <h1 id = "home-header" title="Thank you for being here!">
                    Pet Peeves</h1> <img src = {refreshpage} id = "refresh-icon" onClick={handleRefresh}  alt = "refresh page icon"
                    title="Refresh page"/>
            </div>
            <div className="page-line"></div>

            <div className="posts-container">
                {posts.length > 0 && posts.map((post, index) => (
                    <HomePost
                    key={index}
                    title={post.title}
                    createdAt={post.createdAt}
                    content={post.content}
                    cover={post.cover}
                    author={post.author}
                />
                ))}   

                    {/* <div className="post-home">
                    <div className="image">
                        <img src = {funnyDog} id = "home-img"></img>
                    </div>
                    <div className="post-content">
                        <h1>My dog is WAY too SPOILED!</h1>
                        <p className="info">
                            <a className="author">Sophie Smith</a>
                            <time>Jan 1, 2023</time>
                        </p>
                        <p id = "summary">My dog is an alcoholic.
                                        If I don't treat her like a princess, she just whines all day long.</p>
                    </div>
                </div>

                <div className="post-home">
                    <div className="image">
                        <img src = {parrot} id = "home-img"></img>
                    </div>
                    <div className="post-content">
                        <h1>Why does my parrot lie about everything?</h1>
                        <p className="info">
                            <a className="author">John Thoe</a>
                            <time>June 30, 2023</time>
                        </p>
                        <p id = "summary">My parrot likes to lie about everything?
                                        In sum, my parrot is a pathological liar. </p>
                    </div>
                </div>

                <div className="post-home">
                    <div className="image">
                        <img src = {shark} id = "home-img"></img>
                    </div>
                    <div className="post-content">
                        <h1>How do you pet a shark?</h1>
                        <p className="info">
                            <a className="author">Saad Ali</a>
                            <time>Mar 23, 2023</time>
                        </p>
                        <p id = "summary">Hey! I am a millionaire from Dubai. I have bought a giant aquarium. I was just wondering if sharks like to be pet like dogs?</p>
                    </div>
                </div> */}

            </div>
        </div>
    );
}

export default Home;