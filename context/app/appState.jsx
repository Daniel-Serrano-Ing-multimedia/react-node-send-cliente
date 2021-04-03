import React, { useReducer } from 'react';
// context
import appContext from './appContex';
import appReducer from './appReducer';
// axios
import clienteAxios from '../../config/axios';
import{
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from '../../types';

const Appstate = ( {children }) => {
  // definir initial state
  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original : '',
    cargando: null,
    descargas: 1,
    password: '',
    autor : null,
    url: ''
  }
  // crear dispatch y state
  const [ state, dispatch ] = useReducer( appReducer, initialState );
   //***********************************
  ///*********             ************
  ///*********  funciones  ************
  ///*********             ************
  //***********************************
  //Muestra uuna alerta
  const mostrarAlerta = msg => {
    dispatch({
      type : MOSTRAR_ALERTA,
      payload: msg
    });
     // limpiar alerta despues de 3 s
     setTimeout(() => {
      dispatch({
        type :LIMPIAR_ALERTA
      })
    }, 3000 );
  }
  // Subir Archivos al setrvidor
  const subirArchivo = async ( formData, nombre_archivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    })
    try {
      const resultado = await clienteAxios.post( '/api/archivos', formData );
      dispatch({
        type : SUBIR_ARCHIVO_EXITO,
        payload : {
          nombre: resultado.data.archivo,
          nombre_original : nombre_archivo
        }
      });
    } catch (error) {
      console.log( 'error al subir archivo', error );
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.dasta.msg
      });
    }
  }
  /// Crear enlace luego de subir el archivo
  const crearEnlace = async () => {
    const data ={
      nombre : state.nombre,
      nombre_original : state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    }
    try {
      const resultado = await clienteAxios.post( '/api/enlaces', data );
      dispatch({
        type : CREAR_ENLACE_EXITO,
        payload: resultado.data.msg
      })
    } catch (error) {
      console.log( error )
       dispatch({
        type : CREAR_ENLACE_ERROR,
        payload: error.response.dasta.msg
      });
    }
  }
  // Limpiar State
  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE
    })
  }

  // Agregar Password
  const agregarDescargas = descargas => {
    dispatch({
      type : AGREGAR_DESCARGAS,
      payload: descargas
    })
  }

// Agregar Password
const agregarPassword = password => {
  dispatch({
    type : AGREGAR_PASSWORD,
    payload: password
  })
}

  return(
    <appContext.Provider
      value = {{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas,
      }}
    >
      { children }
    </appContext.Provider> 
  );
}

export default Appstate;