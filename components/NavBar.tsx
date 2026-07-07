import Link from 'next/link';
import styles from './NavBar.module.css';

export const NavBar = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li>
        <Link href="/">
          Home
        </Link>
      </li>
      <li>
        <Link href="/mvdm">
          Match van de maand
        </Link>
      </li>
      <li>
        <a href="https://pgksmash.nl/agenda" target="_blank" rel="noreferrer">
          Toernooien
        </a>
      </li>
      <li>
        <Link href="/articles">
          Tips & Tricks
        </Link>
      </li>
    </ul>
  </nav>
);
