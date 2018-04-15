import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './types';

export const addIngredientAction = (ingredient) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient
});

export const removeIngredientAction = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient
});
