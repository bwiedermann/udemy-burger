import React from 'react'
import { Sidebar, Menu } from 'semantic-ui-react';
import NavigationItems from '../NavigationItems/NavigationItems';

const Sidedrawer = (props) => {
  return (
      <Sidebar
        as={Menu}
        visible={props.visible}
        animation='push'
        width='thin'
        icon='labeled'
        vertical
        inverted>
        <NavigationItems />
      </Sidebar>
  );
}

export default Sidedrawer
