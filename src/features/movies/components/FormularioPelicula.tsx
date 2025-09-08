import { useForm, type SubmitHandler } from "react-hook-form";
import type PeliculaCreacion from "../models/PeliculaCreacion.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Boton from "../../../components/Boton";
import { NavLink } from "react-router";
import SeleccionarImagen from "../../../components/SelecionarImagen";
import SelectorMultiple from "../../../components/SelectorMultiple/SelectorMultiple";
import type Genero from "../../generos/modelos/genero.model";
import type SelectorMultipleModel from "../../../components/SelectorMultiple/SelectorMultiple.model";
import { useState } from "react";
import type Cine from "../../cines/models/Cines.models";
import TypeaheadActores from "./TypeaheadActores";
import type ActorPelicula from "../models/ActorPelicula";
export default function FormularioPelicula(props: FormulaioPeliculaProps){
    const {
        register, handleSubmit,setValue,
        formState: {errors, isValid, isSubmitting}
    } = useForm<PeliculaCreacion>({
        resolver: yupResolver(reglasDeValidacion),
        mode: 'onChange',
        defaultValues: props.modelo ?? {titulo: ''}
    })

    const imagenActual: string | undefined = props.modelo?.poster ? props.modelo.poster as string : undefined;

    const mapear = (arreglo: {id: number, nombre: string}[]): SelectorMultipleModel[] => {
        return arreglo.map(valor => {
            return {llave: valor.id, descripcion: valor.nombre}
        })
    }

    const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados));
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados));
    const [cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados));
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados));
    const [actoresSeleccionados, setActoresSeleccionados] = useState(props.actoresSeleccionados);

    const onSubmit: SubmitHandler<PeliculaCreacion> = (data) => {
        data.generosIds = generosSeleccionados.map(x => x.llave);
        data.cinesIds = cinesSeleccionados.map(x => x.llave);
        data.actores = actoresSeleccionados;
        props.onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input type="text" id="titulo" autoComplete="off" className="form-control"
                {...register('titulo')} />
                {errors.titulo && <p className="error">{errors.titulo.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="fechaLanzamiento">Fecha de lanzamiento</label>
                <input type="date" id="fechaLanzamiento" autoComplete="off" className="form-control"
                {...register('fechaLanzamiento')} />
                {errors.fechaLanzamiento && <p className="error">{errors.fechaLanzamiento.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="trailer">Trailer (Youtube)</label>
                <input type="text" id="trailer" autoComplete="off" className="form-control"
                {...register('trailer')} />
            </div>
            <SeleccionarImagen label="Poster" imagenURL={imagenActual} imagenSeleccionada={poster => {
                setValue('poster', poster);
            }} />

            <div className="form-group">                
                <label>Géneros: </label>
                <SelectorMultiple seleccionados={generosSeleccionados} noSeleccionados={generosNoSeleccionados} onChange={(seleccionados, noSeleccionados) => {
                    setGenerosSeleccionados(seleccionados);
                    setGenerosNoSeleccionados(noSeleccionados);
                }} />
            </div>
            <div className="form-group">                
                <label>Cines: </label>
                <SelectorMultiple seleccionados={cinesSeleccionados} noSeleccionados={cinesNoSeleccionados} onChange={(seleccionados, noSeleccionados) => {
                    setCinesSeleccionados(seleccionados);
                    setCinesNoSeleccionados(noSeleccionados);
                }} />
            </div>

            <div className="form-group">
                <TypeaheadActores 
                    actores={actoresSeleccionados}
                    onAdd={actores => {
                        setActoresSeleccionados(actores);
                }} 
                onRemove={actor => {
                    const actores = actoresSeleccionados.filter(x => x !== actor);
                    setActoresSeleccionados(actores);
                }}
                onCambioPersonaje={(id, personaje) => {
                    const indice = actoresSeleccionados.findIndex(x => x.id === id);
                    const actores = [...actoresSeleccionados];
                    actores[indice].personaje = personaje;
                    setActoresSeleccionados(actores);
                }}

                />
            </div>
            <div className="mt-2">
                <Boton type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</Boton>
                <NavLink to="/" className="btn btn-secondary ms-2">Cancelar</NavLink>
            </div>
        </form>
    )
}

interface FormulaioPeliculaProps{
    modelo?: PeliculaCreacion;
    onSubmit: SubmitHandler<PeliculaCreacion>;
    generosSeleccionados: Genero[];
    generosNoSeleccionados: Genero[];
    cinesSeleccionados: Cine[];
    cinesNoSeleccionados: Cine[];
    actoresSeleccionados: ActorPelicula[];
}

const reglasDeValidacion = yup.object({
    titulo: yup.string().required('El título es obligatorio.'),
    fechaLanzamiento: yup.string().required('La fecha de lanzamiento es obligatoria.')
})