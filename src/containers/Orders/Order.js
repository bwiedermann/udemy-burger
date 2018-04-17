import React from 'react'
import { Card } from 'semantic-ui-react';

const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push(ingredientName + ' (' + props.ingredients[ingredientName] + ')');
  }
  return (
    <Card>
      <h4>Ingredients</h4>
      <p>{props.user}</p>
      { ingredients.map(ingredient => <p key={ingredient}>{ingredient}</p>) }
      <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </Card>
  )
}

export default Order;
