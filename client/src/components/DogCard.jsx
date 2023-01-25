import React, {Fragment, useState} from "react";
import "../CSS/DogCard.css"

export default function DogCard({id, name, image, temperaments}) {

    if (typeof temperaments==="object") {
        var temperamentNames= [];
        for (let i=0; i<temperaments.length; i++) {
            temperamentNames.push(temperaments[i].name);
        }
    };
    
    return (
        <Fragment key={id}>
            <div className="card-DC">
                <div className="name-temp-DC">
                    <h1 className="name-DC">
                        {name}
                    </h1>
                    <h5 className="type-DC">
                        <p className="text-DC">{!temperamentNames? temperaments : temperamentNames.join(", ")}</p>
                    </h5>
                </div>
                <img className="image-DC" 
                src={image} alt="404 not found"/>
            </div>
        </Fragment>
    )
}