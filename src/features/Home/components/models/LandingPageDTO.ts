import type Movie from '../../../movies/models/Pelicula.model';
export default interface LandingPageDTO {
  enCines?: Movie[];
  proximosEstrenos?: Movie[];
}