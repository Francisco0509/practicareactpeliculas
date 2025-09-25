import { useEffect, useState } from "react";
import MovieList from "../../movies/components/MovieList";
import type LandingPageDTO from "./models/LandingPageDTO";
import clienteAPI from "../../../api/clienteAxios";
import AlertaContext from "../../../utilidades/AlertaContext";

export default function LandingPage(){
      const [peliculas, setPeliculas] = useState<LandingPageDTO>({});
    
      useEffect(() => {
        cargarDatos();
      },[]);
    
      function cargarDatos(){
        clienteAPI.get<LandingPageDTO>(`/peliculas/landing`).then(res => setPeliculas(res.data));
      }
    
    return (
        <>
          <AlertaContext.Provider value={() => cargarDatos()}>
              <h3>En Cines</h3>
              <MovieList movies={peliculas.enCines}/>   
      
              <h3>Próximos Estrenos</h3>
              <MovieList movies={peliculas.proximosEstrenos}/>
          </AlertaContext.Provider>            
        </>
    )
}

