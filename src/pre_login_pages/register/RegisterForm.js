import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { host } from '../../globalConstants';


  class RegisterForm extends Component {
      constructor(props) {
          super(props);

          this.state = {
            validated: false,
            isValid: null,
            email: "",
            username: "",
            password: "",
            passwordConfirmation: "",
            agreeTerms: false,
            hasAgreed: null,
            emailTaken: false,
            usernameTaken: false,
            passwordsMatch: null,
            disabled: false
            };

          this.emailRef = React.createRef();
          this.usernameRef = React.createRef();
          this.passwordRef = React.createRef();
          this.passwordConfirmationRef = React.createRef();
          this.agreeTermsRef = React.createRef();

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleInputChange = this.handleInputChange.bind(this);
          this.handleFormChange = this.handleFormChange.bind(this);
          this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
          this.handleEmailChange = this.handleEmailChange.bind(this);
          this.handleUsernameChange = this.handleUsernameChange.bind(this);
          
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }


      handleFormChange(event) {
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
        event.target.setCustomValidity("");
        const target = event.target;
        const id = target.id;
        const value = target.checked;

        this.setState({
          [id]: value,
          hasAgreed:true
        });

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
        this.passwordRef.current.setCustomValidity(""); 
        this.passwordConfirmationRef.current.setCustomValidity("");
        this.setState({passwordsMatch:true});
        this.handleInputChange(event);
      }

      handleSubmit(event) { 
          this.setState({disabled:true});
            const { password, passwordConfirmation, agreeTerms } = this.state;

            if (!agreeTerms)  {
              this.setState({hasAgreed:false});
              this.agreeTermsRef.current.setCustomValidity("You must agree before submitting.");
          }

            const match = (password === passwordConfirmation)
            if (!match) {this.passwordRef.current.setCustomValidity("The passwords don't match."); this.passwordConfirmationRef.current.setCustomValidity("The passwords don't match.");}
            this.setState({passwordsMatch:match})


            const form = event.currentTarget;
            const validity = form.checkValidity();
            this.setState({isValid:validity});
            event.preventDefault();
            event.stopPropagation();
            if (validity && match) {
              let myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Accept", "application/json");
              
              const raw = JSON.stringify({"email":this.state.email,"username":this.state.username,"password":this.state.password});
              
              const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              fetch(host + "/register", requestOptions)
                .then(response => response.json())
                .then(result => {
                  const resultCode = result.code;
                  const emailTakenBool = Boolean(resultCode & 1)
                  if (emailTakenBool) {this.emailRef.current.setCustomValidity("That email is taken.");}
                  const usernameTakenBool = Boolean(resultCode & 2)
                  if (usernameTakenBool) {this.usernameRef.current.setCustomValidity("That username is taken.");}
                  this.setState({emailTaken:emailTakenBool, usernameTaken:usernameTakenBool});
                  if (resultCode === 0) {
                    this.props.onSubmit();
                  } else {
                    this.setState({disabled:false});
                  }

                })
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
          <Form.Group as={Col} md="6">
            <Form.Label>Email address:</Form.Label>
            <Form.Control disabled={this.state.disabled}
            type="email" 
            id="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            ref={this.emailRef}
            placeholder="Email" required />

            <Form.Text className="text-muted">
            You will receive a verification email later.
            </Form.Text>

            



            {this.state.emailTaken ? 
            <Form.Text className="text-danger">That email is taken.</Form.Text> : 
            (
              (!Boolean(this.state.email) && this.state.validated) ? 
              <Form.Text className="text-danger">Please provide a valid email.</Form.Text> : 
              <Form.Text className="invisible">placeholder</Form.Text>
            )}


          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Username:</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                disabled={this.state.disabled}
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
            <Form.Group as={Col} md="6">              
                <Form.Label>Password:</Form.Label>
                <Form.Control
                disabled={this.state.disabled}
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                ref={this.passwordRef}
                type="password" placeholder="Password" required/>

    


                {(!this.state.passwordsMatch && this.state.validated) ? 
                <Form.Text className="text-danger">The passwords don't match.</Form.Text> : 
                (
                  (!Boolean(this.state.password) && this.state.validated) ? 
                  <Form.Text className="text-danger">Please provide a valid password.</Form.Text> : 
                  <Form.Text className="invisible">placeholder</Form.Text>
                )}

            </Form.Group>
            <Form.Group as={Col} md="6">              
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control
                disabled={this.state.disabled}
                id="passwordConfirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handlePasswordChange}
                ref={this.passwordConfirmationRef}
                type="password" placeholder="Confirm password" required/>

                {(!this.state.passwordsMatch && this.state.validated) ? 
                <Form.Text className="text-danger">The passwords don't match.</Form.Text> : 
                (
                  (!Boolean(this.state.passwordConfirmation) && this.state.validated) ? 
                  <Form.Text className="text-danger">Please provide a valid password that matches the first.</Form.Text> : 
                  <Form.Text className="invisible">placeholder</Form.Text>
                )}

            </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check 
            custom type='checkbox' id='agreeTerms'
              checked={this.state.agreeTerms}
              onChange={this.handleCheckboxChange}
              ref={this.agreeTermsRef}         
              required
              label="Agree to terms and conditions"
            >
            <Form.Check.Input disabled={this.state.disabled} checked={this.state.agreeTerms}
              onChange={this.handleCheckboxChange}  ref={this.agreeTermsRef} required />
            <Form.Check.Label>Agree to terms and conditions</Form.Check.Label>
            
            <Form.Text className={(!this.state.hasAgreed && this.state.validated) ? "visible text-danger" : "invisible"}>You must agree before submitting.</Form.Text>

          </Form.Check>
        </Form.Group>
          <Button disabled={this.state.disabled} type="submit">Register my account</Button>

          <Form.Text className={(!this.state.isValid && this.state.validated) ? "visible text-danger" : "invisible"}>Some of your info was invalid, please fix it and resubmit.</Form.Text>

      </Form>
        </>
    )
}
}
export default RegisterForm;