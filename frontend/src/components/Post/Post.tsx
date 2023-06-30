import React, {useEffect, useContext, useState} from "react";
import axios from "axios";
import "./Post.css"
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router";

function Post() {

    //user can only access /post if logged in
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [passedCharLimit, setPassedCharLimit] = useState<boolean>(false);

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
            <p id = "char-max">char max: 300</p>
            {passedCharLimit && (
                <>
                <p id = "passed-char"> You passed the character limit.</p>
                </>
            )}
            <div className="button-container">
                <button id = "submit" onClick={createPost}>Post</button>
            </div>
        </div>
    );
}

export default Post;