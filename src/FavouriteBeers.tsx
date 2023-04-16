import { useState, useEffect } from 'react';
import { Beer } from './MainPage';
import './FavouriteBeers.css';

interface Props {
  likedBeers: number[];
}

function FavouriteBeers(props: Props) {
  const [beers, setBeers] = useState<Beer[]>([]);
  const id = props.likedBeers.join('|');

  useEffect(() => {
    const likedBeers = JSON.parse(localStorage.getItem('likedBeersList') || '[]');
    console.log(likedBeers)
    console.log(beers)
    console.log(`https://api.punkapi.com/v2/beers?ids=${id}`)
    fetch(`https://api.punkapi.com/v2/beers?ids=${id}`)
      .then(response => response.json())
      .then((data: Beer[]) => {
        console.log(data);
        const likedBeers = data.filter(beer => props.likedBeers.includes(beer.id));
        setBeers(likedBeers);
        localStorage.setItem('likedBeersList', JSON.stringify(likedBeers));
        
      }
      );
      
      
      console.log(beers)
      console.log({beers})
  }, [props.likedBeers, id]);


  return (
    <div>
      <div className='title'>
        <h1>Favourite Beers</h1>
      </div>
      <div className='favBeers'>
        {beers.map(beer => (
          <div className="favBeer" key={beer.id}>
            <h3>{beer.name}</h3>
            <img src={beer.image_url} className="img" alt={beer.name} />
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouriteBeers;