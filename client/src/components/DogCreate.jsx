import {React, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import { getTemperaments, postDog } from "../actions";
// import CSS


function validate(input) {
    let errors= {};

    if (!input.name.trim()) {
        errors.name= "Please select a name for your dog";
    }
    else if (parseInt(input.name)) {
        errors.name= "Please use at least one letter at the beginning";
    }

    if (!input.temperaments) {
        errors.temperaments= "Please select at least one temperament";
    }

    if (!input.height || !input.weight) {
        errors.height= "Required field";
        errors.weight= "Required field";
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
        setErrors(
            validate({
                ...data,
                [e.target.name]: e.target.value
            })
        );

        if (!Object.keys(errors).length && data.name && data.temperaments && data.height && data.weight) {
            dispatch(postDog(data));
            alert("Dog created successfully!");
            setData({
                name: "",
                image: "",
                height: "",
                weight: "",
                lifespan: "",
                temperaments: []
            })
        }
        else {
            alert("Sorry, we couldn't create your dog");
            return;
        }
        history.goBack();
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
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name: </label>
                        <input
                        placeholder="Dog name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => handleChange(e)}
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
                        placeholder="Dog image"
                        type="img"
                        name="image"
                        value={data.image}
                        alt="Not found"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Height: </label>
                        <input
                        placeholder="Dog height"
                        type="number"
                        name="height"
                        value={data.height}
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.height && (
                                <p>
                                    {errors.height}
                                </p>
                            )
                        }
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input
                        placeholder="Dog weight"
                        type="number"
                        name="weight"
                        value={data.weight}
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.weight && (
                                <p>
                                    {errors.weight}
                                </p>
                            )
                        }
                    </div>
                    <div>
                        <label>Life Span: </label>
                        <input
                        placeholder="Dog life span"
                        type="number"
                        name="lifespan"
                        value={data.lifespan}
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <label>Temperaments: </label>
                    <select onChange={(e) => handleSelect(e)}>
                        {
                            errors.temperaments && (
                                <p>
                                    {errors.temperaments}
                                </p>
                            )
                        }
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
                    data.temperaments.map(t => 
                    <ul key={t}>
                        <li>
                            <p>{t}</p>
                            <button onClick={() => handleDelete(t)}>
                                X
                            </button>
                        </li>
                    </ul>
                    )
                }
            </div>
            
        </div>
    )
}