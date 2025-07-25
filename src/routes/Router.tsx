import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../pages/home/Home'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'))
const ComercianteForm = lazy(() => import('../pages/comerciantes/ComercianteForm'));
const NotFound = lazy(() => import('../pages/notFound/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Cargando...</p>}>
              <Home />
          </Suspense>
        )
      },
      {
        path: '/dashboard/comerciantes/nuevo',
        element: (
          <Suspense fallback={<p>Cargando Venta...</p>}>
            <ComercianteForm />
          </Suspense>
        )
      },
      {
        path: 'dashboard/comerciantes/reporte',
        element: (
          <Suspense fallback={<p>Cargando Dasboard...</p>}>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<p>Cargando...</p>}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;
