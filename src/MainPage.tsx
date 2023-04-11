import { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  image_url:string;
  liked: boolean;
}
type Props = {
  onLikedBeersChange: (newLikedBeers: number[]) => void;
};

function MainPage({ onLikedBeersChange }: Props) {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likedBeers, setLikedBeers] = useState<number[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const storedLikedBeers = useRef<number[]>([]);
  useEffect(() => {
    storedLikedBeers.current = JSON.parse(localStorage.getItem('likedBeers') || '[]');
    setLikedBeers(storedLikedBeers.current);
  }, []);

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
    storedLikedBeers.current = likedBeers;
    localStorage.setItem('likedBeers', JSON.stringify(storedLikedBeers.current));
    onLikedBeersChange(likedBeers);
  };

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

  console.log(localStorage.likedBeers)
  console.log(likedBeers)
  return (
   
    <div className="App">
      <NavBar />
      <div>
      <Link to="/liked">Ulubione Piwa</Link>
      </div>

          {beers.map((beer) => (
            <div className="beer" key={beer.id}>
              {beer.liked ? (
                <HeartFilled onClick={() => handleLike(beer.id)} />
              ) : (
                <HeartOutlined onClick={() => handleLike(beer.id)} />
              )}
              <h3>{beer.name}</h3>
              <img src={beer.image_url} className="img" alt={beer.name} />
              <p>{beer.tagline}</p>
            </div>
          ))}

      {isLoading && <div>Loading...</div>}
      <div ref={endRef} />
    </div>
  
  

  );
}
export default MainPage;