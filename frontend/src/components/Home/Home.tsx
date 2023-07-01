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
                    <h1 id = "post-header">My dog is WAY too SPOILED!</h1>
                    <p id = "poster">Sophie Smith  &nbsp;&nbsp; Jan 1, 2023</p>
                    <div className="image">
                        <img src = {funnyDog} id = "home-img"></img>
                    </div>
                    <p id = "post-desc">My dog is an alcoholic.</p>
                </div>

                <div className="post-home">
                    <h1 id = "post-header">Why does my parrot lie about everything?</h1>
                    <p id = "poster">John Thoe &nbsp;&nbsp; June 30, 2023</p>
                    <div className="image">
                     <img src = {parrot} id = "home-img"></img>
                    </div>
                    <p id = "post-desc">My parrot likes to lie about everything?</p>
                </div>

                <div className="post-home">
                    <h1 id = "post-header">How do you pet a shark?</h1>
                    <p id = "poster">Saad Ali &nbsp;&nbsp; Mar 23, 2023</p>
                    <div className="image">
                        <img src = {shark} id = "home-img"></img>
                    </div>
                    <p id = "post-desc">Hey. I am a millionaire from Dubai. I have bought a giant 10,000 square feet aquarium. Is it possible to pet my shark?</p>
                </div>
            </div>
        </div>
    );
}

export default Home;