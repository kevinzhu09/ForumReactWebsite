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
            isValid: null,
            firstName: null,
            lastName: null,
            email: null,
            username: null,
            password: null,
            passwordConfirmation: null,
            agreeTerms: null,
            emailTaken: false,
            usernameTaken: false,
            passwordsMatch: null
            };

          this.emailRef = React.createRef();
          this.usernameRef = React.createRef();
          this.passwordRef = React.createRef();
          this.passwordConfirmationRef = React.createRef();

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleInputChange = this.handleInputChange.bind(this);
          this.handleFormChange = this.handleFormChange.bind(this);
          this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
          this.handleEmailChange = this.handleEmailChange.bind(this);
          this.handleUsernameChange = this.handleUsernameChange.bind(this);
          
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }

      getInitialState(){
      return {
        validated: false,
        isValid: null,
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        password: null,
        passwordConfirmation: null,
        agreeTerms: null,
        emailTaken: false,
        usernameTaken: false,
        passwordsMatch: null
        };
      }

      handleFormChange(event) {
        // const form = event.currentTarget;
        // const validity = form.checkValidity();
        // this.setState({isValid:validity});
        this.setState({isValid:true});
      }

      handleInputChange(event) {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        this.setState({
          [id]: value
        });
      }

      handleCheckboxChange(event) {
        const target = event.target;
        const id = target.id;
        const value = target.checked;

        this.setState({
          [id]: value
        });
        this.setState({hasAgreed:true});
      }

      handleEmailChange(event) {
        event.target.setCustomValidity("");
        this.setState({emailTaken:false});
        this.handleInputChange(event);
      }

      handleUsernameChange(event) {
        event.target.setCustomValidity("");
        this.setState({usernameTaken:false});
        this.handleInputChange(event);
      }

      handlePasswordChange(event) {
        event.target.setCustomValidity("");
        this.setState({passwordsMatch:true});
        this.handleInputChange(event);
      }

      handleSubmit(event) { 
            const { password, passwordConfirmation, agreeTerms } = this.state;

            if (!agreeTerms)  {this.setState({hasAgreed:false})}

            const match = (password === passwordConfirmation)
            if (!match) {this.passwordRef.current.setCustomValidity("The passwords don't match."); this.passwordConfirmationRef.current.setCustomValidity("The passwords don't match.");}
            this.setState({passwordsMatch:match})


            const form = event.currentTarget;
            const validity = form.checkValidity();
            this.setState({isValid:validity});
            event.preventDefault();
            event.stopPropagation();
            if (validity && match) {
              // Make the post request:
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Accept", "application/json");
              
              var raw = JSON.stringify({"first_name":this.state.firstName,"last_name":this.state.lastName,"email":this.state.email,"username":this.state.username,"password":this.state.password});
              
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              fetch("http://localhost:5000/register", requestOptions)
                .then(response => response.json())
                .then(result => {
                  // next line is for debugging:
                  // alert('result.message: ' + result.message);
                  const resultCode = result.code;
                  const emailTakenBool = Boolean(resultCode & 1)
                  if (emailTakenBool) {this.emailRef.current.setCustomValidity("That email is taken.");}
                  const usernameTakenBool = Boolean(resultCode & 2)
                  if (usernameTakenBool) {this.usernameRef.current.setCustomValidity("That username is taken.");}
                  this.setState({emailTaken:emailTakenBool, usernameTaken:usernameTakenBool});
                  if (resultCode === 0) {
                    this.props.onSubmit();
                  }

                })
                .catch(error => alert('error: ' + error));
            }
            this.setState({validated:true});
      }

