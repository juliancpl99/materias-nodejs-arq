const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { //get add
    res.render('index')
});

module.exports = router;