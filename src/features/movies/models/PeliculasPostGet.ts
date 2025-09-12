import type Cine from "../../cines/models/Cines.models";
import type Genero from "../../generos/modelos/genero.model";

export default interface PeliculasPostGet{
    generos: Genero[];
    cines: Cine[];
}