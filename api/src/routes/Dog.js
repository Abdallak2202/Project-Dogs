const bodyParser= require("body-parser");
const {Router}= require("express");

const router= Router();

router.use(bodyParser.json());

const {getApiAllDogs}= require("../controllers/controller-1");
const {getApiNameDog}= require("../controllers/controller-1");
const {getApiIdDog}= require("../controllers/controller-1");

router.get("/", async (req, res) => {
    let {name}= req.query;

        try {
            let apiResponse= await getApiNameDog(name);
            return res.status(200).send(apiResponse);
        }
        catch(e) {
            console.log(e);
            return res.status(404).send("404 not found");
        }
    
});

router.get("/:id", async (req, res) => {
    let {id}= req.params;

    try {
        var apiResponse= await getApiIdDog(id);
        return res.status(200).send(apiResponse);
    }
    catch(e) {
        console.log(e);
    }
})


module.exports= router;