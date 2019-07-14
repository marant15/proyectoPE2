const express = require('express');
const router = express.Router();

const pool = require('../database');
const helpers = require('../lib/helpers');
const registro = require('../lib/registro');

router.post('/profesor', async (req, res) => {
    const { codigo, password, tiempo, fecha } = req.body;
    const rows = await pool.query('SELECT * FROM profesor WHERE codigo = ?',[codigo]);
    if(rows.length > 0){
        const user = rows[0];
        const valid = await helpers.matchPassword(password, user.password);
        if(valid){
            //ingresar el registro
            var a = await registro.registrar(fecha, tiempo, user.profesorID);
            res.status(200).send(""+a);
        }
        else{
            res.status(400).send('Incorrect Password');
        }
    }else{
        res.status(400).send('Incorrect code')
    }
})

router.post('/usuario', async (req, res) => {
    const { usuario, password } = req.body;
    const rows = await pool.query('SELECT * FROM usuario WHERE usuario = ?',[usuario]);
    if(rows.length > 0){
        const user = rows[0];
        const valid = await helpers.matchPassword(password, user.password);
        if(valid){
            res.status(200).send(""+rows[0].usuarioID);
        }
        else{
            res.status(400).send('Incorrect Password');
        }
    }else{
        res.status(400).send('Incorrect code')
    }
})

router.post('/exc', async (req,res) => {
    const { asignacionID, tipo, profesorID, tiempo, fecha } = req.body;
    const fechaExcepcion = fecha + " " + tiempo;
    const newEx = {
        asignacionID,
        tipo,
        profesorID,
        fechaExcepcion
    }
    const result = await pool.query('INSERT INTO excepcion set ?', [newEx]);
    res.status(200).send("exception saved");
})

module.exports = router;