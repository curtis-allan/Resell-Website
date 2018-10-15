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
import Link from "next/link";
import axios from "axios";
import { setInStorage, getFromStorage } from "../../utils/storage";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      signInError: "",
      token: "",
      isLoading: true
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;

      axios.get("/api/account/verify?token=" + token).then(res => {
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
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
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
                <Link href="/auth/register">
                  <a>Sign Up</a>
                </Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
