import React from "react";
import {Link} from "react-router-dom";
// import CSS

export default function LandingPage() {
    return (
        <div>
            <Link to={"/dogs"}>
                <button>LAUNCH</button>
            </Link>
        </div>
    )
};