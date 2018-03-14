import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import "./BuildControls.css";

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      {
        controls.map(control => 
          <BuildControl key={control.label} label={control.label} />)
      }
    </div>
  )
}

export default BuildControls
