import React, { Fragment } from 'react'

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
    </Fragment>
  )
}

export default OrderSummary
