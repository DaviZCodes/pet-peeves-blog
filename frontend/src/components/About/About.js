import React, {useEffect} from "react";

function About() {

    //change tab title
    useEffect(() => {
        document.title = "Who are we?";
    }, [])

    return (
        <div className="about">
            <h1>Who are we?</h1>
        </div>
    );
}

export default About;