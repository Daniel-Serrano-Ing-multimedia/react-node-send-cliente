import React, { useContext, useEffect } from 'react';
// context
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContex';
// components
import Layout from '../components/Layout';
import Dropzone from '../components/dropzone';
import Alerta from '../components/alerta';
// roting
import Linnk from 'next/link';
import styles from '../styles/Home.module.css'

const Home =() => {
  // acceder al state de context
  const AuthContext = useContext( authContext );
  const { autenticado, usuarioAutenticado } = AuthContext;

  // acceder al state de context
  const AppContext = useContext( appContext );
  const { mensaje_archivo, url } = AppContext;
  // extaer ussuario autenticado del storage
  useEffect(() => {
    usuarioAutenticado();
  }, [])
  return (
    <Layout>
      <div className = 'md:w4/5 xl:w-3/5 ma-auto mb-32'>
        { url ?  
          <>
            <p className = 'text-center text-2xl mt-10'>
              <span className = 'font-bold text-red-700 text-3xl uppercase' >Tu Url es :</span>
               { `${process.env.frontendURL}/enlaces/${url}` }
            </p>
            <button
              type = 'submit'
              className = 'bg-gray-900 hover:bg-red-500 w-full p-2 text-white uppercase font-bold mt-10'
              onClick = { ()  => navigator.clipboard.writeText( `${process.env.frontendURL}/enlaces/${url}` ) }
            >Copiar Enlace</button>
          </>
          :
          <>
            { mensaje_archivo && <Alerta/> }
            <div className= 'lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
              <Dropzone/>

              <div className = 'md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                <h2 className = 'text-4xt font-sans font-bold text-gray-800 my-4'
                >Compartir Archivos de forma sencilla y privada</h2>
               <p className = 'text-lg leading-loose'>
                 <span className = 'text-red-500 font-bold'>ReactNodeSend </span>
                   te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado
                   despues de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte
                   de que tus cosas no permanescan en linea siempre
               </p>
               <Linnk href = '/crearcuenta'>
                 <a className = 'text-red-500 font-bold text-lg hover:text-red-700'>Crea una cuenta para mayores benficios</a>
               </Linnk>
              </div>
            </div>
          </>
        }
      </div>
    </Layout>
  )
}

export default Home;
