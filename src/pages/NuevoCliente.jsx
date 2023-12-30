/*
    NOTAS:
    GET: Obtener registros de una BD o de una API
    POST: Enviar datos al servidor, creacion de un registro nuevo
    PUT/PATCH: Actualizar un registro existente
    DELETE: Eliminar un registro
*/

import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
//Redirect es ideal cuando se trabaja con loaders y actions
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/Clientes'

/* 
    Aqui se define un action, y un action se ejecuta después de que se realiza una acción de navegación 
    y pueden realizar tareas específicas, como enviar datos a un servidor, antes de que se monte el nuevo 
    componente asociado a la ruta.
*/
export async function action({request}) {
    //Obtiene los datos enviados en el cuerpo de la solicitud (formulario en este caso) con formData
    //que seran enviados mediante metodo post
    const formData = await request.formData()

    //Convierte los objetos claves-valor del objeto formData en un objeto Javascript
    const datos = Object.fromEntries(formData)
    
    const email = formData.get('email')

    /*
        validacion:
        Si el objeto incluye algun campo vacio, se inserta el string con el error al arreglo.
    */
    const errores = []

    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    }
    
    /* 
        Validacion de email:
        Si el usuario ingresa un correo con un formato diferente al establecido en la expresion regular, se inserta 
        otro string de error en el arreglo de errores
    */
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errores.push('El email no es valido')
    }

    //Retornar datos si hay errores
    if(Object.keys(errores).length){
        return errores
    }

    /*
        Si la validacion pasa sin errores, se agrega el cliente correctamente y se usa await porque es una funcion asincrona,
        proveniente de Clientes.js
    */
    await agregarCliente(datos)

    //Para actions y loaders se recomienda usar redirect. En este caso, al agregar el cliente, nos lleva de nuevo a la pantalla principal
    return redirect('/')

    //Formas de acceder a un form-data
    /*
    console.log(formData.get('nombre'))
    console.log([...formData])
    const datos = Object.fromEntries(formData)
    console.log(datos)
    */
}

function NuevoCliente() {

    const errores = useActionData()
    const navigate = useNavigate()

    
  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
        <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

        <div className="flex justify-end">
            <button 
                className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                onClick={() => navigate('/') /* tambien se puede usar un -1 para volver a la pagina anterior*/}
            >
                Volver
            </button>
        </div>

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

            {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error>)}

            <Form
                method='post' 
                noValidate
            >
                <Formulario />

                <input
                    type='submit'
                    className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-lg'
                    value='Registrar cliente'
                />
            </Form>
        </div>
    </>
  )
}

export default NuevoCliente
