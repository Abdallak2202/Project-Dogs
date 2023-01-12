import React from "react";
import {Link} from "react-router-dom";
import "../CSS/LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page-LP">
            <Link to={"/dogs"}>
                <button className="button-LP">
                    LAUNCH
                </button>
            </Link>
        </div>
    )
};