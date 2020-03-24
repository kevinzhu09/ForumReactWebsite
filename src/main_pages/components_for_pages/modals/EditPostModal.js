import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



class EditPostModal extends Component {

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
<Button type="button" variant="primary" size="lg" class="btn btn-primary" onClick={this.open}>Edit this post</Button>

<Modal show={this.state.showModal} onHide={this.close} animation={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
<Modal.Header closeButton>
    <Modal.Title bsPrefix='h5' id="contained-modal-title-vcenter" style={{margin:"0"}}>Editing this post:</Modal.Title>
</Modal.Header>
<Modal.Body>Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.close}>
  Cancel my editing
  </Button>
  <Button variant="primary" onClick={this.close}>
  Edit this post
  </Button>
</Modal.Footer>
</Modal>

    </>
    );

}
}
export default EditPostModal