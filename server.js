const express = require('express');
const recipeRouter = require('./routes/recipes.routes');
const ingredientRouter = require('./routes/ingredients.routes');
const fullRecipesRouter = require('./routes/fullRecipes.routes');
const randomRouter = require('./routes/randomRecipe.routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/* TEST ROUTE – VÄGA OLULINE */
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);
app.use('/fullRecipes', fullRecipesRouter);
app.use('/random', randomRouter);

/* ⬇️ RENDER PORT */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
