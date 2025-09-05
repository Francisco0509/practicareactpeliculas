import type { SubmitHandler } from "react-hook-form";
import FormularioCine from "./FormularioCine";
import type CineCreacion from "../models/CineCreacion.model";

export default function CrearCine(){
    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        console.log('Creando el cine...');
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(data);
    }
    return (
        <>
            <h3>Crear Cine</h3>
            <FormularioCine onSubmit={onSubmit} />
        </>
        
    )
}