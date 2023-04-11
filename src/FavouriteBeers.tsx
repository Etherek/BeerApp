import { useState, useEffect } from 'react';
import { Beer } from './MainPage';
import './FavouriteBeers.css'
interface Props {
    likedBeers: number[];

  }
  
  function FavouriteBeers(props: Props) {
    const [beers, setBeers] = useState<Beer[]>([]);
    const id = props.likedBeers.join('|')

    useEffect(() => {
      fetch(`https://api.punkapi.com/v2/beers?ids=${id}`)
        .then(response => response.json())
        .then((data: Beer[]) => {
          const likedBeers = data.filter(beer => props.likedBeers.includes(beer.id));
          setBeers(likedBeers);
        });
        console.log(props)
        console.log(`https://api.punkapi.com/v2/beers?${id}`)
        console.log(props.likedBeers.join('|'))
    }, [props.likedBeers]);
  
    return (
      <div>
        <h1>Favourite Beers</h1>
        {beers.map(beer => (
          <div className="beer" key={beer.id}>
            <h3>{beer.name}</h3>
            <img src={beer.image_url} className="img" alt={beer.name} />
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
    );
  }
  

export default FavouriteBeers;