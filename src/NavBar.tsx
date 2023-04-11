import { Input } from 'antd';
import React, { useState } from 'react';
import TypescriptLogo from './icons8-typescript.svg'
import ReactLogo from './logo.svg';
import './NavBar.css';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

function NavBar() {
    return (
        <div className="navbar">
            <div className="logos">
                <img src={ReactLogo}></img>
                <img src={TypescriptLogo}></img>
            </div>
            <div className="searchInput">
                <Search placeholder="input search text" onSearch={onSearch} />
            </div>
        </div>
      );
  }
  
  export default NavBar;