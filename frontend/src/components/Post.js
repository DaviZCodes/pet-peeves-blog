import React, {useEffect} from "react";

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