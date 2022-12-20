import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

import {getDogDetail} from "../actions";


export default function DogDetail() {
    const dispatch= useDispatch();

    const prop= useParams();

    const id= prop.id;

    useEffect(() => {
        dispatch(getDogDetail(id));
    }, [id, dispatch]);

    const stateDetails= useSelector((state) => state.details);


    return (
        <div>
            {
                stateDetails.length>0?
                <div>
                    <h1>
                        {
                            stateDetails.name
                        }
                    </h1>
                    <img src={stateDetails.image} alt="404 not found"/>
                    <h3>
                        Temperament:{stateDetails.temperaments}
                        {/* Maybe with .map */}
                    </h3>
                    <h3>
                        Height:{stateDetails.height}
                    </h3>
                    <h3>
                        Weight:{stateDetails.weight}
                    </h3>
                    <h3>
                        Life Span:{stateDetails.lifespan}
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