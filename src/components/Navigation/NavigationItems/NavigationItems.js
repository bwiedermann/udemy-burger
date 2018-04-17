import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavigationItems = (props) => {
  const authLink = props.loggedIn
    ? <Menu.Item as={NavLink} exact to="/logout">
        Logout
      </Menu.Item>
    :  <Menu.Item as={NavLink} exact to="/auth">
        Sign in
      </Menu.Item>
  return (
    <Fragment>
      <Menu.Item as={NavLink} exact to="/">
        Burger Builder
      </Menu.Item>
      <Menu.Item as={NavLink} exact to="/orders">
        Orders
      </Menu.Item>
      {authLink}
    </Fragment>
  )
}

export default NavigationItems
