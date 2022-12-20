import {React, useState} from "react";
import {useDispatch} from "react-redux";

import {getDogName} from "../actions";
// import CSS


export default function SearchBar() {
    const dispatch= useDispatch();

    const [name, setName]= useState("");

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getDogName(name));
    }

    return (
        <div>
            <input
            type="text"
            placeholder="Find your Dog..."
            onChange={(e) => handleChange(e)}
            />
            <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            >
                Search
            </button>
        </div>
    )
}