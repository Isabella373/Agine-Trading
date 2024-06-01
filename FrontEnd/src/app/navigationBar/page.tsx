/****************************************************************
 ** This is NavigationBar Component, subComponent of Home and every
 ** other page
 ***************************************************************/
import Image from "next/image";
import styles from "./NavigationBar.module.css";
import Link from 'next/link';


export default function NavigationBar() {

  return (
    <div className={styles.toolbar}>
      <div className={styles.logo}>
        <Link href="/" legacyBehavior>
          <a>Agine Trading</a>
        </Link>
      </div>
      <div className={styles.navItems}>
        <Link href="/login" legacyBehavior>
          <a className={styles.button}>Log In</a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a className={styles.button2}>Sign Up</a>
        </Link>
      </div>
    </div>
  );
}
