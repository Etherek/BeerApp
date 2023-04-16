import { useState, useEffect, useRef } from 'react';
import './MainPage.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';

export interface Beer {
  price: number;
  currency: string;
  volume: Volume;
  first_brewed: string;
  ibu: number;
  abv: number;
  description: string;
  id: number;
  name: string;
  tagline: string;
  image_url:string;
  liked: boolean;
}
interface Volume {
  value: number;
  unit: string;
}
type Props = {
  onLikedBeersChange: (newLikedBeers: number[]) => void;
};

function MainPage({ onLikedBeersChange }: Props) {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likedBeers, setLikedBeers] = useState<number[]>(() => {
    const storedLikedBeers = JSON.parse(localStorage.getItem('likedBeers') || '[]');
    return storedLikedBeers;
  });
  const endRef = useRef<HTMLDivElement>(null);

  const storedLikedBeers = useRef<number[]>([]);

  useEffect(() => {
    storedLikedBeers.current = likedBeers;
    localStorage.setItem('likedBeers', JSON.stringify(storedLikedBeers.current));
  }, [likedBeers]);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=30`)
      .then(response => response.json())
      .then((data: Beer[]) => {
        const newBeers = data.map(beer => ({
          ...beer,
          liked: storedLikedBeers.current.includes(beer.id)
        }));
        setBeers([...beers, ...newBeers]);
        setIsLoading(false);

      });
  }, [currentPage]);

  const handleLike = (id: number) => {
    setBeers((prevBeers) =>
      prevBeers.map((beer) =>
        beer.id === id ? { ...beer, liked: !beer.liked } : beer
      )
    );
    setLikedBeers((prevLikedBeers) =>
      prevLikedBeers.includes(id)
        ? prevLikedBeers.filter((beerId) => beerId !== id)
        : [...prevLikedBeers, id]
    );
  };
  
  useEffect(() => {
    storedLikedBeers.current = likedBeers;
    localStorage.setItem('likedBeers', JSON.stringify(storedLikedBeers.current));
    onLikedBeersChange(likedBeers);
  }, [likedBeers]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (
        !isLoading &&
        endRef.current &&
        window.scrollY + window.innerHeight >= endRef.current.offsetTop
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, beers]);

  return (
   
    <div className="App">
      <NavBar />
      <div className="likedBeers">
        <Link to="/liked">Ulubione Piwa</Link>
      </div>
      <div className="beers">
          {beers.map((beer) => (

            <div className="beer" key={beer.id}>
              {beer.liked ? (
                <HeartFilled onClick={() => handleLike(beer.id)} />
              ) : (
                <HeartOutlined onClick={() => handleLike(beer.id)} />
              )}
              
              <Link to={`/beer/${beer.id}`}><h3>{beer.name}</h3></Link>

              <img src={beer.image_url} className="img" alt={beer.name} />
              <p>{beer.tagline}</p>
            </div>
            
          ))}

      {isLoading && <div>Loading...</div>}

      <div ref={endRef} />
      </div>
      
    </div>
  
  

  );
}
export default MainPage;