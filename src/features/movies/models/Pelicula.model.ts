import type Cine from "../../cines/models/Cines.models";
import type Genero from "../../generos/modelos/genero.model";
import type ActorPelicula from "./ActorPelicula";

export default interface Movie{
    id: number;
    titulo: string;
    poster: string;
    fechaLanzamiento: string;
    trailer: string;
    generos?: Genero[];
    cines?: Cine[];
    actores?: ActorPelicula[];
}