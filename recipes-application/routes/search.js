const router = require('express').Router();

const database = require('../db');
const recipes = require('recipes-api');

/**
 * @api {Middleware}  /poker        middleware for all routes in search.js
 */
router.use((req, res, next) => {
    console.log('Running Router Level Middleware');
    
    const { query, originalUrl} = req;
    
    // add a metadata key on the query object
    
    //const request = query.cards;


     //else if(originalUrl.includes(request)) {
    //     query.metadata = {
    //         gameEnd: new Date()
    //     };
    // }

    next();
});

/**
 * @api {GET} /poker                start a new poker game by drawing cards
 * @apiQuery {Number} count         deck count
 * @apiQuery {Number} cardCount     number of cards to draw
 * @apiExample                      localhost:8888/poker
 */
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { category } = query;
        // returns an array of the meal categories
        const mealCategories = await recipes.filterByCategory(category);
        
        // get each meal string and meal id 
        const meals = mealCategories.map(element => {
            return {meal: element.strMeal, id: element.idMeal};
        })
       
        const results = { searchTerm: category , results: meals};

        res.json(results);

        //database.save('Results',{...results});
        const searchResult = await database.find('Results', category);
   
        //console.log('The search result:',searchResult);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;