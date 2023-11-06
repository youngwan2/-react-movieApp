import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Movies from '../pages/MoviesPage'
import NotPath from '../components/error/NotPath'
import Detail from '../pages/DetailPage'
import Home from '../pages/HomePage'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotPath />,
    errorElement: <h1>Sorry, Not Found Page!..</h1>
  },
  {
    path: '/movieapp',
    element: <App />,
    children: [
      {
        path: '/movieapp',
        element: <Home />
      },
      {
        path: 'movies',
        element: <Movies />
      },
      {
        path: 'detail/:id',
        element: <Detail />
      }
    ]
  }
])

export default router
