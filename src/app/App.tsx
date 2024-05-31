"use client";

import React from "react";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Providers>
        <Header></Header>
        <main>{children}</main>
        <Cart></Cart>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <Footer></Footer>
      </Providers>
    </Provider>
  );
}

export default App;
