import React from "react";
import NavHeader from "./Header";
import Head from "next/head";

const Layout = props => (
  <div>
    <Head>
      <title>Resell App</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
      />
    </Head>
    <NavHeader />
    {props.children}
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
