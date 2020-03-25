import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';



  class RegisterForm extends React.Component {
      constructor(props) {
          super(props);

          this.state = {
          validated: false,
          isValid: null
          };

          this.handleSubmit = this.handleSubmit.bind(this);
      }

      getInitialState(){
      return {
        validated: false,
        isValid: null
      };
      }



      handleSubmit(event) { 
            const form = event.currentTarget;
            let validity = form.checkValidity()
            this.setState({isValid:validity})
            event.preventDefault();
            event.stopPropagation();
            if (validity) {
              // Make the post request:
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Accept", "application/json");
              
              var raw = JSON.stringify({"first_name":"Kevin","last_name":"Zhu","email":"kevinzAS@gmail.com","username":"kevinzAS","password":"Password"});
              
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              fetch("http://localhost:5000/register", requestOptions)
                .then(response => response.text())
                .then(result => {
                  alert('result: ' + result);
                  this.props.onSubmit();
                })
                .catch(error => alert('error: ' + error));
            }
            this.setState({validated:true});
      }

render() {
    return (
        <>
      <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
            />
            <Form.Control.Feedback type="invalid">
            Please provide your first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
            />
            <Form.Control.Feedback type="invalid">
            Please provide your last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Email address:</Form.Label>
            <Form.Control type="email" placeholder="Email" required />

            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>

            <Form.Text className="text-muted">
            You will receive a verification email later.
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomUsername">
            <Form.Label>Username:</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
            <Form.Control.Feedback type="invalid">
            Please choose a username.
            </Form.Control.Feedback>
            </InputGroup>
            <Form.Text className="text-muted">
            Other people will see you by this username.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom06">              
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" required/>
                <Form.Control.Feedback type="invalid">
                Please provide a valid password.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom07">              
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" required/>
                <Form.Control.Feedback type="invalid">
                Please provide a valid password that matches the first.
                </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check custom type='checkbox' id='AgreeTerms'
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        <Form.Control.Feedback type="invalid">
        You must agree before submitting.
        </Form.Control.Feedback>
        </Form.Group>
          <Button type="submit">Register your account</Button>
          <p style={{color:"red", display: "inline-block", marginLeft:"10px"}}>{(!this.state.isValid && this.state.validated) && 'Some of your info was invalid, please fix it'}</p>
      </Form>
        </>
    )
}
}
export default RegisterForm