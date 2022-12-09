const axios= require("axios");

const url= "https://api.thedogapi.com/v1/breeds";


const getApiAllDogs= async () => {
    var allDogs= await axios.get(url);
    var data= allDogs.data;
    var dogs=[];

    data.map(async (d) => {
        let dog={
            id: Number(d.id),
            name: d.name,
            height: d.height.metric+" cm",
            weight: d.weight.metric+" kg",
            lifespan: d.life_span
        };
        dogs.push(dog);
    })
    console.log(dogs.length);
    return dogs;
};


const getApiNameDog= async (name) => {
    var allDogs= await axios.get(url);
    var data= allDogs.data;
    var dogs= [];
    var dog= [];

    data.map(async (d) => {
        let dog={
            id: Number(d.id),
            name: d.name,
            height: d.height.metric+" cm",
            weight: d.weight.metric+" kg",
            lifespan: d.life_span
        };
        dogs.push(dog);
    })

    dogs.map(d => {
        if (d.name===name) {
            dog.push(d);
        }
    })

    return dog;
};


const getApiIdDog= async (id) => {
    var allDogs= await axios.get(url);
    var data= allDogs.data;
    var dogs= [];
    var dog;

    data.map(async (d) => {
        let dog={
            id: Number(d.id),
            name: d.name,
            height: d.height.metric+" cm",
            weight: d.weight.metric+" kg",
            lifespan: d.life_span
        };
        dogs.push(dog);
    })

    dogs.map(d => {
        if (d.id==id) {
            dog=[d];
        }
    })

    if (!dog) {
        dog=null;
    }

    console.log(dog);
    return dog;
};


module.exports= {getApiAllDogs, getApiNameDog, getApiIdDog};