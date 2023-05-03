//be able to interact with our application
const api = require('./api.js');

const prompts = require('prompts');

const { saveSearchHistory } = require('./history');



const _searchPrompt = async (results) => {
    const displayCategories = results.map((result) => {
        return {title: `${result.strMeal}`, value: result.idMeal};
    });
    return await prompts([
        {
            type: 'select',
            name: 'Recipe Categories',
            message: 'Select the specific recipe to explore',
            choices: displayCategories
        }
    ]);
};
//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

const search = async (args) => {
    //retrieves the meails from the api based on what the user entered
    const result = await api.getCategory(args)
    saveSearchHistory(args, result.meals.length);

    //passes the meals array from the result to the search prompt
    const selected = await _searchPrompt(result.meals);
    //console.log(selected['Recipe Categories']);

    const recipeDetails = await api.getRecipe(selected['Recipe Categories']);

    //console.log(result.meals);
}


module.exports = {
    //same as getRecipe : getRecipe
    search
};
