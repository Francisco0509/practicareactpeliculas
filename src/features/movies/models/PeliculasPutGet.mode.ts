import type Cine from "../../cines/models/Cines.models";
import type Genero from "../../generos/modelos/genero.model";
import type ActorPelicula from "./ActorPelicula";
import type Pelicula from "./Pelicula.model";

export default interface PeliculasPutGet{
    pelicula: Pelicula;
    generosSeleccionados: Genero[];
    generosNoSeleccionados: Genero[];
    cinesSeleccionados: Cine[];
    cinesNoSeleccionados: Cine[];
    actores: ActorPelicula[];
}