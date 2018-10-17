import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import Head from "next/head";
import axios from "axios";
import Layout from "../components/Layout";

export default class register extends Component {
  state = {
    isLoading: true,
    token: "",
    signUpError: "",
    signUpEmail: "",
    signUpPassword: ""
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { signUpEmail, signUpPassword } = this.state;

    this.setState({ isLoading: true });

    const user = {
      email: signUpEmail,
      password: signUpPassword
    };

    axios.post("/api/account/signup", user).then(res => {
      console.log("result", res);
      if (res.data.success) {
        this.setState({
          signUpError: res.data.message,
          isLoading: false,
          signUpEmail: "",
          signUpPassword: ""
        });
      } else {
        this.setState({
          signUpError: res.data.message,
          isLoading: false
        });
      }
    });
  };

  render() {
    const {
      isLoading,
      token,
      signUpError,
      signUpEmail,
      signUpPassword
    } = this.state;

    if (isLoading) {
      return (
        <Layout>
          <div>
            <p>Loading...</p>
          </div>
        </Layout>
      );
    }

    if (!token) {
      return (
        <Layout>
          <div className="login-form">
            <Head>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
              />
            </Head>
            <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  Register a new account
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail address"
                      name="signUpEmail"
                      type="email"
                      value={signUpEmail}
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="signUpPassword"
                      value={signUpPassword}
                      onChange={this.handleChange}
                      required
                    />

                    <Button color="teal" fluid size="large">
                      Sign Up
                    </Button>
                  </Segment>
                </Form>
                <Message>{signUpError ? <p>{signUpError}</p> : null}</Message>
              </Grid.Column>
            </Grid>
          </div>
        </Layout>
      );
    }
    return (
      <Layout>
        <div>
          <p>Signed in</p>
        </div>
      </Layout>
    );
  }
}
