import { BrowserRouter } from 'react-router';
import './App.css'
import Menu from './components/Menu';
import AppRoutes from './AppRoutes';
import AutenticacionContext from './features/seguridad/componentes/utilidades/AutenticacionContext';
import { useEffect, useState } from 'react';
import type Claim from './features/seguridad/componentes/modelos/Claim';
import { obtenerClaims } from './utilidades/ManejadorJwt';

function App() {
  const [claims, setClaims] = useState<Claim[]>([]);
  useEffect(() => {
    setClaims(obtenerClaims());
  }, []);

  function actualizar(claims: Claim[]){
    setClaims(claims);
  }

  
  return (
    <>
      <AutenticacionContext.Provider value={{claims, actualizar}}>
        <BrowserRouter>      
          <Menu />
          <div className="container mb-4">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </AutenticacionContext.Provider>
    </> 
  );
}

export default App


