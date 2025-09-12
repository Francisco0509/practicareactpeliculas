import type { SubmitHandler } from "react-hook-form";
import FormularioPelicula from "./FormularioPelicula";
import type PeliculaCreacion from "../models/PeliculaCreacion.model";
import type Genero from "../../generos/modelos/genero.model";
import type Cine from "../../cines/models/Cines.models";
import { useEffect, useState } from "react";
import clienteAPI from "../../../api/clienteAxios";
import type PeliculasPostGet from "../models/PeliculasPostGet";
import Loading from "../../../components/Loading";
import convertirPeliculaCreacionAFormData from "../utilidades/convertirPeliculaCreacionAFormData";
import { useNavigate } from "react-router";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";
import type Pelicula from '../models/Pelicula.model';

export default function CrearPelicula(){
    const navigate = useNavigate();
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<Genero[]>([]);
    const [cinesNoSeleccionados, setCinesNOsEleccionados] = useState<Cine[]>([]);
    const [cargando, setCargando] = useState(true);
    const [errores, setErrores] = useState<string[]>([]);
    useEffect(() => {
        clienteAPI.get<PeliculasPostGet>(`/peliculas/postget`).then(res => {
            setGenerosNoSeleccionados(res.data.generos);
            setCinesNOsEleccionados(res.data.cines);
            setCargando(false);
        });
    }, []);

    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        try {
            const formData = convertirPeliculaCreacionAFormData(data);
            await clienteAPI.postForm<Pelicula>('/peliculas', formData);
            navigate('/');
        }
        catch (err) {
            const errores = extraerErrores(err as AxiosError);
            setErrores(errores);
        }
    }

    return (
        <>
            <h3>Crear Película</h3>
            {cargando ? <Loading /> : <FormularioPelicula errores={errores} onSubmit={onSubmit}
                generosNoSeleccionados={generosNoSeleccionados}
                generosSeleccionados={[]}
                cinesNoSeleccionados={cinesNoSeleccionados}
                cinesSeleccionados={[]}
                actoresSeleccionados={[]}
                />}
            
                
        </>
            
    )
}