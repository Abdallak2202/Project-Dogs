const { Router } = require('express');
const bodyParser= require("body-parser");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoute= require("./Dog");
const temperamentRoute= require("./Temperament");


const router = Router();

router.use(bodyParser.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRoute);
router.use("/temperament", temperamentRoute);


module.exports = router;
