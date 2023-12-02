import { useRouter } from 'next/navigation';
import style from "./style.module.css"

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    
    router.push('/api/auth/logout');
  };

  return (
    <button className={style.buttonout} onClick={handleLogout}>Logout</button>
  );
};

export default Logout;