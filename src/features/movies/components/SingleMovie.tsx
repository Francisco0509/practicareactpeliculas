import { NavLink, useNavigate } from "react-router";
import type Pelicula from "../models/Pelicula.model";
import styles from './SingleMovie.module.css';
import Boton from "../../../components/Boton";
import confirmar from "../../../utilidades/confirmar";
import clienteAPI from "../../../api/clienteAxios";
import { useContext } from "react";
import AlertaContext from "../../../utilidades/AlertaContext";
import Autorizado from "../../seguridad/componentes/Autorizado";

export default function SingleMovie(props: SingleMovieProps){
    const construirLink = () => `/peliculas/${props.movie.id}`;
    const navigate = useNavigate();
    const alerta = useContext(AlertaContext);
    const borrar = async (id: number) => {
        try{
            await clienteAPI.delete(`/peliculas/${id}`);
            alerta();
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={styles.div}>
            <NavLink to={construirLink()}>
                <img src={props.movie.poster} alt="poster"/>
            </NavLink>
            <p>
                <NavLink to={construirLink()}>{props.movie.titulo}</NavLink>
            </p>
            <Autorizado 
                claims={['esadmin']}
                autorizado={<>
                    <div>
                        <Boton onClick={() => navigate(`/peliculas/editar/${props.movie.id}`)}>Editar</Boton>
                        <Boton className="btn btn-danger ms-4"
                            onClick={() => confirmar(() => borrar(props.movie.id))}
                        >Borrar</Boton>
                    </div>  
                </>}
            />                        
        </div>
    )
}

interface SingleMovieProps{
    movie: Pelicula
}