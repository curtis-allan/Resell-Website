import React from "react";
import NavHeader from "./NavHeader";
import Head from "next/head";
import { Container } from "semantic-ui-react";

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
    <Container text>{children}</Container>
  </div>
);

export default Layout;
