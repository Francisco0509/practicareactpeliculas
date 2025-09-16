import { useEffect, useState } from "react";
import { useParams } from "react-router";
import clienteAPI from "../../../api/clienteAxios";
import Loading from "../../../components/Loading";
import type Pelicula from '../models/Pelicula.model';
import type Coordenada from "../../../components/Mapa/Coordenada.model";
import Mapa from "../../../components/Mapa/Mapa";

export default function DetallePelicula(){
    const [pelicula, setPelicula] = useState<Pelicula | null>(null)
    const {id} = useParams();

    useEffect(() => {
        try{
            clienteAPI.get<Pelicula>(`/peliculas/${id}`).then(res => {
                setPelicula(res.data)
            })
        }
        catch (err) {
            console.error(err);
        }
        
    }, [id]);

    if(!pelicula)
    {
       return <Loading />
    }

    const fecha = new Date(pelicula.fechaLanzamiento);
    const year = fecha.getFullYear();
    const fechaFormateada = fecha.toLocaleDateString();
    function obtenerURLEmbebidaYoutube(url: string): string | undefined {

        const objURL = new URL(url);
        const videoId = objURL.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    }

    function transformarCoordenadas(): Coordenada[] {
        return pelicula!.cines!.map(c => {
            const coordenada: Coordenada = {lat: c.latitud, lng: c.longitud, mensaje: c.nombre}
            return coordenada;
        })
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

                <p className="text-muted">Estreno: {fechaFormateada}</p> 
                </div>
                <div className="d-flex">
                    <span className="d-inline-block me-2">
                        <img src={pelicula.poster} style={{width: '225px', height: '315px'}} />
                    </span>
                    <div>
                        <iframe src={obtenerURLEmbebidaYoutube(pelicula.trailer)} 
                            width="565" 
                            height="315"
                            title="Trailer"
                            allowFullScreen></iframe>
                    </div> 
                </div> 
                {pelicula.actores && pelicula.actores.length > 0 && (
                    <div>
                        <h4>Actores</h4>
                        <div className="row">
                            {pelicula.actores.map(actor => (
                                <div key={actor.id} className="col-md-4 d-flex mb-3">
                                    <img src={actor.foto} alt={actor.nombre} className="rounded me-3" style={{width: '80px', height: '100px'}}/>
                                    <div>
                                        <strong>{actor.nombre}</strong>
                                        <br />
                                        <span className="text-muted">{actor.personaje}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {pelicula.cines && pelicula.cines.length > 0 && 
                    <div className="w-100">
                        <h2>Mostrandose en los siguientes cines</h2>
                        <Mapa coordenadas={transformarCoordenadas()} editable={false}/>
                    </div>
                }
            </div>
        </>
    )
}