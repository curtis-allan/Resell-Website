import React from "react";
import { Segment } from "semantic-ui-react";
import NavHeader from "./NavHeader";
import Head from "next/head";

const Layout = ({ children }) => (
  <Segment vertical style={{ minHeight: 700, padding: "1em 0em" }} vertical>
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
      />
    </Head>
    <NavHeader />

    {children}
  </Segment>
);
export default Layout;
