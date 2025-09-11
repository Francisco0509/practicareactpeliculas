import { useNavigate } from "react-router";
import Boton from "../../../components/Boton";
import GenericList from "../../../components/GenericList";
import Paginacion from "../../../components/Paginacion";
import Loading from "../../../components/Loading";
import clienteAPI from "../../../api/clienteAxios";
import { useGeneros } from "../hooks/useGeneros";
import confirmar from "../../../utilidades/confirmar";

export default function IndiceGeneros(){
    const navigate = useNavigate();
    const {cargando, pagina, recordsPorPagina, cantidadTotalRegistros, setPagina, setRecordsPorPagina, generos, cargarRegistros} = useGeneros();
    const Borrar = async (id: number) => {
        try {
            await clienteAPI.delete(`/generos/${id}`);

            if(pagina === 1)
            {
                cargarRegistros();
            }
            else 
            {
                setPagina(1);
            }
        }
        catch (err){
            console.error(err);
        }
    }
    return (
        <>
            <h3>Géneros</h3>
            <div>
                <Boton onClick={() => navigate('/generos/crear') }>Crear Género</Boton>
            </div>        

            {cargando ? <Loading /> : <div className="mt-4">
                <div className="mb-2">
                    <Paginacion paginaActual={pagina}
                                recorsdPorPagina={recordsPorPagina}
                                cantidadTotalRegistros={cantidadTotalRegistros}
                                registrosPorPaginaOpciones={[5,10,50]}
                                onCambioPaginacion={(pagina, recordsPorPagina) => {
                                    setPagina(pagina);
                                    setRecordsPorPagina(recordsPorPagina);
                                }}/>
                </div>
                <GenericList listado={generos}>
                    <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col" className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos?.map(genero => <tr key={genero.id}>
                                <td>{genero.nombre}</td>
                                <td className="text-end">
                                    <Boton 
                                        onClick={( )=> navigate(`/generos/editar/${genero.id}`)}
                                        className="btn btn-sm btn-outline-primary me-2">
                                            <i className="bi bi-pencil"></i>Editar
                                    </Boton>
                                    <Boton onClick={() => confirmar(() => Borrar(genero.id))} className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i>Borrar</Boton>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </GenericList>
            </div>   }

            
            
        </>
        
    )
}