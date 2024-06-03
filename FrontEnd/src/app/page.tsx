/****************************************************************
 ** This is the root for the App
 ***************************************************************/
import Image from "next/image";
import styles from "./page.module.css";
import { Fragment, useEffect } from "react";
import Home from "./home/page";

export default function App() {

  return (
    <Home></Home>
  );
}
