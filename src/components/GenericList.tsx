import Loading from "./Loading";

export default function GenericList<T>(props: GenericListProps<T>)
{
    if(!props.listado){
        return props.cargandoUI ? props.cargandoUI : <Loading />;
    }
    else if(props.listado.length === 0){
        return props.listadoVacioUI ? props.listadoVacioUI : "No hay elementos para mostrar.";
    }
    else {
        return props.children;
    }
}

interface GenericListProps<T>{
    listado?: T[] | undefined;
    children: React.ReactNode;
    listadoVacioUI?: React.ReactNode;
    cargandoUI?: React.ReactNode;
}