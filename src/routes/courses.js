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
    const verification = await pool.query('SELECT * FROM profesor WHERE codigo = ?',[newProf.codigo]);
    if(verification.length == 0){
        const result = await pool.query('INSERT INTO profesor set ?', [newProf]);
        res.status(200).send("saved")
    }else{
        res.status(200).send("codigo repetido");
    }
})

router.post('/grupo', async (req, res) => {
    const { nombre } = req.body;
    const newGroup = {
        nombre
    }
    const verification = await pool.query('SELECT * FROM grupo WHERE nombre = ?',[newGroup.nombre]);
    if(verification.length == 0){
        const result = await pool.query('INSERT INTO grupo set ?', [newGroup]);
        res.status(200).send("saved")
    }else{
        res.status(200).send("nombre repetido");
    }
})

router.post('/materia', async (req, res) => {
    const { nombre } = req.body;
    const newM = {
        nombre
    }
    const verification = await pool.query('SELECT * FROM materia WHERE nombre = ?',[newM.nombre]);
    if(verification.length == 0){
        const result = await pool.query('INSERT INTO materia set ?', [newM]);
        res.status(200).send("saved")
    }else{
        res.status(200).send("nombre repetido");
    }
})

router.post('/asignacion', async (req, res) => {
    const { profesorID, grupoID, materiaID, fechaInicio, fechaFin, horaInicio, horaFin } = req.body
    const newAsig = {
        profesorID,
        grupoID,
        materiaID,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin
    }
    const result = await pool.query('INSERT INTO asignacion set ?', [newAsig]);
    res.sendStatus(200);
})

router.get('/materia', async(req, res) => {
    const result = await pool.query('SELECT * FROM materia');
    res.json(result);
})

router.get('/profesor', async(req, res) => {
    const result = await pool.query('SELECT * FROM profesor');
    res.json(result);
})

router.get('/grupo', async(req, res) => {
    const result = await pool.query('SELECT * FROM grupo');
    res.json(result);
})

module.exports = router;