const bodyParser= require("body-parser");
const {Router}= require("express");

const router= Router();

router.use(bodyParser.json());

const {Dog, Temperament}= require("../db");

const {getApiAllDogs}= require("../controllers/controller-1");
const {getApiNameDog}= require("../controllers/controller-1");
const {getApiIdDog}= require("../controllers/controller-1");
const {getDbAllDogs}= require("../controllers/controller-2");
const {getDbNameDog}= require("../controllers/controller-2");
const {getDbIdDog}= require("../controllers/controller-2");


router.post("/", async (req, res) => {
    const {name, height, weight, lifespan, temperament}= req.body;
    
    if (!name || !height || !weight || !temperament) {
        return res.status(404).send("The dog needs at least a name, height, weight and temperament");
    }
    else {
        try {
            let createdDog= await Dog.create({
                name: name,
                height: height,
                weight: weight,
                lifespan: lifespan
            })

            const temperamentDb= await Temperament.findAll({
                where: {
                    name: temperament
                }
            })

            createdDog.addTemperaments(temperamentDb);

            return res.status(200).send(createdDog);
        }
        catch(e) {
            console.log(e);
            return res.status(500).send("An error ocurred while creating your dog...");
        }
    }
});

router.get("/", async (req, res) => {
    let {name}= req.query;
    if (name) {
        try {
            var apiResponse= await getApiNameDog(name);
        }
        catch(e) {
            console.log(e);
            apiResponse= null;
        }
        var dbResponse= await getDbNameDog(name);
        try {
            if (name && !apiResponse && !dbResponse) {
                return res.status(404).send("Dog not found");
            }
            else if (!apiResponse && dbResponse) {
                return res.status(200).send(dbResponse);
            }
            else {
                return res.status(200).send(apiResponse);
            }
        }
        catch(e) {
            console.log(e);
            return res.status(500).send("An error has ocurred by searching your dog");
        }
    }
    
    else {
        try {
            let apiResponse= await getApiAllDogs();
            let dbResponse= await getDbAllDogs();

            return res.status(200).send(apiResponse.concat(dbResponse));
        }
        catch(e) {
            console.log(e);
            return res.status(500).send("An error has ocurred...");
        }
    }
});

router.get("/:id", async (req, res) => {
    let {id}= req.params;

    try {
        if (id.length>8) {
            let dbResponse= await getDbIdDog(id);
            if (id && !dbResponse) {
                return res.status(404).send("The ID doesn't match with any dog");
            }
            else {
                return res.status(200).send(dbResponse);
            }
        }

        else {
            try {
                var apiResponse= await getApiIdDog(id);
            }
            catch(e) {
                console.log(e);
                apiResponse= null;
            }
            if (id && !apiResponse) {
                return res.status(404).send("The ID doesn't match with any dog");
            }
            else {
                return res.status(200).send(apiResponse);
            }
        }
    }
    catch(e) {
        console.log(e);
        res.status(500).send("An error has ocurred");
    }
});


module.exports= router;