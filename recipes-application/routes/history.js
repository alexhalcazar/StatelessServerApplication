const router = require('express').Router();

const database = require('../db');

/**
 * @api {GET} /history                              get the history of a meal by category
 * @apiQuery {String} searchTerm                    meal category to search history
 * @apiExample                                      localhost:4444/history?searchTerm=beef
 */
router.get('/', async (req, res) => {
    try {
        const {query : {searchTerm}} = req;
  
        const results = await database.find('Results', searchTerm);
        res.json(results);

    } catch (error) {
        res.status(500).json(error.toString());
    }
});


module.exports = router;
