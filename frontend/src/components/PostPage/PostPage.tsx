import {useEffect, useContext, useState} from "react";
import axios from "axios";
import "./PostPage.scss"
import { UserContext } from "../UserContext/UserContext";
import { Navigate, useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

function PostPage() {

    //user can only access /post if logged in
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const [showPassedContentCharLimitText, setShowContentPassedCharLimitText] = useState<boolean>(false);
    const [showYouMustFillText, setShowYouMustFillText] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [showPassedTitleCharLimitText, setShowPassedTitleCharLimitText] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const [selectedFileNameText, setSelectedFileNameText] = useState<string>("");
    const [quillContent, setQuillContent] = useState<string>("");
    const [redirect, setRedirect] = useState<boolean>(false);

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
        if (!quillContent || !title || (image === "")) {
          setShowYouMustFillText(true);
          return;
        }

        //if passed character limit
        if (showPassedContentCharLimitText){
            return;
        }

        try {
            const data = new FormData();
            data.set("title", title);
            data.set("content", quillContent);
            data.set("author", userInfo!);
    

            data.set("image", image?.[0]); //ensure only one image is passed
             
            const response = await axios.post("http://localhost:8019/posts", data);
            if (response.status === 200) {
                setRedirect(true);
            }
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
    
      const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        setShowPassedTitleCharLimitText(event.target.value.length > 80);
      };
    
      const handleImageChange = (event: any) => {
          setImage(event.target.files);
          setSelectedFileNameText(event.target.files[0].name);
      };

    const handleQuillChange = (content:string) => {
        setQuillContent(content);
        //display error if char limit is passed
        setShowContentPassedCharLimitText(content.length > 5000)
    }

    //user can only access /post if logged in
    useEffect(() =>{
        //change title of tab
        document.title = "Post!"

        if (!userInfo) {
            navigate("/login");
        }
    }, [])

    //redirect page
    if (redirect) {
        return <Navigate to = {"/"}/>
    }

    return (
        <div className="create-post">
            <h1 id = "createapost">Create a Post</h1>
            <form onSubmit={createPost}>
                <div className="user-input">
                    <input type = "title" id = "title" value = {title} placeholder="Title of your post" 
                    onChange={handleTitleChange} required></input> 
                    {showPassedTitleCharLimitText && (
                    <>
                    <p id = "passed-char"> You passed the character limit of 80.</p>
                    </>
                )}

                    <input type="file" id="file-input" accept = ".jpg, .jpeg, .png, .webp" onChange={handleImageChange} required></input>
                    <label htmlFor="file-input"  id="image" className="custom-file-label">{selectedFileNameText || "Choose a file"}</label>

                    <ReactQuill id = "react-quill" value = {quillContent} modules={modules} formats={formats}
                    onChange={handleQuillChange} placeholder="Write your post info here"/>
                </div>

                <p id = "char-max">char max: 5000</p>
                {showPassedContentCharLimitText && (
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

export default PostPage ;