import React, {useEffect} from "react";
import "./Post.css"

function Post() {

    useEffect(() =>{
        document.title = "Post!"
    }, [])

    return (
        <div className="post">
            <h1>Post</h1>
        </div>
    );
}

export default Post;