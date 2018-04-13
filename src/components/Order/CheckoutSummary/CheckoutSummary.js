import React from 'react'
import Burger from '../../Burger/Burger';
import { Button, Container } from 'semantic-ui-react';

const CheckoutSummary = (props) => {
  return (
    <Container>
      <h1>We hope it tastes good!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients = {props.ingredients} />
      </div>
      <Button negative onClick={props.checkoutCancelled}>Cancel</Button>
      <Button positive onClick={props.checkoutContinued}>Continue</Button>
    </Container>
  )
}

export default CheckoutSummary;
