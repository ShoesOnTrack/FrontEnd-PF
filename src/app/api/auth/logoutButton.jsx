import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/actions';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const handleLogout = () => {
    
    router.push('/api/auth/logout');
    dispatch(clearUser());
  };

  return (
    <button className="rounde mr-3 hidden border border-white py-1.5 px-6 text-center text-sm font-medium text-slate-300 focus:outline-none   md:inline-block rounded-lg" onClick={handleLogout}>Logout</button>
  );
};

export default Logout;