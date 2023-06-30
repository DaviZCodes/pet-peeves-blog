import "./Home.css"
import React, {useEffect} from "react";
import funnyDog from "./images/funny dog.png";
import parrot from "./images/parrot.jpeg";
import shark from "./images/shark.jpg";

function Home() {
    //change tab title
    useEffect(() => {
        document.title = "Pet Peeves!";
    }, [])

    return (
        <div className="home">
            <h1>Home Page</h1>
            <div className="posts-container">
                <div className="post">
                    <h1>Dog</h1>
                    <div className="image">
                        <img src = {funnyDog}></img>
                    </div>
                </div>

                <div className="post-home">
                    <h1>Parrot</h1>
                    <div className="image">
                     <img src = {parrot}></img>
                    </div>
                </div>

                <div className="post">
                    <h1>Shark</h1>
                    <div className="image">
                        <img src = {shark}></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;