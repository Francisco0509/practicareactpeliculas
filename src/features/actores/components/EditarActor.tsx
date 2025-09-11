import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type ActorCreacion from "../models/ActorCreacion.mode";
import FormularioActor from "./FormularioActor";
import type { SubmitHandler } from "react-hook-form";
import Loading from "../../../components/Loading";
import clienteAPI from "../../../api/clienteAxios";
import formatearFecha from "../../../utilidades/formatearFecha";
import type Actor from "../models/Actor.model";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";

export default function EditarActor(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [modelo, setModelo] = useState<ActorCreacion | undefined>(undefined);
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        clienteAPI.get<Actor>(`/actores/${id}`).then(res => {
            const actor = res.data;
            const actorCreacion: ActorCreacion = {
                nombre: actor.nombre,
                fechaNacimiento: formatearFecha(actor.fechaNacimiento),
                foto: actor.foto
            };

            setModelo(actorCreacion);
        })
    }, [id]);

    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        try{
            await clienteAPI.putForm(`/actores/${id}`, data);
            navigate('/actores');
        }        
        catch (err) {
            const errores = extraerErrores(err as AxiosError);
            setErrores(errores);
        }
    }

    return (  
        <>
            <h3>Editar actor</h3>
            {modelo ? <FormularioActor errores={errores} modelo={modelo} onSubmit={onSubmit}/> : <Loading />}
        </>      
        
    )
}