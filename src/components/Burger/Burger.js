import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const Burger = (props) => {
    const ingredientNames = Object.keys(props.ingredients);
    const ingredientElements = 
        ingredientNames.map(name => 
            [...Array(props.ingredients[name])].map((_, idx) =>
                <BurgerIngredient key={name + idx} type={name} />));
    console.log(ingredientElements);
  return (
    <div className="Burger">
        <BurgerIngredient type="bread-top" />      
        {ingredientElements}
        <BurgerIngredient type="bread-bottom" />      
    </div>
)};

export default Burger
