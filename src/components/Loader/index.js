import React from 'react';
import logo from '../../assets/logo.svg';
import './index.sass';

const Loader = props => (
  <div>
    <img src={logo} alt='loader icon'className="loader"/>
  </div>
)

export default Loader;
