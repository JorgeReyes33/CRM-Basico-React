import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import ErrorPage from './components/ErrorPage'
import { action as eliminarClienteAction } from './components/Cliente'

//Definicion de las rutas o diferentes url con las que cuenta la pagina
const router = createBrowserRouter([
  {
    //Ruta de la pantalla principal, que es donde se muestran los clientes
    path: '/',
    element: <Layout />, 
    //Estas son rutas hijas de la primera, es decir, se van a mostrar, sin que desaparezca el asidebar.
    children: [
      {
        //Aqui se muestran los clientes, (Componente Index)
        index: true,
        element: <Index />,
        //Aqui se monta el loader que tenemos en Index.jsx, y le damos un alias para identificarlo facilmente, 
        //ya que podemos tener varios loaders.
        loader: clientesLoader,
        //Aqui se monta el componente de error, para mostrar un mensaje de error mas nativo, y no los mensajes por default de react
        errorElement: <ErrorPage />
      },
      {
        //En esta ruta se muestra el formulario para agregar un nuevo cliente
        path: '/clientes/nuevo',
        //Se carga el componente de nuevo cliente
        element: <NuevoCliente />,
        //Se carga el action que proviene desde el componente de NuevoCliente.jsx, al igual que los loaders, hay que darles un alias
        //para identificarlos mas facilmente ya que podemos tener varios 
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        //Aqui se muestra el formulario para cargar los datos del usuario a editar
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        //Se cargan los actions y loader correspondientes a esta ruta, igualmente, con sus respectivos alias.
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        //Esta ruta es para hacer la eliminacion de un cliente
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* Aqui ya no se devuelve el componente de app, se devuelve la ruta que definimos en el codigo anterior */}
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
