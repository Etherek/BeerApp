import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import './SearchBeer.css'
interface Props {
  fetchBeers: (beerName: string) => Promise<any[]>;
}

function SearchBeer({ fetchBeers }: Props) {
  const { beerName = ''} = useParams<{ beerName: string }>();
  const [beers, setBeers] = useState<any[]>([]);

  useEffect(() => {
    const getBeers = async () => {
      const data = await fetchBeers(beerName);
      setBeers(data);
    };

    getBeers();
  }, [beerName, fetchBeers]);

  return (
    <div className='container'>
    <NavBar></NavBar>
      <h1>Search for beer: {beerName}</h1>
      <div className="beers">
          {beers.map((beer) => (

            <div className="beer" key={beer.id}>          
              <Link to={`/beer/${beer.id}`}><h3>{beer.name}</h3></Link>
              <img src={beer.image_url} className="img" alt={beer.name} />
              <p>{beer.tagline}</p>
            </div>
            
          ))}


      </div>
    </div>
  );
}

export default SearchBeer;