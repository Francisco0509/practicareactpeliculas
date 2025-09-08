import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type PeliculaCreacion from "../models/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type { SubmitHandler } from "react-hook-form";
import Loading from "../../../components/Loading";
import type Genero from "../../generos/modelos/genero.model";
import type Cine from "../../cines/models/Cines.models";
import type ActorPelicula from "../models/ActorPelicula";

export default function EditarPelicula(){
    const [modelo, setModelo] = useState<PeliculaCreacion | undefined>(undefined);
    const {id} = useParams();

    useEffect(() => {
        setTimeout(() => {
            setModelo({titulo: 'Avengers ' + id, fechaLanzamiento: '2020-05-11', trailer: 'abcde', poster: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'})
        }, 500)
    }, [id]);

    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        console.log('Editando película...');
        await new Promise(resolve => setTimeout(resolve, 500))
        console.log(data);
    }

    const generosSeleccionados: Genero[] = [
        {id: 2, nombre: 'Drama'}
    ];
    const generosNoSeleccionados: Genero[] = [
        {id: 1, nombre: 'Acción'},        
        {id: 3, nombre: 'Comedia'}
    ];

    const cinesSeleccionados: Cine[] = [
        {id: 1, nombre: 'Plaza Cumbres', latitud: 0, longitud: 0},
        {id: 4, nombre: 'Plaza Real', latitud: 0, longitud: 0}
    ];
    const cinesNoSeleccionados: Cine[] = [
        
        {id: 2, nombre: 'Plaza Fiesta San Agustín', latitud: 0, longitud: 0},
        {id: 3, nombre: 'Plaza Adana', latitud: 0, longitud: 0},
        
    ];

    const actoresSeleccionados: ActorPelicula[] = [{
        id: 1, nombre: 'Tom Holland', personaje: 'Spiderman', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/800px-Tom_Holland_by_Gage_Skidmore.jpg'
    }]
    return (        
        <>
            <h3>Editar Película</h3>
            {modelo ? <FormularioPelicula modelo={modelo} onSubmit={onSubmit}
                generosNoSeleccionados={generosNoSeleccionados}
                generosSeleccionados={generosSeleccionados} 
                cinesNoSeleccionados={cinesNoSeleccionados}
                cinesSeleccionados={cinesSeleccionados}
                actoresSeleccionados={actoresSeleccionados}
                /> : <Loading />}
                
        </>
    )
}