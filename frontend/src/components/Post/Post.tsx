import React, {useEffect} from "react";
import axios from "axios";
import "./Post.css"

function Post() {

    useEffect(() =>{
        document.title = "Post!"
    }, [])

    return (
        <div className="post">
            <h1>Create a Post</h1>
            <textarea></textarea>
        </div>
    );
}

export default Post;