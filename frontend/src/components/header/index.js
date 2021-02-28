import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Navbar} from 'rsuite';
import './style.scss';

const Header = () => {
  return (
    <Navbar className="navbody">
      <Navbar.Header>
        <h4 className="libra-brand">
            Smart Gesture
        </h4>
      </Navbar.Header>
    </Navbar>
  );
};
  
  export default Header;