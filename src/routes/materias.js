const express = require('express');
const router = express.Router();

const pool = require('../database');//conexion a la BD
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => { //se accede con /materias/add
    res.render('materias/add'); //muestra una vista
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { materia, creditos, semestre } = req.body;
    const newLink = {
        materia,
        creditos,
        semestre,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO materias set ?', [newLink]);
    req.flash('success', 'Materia agregada satisfactoriamente'); //mensaje para ser agregado en variables globales
    res.redirect('/materias');
}); //post add materias

router.get('/', isLoggedIn, async (req, res) => {
    const materias = await pool.query('SELECT * FROM materias WHERE user_id = ?', [req.user.id]);
    console.log(materias);
    res.render('materias/list', {materias});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM materias WHERE ID = ?', [id]);
    req.flash('success', 'La materia fue eliminada satisfactoriamente');
    res.redirect('/materias');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const materias = await pool.query('SELECT * FROM materias WHERE id = ?', [id]);
    res.render('materias/edit', {materia: materias[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { materia, creditos, semestre } = req.body;
    const newLink = {
        materia,
        creditos,
        semestre
    };
    await pool.query('UPDATE materias set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'La materia fue actualizada satisfactoriamente');
    res.redirect('/materias');
});

module.exports = router;