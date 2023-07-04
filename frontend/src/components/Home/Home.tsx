import "./Home.scss"
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
                    <div className="image">
                        <img src = {funnyDog} id = "home-img"></img>
                    </div>
                    <div className="post-content">
                        <h1>My dog is WAY too SPOILED!</h1>
                        <p className="info">
                            <a className="author">Sophie Smith</a>
                            <time>Jan 1, 2023</time>
                        </p>
                        <p id = "summary">My dog is an alcoholic.
                                        If I don't treat her like a princess, she just whines all day long.</p>
                    </div>
                </div>

                <div className="post-home">
                    <div className="image">
                        <img src = {parrot} id = "home-img"></img>
                    </div>
                    <div className="post-content">
                        <h1>Why does my parrot lie about everything?</h1>
                        <p className="info">
                            <a className="author">John Thoe</a>
                            <time>June 30, 2023</time>
                        </p>
                        <p id = "summary">My parrot likes to lie about everything?
                                        In sum, my parrot is a pathological liar. </p>
                    </div>
                </div>

                <div className="post-home">
                    <div className="image">
                        <img src = {shark} id = "home-img"></img>
                    </div>
                    <div className="post-content">
                        <h1>How do you pet a shark?</h1>
                        <p className="info">
                            <a className="author">Saad Ali</a>
                            <time>Mar 23, 2023</time>
                        </p>
                        <p id = "summary">Hey! I am a millionaire from Dubai. I have bought a giant aquarium. I was just wondering if sharks like to be pet like dogs?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;