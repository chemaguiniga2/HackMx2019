const express = require('express');
const router = express.Router();
const path = require('path');
//Test
router.get('/', (req, res) => {
    res.render('index', {});
});

router.get('/predictive', (req, res) =>{
    res.render('predictive', {});
})

router.post('/guardar_text', (req, res) => {
    console.log(req.body);
    console.log(req.body.text);

})

module.exports = router;