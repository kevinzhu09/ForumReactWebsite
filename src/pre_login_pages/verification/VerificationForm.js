import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { host } from '../../globalConstants';
import { withRouter } from 'react-router-dom';



  class VerificationForm extends Component {
      constructor(props) {
          super(props);

          this.state = {
            validated: false,
            isValid: null,
            password: "",
            disabled: false,
            expired: false,
            errorMessage: null
            };

          this.passwordRef = React.createRef();

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }


      handlePasswordChange(event) {
        const target = event.target;
        target.setCustomValidity("");
        const value = target.value;

        this.setState({
          password: value,
          errorMessage: null
        });
      }

      handleSubmit(event) { 
        this.setState({disabled:true});
        
        const { password } = this.state;
        const {token} = this.props;

        const form = event.currentTarget;
        const validity = form.checkValidity();
        this.setState({isValid:validity});
        event.preventDefault();
        event.stopPropagation();
        if (validity) {
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
          const raw = JSON.stringify({"password":password});
          
          const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(host + "/verify", requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;
              if (resultCode === 0) {
                this.props.onSubmit();
                const resultToken = result.access_token;
                window.sessionStorage.token = resultToken;
                this.props.history.push('/main-feed');
                return;
              } else if (resultCode === 'expired') {
                alert("Sorry, the verification email expired. You'll have to register again.");
                this.props.history.push('/register');
                return;
              } else {
                    let errorMessage;
 
                    switch (resultCode) {
                      case 1:
                        errorMessage = "The password is not correct.";
                        break;
                      case 2:
                        errorMessage = "Something went wrong. Try registering again, or click the link from the email again.";
                        break;
                      case 3:
                        errorMessage = "That email is taken. That username is also taken.";
                        break;
                      case 4:
                        errorMessage = "That email is taken.";
                        break;
                      case 5:
                        errorMessage = "That username is taken.";
                        break;
                      default:
                        errorMessage = "There was a problem with verifying your account. The password could be wrong, the account could already be verified, or some other issue. Try registering again, or click the link from the email again.";
                    }
                    this.passwordRef.current.setCustomValidity(errorMessage);
                    this.setState({errorMessage:errorMessage, disabled:false});
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
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                value={this.state.password}
                onChange={this.handlePasswordChange}
                ref={this.passwordRef}
                type="password" placeholder="Password" required/>

                {(Boolean(this.state.errorMessage) && this.state.validated) ?
                <Form.Text className="text-danger">{this.state.errorMessage}</Form.Text> :
                (
                        (!Boolean(this.state.password) && this.state.validated) ? 
                        <Form.Text className="text-danger">Please provide a valid password.</Form.Text> : 
                        <Form.Text className="invisible">placeholder</Form.Text>
                )
                }
            </Form.Group>
        </Form.Row>
          <Button disabled={this.state.disabled} type="submit">Verify your account</Button>
      </Form>
        </>
    )
}
}
export default withRouter(VerificationForm);