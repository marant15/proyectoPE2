const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/book', async (req, res) =>{
    const { titulo, autor, isbn, edicion, precio } = req.body;
    const newbook = {
        titulo, autor, isbn, edicion, precio
    };
    const verification = await pool.query('SELECT * FROM libro WHERE isbn = ?',[newbook.isbn]);
    if(verification.length == 0){
        const result = await pool.query('INSERT INTO libro set ?', [newbook]);
        res.status(200).send("saved")
    }else{
        res.status(200).send("isbn repetido");
    }
})

router.get('/book', async(req, res) => {
    const result = await pool.query('SELECT * FROM libro');
    res.json(result);
})

router.get('/book/:id', async(req, res) => {
    const result = await pool.query('SELECT * FROM libro WHERE libroID=?',[req.params.id]);
    res.json(result);
})

router.post('/sell', async (req, res) =>{
    const { fecha, total } = req.body;
    const newsell = {
        fecha, total
    };
    const result = await pool.query('INSERT INTO venta set ?', [newsell]);
    res.status(200).send("saved")
})

router.post('/detail', async (req, res) =>{
    const { libroID, ventaID, cantidad } = req.body;
    const newdetail = {
        libroID, ventaID, cantidad
    };
    const result = await pool.query('INSERT INTO detalle set ?', [newdetail]);
    res.status(200).send("saved")
})

router.post('/stock', async (req, res) =>{
    const { libroID, cantidad } = req.body;
    const newstock = {
        libroID, cantidad
    };
    const verification = await pool.query('SELECT * FROM stock WHERE libroID = ?',[newstock.libroID]);
    if(verification.length == 0){
        const result = await pool.query('INSERT INTO stock set ?', [newstock]);
        res.status(200).send("saved")
    }else{
        res.status(200).send("ya existe el stock");
    }
})

router.put('/stock/:id', async(req, res) => {
    const { id } = req.params;
    const { libroID, cantidad } = req.body
    const newstock = {
        libroID, cantidad
    }
    const result = await pool.query('UPDATE stock set ? WHERE stockID = ?', [newstock, id]);
    res.status(200).send("updated");
})

module.exports = router;