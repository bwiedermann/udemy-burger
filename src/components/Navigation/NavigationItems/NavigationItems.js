import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react';

const NavigationItems = (props) => {
  return (
    <Fragment>
      <Menu.Item active={props.activeItem === 'builder'} href="/">
        Burger Builder
      </Menu.Item>
      <Menu.Item active={props.active === 'checkout'} href="/">
        Checkout
      </Menu.Item>
    </Fragment>
  )
}

export default NavigationItems
