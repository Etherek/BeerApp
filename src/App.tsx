import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavouriteBeers from './FavouriteBeers';
import MainPage from './MainPage';
import SelectedBeers from './SelectedBeer';
import SearchBeer from './SearchBeer';

async function fetchBeers(beerName: string): Promise<any[]> {
  const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`);
  const data = await response.json();
  return data;
}

function App() {
  const [likedBeers, setLikedBeers] = useState<number[]>([]);

  const handleValueChange = (newLikedBeers: number[]) => {
    setLikedBeers(newLikedBeers);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage onLikedBeersChange={handleValueChange} />} />
          <Route path="/liked" element={<FavouriteBeers likedBeers={likedBeers} />} />
          <Route path="/beer/:id" element={<SelectedBeers />} />
          <Route path="/searchBeer/:beerName" element={<SearchBeer fetchBeers={fetchBeers} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;