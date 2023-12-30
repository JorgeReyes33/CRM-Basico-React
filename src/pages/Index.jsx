import { useLoaderData } from "react-router-dom";
import { obtenerClientes } from "../data/Clientes";
import Cliente from "../components/Cliente";

/*
  - Los loaders son para cargar datos asincronamente en el componente, se ejecutan antes de mostrar un componente

  *En este caso, se esta creando un loader que obtiene los clientes de nuestro Rest API, desde nuestro JSON Server 
   (api fake pero funcional para pruebas).
  *Se manda llamar la funcion obtenerClientes() que se encuentra en el archivo Clientes.js, tambien hay que importarla
   antes de usarla.
*/
export function loader(){
    const clientes = obtenerClientes()

    return clientes
}


function Index() {

  /* 
    useLoaderData es un hook (de react-router-doom) que permite acceder a los datos cargados previamente en la funcion loader 
    antes de montar o mostrar el componente. Es importante importar el loader en el main de nuestra app y definirlo en la ruta especifica.
  */
  const clientes = useLoaderData(); 

  return (
    <>
      
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {/* Creamos la tabla y la llenamos con los datos obtenidos con el hook useLoaderData usando la variable 'clientes' */}
      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
              <tr>
                  <th className="p-2">Cliente</th>
                  <th className="p-2">Contacto</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>

          <tbody>

              {/* 
                Iteramos sobre los clientes para mostrar cada uno de ellos en la tabla 
                Hacemos uso del componente Cliente, y mediante props, le pasamos los datos del cliente y el id de ese cliente a mostrar.
                En caso de aun no contar con clientes registrados, se muestra un mensaje mediante un <p></p>
              */}

              {clientes.map( cliente => (
      
                <Cliente 
                    cliente={cliente}
                    key={cliente.id}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center mt-10'>No hay clientes aun</p>
      )}
    </>
  )
}

export default Index
