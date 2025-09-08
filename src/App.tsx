import { BrowserRouter } from 'react-router';
import './App.css'
import Menu from './components/Menu';
import AppRoutes from './AppRoutes';

function App() {


  
  return (
    <>
    <BrowserRouter>      
      <Menu />
      <div className="container mb-4">
        <AppRoutes />
      </div>
    </BrowserRouter>
    </> 
  );
}

export default App


