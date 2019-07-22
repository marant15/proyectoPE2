const express = require('express');
const router = express.Router();

const pool = require('../database');
const helpers = require('../lib/helpers')
//rutas referentes a los cursos
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
    const { profesorID, grupoID, materiaID, fechaInicio, fechaFin, horaInicio, horaFin, estado } = req.body
    const newAsig = {
        profesorID,
        grupoID,
        materiaID,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        estado
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

router.get('/asignacion', async(req, res) => {
    const result = await pool.query('select asignacionID, asignacion.profesorID, grupo.grupoID, materia.materiaID, fechaInicio, fechaFin, horaInicio, horaFin, estado,'+
    'materia.nombre as materia, grupo.nombre as grupo, profesor.nombre as pName, apellidoM, apellidoP, codigo from asignacion inner join '+
    'profesor on profesor.profesorID = asignacion.profesorID inner join '+
    'materia on materia.materiaID = asignacion.materiaID inner join '+
    'grupo on grupo.grupoID = asignacion .grupoID');
    res.json(result);
})

router.get('/registro', async(req, res) => {
    const result = await pool.query('SELECT * FROM registro');
    res.json(result);
})

router.get('/exc', async(req, res) => {
    const result = await pool.query('SELECT * FROM excepcion');
    res.json(result);
})

router.get('/materia/:id', async(req, res) => {
    const result = await pool.query('SELECT * FROM materia WHERE materiaID=?',[req.params.id]);
    res.json(result);
})

router.get('/profesor/:id', async(req, res) => {
    const result = await pool.query('SELECT * FROM profesor WHERE profesorID=?',[req.params.id]);
    res.json(result);
})

router.get('/grupo/:id', async(req, res) => {
    const result = await pool.query('SELECT * FROM grupo WHERE grupoID=?',[req.params.id]);
    res.json(result);
})

router.get('/registro/:id', async(req, res) => {
    const result = await pool.query('SELECT * FROM registro WHERE registroID=?',[req.params.id]);
    res.json(result);
})

router.get('/exc/:id', async(req, res) => {
    const result = await pool.query('SELECT * FROM excepcion WHERE excepcionID=?',[req.params.id]);
    res.json(result);
})

router.get('/asignacion/:id',async(req,res)=>{
    const result = await pool.query('select asignacionID, asignacion.profesorID, grupo.grupoID, materia.materiaID, fechaInicio, fechaFin, horaInicio, horaFin, estado,'+
    'materia.nombre as materia, grupo.nombre as grupo, profesor.nombre as pName, apellidoM, apellidoP, codigo from asignacion inner join '+
    'profesor on profesor.profesorID = asignacion.profesorID inner join '+
    'materia on materia.materiaID = asignacion.materiaID inner join '+
    'grupo on grupo.grupoID = asignacion.grupoID WHERE asignacionID=?',[req.params.id]);
    res.json(result);
})

router.get('/registros/:mes/:codigo', async(req, res) => {
    const result = await pool.query('select asignacion.asignacionID, fechaRegistro, profesor.nombre as nombre, apellidoM, apellidoP, fechaInicio, fechaFin, horaInicio, horaFin, '+
    'grupo.nombre as grupo, materia.nombre as materia, fechaContratacion, codigo from registro inner join '+
    'asignacion on registro.asignacionID = asignacion.asignacionID inner join '+
    'grupo on grupo.grupoID = asignacion.grupoID inner join '+
    'materia on materia.materiaID = asignacion.materiaID inner join '+
    'profesor on profesor.profesorID = asignacion.profesorID '+
    'where (month(fechaFin)=?) AND codigo = ?',[req.params.mes,req.params.codigo]);
    res.json(result);
})

router.get('/excs/:mes/:codigo', async(req, res) => {
    const result = await pool.query('select asignacion.asignacionID, fechaExcepcion, profesor.nombre as nombre, apellidoM, apellidoP, fechaInicio, fechaFin, horaInicio, horaFin, '+
    'tipo, grupo.nombre as grupo, materia.nombre as materia, fechaContratacion, codigo from excepcion inner join '+
    'asignacion on excepcion.asignacionID = asignacion.asignacionID inner join '+
    'grupo on grupo.grupoID = asignacion.grupoID inner join '+
    'materia on materia.materiaID = asignacion.materiaID inner join '+
    'profesor on profesor.profesorID = exepcion.profesorID '+
    'where (month(fechaFin) = ?) AND codigo = ?',[req.params.mes,req.params.codigo]);
    res.json(result);
})

router.put('/asignacion/:id', async(req, res) => {
    const { id } = req.params;
    const { profesorID, grupoID, materiaID, fechaInicio, fechaFin, horaInicio, horaFin, estado } = req.body
    const newAsig = {
        profesorID,
        grupoID,
        materiaID,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        estado
    }
    const result = await pool.query('UPDATE asignacion set ? WHERE asignacionID = ?', [newAsig, id]);
    res.status(200).send("updated");
})

module.exports = router;