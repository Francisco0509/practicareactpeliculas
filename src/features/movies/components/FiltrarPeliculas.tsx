import { useForm, type SubmitHandler } from 'react-hook-form';
import Boton from '../../../components/Boton';
import type Genero from "../../generos/modelos/genero.model"
import { useEffect, useState } from 'react';
import clienteAPI from '../../../api/clienteAxios';
import type Pelicula from '../models/Pelicula.model';
import MovieList from './MovieList';
import { useSearchParams } from 'react-router';
import Paginacion from '../../../components/Paginacion';

export default function FiltrarPeliculas(){
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagina, setPagina] = useState(searchParams.has('pagina') ? parseInt(searchParams.get('pagina')!, 10) : 1);
    const [recordsPorPagina, setRecordsPorPagina] = useState(searchParams.has('recordsPorPagina') ? parseInt(searchParams.get('recordsPorPagina')!, 10) : 2);
    const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);

    useEffect(() => {
        clienteAPI.get<Genero[]>('/generos/todos').then(res => setGeneros(res.data));
    }, []);

    useEffect(() => {
        if(generos.length === 0)
        {
            return;
        }

        if(searchParams.has('titulo')){
            valorInicial.titulo = searchParams.get('titulo')!;
            setValue('titulo', valorInicial.titulo);
        }

        if(searchParams.has('generoId')){
            valorInicial.generoId = parseInt(searchParams.get('generoId')!, 10);
            setValue('generoId', valorInicial.generoId);
        }

        if(searchParams.has('enCines')){
            valorInicial.enCines = Boolean(searchParams.get('enCines'));
            setValue('enCines', valorInicial.enCines);
        }

        if(searchParams.has('proximosEstrenos')){
            valorInicial.proximosEstrenos = Boolean(searchParams.get('proximosEstrenos'));
            setValue('proximosEstrenos', valorInicial.proximosEstrenos);
        }

        searchParams.set('pagina', String(pagina));
        searchParams.set('recordsPorPagina', String(recordsPorPagina))

        buscarPeliculas(valorInicial);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generos, pagina, recordsPorPagina])

    function modificarURL(valores: FormType){
        const params = new URLSearchParams();
        if(valores.titulo)
        {
            params.set('titulo', valores.titulo);
        }

        if(valores.generoId)
        {
            params.set('generoId', String(valores.generoId));
        }

        if(valores.enCines)
        {
            params.set('enCines', String(valores.enCines));
        }

        if(valores.proximosEstrenos)
        {
            params.set('proximosEstrenos', String(valores.proximosEstrenos));
        }

        setSearchParams(params);
    }

    async function buscarPeliculas(valores: FormType)
    {
        modificarURL(valores);
        try {
            const respuesta = await clienteAPI.get<Pelicula[]>('/peliculas/filtrar', {params: {...valores, pagina, recordsPorPagina}})
            const cantidadTotalRegistros = parseInt(respuesta.headers['cantidad-total-registros'], 10);
            setCantidadTotalRegistros(cantidadTotalRegistros);
            setPeliculas(respuesta.data);
        }
        catch (err) {
            console.error(err);
        }
    }

    const valorInicial: FormType = {
        titulo: '',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false
    };

    const {register, handleSubmit, reset, setValue, formState: {isSubmitting}} = useForm<FormType>({
        defaultValues: valorInicial
    });

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        await buscarPeliculas(data);
    }
    return (
        <>
            <h3>Filtro de películas</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="row row-cols-lg-auto g-3 align-center">
                <div className="col-12">
                    <input id="titulo" 
                            placeholder="Título de la película" 
                            autoComplete="off"
                            className="form-control" {...register('titulo')}/>
                </div>
                <div className="col-l2">
                    <select className="form-select" {...register('generoId')}>
                        <option value="0">--Seleccione un género--</option>
                        {generos.map(genero => <option value={genero.id} key={genero.id}>{genero.nombre}</option>)}
                    </select>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="proximosEstrenos" {...register('proximosEstrenos')}/>
                        <label htmlFor="proximosEstrenos">Próximos Estrenos</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="enCines" {...register('enCines')}/>
                        <label htmlFor="enCines">En Cines</label>
                    </div>
                </div>
                <div className="col-12">
                    <Boton disabled={isSubmitting} type="submit">{isSubmitting ? 'Filtrando...' : 'Filtrar'}</Boton>
                    <Boton onClick={() => {
                        reset();
                        buscarPeliculas(valorInicial);
                        }} className="btn btn-danger ms-2">Limpiar</Boton>
                </div>
            </form>
            <div className='mt-4'>
                <Paginacion 
                    paginaActual={pagina} recorsdPorPagina={recordsPorPagina}
                    cantidadTotalRegistros={cantidadTotalRegistros}
                    registrosPorPaginaOpciones={[2,10,50]}
                    onCambioPaginacion={(pagina, recordsPorPagina) =>{
                        setPagina(pagina);
                        setRecordsPorPagina(recordsPorPagina);
                    }}
                />
            </div>
            <div>
                <MovieList movies={peliculas}/>
            </div>
        </>
        
    )
}

interface FormType{
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
}