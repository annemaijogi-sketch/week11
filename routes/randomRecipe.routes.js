const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // 🔹 võta juhuslik retsept
    const recipeQuery = `
      SELECT 
        id,
        recipename AS "recipeName",
        imageurl AS "imageURL",
        instructions
      FROM recipe
      ORDER BY RANDOM()
      LIMIT 1;
    `;

    const recipeResult = await db.query(recipeQuery);

    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ errorMessage: 'No recipes found' });
    }

    const selectedRecipe = recipeResult.rows[0];

    // 🔹 võta koostisosad
    const ingredientsQuery = `
      SELECT b.ingredientname AS "ingredientName"
      FROM ingredient b
      INNER JOIN IngredientInRecipe c 
        ON b.id = c.ingredientId
      WHERE c.recipeId = $1;
    `;

    const ingredientsResult = await db.query(
      ingredientsQuery,
      [selectedRecipe.id]
    );

    const ingredients = ingredientsResult.rows.map(
      (row) => row.ingredientName
    );

    // 🔹 vastus
    res.json({
      recipe: selectedRecipe,
      ingredients: ingredients
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Internal Server error.' });
  }
});

module.exports = router;
