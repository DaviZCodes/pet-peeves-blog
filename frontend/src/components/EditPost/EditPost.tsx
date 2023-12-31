import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import { Navigate, useNavigate, useParams } from "react-router";
import { UserContext } from "../UserContext/UserContext";
import "./EditPost.scss";

function EditPost() {

    //user can only access /post if logged in
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
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
    
    //fetch the single post
    useEffect(() => {
        const fetchPostInfo = async (): Promise<void> => {
            try {
                const response = await axios.get(`http://localhost:8019/posts/${id}`);

                if (response.status === 200) {
                    const postInformation = response.data;

                    //if user is not author, cannot edit, go back to home page
                    if (postInformation.author !== userInfo){
                        navigate("/");
                    }

                    else {
                        setTitle(postInformation.title);
                        setImage(postInformation.cover);
                        setSelectedFileNameText(postInformation.cover);
                        setQuillContent(postInformation.content);
                    }
                }
            }
            catch(error) {
                console.log(error);
            }
        };
        fetchPostInfo();
    }, []);

    async function editPost(event: { preventDefault: () => void; }){
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
            data.set("id", id!);

            const response = await axios.put("http://localhost:8019/posts/", data, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setRedirect(true);
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    const handleDeletePost = async () => {
        try {
            const response = await axios.delete(`http://localhost:8019/posts/${id}`);
            if (response.status === 200) {
              // Post deleted successfully
              navigate("/");
            }
          } 
            catch (error) {
                console.log(error);
            }
        };

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

    document.title = "Edit Post!";

    //redirect page
    if (redirect) {
        return <Navigate to = {`/posts/${id}`}/>
    }

    return (
        <div className="edit-post">
            <h1 id = "editposttext">Edit Post</h1>
            <form onSubmit={editPost}>
                <div className="user-input">
                    <input type = "title" id = "title" value = {title} placeholder="Title of your post" 
                    onChange={handleTitleChange} required></input> 

                    {showPassedTitleCharLimitText && (
                    <>
                    <p id = "passed-char"> You passed the character limit of 80.</p>
                    </>
                )}

                    <input type="file" id="file-input" accept = ".jpg, .jpeg, .png, .webp" onChange={handleImageChange}></input>
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
                    <button id = "submit">Edit Post</button>
                </div>

                {showYouMustFillText && (
                    <>
                    <p id = "insufficient-info"> Please fill out all the fields before posting.</p>
                    </>
                )}
            </form>
            <div className="delete-button-container">
                <button id = "delete-post" onClick={handleDeletePost}>Delete Post</button>
            </div>
        </div>
    );
}

export default EditPost;