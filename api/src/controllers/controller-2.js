const {Dog, Temperament}= require("../db");
const axios= require("axios");

const url= "https://api.thedogapi.com/v1/breeds";


const getTemperaments= async () => {

    let allDogs= await axios.get(url);
    let data= allDogs.data;
    let temperamentArray= [];
    let uniqueTemperaments= [];

    data.map((dog) => {
        temperamentArray.push(dog.temperament);
    });

    // joins all the temperaments into a single string
    let joinedTemperaments= temperamentArray.join();
    // splits the string into substrings of temperaments and trims the spaces
    let fixedTemperaments= joinedTemperaments.split(",").map(t => t.trim());

    // keeps unique temperaments
    var count= 0;
    var start= false;

    for (let i=0; i<fixedTemperaments.length; i++) {
        for (let j=0; j<uniqueTemperaments.length; j++) {
            if (fixedTemperaments[i]==uniqueTemperaments[j]) {
                start= true;
            }
        }
        count++;
        if (count==1 && start==false) {
            uniqueTemperaments.push(fixedTemperaments[i])
        }
        start= false;
        count= 0;
    };

    // sorts the temperaments in ascending order and gets rid of the null temperament in the array
    uniqueTemperaments.sort().shift();

    // creates the temperaments in the database
    uniqueTemperaments.map((t) => Temperament.findOrCreate({
        where: {
            name: t
        }
    }))

    // returns the temperaments
    let temperaments= await Temperament.findAll({
        attributes: ['name', 'id']
    })

    return temperaments;
}

const getDbAllDogs= async () => {
    let response= await Dog.findAll({
        include: {
            model: Temperament,
            through: {
                attributes: []
            }
        }
    });
    return response;
}

const getDbNameDog= async (name) => {
    let oneDog= await Dog.findOne({
        where: {
            name: name
        },
        include: {
            model: Temperament,
            through: {
                attributes: []
            }
        }
    });
    return oneDog;
}

const getDbIdDog= async (id) => {
    let oneDog= await Dog.findOne({
        where: {
            id: id
        },
        include: {
            model: Temperament,
            through: {
                attributes: []
            }
        }
    });
    return oneDog;
}


module.exports= { getTemperaments, getDbAllDogs, getDbNameDog, getDbIdDog};