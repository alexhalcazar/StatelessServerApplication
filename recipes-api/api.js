const superagent = require('superagent');               // HTTP request

const filterByCategory = async (category) => {
    try {
        const searchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        const res = await superagent.get(searchUrl);

        return res.body.meals;                                // our response body
    } catch (error) {
        console.log(error);
    }
}

const returnRecipe = async (mealId) => {
    try {
        const searchUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const res = await superagent.get(searchUrl);
        
        // acceess our first value in our array which contains the information for our meal
        const body = res.body.meals[0];
        
        let ingredients = [];
        let measures = [];

        for(let i=1; i<=20; i++)
        {
            ingredients.push(body[`strIngredient${i}`]);
            measures.push(body[`strIngredient${i}`]);
        }
        
        const output = {Meal: body.strMeal, Instructions: body.strInstructions, Ingredients: ingredients, Measures: measures};  
        return output;
    } catch (error) {
        console.log(error);
    }
}

// module.exports pairs with our require method. Require brings files in. Export is opposite
module.exports = {          // set it equal to an object. Using short hand notation here (objects)
    filterByCategory,
    returnRecipe            
};         
