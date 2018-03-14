import React, { Fragment } from 'react';
import { Label, Button } from 'semantic-ui-react';

const BuildControl = (props) => {
  return (
    <Fragment>
      <Label>{props.label}</Label>
      <Button.Group>
        <Button basic icon="minus" />
        <Button basic icon="plus" />
      </Button.Group>
    </Fragment>
  )
};

export default BuildControl;
