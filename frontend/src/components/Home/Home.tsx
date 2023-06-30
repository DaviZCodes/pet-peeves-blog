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
            <div className="posts-container">
                <div className="post-home">
                    <h1>My dog is WAY too SPOILED!</h1>
                    <div className="image">
                        <img src = {funnyDog}></img>
                    </div>
                    <p>My dog is an alcoholic.</p>
                </div>

                <div className="post-home">
                    <h1>My parrot likes to lie about everything?</h1>
                    <div className="image">
                     <img src = {parrot}></img>
                    </div>
                    <p>My parrot likes to lie about everything?</p>
                </div>

                <div className="post">
                    <h1>How do you pet a shark?</h1>
                    <div className="image">
                        <img src = {shark}></img>
                    </div>
                    <p>How do you pet a shark?</p>
                </div>
            </div>
        </div>
    );
}

export default Home;