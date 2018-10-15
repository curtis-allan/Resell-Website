import Layout from "../components/Layout";
import React, { Component } from "react";
import { Segment, Container } from "semantic-ui-react";

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <Segment vertical>
          <Container>
            <h1>HelloNIGNOG</h1>
          </Container>
        </Segment>
      </Layout>
    );
  }
}
