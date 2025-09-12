import type Movie from "../models/Pelicula.model";
import styles from './SingleMovie.module.css';

export default function SingleMovie(props: SingleMovieProps){
    const construirLink = () => `/pelicula/${props.movie.id}`

    return (
        <div className={styles.div}>
            <a href={construirLink()}>
                <img src={props.movie.poster} />
            </a>
            <p>
                <a href={construirLink()}>{props.movie.title}</a>
            </p>
        </div>
    )
}

interface SingleMovieProps{
    movie: Movie
}