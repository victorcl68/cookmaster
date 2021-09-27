const { recipeModel } = require('../models');

const postRecipeService = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { err: { status: 400, message: 'Invalid entries. Try again.' } }; 
  }
  const recipePosted = await recipeModel.postRecipe(name, ingredients, preparation, userId);

  return recipePosted;
};

const getRecipesService = async () => {
  const recipes = await recipeModel.getRecipes();

  return recipes;
};

module.exports = { postRecipeService, getRecipesService };