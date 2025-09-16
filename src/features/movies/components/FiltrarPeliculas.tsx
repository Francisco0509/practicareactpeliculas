import { useForm, type SubmitHandler } from 'react-hook-form';
import Boton from '../../../components/Boton';
import MovieList from './MovieList';
import Paginacion from '../../../components/Paginacion';
import type PeliculasFiltrarDTO from '../models/PeliculasFiltrar.model';
import useFiltroPeliculas from '../hooks/useFiltroPeliculas';

export default function FiltrarPeliculas(){
   

    const valorInicial: PeliculasFiltrarDTO = {
        titulo: '',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false
    };

    const {register, handleSubmit, reset, setValue, formState: {isSubmitting}} = useForm<PeliculasFiltrarDTO>({
        defaultValues: valorInicial
    });

    const onSubmit: SubmitHandler<PeliculasFiltrarDTO> = async (data) => {
        await buscarPeliculas(data);
    }

    const {buscarPeliculas, generos, searchParams, pagina, recordsPorPagina, cantidadTotalRegistros,
        setPagina, setRecordsPorPagina, peliculas
    } = useFiltroPeliculas(valorInicial, setValue);
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

