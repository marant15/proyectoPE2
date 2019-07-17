const express = require('express');
const router = express.Router();

const pool = require('../database');
const helpers = require('../lib/helpers');
//rutas referentes a administrativos
router.post('/reg', async (req, res) =>{
    const { usuario, password, isAdmin, nombre, apellidoP, apellidoM } = req.body;
    const newReg = {
        usuario,
        password,
        isAdmin,
        nombre,
        apellidoP,
        apellidoM
    };
    newReg.password = await helpers.encryptPassword(password);
    const verification = await pool.query('SELECT * FROM usuario WHERE usuario = ?',[newReg.usuario]);
    if(verification.length == 0){
        const result = await pool.query('INSERT INTO usuario set ?', [newReg]);
        res.status(200).send("saved")
    }else{
        res.status(200).send("usuario repetido");
    }
})

router.get('/usuario/:id', async(req, res) => {
    const result = await pool.query('SELECT * FROM usuario WHERE usuario=?',[req.params.id]);
    res.json(result);
})

module.exports = router;