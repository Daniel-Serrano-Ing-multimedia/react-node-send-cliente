import { 
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERREOR,
  CERRAR_SESION
} from '../../types';

const authReducer = (state, action) => {
  switch(action.type) {
      case REGISTRO_EXITOSO:
      case REGISTRO_ERROR:
      case LOGIN_ERREOR:
        return {
            ...state,
            mensaje: action.payload
        }
      case LOGIN_EXITOSO:
       localStorage.setItem('reactSendToken', action.payload);
        return {
            ...state,
            token: action.payload,
            autenticado : true
        }
      break;  
      case  LIMPIAR_ALERTA:
        return{
          ...state,
          mensaje: null
        }     
      case USUARIO_AUTENTICADO:
        return{
          ...state,
          usuario : action.payload
        }
      case CERRAR_SESION:
        localStorage.removeItem( 'reactSendToken' );
        return{
          ...state,
          usuario: null,
          token: null,
          autenticado: null
        }
      default:
          return state;
  }
}

export default authReducer;