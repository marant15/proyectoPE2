const express = require('express');
const router = express.Router();

const pool = require('../database');
const helpers = require('../lib/helpers')

router.post('/profesor', async (req, res) =>{
    const { nombre, apellidoP, apellidoM, codigo, password, fechaContratacion } = req.body;
    const newProf = {
        nombre,
        apellidoP,
        apellidoM,
        codigo,
        password,
        fechaContratacion
    };
    newProf.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO profesor set ?', [newProf]);
    res.sendStatus(200);
})

module.exports = router;