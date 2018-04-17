import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavigationItems = (props) => {
  return (
    <Fragment>
      <NavigationItem title={"Burger Builder"} link={"/"} />
      <NavigationItem title={"Orders"}  link={"/orders"} hide={!props.loggedIn} />
      <NavigationItem title={"Sign In"} link={"/auth"}   hide={props.loggedIn} />
      <NavigationItem title={"Logout"}  link={"/logout"} hide={!props.loggedIn} />
    </Fragment>
  );
}

const NavigationItem = (props) => (
  props.hide ? null 
             : <Menu.Item as={NavLink} exact to={props.link}>{props.title}</Menu.Item>
);

export default NavigationItems
