import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './Account.css';


class DeleteAccountModal extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          showModal: false
        };
      
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
      }

    getInitialState(){
    return { showModal: false };
    }

    open() {
        this.setState({showModal: true});
    }
      
    close() {
        this.setState({showModal: false});
    }


render() {
    return (
        <>
<Button type="button" variant="danger" class="btn btn-danger" onClick={this.open}>Delete my account</Button>

<Modal show={this.state.showModal} onHide={this.close} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
<Modal.Header closeButton>
    {/* <Modal.Title as h5>Permanently delete your account?</Modal.Title> */}
  <h5 id="contained-modal-title-vcenter" className="remove-margin">Permanently delete your account?</h5>
</Modal.Header>
<Modal.Body>This cannot be undone. Are you really sure?</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.close}>
  No, take me back
  </Button>
  <Button variant="danger" onClick={this.close}>
  I understand, delete my account
  </Button>
</Modal.Footer>
</Modal>

    </>
    );

}
}
export default DeleteAccountModal