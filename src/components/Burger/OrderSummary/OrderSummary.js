import React, { Fragment } from 'react'
import { Button } from 'semantic-ui-react';

const OrderSummary = (props) => {
  const ingredientSummary =
    Object.keys(props.ingredients).map(name => 
      <li key={name}>
        <span style={{textTransform: 'capitalize'}}>{name}</span>: {props.ingredients[name]}
      </li>
    );
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout</p>
      <Button negative>Cancel</Button>
      <Button positive>Continue</Button>
    </Fragment>
  )
}

export default OrderSummary
