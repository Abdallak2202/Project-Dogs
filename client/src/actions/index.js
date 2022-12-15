import axios from "axios";

const urlDogs= "http://localhost:3001/dogs";
const urlTemperaments= "http://localhost:3001/temperaments";


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

        return dispatch({
            type: "GET_DOG_NAME",
            payload: oneDog.data
        })
    }
    catch(e) {
        console.log(e); // add functionality
    }
}

export const getDogDetail= (id) => async (dispatch) => {
    try {
        var oneDog= await axios.get(`${urlDogs}/${id}`);

        return dispatch({
            type: "GET_DOG_DETAIL",
            payload: oneDog.data
        })
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
            temperaments.push(t["name"]);
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

export const postDog= async (data) => {
    const response= await axios.post(urlDogs, data);

    return response;
}