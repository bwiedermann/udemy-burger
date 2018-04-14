import * as actions from './actions';

/** we store ingredients and the total price */
const initialState = {
  ingredients: {
    salad:  0,
    cheese: 0,
    meat:   0,
    bacon:  0,
  },
  totalPrice: 4,
};

/** the prices for each ingredient */
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: .4,
  meat: 1.3,
  bacon: 0.7,
};

/**
 * Adds or removes an ingredient
 * @param {*} state the current state
 * @param {*} ingredient the name of the ingredient to add or remove
 * @param {*} multiplier a number n. If n is positive, will add n ingredients;
 *            if n i negative, will remove n ingredients
 */
const changeIngredient = (state, ingredient, multiplier) => {
  // error handling
  if (!state.ingredients[ingredient]) {
    return state;
  }

  // change the ingredient
  const newIngredients = { ...state.ingredients };
  newIngredients[ingredient] = newIngredients[ingredient] * multiplier;

  // compute a new price
  const newPrice = state.totalPrice + multiplier * INGREDIENT_PRICES[ingredient];

  return {...state, ingredients: newIngredients, totalPrice: newPrice};
}

/** the reducer */
export default (state = initialState, action) => {
  switch (action.type) {

  case actions.ADD_INGREDIENT: 
    return changeIngredient(state, action.ingredient, 1);

  case actions.REMOVE_INGREDIENT:
    return changeIngredient(state, action.ingredient, -1);

  default:
    return state
  }
}
