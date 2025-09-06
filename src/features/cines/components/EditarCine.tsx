import { useParams } from "react-router";
import FormularioCine from "./FormularioCine";
import type { SubmitHandler } from "react-hook-form";
import type CineCreacion from "../models/CineCreacion.model";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";

export default function EditarCine(){
        
    const {id} = useParams(); //Obtener parámetros desde el URL
    const [modelo, setModelo] = useState<CineCreacion | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            setModelo({nombre: 'Plaza Adana edición', latitud: 
25.733014143036577, longitud: -100.39713263511659});
        }, 1000)
    }, [id]);

    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        console.log('Editando el cine...');
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(data);
    }

    return (
        <>
            <h3>Editar Cine</h3>
            {modelo ? <FormularioCine modelo={modelo} onSubmit={onSubmit} /> : <Loading /> }
        </>
        
    )
}