import type Movie from "../models/Pelicula.model";
import SingleMovie from "./SingleMovie";
import styles from './MovieList.module.css';
import GenericList from "../../../components/GenericList";

export default function MovieList(props: MovieListProps){
    
    return (
        <GenericList listado={props.movies} listadoVacioUI={<>No hay películas para mostrar.</>}>
            <div className={styles.div}>
                {props.movies?.map(movie => <SingleMovie key={movie.id} movie={movie} />)}
            </div>
        </GenericList>
        
    )
        
}

interface MovieListProps{
    movies?: Movie[];
}