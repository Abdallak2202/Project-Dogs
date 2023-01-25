import {React, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import {postDog} from "../actions";
import "../CSS/DogCreate.css"

function validate(input) {
    var error= {};

    if (!input.name.trim()) {
        error.name= "Please select a name for your dog";
    }
    else if (parseInt(input.name)) {
        error.name= "Please use at least one letter at the beginning";
    }

    if (input.temperaments.length===0) {
        error.temperaments= "Please select at least one temperament";
    }

    if (!input.height) {
        error.height= "Required field";
    }

    if (!input.weight) {
        error.weight= "Required field";
    }

    if (!input.lifespan) {
        error.lifespan= "Required field";
    }

    return error;
}

export default function DogCreate() {
    const dispatch= useDispatch();

    const history= useHistory();

    const stateTemperaments= useSelector((state) => state.temperaments);

    const stateDogs= useSelector((state) => state.dogs);

    const [errors, setErrors]= useState({});

    const [imgSrc, setImgSrc]= useState("");

    const [data, setData]= useState({
        name: "",
        height: "",
        weight: "",
        lifespan: "",
        image: "",
        temperaments: []
    })

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
        setErrors(validate({
            ...data,
            temperaments: [...data.temperaments, e.target.value]
        }))
    }

    const handleFiles = (file) => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) { 
        var rawLog = reader.result.split(',')[1];
        var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
        fetch('https://script.google.com/macros/s/AKfycbzy_gH-UG6D8z6O4PIZWytftMaUaZqYG9cRtygGXnRwYo-Vox30AKE50v7T0iowbyr4/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend)})
            .then(res => res.json()).then(res => {
                setData({
                    ...data,
                    image: res.url
                })
            }).catch(e => console.log(e))
        }
        setImgSrc(reader.result);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(
            validate({
                ...data,
                [e.target.name]: e.target.value
            })
        );

        stateDogs.map((d) => {
            if (data.name===d.name) {
                errors.equal= "Name already in use, please select another name";
                alert(errors.equal);
            }
        })

        if (data.temperaments.length===0) {
            errors.empty= "Please select at least one temperament";
            alert(errors.empty);
        }

        if (!Object.keys(errors).length && data.name && data.temperaments && data.height && data.weight && data.lifespan) {
            
            data.height= data.height+" cm";
            data.weight= data.weight+" kg";
            data.lifespan= data.lifespan+" years";

            dispatch(postDog(data));
            alert("Dog created successfully!");
            setData({
                name: "",
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
        <div className="background-form">

            <div className="main-container">
                <h1 className="title">
                    Create your own Dog!
                </h1>
                <form className="form"
                onSubmit={(e) => 
                handleSubmit(e)}>
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
                        {
                            errors.equal && (
                                <p>
                                    {errors.equal}
                                </p>
                            )
                        }
                    </div>
                    <div>
                        <label>
                            Image:
                        </label>
                        <input
                        type="file"
                        onChange={(e) => handleFiles(e.target.files[0])}
                        />
                        {imgSrc}
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
                        {
                            errors.lifespan && (
                                <p>
                                    {errors.lifespan}
                                </p>
                            )
                        }
                    </div>
                    <label className="temperament-item-crea">
                        Temperaments: 
                    </label>
                    <select  className="select"
                    onChange={(e) => handleSelect(e)}>
                        <option value="" disabled selected>Choose your temperaments</option>
                        {
                            stateTemperaments.map((t) => (
                                <option value={t}>
                                    {t}
                                </option>
                            ))
                        }
                    </select>
                            {
                                errors.temperaments && (
                                    <p>
                                        {errors.temperaments}
                                    </p>
                                )
                            }
                    <button className="create-now-form"
                    type="submit">
                        Create Now!
                    </button>
                    <ul>
                        <li>
                            {
                                data.temperaments.map(t => t+" ")
                            }
                        </li>
                    </ul>
                    <Link to="/dogs">
                        <button className="back">
                            Back to Main Page
                        </button>
                    </Link>
                </form>
                {
                    data.temperaments.map(t => 
                    <ul>
                        <li key={t}>
                            <p>{t}</p>
                            <button className="button-X-crea"
                            onClick={() => handleDelete(t)}>
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