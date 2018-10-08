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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        password: ""
      }
    };
  }

  componentDidMount() {
    if (auth.loggedIn()) {
      this.props.url.replaceTo("/admin");
    }
  }

  handleChange = e => {
    const user = { ...this.state.user };
    const { name, value } = e.target;
    user[name] = value;
    this.setState({ user });
  };

  handleSubmit = e => {
    e.preventDefault();
    auth
      .login(this.state.user.email, this.state.user.password)
      .then(res => {
        console.log(res);
        this.props.url.replaceTo("/admin");
      })
      .catch(e => console.log(e));
  };

  render() {
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
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
