import {React, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import { getTemperaments, postDog } from "../actions";
// import CSS


function validate(data) {
    let errors= {};

    if (!data.name || !data.height || !data.weight || data.temperament) {
        errors.name= "Fields missing";
    }
    return errors;
}

export default function DogCreate() {
    const dispatch= useDispatch();
    const history= useHistory();
    const stateTemperaments= useSelector((state) => state.temperaments);

    const [errors, setErrors]= useState({});

    const [data, setData]= useState({
        name: "",
        image: "",
        height: "",
        weight: "",
        lifespan: "",
        temperaments: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...data,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setData({
            ...data,
            temperaments: [...data.temperaments, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postDog(data));
        alert("Created successfully");
        setData({
            name: "",
            image: "",
            height: "",
            weight: "",
            lifespan: "",
            temperaments: []
        })
        history.push("/dogs");
    }

    function handleDelete(t) {
        setData({
            ...data,
            temperaments: data.temperaments.filter(temperament => temperament!==t)
        })
    }


    return (
        <div>

            <div>
                <h1>
                    Create your own Dog!
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name: </label>
                        <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        />
                        {
                            errors.name && (
                                <p>
                                    {errors.name}
                                </p>
                            )
                        }
                    </div>
                    <div>
                        <label>Image: </label>
                        <input
                        type="text"
                        name="image"
                        value={data.image}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Height: </label>
                        <input
                        type="number"
                        name="height"
                        value={data.height}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input
                        type="number"
                        name="weight"
                        value={data.weight}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Life Span: </label>
                        <input
                        type="number"
                        name="lifespan"
                        value={data.lifespan}
                        onChange={handleChange}
                        />
                    </div>
                    <select onChange={handleSelect}>
                        {
                            stateTemperaments.map((t) => (
                                <option value={t.name}>
                                    {t.name}
                                </option>
                            ))
                        }
                    </select>
                    <button type="submit">
                        Create Now!
                    </button>
                    <ul>
                        <li>
                            {
                                data.temperaments.map(t => t,",")
                            }
                        </li>
                    </ul>
                    <Link to="/dogs">
                        <button>
                            Back to Main Page
                        </button>
                    </Link>
                </form>
                {
                    data.temperaments.map(t => <div>
                           <p>{t}</p>
                           <button onClick={() => handleDelete(t)}>
                                X
                           </button>
                       </div>
                    )
                }
            </div>
            
        </div>
    )
}