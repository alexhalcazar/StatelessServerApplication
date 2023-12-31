const router = require('express').Router();

const database = require('../db');
const recipes = require('recipes-api');

/**
 * @api {GET} /search                start a new search by category
 * @apiQuery {String} category      meal category to search
 * @apiExample                      localhost:4000/search
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
        
        // get the count of how many meals are in category
        const mealCount = meals.length;
       
        const results = { searchTerm: category , results: meals};

        res.json(results);

        const data = { searchTerm: category, searchCount: mealCount, lastSearched: new Date() }
        
        const searchResult = await database.find('Results', category);
        
        if(searchResult) {
            
            // update the search object with a new date for lastSearched
            const update = {
                lastSearched : new Date()
            }
            await database.update('Results', category, update);
            
        } else {
            // create a search object to be saved into MongoDB
            await database.save('Results',{...data});
        }
        
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

/**
 * @api {GET} /search/:mealId/details               get the detials of a meal by id
 * @apiQuery {Number} mealId                        meal category to search
 * @apiExample                                      localhost:4000/search/53016/detals
 */
router.get('/:mealId/details', async (req, res) => {
    
    try {
        const { params : {mealId}} = req;

        // get the details of the recipe by mealID
        const recipe = await recipes.returnRecipe(mealId);
        const {Meal} = recipe;
        
        const category = recipe.Category.toLowerCase();

        if(recipe) {
            // valid mealId was passed in
            
            // using the searchTerm find and update the database dcument with the user's selection
            const searchResult = await database.find('Results', category);
            
            // check if 'selections' array exists
            if('selections' in searchResult) {

            searchResult.selections.push({mealId, Meal});

            const {selections} = searchResult;
            const update = {
                selections: selections
            }
            database.update('Results', category, update);
            } else {

            const update = {
                    selections: []
                }
            // Add as an Array with the first object {id, dispaly}
            update.selections.push({mealId, Meal});
                
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