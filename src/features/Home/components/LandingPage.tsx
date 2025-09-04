import { useEffect, useState } from "react";
import type Movie from "../../movies/models/movie.model";
import MovieList from "../../movies/components/MovieList";

export default function LandingPage(){
      const [movies, setMovies] = useState<AppState>({});
    
      useEffect(() => {
        setTimeout(() => {   
          const enCines: Movie[] =[{
            id: 1,
            title: 'Sonic 3',
            poster: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Sonic_the_Hedgehog_3_film_poster.jpg'
          },
          {
            id: 2,
            title: 'John Wick: Chapter 4',
            poster: 'https://upload.wikimedia.org/wikipedia/en/d/d0/John_Wick_-_Chapter_4_promotional_poster.jpg'
          }]
    
          const proximosEstrenos: Movie[] = [{
            id:3,
            title: 'Spiderman: Far From Home',
            poster: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg'
          }]   
    
          setMovies({enCines, proximosEstrenos});
        },1000);
      },[]);
    
    
    return (
        <>
            <h3>En Cines</h3>
            <MovieList movies={movies.enCines}/>   
    
            <h3>Próximos Estrenos</h3>
            <MovieList movies={movies.proximosEstrenos}/>
        </>
    )
}

interface AppState {
  enCines?: Movie[];
  proximosEstrenos?: Movie[];
}