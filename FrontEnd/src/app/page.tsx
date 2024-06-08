"use client";
/****************************************************************
 ** This is the root for the App
 ***************************************************************/
import Image from "next/image";
import styles from "./page.module.css";
import { Fragment, useEffect } from "react";
import Home from "./home/page";

import store from '../store'
import { Provider } from 'react-redux'

export default function App() {

  return (
    <Provider store={store}>
      <Home></Home>
    </Provider>

  );
}
