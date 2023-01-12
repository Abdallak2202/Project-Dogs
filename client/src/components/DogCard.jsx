import React, {Fragment} from "react";
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
                <h1 className="name-DC">
                    {name}
                </h1>
                <h5 className="type-DC">
                    <p>{!temperamentNames? temperaments : temperamentNames.join(", ")}</p>
                </h5>
                <img className="image-DC" 
                src={image} alt="404 not found"/>
            </div>
        </Fragment>
    )
}