/****************************************************************
 ** This is the root component for the Home page
 ***************************************************************/
import Image from "next/image";
import NavigationBar from "../navigationBar/page";
import { Fragment } from "react";
import styles from "./Home.module.css";


export default function Home() {

  return (
    <div className={styles.main}>
      <NavigationBar/>
      <div>Home Page</div>
    </div>

  );
}
