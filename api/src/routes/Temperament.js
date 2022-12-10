const {Router}= require("express");

const router= Router();

const {getTemperaments}= require("../controllers/controller-2");


router.get("/", async (req, res) => {
    try {
        let apiResponse= await getTemperaments();
        return res.status(200).send(apiResponse);
    }
    catch(e) {
        console.log(e);
        return res.status(404).send("404 not found");
    }
})


module.exports= router;