import { useEffect, useState } from "react";
import { useParams } from "react-router";
import clienteAPI from "../../../api/clienteAxios";
import Loading from "../../../components/Loading";
import type Pelicula from '../models/Pelicula.model';

export default function DetallePelicula(){
    const [pelicula, setPelicula] = useState<Pelicula>({} as Pelicula)
    const {id} = useParams();

    useEffect(() => {
        try{
            clienteAPI.get<Pelicula>(`/peliculas/${id}`).then(res => setPelicula(res.data))
        }
        catch (err) {
            console.error(err);
        }
        
    }, [id]);

    if(!pelicula)
    {
        <Loading />
    }

    const fecha = new Date(pelicula.fechaLanzamiento);
    const year = fecha.getFullYear();
    const fechaFormateada = fecha.toLocaleDateString();
    function obtenerURLEmbebidaYoutube(url: string): string | undefined {
        const objURL = new URL(url);
        const videoId = objURL.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    }
    return (
        <>
            <div className="container my-4">
                <div className="mb-3">
                    <h2>{pelicula.titulo} <small className="text-muted">({year})</small></h2>
                    {pelicula.generos && pelicula.generos.length > 0 && (
                        <div className="mb-2">
                            {pelicula.generos.map(genero => 
                            <span key={genero.id} className="badge bg-primary me-2">
                                {genero.nombre}
                            </span>)}
                        </div>
                    )}

                    { <p className="text-muted">Estreno: {fechaFormateada}</p> }
                </div>
                <div className="d-flex">
                    <span className="d-inline-block me-2">
                        <img src={pelicula.poster} style={{width: '225px', height: '315px'}} />
                    </span>
                    <div>
                        <iframe src={obtenerURLEmbebidaYoutube(pelicula.trailer)} width="565" height="315"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}