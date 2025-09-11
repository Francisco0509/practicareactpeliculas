import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type ActorCreacion from "../models/ActorCreacion.mode";
import FormularioActor from "./FormularioActor";
import type { SubmitHandler } from "react-hook-form";
import Loading from "../../../components/Loading";

export default function EditarActor(){
    const {id} = useParams();

    const [modelo, setModelo] = useState<ActorCreacion | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModelo({nombre: 'Tom Cruise ' + id, fechaNacimiento: '1979-09-05', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Gal_Gadot_2018_cropped_retouched.jpg/800px-Gal_Gadot_2018_cropped_retouched.jpg'})
        },1000);

        return () => clearTimeout(timerId);
    }, [id]);

    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
            console.log('Editando actor...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log(data);
        }

    return (  
        <>
            <h3>Editar actor</h3>
            {modelo ? <FormularioActor errores={[]} modelo={modelo} onSubmit={onSubmit}/> : <Loading />}
        </>      
        
    )
}