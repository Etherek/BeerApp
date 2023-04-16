import { useState, useEffect } from 'react';
import { Beer } from './MainPage';
import './FavouriteBeers.css';
import { Link } from 'react-router-dom';

interface Props {
  likedBeers: number[];
}

function FavouriteBeers(props: Props) {
  const [beers, setBeers] = useState<Beer[]>([]);
  let id = JSON.parse(localStorage.getItem('likedBeersList') || '[]').join('|');
  
  useEffect(() => {
    const likedBeers = JSON.parse(localStorage.getItem('likedBeersList') || '[]');
    if (props.likedBeers.length > 0) {
      localStorage.setItem('likedBeersList', JSON.stringify(props.likedBeers));
    }
    
    console.log(`https://api.punkapi.com/v2/beers?ids=${id}`)
    fetch(`https://api.punkapi.com/v2/beers?ids=${id}`)
      .then(response => response.json())
      .then((data: Beer[]) => {
        console.log(data);
        const bestBeers = data.filter(beer => likedBeers.includes(beer.id));
        console.log(props.likedBeers)
        setBeers(bestBeers);
        console.log(beers)
      });
  }, [props.likedBeers, id]);

  return (
    <div>
      <div className='title'>
        <h1>Favourite Beers</h1>
      </div>
      <div className='favBeers'>
        {beers.map(beer => (
          <div className="favBeer" key={beer.id}>
            <Link to={`/beer/${beer.id}`}><h3>{beer.name}</h3></Link>
            <img src={beer.image_url} className="img" alt={beer.name} />
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouriteBeers;