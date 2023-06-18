import "./Home.css"
import React, {useEffect} from "react";

function Home() {
    //change tab title
    useEffect(() => {
        document.title = "Pet Peeves!";
    }, [])

    return (
        <div className="home">
            <header id = "title-page">
                <h1>Welcome Home</h1>
            </header>
            <body>
                <div className="post-container">
                    <div className="inside-container">
                        <div className="post-content">
                            <h2>Friends</h2>
                            <p>
                         HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                         HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                         HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                         HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                         HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                         HelloHelloHelloHelloHelloHelloHelloHelloHellolloHelloHelloHelloHello
                         </p>
                         <img src = "https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg" alt = "friends"></img>
                         </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Home;