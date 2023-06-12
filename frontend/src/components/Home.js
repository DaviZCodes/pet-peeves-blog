import React, {useEffect} from "react";

function Home() {
    //change tab title
    useEffect(() => {
        document.title = "Pet Peeves!";
    }, [])

    return (
        <div className="home">
            <h1>Home Page</h1>
        </div>
    );
}

export default Home;