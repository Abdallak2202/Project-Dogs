import React, {Fragment} from "react";
// import CSS

export default function DogCard({id, name, image, temperaments}) {
    if (typeof temperaments==="object") {
        var temperamentNames= [];
        for (let i=0; i<temperaments.length; i++) {
            temperamentNames.push(temperaments[i].name);
        }
    };

    return (
        <Fragment key={id}>
            <div>
                <h1>
                    {name}
                </h1>
                <h5>
                    <p>{!temperamentNames? temperaments : temperamentNames.join(" ")}</p>
                </h5>
                <img src={image} alt="404 not found"/>
            </div>
        </Fragment>
    )
}