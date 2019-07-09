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

router.post('/grupo', async (req, res) => {
    const { nombre } = req.body;
    const newGroup = {
        nombre
    }
    const result = await pool.query('INSERT INTO grupo set ?', [newGroup]);
    res.sendStatus(200);
})

router.post('/materia', async (req, res) => {
    const { nombre } = req.body;
    const newM = {
        nombre
    }
    const result = await pool.query('INSERT INTO materia set ?', [newM]);
    res.sendStatus(200);
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