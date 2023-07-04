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
    const [image, setImage] = useState<FileList>();
    const [selectedFileNameText, setSelectedFileNameText] = useState<string>("");
    const [quillContent, setQuillContent] = useState<string>("");

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

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

        console.log(image);

        try {
            const data = new FormData();
            data.set("title", title);
            data.set("content", quillContent);

            if (image) {
                data.set("image", image[0]); //ensure only one image is passed
            }
             
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
        
    
      const handleImageChange = (event: { target: any; }) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
          setImage(fileInput.files);
          setSelectedFileNameText(fileInput.files[0].name);
        } 
        else {
          setImage(undefined);
          setSelectedFileNameText("");
        }
      };

    const handleQuillChange = (content:string) => {
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
                    <input type = "title" id = "title" value = {title} placeholder="Title of your post" 
                    onChange={(event) => {setTitle(event.target.value)}} required></input>

                    <input type="file" id="file-input" accept = ".jpg, .jpeg, .png, .webp" onChange={handleImageChange}></input>
                    <label htmlFor="file-input"  id="image" className="custom-file-label">{selectedFileNameText || "Choose a file"}</label>

                    <ReactQuill id = "react-quill" value = {quillContent} modules={modules} formats={formats}
                    onChange={handleQuillChange} placeholder="Write your post info here"/>
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