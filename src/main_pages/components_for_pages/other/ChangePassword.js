import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { host } from '../../../globalConstants';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          validated: false,
          isValid: null,
          passwordsMatch: null,
          disabled: false,
          wrongPassword: null
        };

        this.currentRef = React.createRef();
        this.newRef = React.createRef();
        this.confirmRef = React.createRef();

        this.handleCurrentChange = this.handleCurrentChange.bind(this);
        this.handleNewChange = this.handleNewChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
      }
      
    handleFormChange() {
        this.setState({isValid:true});
    }

    handleCurrentChange(event) {
        const target = event.target;
        target.setCustomValidity("");
        const value = target.value;

        this.setState({
          currentPassword: value
        });
    }

    handleNewChange(event) {

        const target = event.target;
        target.setCustomValidity("");
        const value = target.value;
        

        this.setState({
          newPassword: value,
          passwordsMatch: true
        });
    }

    handleConfirmChange(event) {
        const target = event.target;
        target.setCustomValidity("");
        const value = target.value;

        this.setState({
          confirmPassword: value,
          passwordsMatch: true
        });
    }


    handleSubmit(event) { 
        this.setState({disabled:true});
        const { currentPassword, newPassword, confirmPassword } = this.state;
        const token = window.sessionStorage.token;
        const match = (newPassword===confirmPassword)
        if (!match) {this.newRef.current.setCustomValidity("The passwords don't match."); this.confirmRef.current.setCustomValidity("The passwords don't match.");}
        this.setState({passwordsMatch:match})
        const form = event.currentTarget;
        const validity = form.checkValidity();
        this.setState({isValid:validity});
        event.preventDefault();
        event.stopPropagation();
        if (validity && match) {
          // Make the put request:
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
        
          var raw = JSON.stringify({"old_password":currentPassword, "new_password":confirmPassword});
          
          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(host + "/password", requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;
              

              if (resultCode === 0) {
                // window.location.reload();
                this.props.onSubmit();
              } else if (resultCode === 1) {

              } else if (resultCode === 2) {
                this.currentRef.current.setCustomValidity("The current password was not correct.");
                this.setState({wrongPassword:true});
              } else if (resultCode === 4) {
                this.props.history.push('sign-in');
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
<h2>Change my password</h2>
<Form id="registerForm" className="registerForm2" onChange={this.handleFormChange} noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
<Form.Group as={Col} md="6">
    <Form.Label>Current password:</Form.Label>
    <Form.Control type="password" 
    id="current-password" 
    value={this.state.currentPassword} 
    onChange={this.handleCurrentChange}
    ref={this.currentRef}
    placeholder="Current password"
    required/>

            {this.state.wrongPassword ? 
            <Form.Text className="text-danger">The current password was not correct.</Form.Text> : 
            (
              (!Boolean(this.state.currentPassword) && this.state.validated) ? 
              <Form.Text className="text-danger">Please provide your current password.</Form.Text> : 
              <Form.Text className="invisible">placeholder</Form.Text>
            )}


</Form.Group>

<Form.Group as={Col} md="6">
<Form.Label>New password:</Form.Label>
    <Form.Control type="password" 
    id="new-password" 
    value={this.state.newPassword} 
    onChange={this.handleNewChange}
    ref={this.newRef}
    placeholder="New password"
    required/>


{(!this.state.passwordsMatch && this.state.validated) ? 
                <Form.Text className="text-danger">The passwords don't match.</Form.Text> : 
                (
                  (!Boolean(this.state.newPassword) && this.state.validated) ? 
                  <Form.Text className="text-danger">Please provide a valid password.</Form.Text> : 
                  <Form.Text className="invisible">placeholder</Form.Text>
                )}
</Form.Group>

<Form.Group as={Col} md="6">
<Form.Label>Confirm new password:</Form.Label>
    <Form.Control type="password" 
    id="confirm-password" 
    value={this.state.confirmPassword} 
    onChange={this.handleConfirmChange}
    ref={this.confirmRef}
    placeholder="Confirm new password"
    required/>


{(!this.state.passwordsMatch && this.state.validated) ? 
                <Form.Text className="text-danger">The passwords don't match.</Form.Text> : 
                (
                  (!Boolean(this.state.confirmPassword) && this.state.validated) ? 
                  <Form.Text className="text-danger">Please provide a valid password that matches the first.</Form.Text> : 
                  <Form.Text className="invisible">placeholder</Form.Text>
                )}
</Form.Group>

<Button disabled={this.state.disabled} variant="primary" type="submit">Change my password</Button>

</Form>
    </>
    );

}
}
export default withRouter(ChangePassword);