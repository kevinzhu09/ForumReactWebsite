import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { host } from '../../globalConstants';
import { withRouter } from 'react-router-dom';


  class SignInForm extends Component {
      constructor(props) {
          super(props);

          this.state = {
            validated: false,
            isValid: null,
            email: "",
            password: "",
            loginFail: null,
            disabled: false
            };
          
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleEmailChange = this.handleEmailChange.bind(this);
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }


      handleEmailChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
          email: value
        });
      }

      handlePasswordChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
          password: value
        });
      }

      handleSubmit(event) {
        this.setState({disabled:true});
        
        const { email, password } = this.state;

        const form = event.currentTarget;
        const validity = form.checkValidity();
        this.setState({isValid:validity});
        event.preventDefault();
        event.stopPropagation();
        if (validity) {
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Accept", "application/json");
          
        
          const raw = JSON.stringify({"email":email,"password":password});
          
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch(host + "/login", requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;


              if (resultCode === 0) {
                this.props.onSubmit();
                const resultToken = result.access_token;
                window.sessionStorage.token = resultToken;
                this.props.history.push('/main-feed');
                return;
              } else {
                  this.setState({loginFail:true, disabled:false})
              }
            }
            )
            .catch(error => {
                  this.setState({disabled:false});
              });
            
        } else {
          this.setState({disabled:false});
        }
        this.setState({validated:true});
      }

render() {
    return (
        <>
      <Form onChange={this.handleFormChange} noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
      <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Email address:</Form.Label>
            <Form.Control type="email" 
            value={this.state.email}
            onChange={this.handleEmailChange}
            placeholder="Email" required />

            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>

          </Form.Group>
          </Form.Row>
        <Form.Row>
            <Form.Group as={Col}>              
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                value={this.state.password}
                onChange={this.handlePasswordChange}
                type="password" placeholder="Password" required/>
            </Form.Group>
        </Form.Row>
        <a href="/password/reset" style={{display: "block"}}>Forgot your password? Reset your password</a>
          <Button className="my-3" disabled={this.state.disabled} variant="primary" type="submit">Sign in</Button>
          <Form.Text className={(this.state.loginFail && this.state.validated) ? "visible text-danger" : "invisible"}>The email or password is incorrect, please fix it and resubmit.</Form.Text>
      </Form>
        </>
    )
}
}
export default withRouter(SignInForm);