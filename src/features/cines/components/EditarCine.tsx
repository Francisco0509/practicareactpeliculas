import { useNavigate, useParams } from "react-router";
import FormularioCine from "./FormularioCine";
import type { SubmitHandler } from "react-hook-form";
import type CineCreacion from "../models/CineCreacion.model";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import clienteAPI from "../../../api/clienteAxios";
import type Cine from "../models/Cines.models";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";

export default function EditarCine(){
        
    const {id} = useParams(); //Obtener parámetros desde el URL
    const [modelo, setModelo] = useState<CineCreacion | undefined>(undefined);
    const navigate = useNavigate();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        clienteAPI.get<Cine>(`/cines/${id}`).then(res => setModelo(res.data))
        .catch(() => navigate('/cines'));
    }, [id, navigate]);

    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        try {
            await clienteAPI.put(`/cines/${id}`, data);
            navigate('/cines');
        }
        catch (err) {
            const errores = extraerErrores(err as AxiosError);
            setErrores(errores);
        }
    }

    return (
        <>
            <h3>Editar Cine</h3>
            {modelo ? <FormularioCine errores={errores} modelo={modelo} onSubmit={onSubmit} /> : <Loading /> }
        </>
        
    )
}