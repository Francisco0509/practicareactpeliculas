import type { SubmitHandler } from "react-hook-form";
import FormularioPelicula from "./FormularioPelicula";
import type PeliculaCreacion from "../models/PeliculaCreacion.model";
import type Genero from "../../generos/modelos/genero.model";
import type Cine from "../../cines/models/Cines.models";

export default function CrearPelicula(){
    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        console.log('Creando película...');
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(data);
    }

    const generosSeleccionados: Genero[] = [];
    const generosNoSeleccionados: Genero[] = [
        {id: 1, nombre: 'Acción'},
        {id: 2, nombre: 'Drama'},
        {id: 3, nombre: 'Comedia'}];

    const cinesSeleccionados: Cine[] = [];
    const cinesNoSeleccionados: Cine[] = [
        {id: 1, nombre: 'Plaza Cumbres', latitud: 0, longitud: 0},
        {id: 2, nombre: 'Plaza Fiesta San Agustín', latitud: 0, longitud: 0},
        {id: 3, nombre: 'Plaza Adana', latitud: 0, longitud: 0},
        {id: 4, nombre: 'Plaza Real', latitud: 0, longitud: 0}
    ];
    return (
        <>
            <h3>Crear Película</h3>
            <FormularioPelicula onSubmit={onSubmit}
                generosNoSeleccionados={generosNoSeleccionados}
                generosSeleccionados={generosSeleccionados}
                cinesNoSeleccionados={cinesNoSeleccionados}
                cinesSeleccionados={cinesSeleccionados}
                actoresSeleccionados={[]}
                />
                
        </>
            
    )
}