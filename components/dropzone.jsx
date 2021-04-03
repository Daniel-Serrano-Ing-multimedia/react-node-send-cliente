import React, { useState, useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../config/axios';
// cntext
import appContext from '../context/app/appContex';

const Dropzone = () => {
  // Extraer del context
  const AppContext = useContext( appContext );
  const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext;
  // para render una sola vezz  useCallback
  const onDropRejected = () =>{
    mostrarAlerta('El archivo es demasiado grande, obten una  cuenta gratis para subir archivos mas pesados');
    
  }
  // Accepted files
  const onDropAccepted = useCallback( async ( acceptedFiles ) => {
    // crear form-data
    const formData = new FormData();
    formData.append( 'archivo', acceptedFiles[0] );
    subirArchivo( formData, acceptedFiles[0].path );
  }, []);

  // extraer contenido de dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });
  // archivos
  const archivos = acceptedFiles.map( ( archivo, index ) => (
    <li key = { index } className =  'bg-white flex-1 p-3 mb-4 shadoe-lg rounded'> 
      <p className = 'font-bold text-xl' > { archivo.path } </p>
      <p className = 'font-sm text-gray-500' > { ( archivo.size / Math.pow( 1024, 2 ) ).toFixed(2)} MB</p>
    </li>
  ) );
  //
  
  return ( 
    <div className = 'md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4'>
        { acceptedFiles.length >0 ? 
          <div className = 'mt-10 w-full'>
            <p className = 'text-2xl font-bold text-cener mb-4'>Archivos</p>
              <ul>
              { archivos }
              </ul>
              { cargando ? <p className = 'my-10 text-center text-gray-600'>Subiendo Archivo ...</p> 
                :
                <button
                className = 'bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                  type = 'button'
                  onClick =  { () => crearEnlace() }
                >Crear Enlace</button>
              }
          </div>
          :
          <div { ...getRootProps({ className: 'dropzone w-full py-16'}) }>
            <input className = 'h-100 min-w-full' { ...getInputProps } />
            { isDragActive ? 
                <p className = 'text-2xl text-center -text-gray-600'> Suelta el archivo aquí</p>
              :
                <div className = 'text-center'>
                  <p className = 'text-2xl text-center -text-gray-600'
                    >Selecciona un archivo y arrastralo aquí</p>
                  <button
                    className = 'bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                    type = 'button'
                  >Seleccionar archivos para subir</button>
                </div>
            }

          </div> 
        }
    </div>
   );
}
 
export default Dropzone;