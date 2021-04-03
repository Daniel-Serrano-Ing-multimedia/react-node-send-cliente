import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
// axios
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

// types 
import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERREOR,
  CERRAR_SESION
} from '../../types';

const AuthState = ({ children }) => {
  // Definir State inicial
  const initialState = {
    token : typeof window !== 'undefined'? localStorage .getItem( 'reactSendToken' ) : null,
    autenticado : false,
    usuario: null,
    mensaje: null,
    cargando : null
  }
  // definir el reducer
  const [ state, dispatch ] = useReducer( authReducer, initialState );
  //***********************************
  ///*********             ************
  ///*********  funciones  ************
  ///*********             ************
  //***********************************
  //Registrar usuario
  const registrarUsuario = async datos =>{
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg
      }); 
    } catch (error) {
      console.log( 'error - state : ', error.response ?  error.response.data.msg : error );
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      })
    }
    // limpiar alerta despues de 3 s
    setTimeout(() => {
      dispatch({
        type :LIMPIAR_ALERTA
      })
    }, 3000 );
  }
  // Autenticar usuarios
  const iniciarSesion = async datos =>{
    try {
      const respuesta = await clienteAxios.post( '/api/auth', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token
      });
      console.log('res :', respuesta.data )
    } catch (error) {
      dispatch({
        type: LOGIN_ERREOR,
        payload: error.response.data.msg
      });
    }
    // limpiar alerta despues de 3 s
    setTimeout(() => {
      dispatch({
        type :LIMPIAR_ALERTA
      })
    }, 3000 );
  }
  // Retorna usuario autenticado a partir de jwt
  const usuarioAutenticado = async () =>{
    const token = localStorage.getItem( 'reactSendToken' );
    
    tokenAuth( token );
    try {
      const respuesta = await clienteAxios.get( '/api/auth' ) ;
      if( respuesta.data.usuario ){
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload : respuesta.data.usuario
        });
      }
    } catch (error) {
      dispatch({
        type : LOGIN_ERREOR,
        payload: error.response.data.msg
      })
    }
  }
  //cerrar Sesion
  const cerrarSesion =  ( ) =>{
    dispatch({
      type : CERRAR_SESION
    });
  }  
  return ( 
    <authContext.Provider
      value = {{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando : state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      { children }
    </authContext.Provider>
  );
}
 
export default AuthState;
