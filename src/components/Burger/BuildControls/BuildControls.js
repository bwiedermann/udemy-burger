import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import "./BuildControls.css";
import { Button } from 'semantic-ui-react';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>Current price: $<strong>{props.price.toFixed(2)}</strong></p>
      {
        controls.map(control => 
          <BuildControl 
            key={control.label} 
            label={control.label}
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)} 
            disabled={props.disabled[control.type]} />)
      }
      <Button disabled={!props.purchasable} onClick={props.order}>
        Order Now
      </Button>
    </div>
  )
}

export default BuildControls
