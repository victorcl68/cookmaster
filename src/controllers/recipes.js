const { getRecipesService, postRecipeService } = require('../services');

const postRecipeController = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.payloadId;
  
  const recipeCreated = await postRecipeService(name, ingredients, preparation, userId);
  
  if (recipeCreated.err) return next(recipeCreated.err);
  
  const { _id } = recipeCreated.ops[0];

  const resObject = {
    recipe: {
      name: recipeCreated.ops[0].name,
      ingredients: recipeCreated.ops[0].ingredients,
      preparation: recipeCreated.ops[0].preparation,
      userId: recipeCreated.ops[0].userId,
      _id,
    },
  };

  res.status(201).json(resObject);
};

const getRecipesController = async (req, res, _next) => {
  const allRecipes = await getRecipesService();
  res.status(200).json(allRecipes);
};

module.exports = { getRecipesController, postRecipeController };