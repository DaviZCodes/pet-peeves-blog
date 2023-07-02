import React, {useEffect, useContext, useState} from "react";
import axios from "axios";
import "./Post.css"
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

function Post() {

    //user can only access /post if logged in
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [showPassedCharLimitText, setShowPassedCharLimitText] = useState<boolean>(false);
    const [showYouMustFillText, setShowYouMustFillText] = useState<boolean>(false);
    const [quillContent, setQuillContent] = useState("");

    function createPost() {
        const titleInput = document.getElementById("title") as HTMLInputElement;
        if (!quillContent || !titleInput.value) {
          setShowYouMustFillText(true);
          return;
        }
    }

    //if text fields are empty, display error for 2.5 secs
    useEffect(() => {
        let showSubmitErrorMessage:number;

        if (showYouMustFillText) {
            showSubmitErrorMessage = setTimeout(() => {
                setShowYouMustFillText(false);
            }, 2500);
        }
    
        return () => {
          clearTimeout(showSubmitErrorMessage);
        };
    
      }, [showYouMustFillText]);
        
    
    const handleQuillChange = (content: string) => {
        setQuillContent(content);
        //display error if char limit is passed
        setShowPassedCharLimitText(content.length > 2000)
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
            <div className="user-input">
                <input type = "title" placeholder="Title of your post" required></input>
                <input type = "summary" placeholder="Summary of your post" required></input>
                <input type = "file"></input>
                <ReactQuill id = "react-quill" value = {quillContent} onChange={handleQuillChange}></ReactQuill>
            </div>

            <p id = "char-max">char max: 2000</p>
            {showPassedCharLimitText && (
                <>
                <p id = "passed-char"> You passed the character limit.</p>
                </>
            )}

            <div className="button-container">
                <button id = "submit" onClick={createPost}>Post</button>
            </div>

            {showYouMustFillText && (
                <>
                <p id = "insufficient-info"> Please fill out all the fields before posting.</p>
                </>
            )}
        </div>
    );
}

export default Post;