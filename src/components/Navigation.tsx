import { useAuth } from 'hooks/useAuth';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const { logout, isAuthenticated } = useAuth();
  return (
    <nav className='bg-gray p-10 flex gap-5'>
      {isAuthenticated ? (
        <>
          <NavLink to='/dashboard'>Dashboard</NavLink>
          <NavLink to='/user'>User</NavLink>
          <button onClick={() => logout()}>Log Out</button>
        </>
      ) : (
        <>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </>
      )}
    </nav>
  );
}
