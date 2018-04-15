import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT, 
  SET_INGREDIENTS, 
  FETCH_INGREDIENTS_FAILED } from './types';
import axios from '../../axios-orders';

export const addIngredientAction = (ingredient) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient
});

export const removeIngredientAction = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient
});

const setIngredients = (ingredients) => ({
  type: SET_INGREDIENTS,
  ingredients: ingredients
})

const fetchIngredientsFailed = (error) => ({
  type: FETCH_INGREDIENTS_FAILED,
  error: error,
})

export const initIngredients = () => (dispatch) => {
      axios.get('https://udemy-burger-d490e.firebaseio.com/ingredients.json')
           .then(response => dispatch(setIngredients(response.data)))
           .catch(error => dispatch(fetchIngredientsFailed(error)));
}
