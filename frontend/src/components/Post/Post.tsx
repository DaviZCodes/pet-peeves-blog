import React, {useEffect, useContext} from "react";
import axios from "axios";
import "./Post.css"
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router";

function Post() {

    //user can only access /post if logged in
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    function createPost() {
        
    }

    //user can only access /post if logged in
    useEffect(() =>{
        //change title of tab
        document.title = "Post!"

        if (!userInfo) {
            navigate("/login");
        }
    }, [])

    return (
        <div className="create-post">
            <h1>Create a Post</h1>
            <textarea></textarea>
            <div className="button-container">
                <button id = "submit" onClick={createPost}>Post</button>
            </div>
        </div>
    );
}

export default Post;