import { useState, useEffect } from 'react';
import { Beer } from './MainPage';
import './SelectedBeer.css'
import { useParams } from 'react-router-dom';


  function SelectedBeers() {
    const { id } = useParams<{ id: string }>();
    const [beer, setBeer] = useState<Beer | null>(null);
  
    useEffect(() => {
      fetch(`https://api.punkapi.com/v2/beers/${id}`)
      
        .then((response) => response.json())
        .then((data: Beer[]) => {
          setBeer(data[0]);
        });
    }, [id]);
  
    if (!beer) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="choosedBeer">
        <h2>{beer.name}</h2>
        <div className='choosedBeerImage'>
          <img src={beer.image_url} alt={beer.name} />
        </div>
        <p>{beer.tagline}</p>
        <p>{beer.description}</p>
        <p>Alcohol by volume (ABV): {beer.abv}%</p>
        <p>International Bitterness Units (IBU): {beer.ibu}</p>
        <p>Brewed on: {beer.first_brewed}</p>
        <p>Available volume: {beer.volume.value} {beer.volume.unit}</p>
      </div>
    );
  }
export default SelectedBeers