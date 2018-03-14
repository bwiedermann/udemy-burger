import React, { Fragment } from 'react';
import { Label, Button } from 'semantic-ui-react';

const BuildControl = (props) => {
  return (
    <Fragment>
      <Label>{props.label}</Label>
      <Button.Group>
        <Button basic icon="minus" onClick={props.removed} disabled={props.disabled} />
        <Button basic icon="plus" onClick={props.added} />
      </Button.Group>
    </Fragment>
  )
};

export default BuildControl;
