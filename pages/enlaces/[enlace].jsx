import React, { useState, useContext } from 'react';
// components
import Layout from '../../components/Layout';
import Alerta from '../../components/alerta';
import appContext from '../../context/app/appContex';
//axios
import clienteAxios from '../../config/axios';

export async function getServerSidePaths () {
  const enlaces = await clienteAxios.get( '/api/enlaces' );
  return{
    paths : enlaces.data.enlaces.map( enlace => ({
      params :{ enlace : enlace.url }
    })),
    fallback: false
  }
}

export async function getServerSideProps({ params }){
  const { enlace } = params
  const resultado = await clienteAxios.get( `/api/enlaces/${ enlace }` );
  return {
    props: {
      enlace: resultado.data
    }
  }
}
const EnlaceDescarga = ({ enlace }) => {
	// Extraer del context
  const AppContext = useContext( appContext );
  const {  mostrarAlerta, mensaje_archivo } = AppContext;
	// State
  const [ tienePasword, setTienePasword ] = useState( enlace.password );
  const [ password, setPassword ] = useState( '' );
	// verificar Password
	const verificarPasword = async e => {
		e.preventDefault();
		const data ={
			password
		}
		try {
			const resultado = await clienteAxios.post( `/api/enlaces/${ enlace.enlace }`, data );
			setTienePasword ( resultado.data.password);
		} catch (error) {
			mostrarAlerta( error.response.data.msg);	
		}
	}
  return ( 
    <Layout>
			{tienePasword ?
					<>
						<p className = 'text-center'>Este enlace esta protegido por un password :</p>
						{ mensaje_archivo && <Alerta/> }
						<div className = 'flex justify-center mt-5'>
							<div className = 'w-full max-w-lg'>
								<form 
									className = 'bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
									onSubmit = { e => verificarPasword( e ) }
								>
									<div className = 'mb-4'>
										<label 
											className= 'block text-black text-sm font-bold mb-2' 
											htmlFor = 'nombre'
										>Password</label>
										<input
											type = 'text'
											className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											id= 'nombre'
											placeholder = 'Password del enlace'
											value ={ password }
											onChange = { e  => setPassword( e.target.value ) }
										/>
									</div>
									<input
										type = 'submit'
										className = 'bg-gray-900 hover:bg-red-500 w-full p-2 text-white uppercase font-bold'
										value = 'VAlidar Password'
									/>
								</form>
							</div>
						</div>
					</>
				:
				<>
					<h1 className = 'text-4xl text-center text-gray-700'>Descarga tu archivo :</h1>
					<div className = 'flex items-center justify-center mt-10'>
						<a 
							href = { `${ process.env.backendURL }/api/archivos/${ enlace.archivo }` } 
							className = 'bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'
						>Aquí</a>
					</div>
				</>
			}
    </Layout>
   );
}
 
export default EnlaceDescarga;