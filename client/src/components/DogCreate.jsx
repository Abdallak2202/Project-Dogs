import {React, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import { getDogs, orderByRace, postDog, getTemperaments } from "../actions";
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

    const [data, setData]= useState({
        name: "",
        image: "",
        height: "",
        weight: "",
        lifespan: "",
        temperaments: []
    })

    const [imgSrc, setImgSrc] = useState('');

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

    function handleImageChange(e) {
        const file = e.target.files[0];
        console.log("file: ", file);
        const reader = new FileReader();
        console.log("reader: ", reader);
        reader.onloadend = () => {
          setData({
            ...data,
            image: reader.result/* .split(",")[1] */
          })
          setImgSrc(reader.result);
        }
        reader.readAsDataURL(file);
      };

      console.log("image: ", data.image);

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
                        <label>Image: </label>
                        <input
                        placeholder="Dog image"
                        type="file"
                        name="image"
                        alt="Not found"
                        onChange={(e) => handleImageChange(e)}
                        />
                        <img src={imgSrc} alt="Preview" />
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



/* import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ImageUploadForm({ setData }) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
      if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(file);
          setPreviewUrl(reader.result);
          setIsValid(true);
          setData({ ...data, image: file }); // update the image field in the data state variable
        };
        reader.readAsDataURL(file);
      } else {
        setImage(null);
        setPreviewUrl(null);
        setIsValid(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the image (upload it to a server, etc.)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Choose an image:
          <input type="file" onChange={handleChange} />
        </label>
        <button type="submit" disabled={!isValid}>Submit</button>
      </form>
      {previewUrl && (
        <img src={previewUrl} alt="Preview" />
      )}
    </div>
  );
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
 */


// ANOTHER CODE

/* 
import React, { useState } from 'react';

function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  }

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
}

export default ImageUploadForm;

*/


/* OPTION TO UPLOAD AN IMAGE */

/* const [file, setFile] = useState(null);
const [imageName, setImageName] = useState(null);

function handleImageChange(event) {
  const file = event.target.files[0];
  setFile(file);
  setImageName(file.name);
  const reader = new FileReader();
  reader.onloadend = () => {
    setImgSrc(reader.result);
  }
  reader.readAsDataURL(file);
}

const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', data.name);
    formData.append('height', data.height);
    formData.append('weight', data.weight);
    formData.append('lifespan', data.lifespan);
    formData.append('imageName', imageName);
  
    // post the form data to the server
    dispatch(postDog(formData));
    setFile(null);
    setImageName(null);
    setData({
      name: "",
      height: "",
      weight: "",
      lifespan: "",
    });
    history.goBack();
  }   */