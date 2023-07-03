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
    const [title, setTitle] = useState<string>("");
    const [images, setImages] = useState<any>(null);
    const [selectedFileNameText, setSelectedFileNameText] = useState<string>("");
    const [quillContent, setQuillContent] = useState<string>("");

    async function createPost(event: { preventDefault: () => void; }) {
        event.preventDefault();
        //if not all fields are filled out
        const titleInput = document.getElementById("title") as HTMLInputElement;
        if (!quillContent || !titleInput.value) {
          setShowYouMustFillText(true);
          return;
        }

        //if passed character limit
        if (showPassedCharLimitText){
            return;
        }

        try {
            const data = new FormData();
            data.set("title", title);
            data.set("content", quillContent);
            data.set("image", images[0]); //ensure only one image is passed
             
            const response = await axios.post("http://localhost:8019/posts", data);
        }

        catch (error) { 
            console.log(error);
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
        
    
    const handleImageChange = () => {
        //change to file name
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            setSelectedFileNameText(fileInput.files[0].name);
            setImages(fileInput.files[0]);
        }
    }

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
            <form onSubmit={createPost}>
                <div className="user-input">
                    <input type = "title" value = {title} placeholder="Title of your post" 
                    onChange={(event) => {setTitle(event.target.value)}} required></input>

                    <input type="file" id="file-input" accept = ".jpg, .jpeg, .png" onChange={handleImageChange}></input>
                    <label htmlFor="file-input"  id="image" className="custom-file-label">{selectedFileNameText || "Choose a file"}</label>

                    <ReactQuill id = "react-quill" value = {quillContent} 
                    onChange={handleQuillChange} placeholder="Write your post info here"></ReactQuill>
                </div>

                <p id = "char-max">char max: 2000</p>
                {showPassedCharLimitText && (
                    <>
                    <p id = "passed-char"> You passed the character limit.</p>
                    </>
                )}

                <div className="button-container">
                    <button id = "submit">Create Post</button>
                </div>

                {showYouMustFillText && (
                    <>
                    <p id = "insufficient-info"> Please fill out all the fields before posting.</p>
                    </>
                )}
            </form>
        </div>
    );
}

export default Post;