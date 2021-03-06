import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from '../actions/types';

/** we store ingredients and the total price */
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  orderInProgress: false,  
};

/** the prices for each ingredient */
const INGREDIENT_PRICES = {
  salad:  0.5,
  cheese: 0.4,
  meat:   1.3,
  bacon:  0.7,
};

/** given a collection of ingredients, computes the total price */
const computePrice = (ingredients) => {
  let price = initialState.totalPrice;
  for (let ingredient in ingredients) {
    price += ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
  }
  return price;
}

const setIngredients = (state, action) => ({
  ...state,
  ingredients: action.ingredients,
  totalPrice: computePrice(action.ingredients),
  error: false,
});

/**
 * Adds or removes an ingredient
 * @param {*} state the current state
 * @param {*} ingredient the name of the ingredient to add or remove
 * @param {*} num a number n. If n is positive, will add n ingredients;
 *            if n is negative, will remove n ingredients
 */
const changeIngredient = (state, ingredient, num) => {
  // error handling
  if (state.ingredients[ingredient] === undefined) {
    return state;
  }

  // change the ingredient
  const newIngredients = { ...state.ingredients };
  const newIngredientQuantity = newIngredients[ingredient] + num;
  newIngredients[ingredient] = Math.max(0, newIngredientQuantity);  // can't have negative ingredients

  // compute a new price
  const newPrice = computePrice(newIngredients);

  return {
    ...state, 
    ingredients: newIngredients, 
    totalPrice: newPrice, 
    orderInProgress: newPrice > initialState.totalPrice, // HACK
  };
}


/** the reducer */
export default (state = initialState, action) => {
  switch (action.type) {

    case SET_INGREDIENTS:
      return setIngredients(state, action);

    case FETCH_INGREDIENTS_FAILED:
       return { ...state, error: true };

    case ADD_INGREDIENT:
      return changeIngredient(state, action.ingredient, 1);

    case REMOVE_INGREDIENT:
      return changeIngredient(state, action.ingredient, -1);

    default:
      return state

  }
}
