const router = require('express').Router();

const database = require('../db');


router.get('/', async (req, res) => {
    try {
        const {query : {searchTerm}} = req;
        // console.log(searchTerm);
        // WHAT ABOUT DEALING WITH INCORRECT INPUTS?
        const results = await database.find('Results', searchTerm);
        res.json(results);

    } catch (error) {
        res.status(500).json(error.toString());
    }
});


module.exports = router;
