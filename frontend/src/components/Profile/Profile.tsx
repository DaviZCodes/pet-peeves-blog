import React, {useState, useEffect, useContext} from "react";
import "./Profile.css"
import { UserContext } from '../UserContext/UserContext';
import sadCat from "./images/cat sad.png"
import { Link } from "react-router-dom";

function Profile() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [showCatAndPost, setShowCatAndPost] = useState<boolean>(true);

    // useEffect(() => {
    //     setNoPostsText("");
    //     setShowCat(false);
    // }, [])

    return (
        <div className="profile">
            <h1>Welcome back, "{userInfo}".</h1>

            <h2>Below are your posts:</h2>
            {showCatAndPost && (
            <>
            <Link to = "/post">
                <img src = {sadCat} alt = "Crying cat" id = "sad-cat"></img>
            </Link>
            
            <p id = "no-posts">You currently have no posts. Once you create a  <Link to = "/post" id = "post">&nbsp;post </Link>, it will appear here.</p>
            </>
            )
}

        </div>
    );
}

export default Profile;