import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const Burger = (props) => {
    // create a flattened array of BurgerIngredient components, based on
    // the included ingredients
    let ingredientElements = 
        Object.keys(props.ingredients)
              .map(name => 
                    [...Array(props.ingredients[name])]
                        .map((_, idx) => 
                            <BurgerIngredient key={name + idx} type={name} />))
              .reduce((prev, curr) => prev.concat(curr), []);
    if (ingredientElements.length === 0) {
        ingredientElements = <p>Please start adding ingredients</p>;
    }
  return (
    <div className="Burger">
        <BurgerIngredient type="bread-top" />      
          {ingredientElements}
        <BurgerIngredient type="bread-bottom" />      
    </div>
)};

export default Burger
