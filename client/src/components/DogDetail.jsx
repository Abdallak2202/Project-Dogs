import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

import {getDogDetail} from "../actions";
import "../CSS/DogDetail.css"


export default function DogDetail() {
    const dispatch= useDispatch();

    const {id}= useParams();

    useEffect(() => {
        dispatch(getDogDetail(id));
        return () => {
            dispatch(getDogDetail())
        }
    }, [id, dispatch]);

    var stateDetails= useSelector((state) => state.details);

    if (typeof stateDetails.temperaments==="object") {
        var temperamentNames= [];
        for (let i=0; i<stateDetails.temperaments.length; i++) {
            temperamentNames.push(stateDetails.temperaments[i].name);
        };
        var dogObject= {
            name: stateDetails.name,
            image: stateDetails.image,
            temperaments: temperamentNames.join(", "),
            height: stateDetails.height,
            weight: stateDetails.weight,
            lifespan: stateDetails.lifespan
        };
    };


    if (dogObject) {
        return (
            <div>

                <div className="container-DD">
                    <div className="container-name-DD">
                        <h1 className="name-DD">
                            {
                                dogObject.name
                            }
                        </h1>
                        <img className="image-DD"
                        src={dogObject.image} alt="404 not found"/>
                    </div>
                    <div className="container-attributes-DD">
                        <h3>
                            Temperament: {dogObject.temperaments}
                        </h3>
                        <h3>
                            Height: {dogObject.height}
                        </h3>
                        <h3>
                            Weight: {dogObject.weight}
                        </h3>
                        <h3>
                            Life Span: {dogObject.lifespan}
                        </h3>
                    </div>
                </div>
            
            <Link to="/dogs">
                <button className="button-DD">
                    Main Page
                </button>
            </Link>
        </div>
        )
    }
    else if (stateDetails.length>0) {
        return (
            <div>
            
                <div className="container-DD">
                    <div className="container-name-DD">
                        <h1 className="name-DD">
                            {
                                stateDetails[0].name
                            }
                        </h1>
                        <img className="image-DD"
                        src={stateDetails[0].image} alt="404 not found"/>
                    </div>
                    <div className="container-attributes-DD">
                        <h3>
                            Temperament: {stateDetails[0].temperaments}
                        </h3>
                        <h3>
                            Height: {stateDetails[0].height}
                        </h3>
                        <h3>
                            Weight: {stateDetails[0].weight}
                        </h3>
                        <h3>
                            Life Span: {stateDetails[0].lifespan}
                        </h3>
                    </div>
                </div>
            
            <Link to="/dogs">
                <button className="button-DD">
                    Main Page
                </button>
            </Link>
        </div>
        )
    }
    else {
        return (
            <div>
                <p>
                    Sorry, the ID doesn't match with any dog
                </p>

                <Link to="/dogs">
                <button className="button-DD">
                    Main Page
                </button>
                </Link>
            </div>
        )
    }


}