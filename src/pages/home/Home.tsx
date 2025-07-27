import Login from "../../components/login/Login";
import style from './style.module.css';

const Home = () => {
  return (
    <>
    <div className={`flex flex-col max-w mx-auto p-4 h-screen ${style.container_home}`}>
      <h1 className={`${style.h1}`}>Debes iniciar sesion para acceder a la plataforma</h1>
      <Login />
    </div>
    </>
  )
}

export default Home