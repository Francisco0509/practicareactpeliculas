import { Routes, Route } from "react-router";
import IndiceGeneros from "./features/generos/components/IndiceGeneros";
import LandingPage from "./features/Home/components/LandingPage";
import CrearGenero from "./features/generos/components/CrearGenero";
import EditarGenero from "./features/generos/components/EditarGenero";
import CrearActor from "./features/actores/components/CrearActor";
import EditarActor from "./features/actores/components/EditarActor";
import IndiceActores from "./features/actores/components/IndiceActores";
import IndiceCines from "./features/cines/components/IndiceCines";
import EditarCine from "./features/cines/components/EditarCine";
import CrearCine from "./features/cines/components/CrearCine";
import CrearPelicula from "./features/movies/components/CrearPelicula";
import EditarPelicula from "./features/movies/components/EditarPelicula";
import RutaNoEncontrada from "./components/RutaNoEncontrada";

export default function AppRoutes(){
    return (
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/generos" element={<IndiceGeneros />} />
          <Route path="/generos/crear" element={<CrearGenero />} />
          <Route path="/generos/editar/:id" element={<EditarGenero />} />

          <Route path="/actores" element={<IndiceActores />} />
          <Route path="/actores/crear" element={<CrearActor />} />
          <Route path="/actores/editar/:id" element={<EditarActor />} />

          <Route path="/cines" element={<IndiceCines />} />
          <Route path="/cines/crear" element={<CrearCine />} />
          <Route path="/cines/editar/:id" element={<EditarCine />} />

          <Route path="/peliculas/crear" element={<CrearPelicula />} />
          <Route path="/peliculas/editar/:id" element={<EditarPelicula />} />

          <Route path="*" element={<RutaNoEncontrada />} />
        </Routes>
    )
}