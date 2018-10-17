import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import Link from "next/link";
import Layout from "../components/Layout";
import axios from "axios";
import { setInStorage, getFromStorage } from "../utils/storage";

export default class Login extends Component {
  state = {
    signInEmail: "",
    signInPassword: "",
    signInError: "",
    token: "",
    isLoading: true
  };

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      axios.get("/api/account/verify", { params: { token } }).then(res => {
        if (res.data.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = e => {
    e.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    const user = { email: signInEmail, password: signInPassword };
    this.setState({ isLoading: true });

    axios.post("/api/account/signin", user).then(res => {
      console.log("result", res);
      if (res.data.success) {
        setInStorage("the_main_app", { token: res.data.token });
        this.setState({
          signInError: res.data.message,
          isLoading: false,
          signInPassword: "",
          signInEmail: "",
          token: res.data.token
        });
      } else {
        this.setState({
          signInError: res.data.message,
          isLoading: false
        });
      }
    });
  };

  logout = () => {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      axios.get("/api/account/logout?token=" + token).then(res => {
        if (res.data.success) {
          this.setState({
            token: "",
            isLoading: false
          });
        } else {
          this.setState({ isLoading: false });
        }
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      signInEmail,
      signInPassword,
      signInError,
      token,
      isLoading
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
            <style>{`
          bo dy > div,
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
                  Log-in to your account
                </Header>
                <Form size="large" onSubmit={this.handleLogin}>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail address"
                      name="signInEmail"
                      type="email"
                      value={signInEmail}
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="signInPassword"
                      value={signInPassword}
                      onChange={this.handleChange}
                      required
                    />

                    <Button color="teal" fluid size="large">
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>{signInError ? <p>{signInError}</p> : null}</Message>
                <Message>
                  New to us?{" "}
                  <Link href="/register">
                    <a>Sign Up</a>
                  </Link>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        </Layout>
      );
    }
    return (
      <Layout>
        <div>
          <p>Account</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      </Layout>
    );
  }
}
