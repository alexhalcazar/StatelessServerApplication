const superagent = require('superagent');

const base = 'https://www.themealdb.com/api/json';
//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//www.themealdb.com/api/json/v1/1/lookup.php?i

const getRecipe = async (recipeName) => {
    try {
        const recipeURL = `${base}/v1/1/lookup.php?i=${recipeName}`;
        //console.log(recipeURL);

        const res = await superagent.get(recipeURL);
        //console.log(res.body);
        const meal = res.body.meals[0];

        let output = `Meal Name: ${meal.strMeal}\n\n`;
        output += `Category: ${meal.strCategory}\n\n`;
        output += `Instructions: ${meal.strInstructions}\n\n`;
        output += `Ingredients:\n`;

        //let output = `Meal Name: ${meal.strMeal}\n\nCategory: ${meal.strCategory}\n\nInstructions: ${meal.strInstructions}\n\nIngredients:\n`;


        for (let i = 1; i <= 20; i++) {

            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && measure) 
            {
                output += `${ingredient} - ${measure}\n`;
            }
        }
        
        console.log(output);

        return res.body;
    } catch (error) {
        console.log(error);
    }
}; 

const getCategory = async (category) => {
    try {
        const categoryURL = `${base}/v1/1/filter.php?c=${category}`;
        
        const res = await superagent.get(categoryURL);
        //console.log(res.body);
        return res.body;
    
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    //same as getRecipe : getRecipe
    getCategory, getRecipe
};

