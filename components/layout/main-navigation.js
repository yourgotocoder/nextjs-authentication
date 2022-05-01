import Link from 'next/link';
<<<<<<< HEAD

import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation() {
=======
import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

>>>>>>> 12-auth
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
<<<<<<< HEAD
          <Logo />
=======
          <div className={classes.logo}>Next Auth</div>
>>>>>>> 12-auth
        </a>
      </Link>
      <nav>
        <ul>
<<<<<<< HEAD
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
=======
          {!session && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
>>>>>>> 12-auth
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
