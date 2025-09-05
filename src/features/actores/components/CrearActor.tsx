import type { SubmitHandler } from "react-hook-form"
import type ActorCreacion from "../models/ActorCreacion.mode"
import FormularioActor from "./FormularioActor";

export default function CrearActor(){
    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        console.log('Creando actor...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    }
    return (
        <>
            <h3>Crear actor</h3>
            <FormularioActor onSubmit={onSubmit} />
        </>
        
    )
}