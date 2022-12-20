import React, {Fragment} from "react";
// import CSS

export default function DogCard({id, name, image, temperaments}) {
    return (
        <Fragment key={id}>
            <div>
                <h1>
                    {name}
                </h1>
                <h5>
                    <p>{temperaments}</p>
                </h5>
                <img src={image} alt="404 image not found"/>
            </div>
        </Fragment>
    )
}