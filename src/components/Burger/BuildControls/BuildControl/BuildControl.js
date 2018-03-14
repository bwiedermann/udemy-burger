import React from 'react';
import { Button } from 'semantic-ui-react';
import "./build-control-addition.css";

const BuildControl = () => {
  return (
    <div className="BuildControl">
      <div className="Label">{props.label}</div>
      <Button size="mini">Less</Button>
      <Button size="mini">More</Button>
    </div>
  )
};

export default BuildControl;
