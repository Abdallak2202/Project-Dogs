const initialState= {
    allDogs: [],
    dogs: [],
    details: [],
    temperaments: []
};

export default function rootReducer(state=initialState, action) {
    switch(action.type) {
        case "GET_DOGS":
            return {
                ...state,
                allDogs: action.payload,
                dogs: action.payload
            };

        case "GET_DOG_NAME":
            return {
                ...state,
                dogs: action.payload
            };

        case "GET_DOG_DETAIL":
            return {
                ...state,
                details: action.payload
            };

        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            };

        default:
            return {...state};
    }
};