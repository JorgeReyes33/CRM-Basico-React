
//Obtenemos los clientes que estan en nuestro JSONServer, mediante una funcion asincrona
export async function obtenerClientes(){
    /*
        * Se hace una peticion http mediante fetch a los datos de la rest api haciendo uso de una variable global, 
          en donde se encuentra la url. Despues se obtienen en un formato json.
        * Mediante el return, regresamos los datos obtenidos
        * import.meta.env es para acceder a las variables de entorno definidas
        * await es para esperar a que la solicitud http se complete, y asi poder continuar a la siguiente linea de codigo
    */
    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()

    return resultado;
}

export async function obtenerCliente(id){
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const resultado = await respuesta.json()

    return resultado;
}

export async function agregarCliente(datos){
    
    try{
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    }catch (error){
        console.log(error)
    }

}

export async function  actualizarCliente(id, datos){

    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    }catch (error){
        console.log(error)
    }

}

export async function eliminarCliente(id){

    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        })
        await respuesta.json()
    }catch (error){
        console.log(error)
    }

}