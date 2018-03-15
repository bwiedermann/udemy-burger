import React from 'react';
import { Menu } from 'semantic-ui-react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
  return (
    <Menu>
      <Menu.Item>
        <Logo size="mini" />
      </Menu.Item>
      <Menu.Item>
        Menu
      </Menu.Item>
      <Menu.Menu position="right">
        <NavigationItems activeItem="builder" />
      </Menu.Menu>
    </Menu>
  )
};

export default Toolbar;
