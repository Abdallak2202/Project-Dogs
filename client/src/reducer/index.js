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

        case "HANDLE_RESET":
            return {
                ...state,
                allDogs: action.payload,
                dogs: action.payload
            }

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

            if (action.payload==="temperaments") {
                var filterTemperament= state.allDogs;
            }
            else {
                filterTemperament= allDogs.filter(d => {
                    if (!d.temperaments) return false;
                    else if (d.created) {
                        return d.temperaments.some(t => t.name===action.payload);
                    }
                    else {
                        return d.temperaments.includes(action.payload);
                    }
                })
            }

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
                dogs: action.payload==="all"?
                state.allDogs :
                filterOrigin
            };

        case "ORDER_BY_RACE":
            const sortOrder= action.payload==="asc"?
            state.dogs.sort(function (a, b) {
                if (a.name>b.name) {
                    return 1;
                }
                if (b.name>a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function (a, b) {
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
                dogs: sortOrder
            };

        case "ORDER_BY_WEIGHT":
            var stateAllDogs= state.allDogs;
            if (action.payload==="filter by weight") {
                var sortWeight= stateAllDogs;
            };

            if (action.payload==="lowest weight") {
                sortWeight= state.dogs.sort(function (a, b) {
                    if (a.weight.substr(0, 2)>b.weight.substr(0, 2)) {
                        return 1;
                    }
                    if (b.weight.substr(0, 2)>a.weight.substr(0, 2)) {
                        return -1;
                    }
                    return 0;
                })
            };

            if (action.payload==="highest weight") {
                sortWeight= state.dogs.sort(function (a, b) {
                    if (a.weight.substr(0, 2)>b.weight.substr(0, 2)) {
                        return -1;
                    }
                    if (b.weight.substr(0, 2)>a.weight.substr(0, 2)) {
                        return 1;
                    }
                    return 0;
                })
            };

            return {
                ...state,
                dogs: sortWeight
            }


        default:
            return {...state};
    }
};