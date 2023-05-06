const router = require('express').Router();

const database = require('../db');
const recipes = require('recipes-api');

/**
 * @api {Middleware}  /poker        middleware for all routes in search.js
 */
router.use((req, res, next) => {
    console.log('Running Router Level Middleware');
    
    const { query, originalUrl} = req;
    

 

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
        // nested object destructuring
        const { query : { category }} = req;
        
        // returns an array of the meal categories
        const mealCategories = await recipes.filterByCategory(category);
        
        // get each meal string and meal id 
        const meals = mealCategories.map(element => {
            return {meal: element.strMeal, id: element.idMeal};
        })
       
        const results = { searchTerm: category , results: meals};

        res.json(results);

        const data = { searchTerm: category, searchCount: 1, lastSearched: new Date() }
        
        const searchResult = await database.find('Results', category);
        
        //console.log(searchResult);
        if(searchResult) {
            
            // update the search object with a new date for lastSearched
            const update = {
                searchCount : searchResult.searchCount + 1,
                lastSearched : new Date()
            }
            database.update('Results', category, update);
            
        } else {
            // create a search object to be saved into MongoDB
            database.save('Results',{...data});
        }
        
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

router.get('/:mealId/details', async (req, res) => {
    console.log('Route called');
    try {
        const { params : {mealId}} = req;

        console.log(mealId);
        // get the details of the recipe by mealID
        const recipe = await recipes.returnRecipe(mealId);

        // NEED TO ASK HER ABOUT CASE SENSITIVE 
        const category = recipe.Category.toLowerCase();
        console.log(category);
        if(recipe) {
            // valid mealId was passed in
            
            // using the searchTerm find and update the database dcument with the user's selection
            const searchResult = await database.find('Results', category);
            //console.log(searchResult);
            if('selections' in searchResult) {
            
            console.log('There is a selections key');
            
            // DO I NEED TO UPDATE THIS SINCE this is an id associated with the searchTerm?
            // const update = {
            //         searchCount : searchResult.searchCount + 1,
            //         lastSearched : new Date(),
            //     }
            
            searchResult.selections.push({mealId, recipe});
            //console.log(searchResult);
            const {selections} = searchResult;
            const update = {
                selections: selections
            }
            database.update('Results', category, update);
            } else {

            console.log('There is no selection key');
            const update = {
                    selections: []
                }
            // Add as an Array with the first object {id, dispaly}
            update.selections.push({mealId, recipe});
                
            database.update('Results', category, update);
            }    
        
            res.status(200).json(recipe);
        } else {
            res.status(404).json({error: 'No such meal id exists'});
        }
        
    } catch (error) {
        res.status(500).json(error.toString());
    }
});
module.exports = router;