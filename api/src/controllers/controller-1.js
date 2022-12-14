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
            lifespan: d.life_span,
            temperaments: d.temperament,
            image: d.image.url
        };
        dogs.push(dog);
    })
    dogs.map(d => {
        if (d.id===179) {
            d.weight= 31+" kg";
        }
        if (d.id===232) {
            d.weight= 8+" kg";
        }
    })
    console.log(dogs.length);
    return dogs;
    // I have to put temperaments to dogs 
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
        lifespan: data[0].life_span,
        temperaments: data[0].temperament,
        image: `https://cdn2.thedogapi.com/images/${data[0].reference_image_id}.jpg`
    }
    dog.push(dogInfo);

    // `https://cdn2.thedogapi.com/images/${data[0].reference_image_id}.jpg`
    // https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg
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
            lifespan: d.life_span,
            temperaments: d.temperament,
            image: d.image.url
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