import type { SubmitHandler } from "react-hook-form"
import type ActorCreacion from "../models/ActorCreacion.mode"
import FormularioActor from "./FormularioActor";
import { useState } from "react";
import { useNavigate } from "react-router";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";
import clienteAPI from "../../../api/clienteAxios";

export default function CrearActor(){
    const [errores, setErrores] = useState<string[]>([]);
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        try{
            await clienteAPI.postForm('/actores', data); //Se usa formPost por que se va a mandar un archivo(foto)
            navigate('/actores');
        }
        catch (err) {
            const errores = extraerErrores(err as AxiosError);
            setErrores(errores);
        }
    }
    return (
        <>
            <h3>Crear actor</h3>
            <FormularioActor errores={errores} onSubmit={onSubmit} />
        </>
        
    )
}