import { Outlet } from 'react-router-dom';
import NavDashboard from '../components/NavDashboard/NavDashboard';


const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavDashboard />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default MainLayout