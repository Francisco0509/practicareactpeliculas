import type SelectorMultipleModel from './SelectorMultiple.model';
export default function SelectorMultiple(props: SelectorMultipleProps){
    const seleccionar = (item: SelectorMultipleModel) => {
        const seleccionados = [...props.seleccionados, item];
        const noSeleccionados = props.noSeleccionados.filter(valor => valor !== item);

        props.onChange(seleccionados, noSeleccionados);
    }

    const deseleccionar = (item: SelectorMultipleModel) => {
        const seleccionados = props.seleccionados.filter(valor => valor !== item);
        const noSeleccionados = [...props.noSeleccionados, item];
        props.onChange(seleccionados, noSeleccionados);
    }

    const seleccionarTodo = () => {
        const seleccionados = [...props.seleccionados, ...props.noSeleccionados];
        const noSeleccionados: SelectorMultipleModel[] = [];
        props.onChange(seleccionados, noSeleccionados);

    }

    const deseleccionarTodo = () => {
        const seleccionados = [...props.seleccionados, ...props.noSeleccionados];
        const noSeleccionados: SelectorMultipleModel[] = [];
        props.onChange(seleccionados, noSeleccionados);


    return (
        <div>
            <ul>
                {props.noSeleccionados.map(item => <li key={item.llave}
                onClick={() => seleccionar(item)}>
                    {item.descripcion}
                </li>)}
            </ul>
            <ul>
                {props.seleccionados.map(item => <li key={item.llave}
                onClick={() => deseleccionar(item)}>
                    {item.descripcion}
                </li>)}
            </ul>
            <button type="button" onClick={seleccionarTodo}>{'>>'}</button>
            <button type="button" onClick={deseleccionarTodo}>{'<<'}</button>
        </div>
    )
}

interface SelectorMultipleProps{
    seleccionados: SelectorMultipleModel[];
    noSeleccionados: SelectorMultipleModel[];
    onChange(seleccionados: SelectorMultipleModel[], noSeleccionados: SelectorMultipleModel[]): void;
}