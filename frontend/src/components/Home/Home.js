import "./Home.css"
import React, {useEffect} from "react";
import sleepyCatGif from "./images/sleepy_cat_gif.gif"

function Home() {
    //change tab title
    useEffect(() => {
        document.title = "Pet Peeves!";
    }, [])

    return (
        <div className="home">
            <h1>Home Page</h1>
            <img src = {sleepyCatGif} alt = "Sleeping GIF" id = "cat-gif"></img>
        </div>
    );
}

export default Home;