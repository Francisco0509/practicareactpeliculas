import { useNavigate } from "react-router";
import Boton from "../../../components/Boton";

export default function IndiceCines(){
    const navigate = useNavigate();
    return (
        <>
            <h3>Cines</h3>
            <Boton onClick={() => navigate('/cines/crear')}>Crear cine</Boton>
        </>
    )
}