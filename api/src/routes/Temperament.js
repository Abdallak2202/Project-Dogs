const {Router}= require("express");

const router= Router();

const {getTemperaments}= require("../controllers/controller-2");


router.get("/", async (req, res) => {
    try {
        const temperaments= await getTemperaments();

        if (!temperaments) {
            return res.status(404).send("Temperaments not found...");
        }
        return res.status(200).send(temperaments);
    }
    catch(e) {
        console.log(e);
        res.status(500).send("An error has ocurred with temperaments...");
    }
});


module.exports= router;