const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.render('index', {});
});

router.get('/predictive', (req, res) => {
    res.render('predictive', {});
});


module.exports = router;