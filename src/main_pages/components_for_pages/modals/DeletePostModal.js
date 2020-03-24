import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



class DeletePostModal extends Component {

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
<Button size="lg" type="button" variant="danger" class="btn btn-danger" onClick={this.open}>Delete this post</Button>

<Modal show={this.state.showModal} onHide={this.close} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
<Modal.Header closeButton>
    <Modal.Title bsPrefix='h5' id="contained-modal-title-vcenter" style={{margin:"0"}}>Permanently delete this post?</Modal.Title>
</Modal.Header>
<Modal.Body>This cannot be undone. Are you really sure?</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.close}>
  No, take me back
  </Button>
  <Button variant="danger" onClick={this.close}>
  I understand, delete this post
  </Button>
</Modal.Footer>
</Modal>

    </>
    );

}
}
export default DeletePostModal