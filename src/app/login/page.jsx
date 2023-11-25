import style from "../login/login.module.css";
import google from "../../helpers/assets/Google.png"
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className={style.pageContainer}>
      <div className={style.container}>
        <h3 className={style.iniciar}>  Iniciar sesión  </h3>

        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="correo@gmail.com" />
        <label htmlFor="contraseña">Contraseña:</label>
        <input type="password" placeholder="*******" />
        <button className={style.olvidaste}>¿Olvidaste tu constraseña?</button>
        <button className={style.ingresar}>Ingresar</button>
        <button className={style.terceros}>
            <Image
                src={google}
                width={25}
                height={25}
                className={style.google}
            />
            <span className={style.span}>Ingresa con tu cuenta de Google</span>
            </button>
        <button className={style.olvidaste}>¿No tienes cuenta?</button>
        <button className={style.crear}>Crear Usuario</button>
      </div>
    </div>
  );
};

export default LoginPage;
