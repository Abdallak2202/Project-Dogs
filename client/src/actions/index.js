import axios from "axios";

const urlDogs= "http://localhost:3001/dogs";
const urlTemperaments= "http://localhost:3001/temperament";


export const getDogs= () => async (dispatch) => {
    try {
        var allDogs= await axios.get(urlDogs);

        return dispatch({
            type: "GET_DOGS",
            payload: allDogs.data
        })
    }
    catch(e) {
        console.log(e); // add functionality
    }
}

export const getDogName= (name) => async (dispatch) => {
    try {
        var oneDog= await axios.get(`${urlDogs}?name=${name}`);
        console.log("oneDog: ",oneDog);

            return dispatch({
                type: "GET_DOG_NAME",
                payload: oneDog.data
            })
    }
    catch(e) {
        console.log(e); // add functionality
        alert("Dog not found (make sure you're typing the name correctly!)");
    }
}

export const getDogDetail= (id) => async (dispatch) => {
    try {
        if (id) {
            var oneDog= await axios.get(`${urlDogs}/${id}`);

            dispatch({
                type: "GET_DOG_DETAIL",
                payload: oneDog.data
            })
        }
        else {
            dispatch({
                type: "GET_DOG_DETAIL",
                payload: []
            })
        }
    }
    catch(e) {
        console.log(e); // add functionality
    }
}

export const getTemperaments= () => async (dispatch) => {
    try {
        var allTemperaments= await axios.get(urlTemperaments);
        var temperaments= [];
        allTemperaments.data.map((t) => {
            let temperamentName= t.name;
            temperaments.push(temperamentName);
        })

        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: temperaments
        })
    }
    catch(e) {
        console.log(e); // add functionality
    }
}

export const postDog= (data) => async () => {
    console.log("data action: ", data);
    let newDog= {
        name: data.name,
        image: data.image,
        height: data.height,
        weight: data.weight,
        lifespan: data.lifespan,
        temperament: data.temperaments
    };
    const response= await axios.post(urlDogs, newDog);

    console.log(response);
    return response;
}

export const filterByTemperament= (payload) => {
    return {
        type: "FILTER_BY_TEMPERAMENT",
        payload // e.target.value
    }
}

export const filterByOrigin= (payload) => {
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}

export const orderByRace= (payload) => {
    return {
        type: "ORDER_BY_RACE",
        payload
    }
}

export const orderByWeight= (payload) => {
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
}