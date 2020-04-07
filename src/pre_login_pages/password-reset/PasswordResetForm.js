import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import globalConstants from '../../globalConstants';



  class PasswordResetForm extends Component {
      constructor(props) {
          super(props);

          this.state = {
            validated: false,
            isValid: null,
            email: null,
            notFound: null,
            disabled: false
            };

          this.emailRef = React.createRef();

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleEmailChange = this.handleEmailChange.bind(this);
      }

      handleEmailChange(event) {
        const target = event.target;
        target.setCustomValidity("");
        const value = target.value;

        this.setState({
          email: value,
          notFound: false
        });
      }

      handleSubmit(event) {
        this.setState({disabled:true})
        const { email } = this.state;
        const form = event.currentTarget;
        const validity = form.checkValidity();
        this.setState({isValid:validity});
        event.preventDefault();
        event.stopPropagation();
        if (validity) {
          // Make the post request:
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Accept", "application/json");
          
          var raw = JSON.stringify({"email":email});
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(globalConstants.host + "/password/reset", requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;
              if (resultCode===1) {
                  this.emailRef.current.setCustomValidity("That email account was not found.");
                  this.setState({notFound: true})
            } else if (resultCode === 0) {
                this.props.onSubmit();
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
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                id="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                ref={this.emailRef}
                type="email" placeholder="Email" required/>


                {
                    (this.state.notFound && this.state.validated) ? 
                    <Form.Text className="text-danger">That email account was not found.</Form.Text> : 
                    (
                        (!Boolean(this.state.email) && this.state.validated) ? 
                        <Form.Text className="text-danger">Please provide a valid email.</Form.Text> : 
                        <Form.Text className="invisible">placeholder</Form.Text>
                    )
                }
                
            </Form.Group>
        </Form.Row>
          <Button disabled={this.state.disabled} type="submit">Reset your password</Button>
      </Form>
        </>
    )
}
}
export default PasswordResetForm;