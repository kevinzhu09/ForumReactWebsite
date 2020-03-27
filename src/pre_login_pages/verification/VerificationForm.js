import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';



  class VerificationForm extends React.Component {
      constructor(props) {
          super(props);

          this.state = {
            validated: false,
            isValid: null,
            password: null,
            correctPassword: null
            };

          this.passwordRef = React.createRef();

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }

      getInitialState(){
      return {
        validated: false,
        isValid: null,
        password: null,
        correctPassword: null
        };
      }


      handlePasswordChange(event) {
        event.target.setCustomValidity("");
        this.setState({passwordsMatch:true});
        const target = event.target;
        const id = target.id;
        const value = target.value;

        this.setState({
          [id]: value
        });
      }

      handleSubmit(event) { 
        
            const { password } = this.state;
            const {token} = this.props;
            token = String(token);

            const form = event.currentTarget;
            const validity = form.checkValidity();
            this.setState({isValid:validity});
            event.preventDefault();
            event.stopPropagation();
            if (validity) {
              // Make the put request:
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", "Bearer " + token);
              myHeaders.append("Accept", "application/json");
              
              var raw = JSON.stringify({"password":password});
              
              var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              
              fetch("http://localhost:5000/verify", requestOptions)
                .then(response => response.json())
                .then(result => {
                  // next line is for debugging:
                  alert('result.message: ' + result.message);
                  const resultCode = result.code;
                  const verifyIssueBool = Boolean(resultCode & 1)
                  if (verifyIssueBool) {this.passwordRef.current.setCustomValidity("There was a problem with verifying your account. The account could already be verified, or some other issue.");}
                  const noIDBool = Boolean(resultCode & 2)
                  if (noIDBool) {this.passwordRef.current.setCustomValidity("The password is not correct.");}
                  this.setState({verifyIssue:verifyIssueBool, noID:noIDBool});

                  // message for code4: "The verification link could have expired. You can try again, or create the account again and send another link."
                  if (resultCode === 0) {
                    this.props.onSubmit();
                  }
                }
                )
                .catch(error => alert('error: ' + error));
                
            }
            this.setState({validated:true});
      }

render() {
    return (
        <>
      <Form id="registerForm" className="registerForm2" onChange={this.handleFormChange} noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Row>
            <Form.Group as={Col} controlId="validationCustom06">              
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                ref={this.passwordRef}
                type="password" placeholder="Password" required/>

                {(this.state.noID && this.state.validated) ?
                <Form.Text className="text-danger">The verification link could have expired. You can try again, or create the account again and send another link.</Form.Text> :
                (
                    (this.state.verifyIssue && this.state.validated) ? 
                    <Form.Text className="text-danger">There was a problem with verifying your account. The password could be wrong, the account could already be verified, or some other issue.</Form.Text> : 
                    (
                        (!Boolean(this.state.password) && this.state.validated) ? 
                        <Form.Text className="text-danger">Please provide a valid password.</Form.Text> : 
                        <Form.Text className="invisible">placeholder</Form.Text>
                    )
                )
                }
            </Form.Group>
        </Form.Row>
          <Button type="submit">Verify your account</Button>
      </Form>
        </>
    )
}
}
export default VerificationForm