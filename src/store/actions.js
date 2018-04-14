export const ADD_INGREDIENT     = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT  = 'REMOVE_INGREDIENT';

export const addIngredientAction = (ingredient) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient
});

export const removeIngredientAction = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient
});
