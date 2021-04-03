import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
// context
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContex';
//routon
import { useRouter } from 'next/router';

const Header = () => {
  // routing 
  const router = useRouter();
  // acceder al state de context
  const AuthContext = useContext( authContext );
  const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;
  //
  const AppContext = useContext( appContext );
  const { limpiarState } = AppContext;
  //
  useEffect(() => {
    usuarioAutenticado()
  }, []);
  const redireccionar =() =>{
    router.push( '/' );
    limpiarState();
  }

  return ( 
    <header className = 'py-8 flex flex-col md:flex-row items-center justify-between'>
        <img 
          className = 'w-64 mn-8 md:mb-0 cursor-pointer' src="/logo.svg" alt="logo"
          onClick = { () => redireccionar() }
        /> 
        <div >
          { usuario?
            <div className = 'flex items-center'>
              <p className = 'mr-2'>Hola { usuario.nombre }</p>
              <button
                className = 'bg-black px-5 py-3 rounded-lg text-white font-bolf uppercase'
                onClick = { () => cerrarSesion() }
              >Cerrar Sesion</button>
            </div>
          : 
            <>
              <Link href = '/login'>
                <a className = 'bg-red-400 px-5 py-3 rounded-lg text-white font-bolf uppercase mr-2'>
                  Iniciar Sesion</a>
              </Link>
            
              <Link href = '/crearcuenta'>
                <a className = 'bg-black px-5 py-3 rounded-lg text-white font-bolf uppercase'
                >Crear cuenta</a>
              </Link>
            </>
          }
        </div>
    </header>
   );
}
 
export default Header;