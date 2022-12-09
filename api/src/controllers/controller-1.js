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
    var urlName=`https://api.thedogapi.com/v1/breeds/search?q=${name}`
    let oneDog= await axios.get(urlName);
    let data= oneDog.data;
    let dog= [];
    let dogInfo={
        id: Number(data[0].id),
        name: data[0].name,
        height: data[0].height.metric+" cm",
        weight: data[0].weight.metric+" kg",
        lifespan: data[0].life_span
    }
    dog.push(dogInfo);

    console.log("data= ", data);
    console.log("dog= ", dog);
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