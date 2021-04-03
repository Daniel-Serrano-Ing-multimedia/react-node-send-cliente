import React, { useContext  } from 'react';
// components
import Layout from '../components/Layout';
import Mensaje from '../components/alerta';
// context
import authContext from '../context/auth/authContext';
//dependencys
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CrearCuenta = () => {
   // acceder al state de context
   const AuthContext = useContext( authContext );
   const { mensaje, registrarUsuario  } = AuthContext;
   // effect

  // Formulario y validacion con formik
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password:''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().
        required('El Nombre es Obligatorio'),
      email: Yup.string()
        .email('El Email no es validp').
        required('El Email es Obligatorio'),
      password: Yup.string()
        .required('El Password es Obligatorio').
        min( 6, 'El paswor debe ser de  al menos 6 caracteres' )
    }),
    onSubmit: valores =>{
      registrarUsuario( valores );
    }
  });
  return (
    <Layout>
      <div className = 'md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <h2 className = 'text-4xl font-sans font-bold text-gray-800 text-center my-4'>
          Crear Cuenta</h2>
          { mensaje && <Mensaje/> }
          <div className = 'flex justify-center mt-5'>
            <div className = 'w-full max-w-lg'>
              <form 
                className = 'bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                onSubmit = { formik.handleSubmit }
              >
                <div className = 'mb-4'>
                  <label 
                    className= 'block text-black text-sm font-bold mb-2' 
                    htmlFor = 'nombre'
                  >Nombre</label>
                  <input
                    type = 'text'
                    className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id= 'nombre'
                    placeholder = 'Nombre de Usuario'
                    value = { formik.values.nombre }
                    onChange = { formik.handleChange }
                    onBlur = { formik.handleBlur }
                  />
                </div>
                  { formik.touched.nombre && formik.errors.nombre?
                    <div className = 'my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className ='font-bld'>Error</p>
                      <p >{ formik.errors.nombre }</p>
                    </div>
                    : null
                  }

                <div className = 'mb-4'>
                  <label 
                    className= 'block text-black text-sm font-bold mb-2' 
                    htmlFor = 'email'
                    >Email</label>
                  <input
                    type = 'email'
                    className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id= 'email'
                    placeholder = 'Email de Usuario'
                    value = { formik.values.email }
                    onChange = { formik.handleChange }
                    onBlur = { formik.handleBlur }
                    />
                </div>
                  { formik.touched.email && formik.errors.email?
                    <div className = 'my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className ='font-bld'>Error</p>
                      <p >{ formik.errors.email }</p>
                    </div>
                    : null
                  }

                <div className = 'mb-4'>
                  <label 
                    className= 'block text-black text-sm font-bold mb-2' 
                    htmlFor = 'password'
                    >Password</label>
                  <input
                    type = 'password'
                    className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id= 'password'
                    placeholder = 'Password de Usuario'
                    value = { formik.values.password }
                    onChange = { formik.handleChange }
                    onBlur = { formik.handleBlur }
                    />
                </div>
                { formik.touched.password && formik.errors.password?
                  <div className = 'my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className ='font-bld'>Error</p>
                    <p >{ formik.errors.password }</p>
                  </div>
                  : null
                }

                <input
                  type = 'submit'
                  className = 'bg-gray-900 hover:bg-red-500 w-full p-2 text-white uppercase font-bold'
                  value = 'Crear Usuario'
                />
              </form>
            </div>
          </div>
      </div>
    </Layout>
  )
}
 
export default CrearCuenta;