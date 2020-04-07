import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import globalConstants from '../../../globalConstants';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

class DeleteAccount extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          currentPassword: null,
          noPassword: null,
          wrongPassword: null,
          showModal: false,
          disabled: false,
          validated: false
        };

        this.currentRef = React.createRef();

        this.handleCurrentChange = this.handleCurrentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
      }
    open() {
        this.setState({validated:true});
        if (!Boolean(this.state.currentPassword)) {
            this.setState({noPassword: true})
            this.currentRef.current.setCustomValidity("Please provide your current password.")
            return
        }
        this.setState({showModal: true});
    }
      
    close() {
        this.setState({showModal: false});
    }


    handleCurrentChange(event) {
        const target = event.target;
        target.setCustomValidity("");
        const value = target.value;

        this.setState({
          currentPassword: value,
          noPassword: false
        });
    }


    handleSubmit(event) { 
        this.setState({disabled:true});
        const { currentPassword } = this.state;
        const token = window.sessionStorage.token;
        event.preventDefault();
        event.stopPropagation();
        if (Boolean(currentPassword)) {
          // Make the delete request:
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
        
          var raw = JSON.stringify({"password":currentPassword});
          
          var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(globalConstants.host + "/users", requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;
              

              if (resultCode === 0) {
                this.props.history.push('/');
              } else if (resultCode === 1) {
                this.setState({wrongPassword:true, disabled:false});
                this.currentRef.current.setCustomValidity("The current password was not correct.")
                this.close();
              } else {
                this.props.history.push('/');
              }
            }
            )
            .catch(error => {
                  this.setState({disabled:false});
              });
            
        } else {
          this.setState({disabled:false});
        }
  }


render() {
    return (
        <>
<h2>Delete my account</h2>
<Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
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
              (Boolean(this.state.noPassword) && this.state.validated) ? 
              <Form.Text className="text-danger">Please provide your current password.</Form.Text> : 
              <Form.Text className="invisible">placeholder</Form.Text>
            )}

             
</Form.Group>

<Button variant="danger" onClick={this.open}>Delete my account</Button>

<Modal show={this.state.showModal} onHide={this.close} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
<Modal.Header closeButton>
  <Modal.Title bsPrefix='h5' id="contained-modal-title-vcenter" style={{margin:"0"}}>Permanently delete your account?</Modal.Title>
</Modal.Header>
<Modal.Body>This cannot be undone. Are you really sure?</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.close}>
  No, take me back
  </Button>
  <Button type="submit" disabled={this.state.disabled} variant="danger" onClick={this.handleSubmit}>
  I understand, delete my account
  </Button>
</Modal.Footer>
</Modal>

</Form>
    </>
    );

}
}
export default withRouter(DeleteAccount);