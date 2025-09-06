import type { SubmitHandler } from "react-hook-form";
import FormularioPelicula from "./FormularioPelicula";
import type PeliculaCreacion from "../models/PeliculaCreacion.model";

export default function CrearPelicula(){
    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        console.log('Creando película...');
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(data);
    }
    return (
        <>
            <h3>Crear Película</h3>
            <FormularioPelicula onSubmit={onSubmit}/>
        </>
            
    )
}