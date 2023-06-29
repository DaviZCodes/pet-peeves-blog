import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import sleepyCatGif from "./images/sleepy_cat_gif.gif"
import "./About.css"

function About() {

    //change tab title
    useEffect(() => {
        document.title = "Who are we?";
    }, [])

    //showing text when user clicks on cat
    const [isVisible, setVisible]= useState<boolean>(false)

    const showText = () => {
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 2006); 
    }

    //send to page history
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="about">
            <header>
            <h1>Who are we?</h1>
            </header>
            <h2><div className="motto">Pet Peeves is a place for&nbsp;<div className="everyone">everyone</div></div>.</h2>
            <body>
            <p id = "intro">Feel free to share everything about your pet. Ask questions to pet experts. 
                <br></br>
                Send memes and pictures of your pet. And remember:
                Do not wake up your sleeping pet. EVER.
            </p>

            <img src = {sleepyCatGif} alt = "Sleeping GIF" id = "cat-gif" onClick={showText}></img>

            <p id = "info">
                We are a company looking to bring people together through diverse means.
                <br></br>
                Music, sports, and of course animals are some of the ways people can be brought together.
                <br></br>
                Our mission is to promote curiosity, knowledge, and to create long lasting friendships within our community. 
            </p>

            <p id = "copyright" onClick={handleClick}>
                Pet Peeves
            </p>

                {isVisible && <p id = "do-not-pet">
                    DO NOT PET THE SLEEPING CAT
                </p>}
            </body>
        </div>
    );
}

export default About;