render() {
    return (
        <>
      <Form id="registerForm" className="registerForm2" onChange={this.handleFormChange} noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name:</Form.Label>
            <Form.Control
            id="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
              required
              type="text"
              placeholder="First name"
            />

            <Form.Text className={(!Boolean(this.state.firstName) && this.state.validated) ? "visible text-danger" : "invisible"}>Please provide your first name.</Form.Text>

          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
            id="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
              required
              type="text"
              placeholder="Last name"
            />

            <Form.Text className={(!Boolean(this.state.lastName) && this.state.validated) ? "visible text-danger" : "invisible"}>Please provide your last name.</Form.Text>

          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Email address:</Form.Label>
            <Form.Control type="email" 
            id="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            ref={this.emailRef}
            placeholder="Email" required />

            <Form.Text className="text-muted">
            You will receive a verification email later.
            </Form.Text>

            {/* <Form.Text className={this.state.emailTaken ? "visible text-danger" : "invisible"}>That email is taken.</Form.Text>
            <Form.Text className={(!Boolean(this.state.email) && this.state.validated) ? "visible text-danger" : "invisible"}>Please provide a valid email.</Form.Text> */}



            {this.state.emailTaken ? 
            <Form.Text className="text-danger">That email is taken.</Form.Text> : 
            (
              (!Boolean(this.state.email) && this.state.validated) ? 
              <Form.Text className="text-danger">Please provide a valid email.</Form.Text> : 
              <Form.Text className="invisible">placeholder</Form.Text>
            )}


          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomUsername">
            <Form.Label>Username:</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                type="text"
                ref={this.usernameRef}
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />


            </InputGroup>

            <Form.Text className="text-muted">
            Other people will see you by this username.
            </Form.Text>

            {/* <Form.Text className={(!Boolean(this.state.username) && this.state.validated) ? "visible text-danger" : "invisible"}>Please choose a username.</Form.Text>

            <Form.Text className={this.state.usernameTaken ? "visible text-danger" : "invisible"}>That username is taken.</Form.Text> */}

            
            {this.state.usernameTaken ? 
            <Form.Text className="text-danger">That username is taken.</Form.Text> : 
            (
              (!Boolean(this.state.username) && this.state.validated) ? 
              <Form.Text className="text-danger">Please choose a username.</Form.Text> : 
              <Form.Text className="invisible">placeholder</Form.Text>
            )}



          </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom06">              
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                ref={this.passwordRef}
                type="password" placeholder="Password" required/>

                {/* <Form.Text className={(!Boolean(this.state.password) && this.state.validated) ? "visible text-danger" : "invisible"}>Please provide a valid password.</Form.Text>

                <Form.Text className={(!this.state.passwordsMatch && this.state.validated) ? "visible text-danger" : "invisible"}>The passwords don't match.</Form.Text> */}


                {(!this.state.passwordsMatch && this.state.validated) ? 
                <Form.Text className="text-danger">The passwords don't match.</Form.Text> : 
                (
                  (!Boolean(this.state.password) && this.state.validated) ? 
                  <Form.Text className="text-danger">Please provide a valid password.</Form.Text> : 
                  <Form.Text className="invisible">placeholder</Form.Text>
                )}

            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom07">              
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control 
                id="passwordConfirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handlePasswordChange}
                ref={this.passwordConfirmationRef}
                type="password" placeholder="Confirm password" required/>

                {/* <Form.Text className={(!Boolean(this.state.passwordConfirmation) && this.state.validated) ? "visible text-danger" : "invisible"}>Please provide a valid password that matches the first.</Form.Text>


                <Form.Text className={(!this.state.passwordsMatch && this.state.validated) ? "visible text-danger" : "invisible"}>The passwords don't match.</Form.Text> */}


                {(!this.state.passwordsMatch && this.state.validated) ? 
                <Form.Text className="text-danger">The passwords don't match.</Form.Text> : 
                (
                  (!Boolean(this.state.passwordConfirmation) && this.state.validated) ? 
                  <Form.Text className="text-danger">Please provide a valid password that matches the first.</Form.Text> : 
                  <Form.Text className="invisible">placeholder</Form.Text>
                )}

            </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicCheckbox">
          {/* <Form.Check 
          custom type='checkbox' id='agreeTerms'
            checked={this.state.agreeTerms} 
            onChange={this.handleInputChange}         
            required
            inline
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          /> */}
          <Form.Check 
            custom type='checkbox' id='agreeTerms'
              checked={this.state.agreeTerms} 
              onChange={this.handleCheckboxChange}         
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            >
            <Form.Check.Input checked={this.state.agreeTerms} 
              onChange={this.handleCheckboxChange}  required />
            <Form.Check.Label>Agree to terms and conditions</Form.Check.Label>
            
            <Form.Text className={(!this.state.hasAgreed && this.state.validated) ? "visible text-danger" : "invisible"}>You must agree before submitting.</Form.Text>

          </Form.Check>
        </Form.Group>
          <Button type="submit">Register your account</Button>

          <Form.Text className={(!this.state.isValid && this.state.validated) ? "visible text-danger" : "invisible"}>Some of your info was invalid, please fix it and resubmit.</Form.Text>

      </Form>
        </>
    )
}
}
export default RegisterForm