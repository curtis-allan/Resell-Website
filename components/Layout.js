import React from "react";
import NavHeader from "./NavHeader";
import Head from "next/head";

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Resell App</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
      />
    </Head>
    <NavHeader />
    {children}
    <style jsx>
      {`
        div {
          background-color: whitesmoke;
        }
      `}
    </style>
  </div>
);

export default Layout;
