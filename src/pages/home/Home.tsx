import Login from "../../components/login/Login";
import style from './style.module.css';

const Home = () => {
  return (
    <>
    <div className={`flex flex-col max-w-screen-xl mx-auto p-4 h-screen ${style.container_home}`}>
      <h1>Bienvenido</h1>
      <Login />
    </div>
    </>
  )
}

export default Home