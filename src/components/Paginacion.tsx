export default function Paginacion(props: PaginacionProps){
    const paginas = [];
    const cantidadMaximaPaginasMostrar = 5;
    const totalPaginas = Math.ceil(props.cantidadTotalRegistros / props.recorsdPorPagina);
    const radio = Math.floor(cantidadMaximaPaginasMostrar / 2);

    for (let i = 1; i <= totalPaginas; i++)
    {
        if(i >= props.paginaActual - radio && i <= props.paginaActual + radio)
        {
            paginas.push(i);
        }
    }

    return (
        <>
            <div className="text-center">
                <div className="row align-items-start justify-content-center">
                    <div className="col-auto">
                        <div className="d-flex align-item-center gap-2">
                           <label className="mb-0">Registros por página</label> 
                           <select 
                                className="form-select form-select-sm w-auto"
                                defaultValue={props.recorsdPorPagina}
                                onChange={e => props.onCambioPaginacion(1, parseInt(e.target.value, 10))}
                            >
                                {props.registrosPorPaginaOpciones.map(opcion => <option key={opcion}>{opcion}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <ul className="pagination justify-content-center mb-0">
                            <li className={`page-item ${props.paginaActual === 1 ? 'disabled' : ''}`}>
                                <button className="page-link"
                                    onClick={() => props.onCambioPaginacion(props.paginaActual - 1, props.recorsdPorPagina)}
                                >
                                    &laquo;
                                </button>
                            </li>
                            {paginas.map(pagina => <li key={pagina} className={`page-item ${props.paginaActual === pagina ? 'active' : ''}`}>
                                <button className="page-link"
                                    onClick={() => props.onCambioPaginacion(pagina, props.recorsdPorPagina)}
                                >
                                    {pagina}
                                </button>
                            </li>)}
                            <li className={`page-item ${props.paginaActual === totalPaginas ? 'disabled' : ''}`}>
                                <button className="page-link"
                                    onClick={() => props.onCambioPaginacion(props.paginaActual + 1, props.recorsdPorPagina)}
                                >
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

interface PaginacionProps{
    paginaActual: number;
    recorsdPorPagina: number;
    cantidadTotalRegistros: number;
    registrosPorPaginaOpciones: number[];
    onCambioPaginacion: (pagina: number, registrosPorPagina: number) => void;
}