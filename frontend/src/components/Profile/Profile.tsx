import React, {useState, useEffect, useContext} from "react";
import "./Profile.css"
import { UserContext } from '../UserContext/UserContext';

function Profile() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [noPostsText, setNoPostsText] = useState<string>("You currently have no posts. Once you create a post, it will appear here.")

    // useEffect(() => {
    //     setNoPostsText("");
    // }, [])

    return (
        <div className="profile">
            <h1>Welcome back, "{userInfo}".</h1>

            <h2>Below are your posts:</h2>
            <p id = "no-posts">{noPostsText}</p>
        </div>
    );
}

export default Profile;