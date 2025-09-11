import { useNavigate } from "react-router"
import Boton from "../../../components/Boton";
import { useActores } from "../hooks/useActores";
import Loading from "../../../components/Loading";
import Paginacion from "../../../components/Paginacion";
import GenericList from "../../../components/GenericList";
import clienteAPI from "../../../api/clienteAxios";
import confirmar from "../../../utilidades/confirmar";

export default function IndiceActores(){
    const navigate = useNavigate();

    const {cargando, pagina, recordsPorPagina, cantidadTotalRegistros, setPagina, setRecordsPorPagina, actores, cargarRegistros} = useActores();

    const Borrar = async (id: number) => {
        try {
            await clienteAPI.delete(`/actores/${id}`);

            if(pagina === 1)
            {
                cargarRegistros();
            }
            else 
            {
                setPagina(1);
            }
        }    
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h3>Actores</h3>
            <div>
                <Boton onClick={() => navigate('/actores/crear')}>Crear Actor</Boton>
            </div>
            
            {cargando ? <Loading /> : 
                <div className="mt-4">
                    <div className="mb-2">
                        <Paginacion 
                            paginaActual={pagina}
                            cantidadTotalRegistros={cantidadTotalRegistros}
                            recorsdPorPagina={recordsPorPagina}
                            registrosPorPaginaOpciones={[5,10,50]}
                            onCambioPaginacion={(pagina, recordsPorPagina) => {
                                setPagina(pagina);
                                setRecordsPorPagina(recordsPorPagina);
                            }}
                        />
                    </div>
                    <GenericList listado={actores}>
                        <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col" className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {actores?.map(actores => <tr key={actores.id}>
                                    <td>{actores.nombre}</td>
                                    <td className="text-end">
                                        <Boton 
                                            onClick={( )=> navigate(`/actores/editar/${actores.id}`)}
                                            className="btn btn-sm btn-outline-primary me-2">
                                                <i className="bi bi-pencil"></i>Editar
                                        </Boton>
                                        <Boton 
                                            onClick={() => confirmar(() => Borrar(actores.id))} 
                                            className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i>Borrar
                                        </Boton>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </GenericList>
                </div>}
        </>
        
    )
}