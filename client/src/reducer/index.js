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

        case "FILTER_BY_TEMPERAMENT":
            const allDogs= state.allDogs;

            const filterTemperament= action.payload==="temperaments"?
            allDogs :
            allDogs.filter(d => d.temperaments.includes(action.payload));
            // use .join(" ") before .includes
            // OR .some() with if statement for db dogs

            return {
                ...state,
                dogs: filterTemperament
            };

        case "FILTER_BY_ORIGIN":
            const filterOrigin= action.payload==="created"?
            state.allDogs.filter(d => d.created) :
            state.allDogs.filter(d => !d.created)

            return {
                ...state,
                dogs: filterOrigin
            };

        case "ORDER_BY_RACE":
            const sortOrder= action.payload==="asc"?
            state.allDogs.sort(function (a, b) {
                if (a.name>b.name) {
                    return 1;
                }
                if (b.name>a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.allDogs.sort(function (a, b) {
                if (a.name>b.name) {
                    return -1;
                }
                if (b.name>a.name) {
                    return 1;
                }
                return 0;
            })

            return {
                ...state,
                allDogs: sortOrder
            };

        case "ORDER_BY_WEIGHT":
            if (action.payload==="lowest weight") {
                var sortWeight= state.allDogs.sort(function (a, b) {
                    if (a.weight>b.weight) {
                        return 1;
                    }
                    if (b.weight>a.weight) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (action.payload==="highest weight") {
                sortWeight= state.allDogs.sort(function (a, b) {
                    if (a.weight>b.weight) {
                        return -1;
                    }
                    if (b.weight>a.weight) {
                        return 1;
                    }
                    return 0;
                })
            }

            return {
                ...state,
                allDogs: sortWeight
            }

        default:
            return {...state};
    }
};