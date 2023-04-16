import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { useState } from 'react';
import TypescriptLogo from './icons8-typescript.svg'
import ReactLogo from './logo.svg';
import './NavBar.css';
const { Search } = Input;

function NavBar() {
    const navigate = useNavigate();;
    const [beerName, setBeerName] = useState('');

  const handleSearch = (value: string) => {
    setBeerName(value);
    
    navigate(`/searchBeer/${value}`);
  };

  return (
    <div className="navbar">
      <div className="logos">
        <img src={ReactLogo}></img>
        <img src={TypescriptLogo}></img>
      </div>
      <div className="searchInput">
        <Search placeholder="Search for a beer" onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default NavBar;