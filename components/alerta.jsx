import React, { useContext } from 'react';
//context
import authContext from '../context/auth/authContext';
import appContex from '../context/app/appContex';
const Mensaje = () => {
   // context
   const AuthContext = useContext( authContext );
   const { mensaje  } = AuthContext;
   // extraer mensaje de error para archivos
   const AppContex = useContext( appContex );
   const { mensaje_archivo  } = AppContex;
  return ( 
    <div className = 'bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
      { mensaje || mensaje_archivo }
    </div>
   );
}
 
export default Mensaje;