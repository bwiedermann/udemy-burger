import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavigationItems = (props) => {
  return (
    <Fragment>
      <Menu.Item as={NavLink} exact to="/">
        Burger Builder
      </Menu.Item>
      <Menu.Item as={NavLink} exact to="/orders">
        Orders
      </Menu.Item>
    </Fragment>
  )
}

export default NavigationItems
