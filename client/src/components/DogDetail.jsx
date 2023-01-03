import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

import {getDogDetail} from "../actions";
// import CSS


export default function DogDetail() {
    const dispatch= useDispatch();

    const {id}= useParams();

    useEffect(() => {
        dispatch(getDogDetail(id));
        return () => {
            dispatch(getDogDetail())
        }
    }, [id, dispatch]);

    const stateDetails= useSelector((state) => state.details);


    return (
        <div>
            {
                stateDetails.length>0?
                <div>
                    <h1>
                        {
                            stateDetails[0].name
                        }
                    </h1>
                    <img src={stateDetails[0].image} alt="404 not found"/>
                    <h3>
                        Temperament: {stateDetails[0].temperaments}
                        {/* Maybe with .map */}
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
                </div> :
                <p>Loading...</p>
            }
            <Link to="/dogs">
                <button>
                    Main Page
                </button>
            </Link>
        </div>
    )
}