import React from 'react';
import { Image } from 'semantic-ui-react';
import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = (props) => {
  return (
    <Image 
      size='mini'
      src={burgerLogo} 
      alt="burger-logo" />
  )
}

export default Logo;
