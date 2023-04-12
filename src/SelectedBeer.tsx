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
      <div className="beer">
        <h2>{beer.name}</h2>
        <img src={beer.image_url} alt={beer.name} />
        <p>{beer.tagline}</p>
        <p>{beer.description}</p>
        // reszta kodu
      </div>
    );
  }
export default SelectedBeers