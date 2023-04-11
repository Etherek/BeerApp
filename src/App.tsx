import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavouriteBeers from './FavouriteBeers';
import MainPage from './MainPage';

function App() {
  const [likedBeers, setLikedBeers] = useState<number[]>([]);

  const handleValueChange = (newLikedBeers: number[]) => {
    setLikedBeers(newLikedBeers);
  };
  console.log(likedBeers)
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<MainPage onLikedBeersChange={handleValueChange} />} />
          <Route path="/liked" element={<FavouriteBeers likedBeers={likedBeers} />} /> <Route/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;