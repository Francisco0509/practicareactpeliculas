import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type PeliculaCreacion from "../models/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type { SubmitHandler } from "react-hook-form";
import Loading from "../../../components/Loading";

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

    return (        
        <>
            <h3>Editar Película</h3>
            {modelo ? <FormularioPelicula modelo={modelo} onSubmit={onSubmit} /> : <Loading />}
        </>
    )
}