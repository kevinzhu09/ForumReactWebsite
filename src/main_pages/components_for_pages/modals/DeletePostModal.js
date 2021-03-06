import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom';
import { host } from '../../../globalConstants';


class DeletePostModal extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          showModal: false,
          disabled: false
        };
      
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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



    handleSubmit(event) { 
        this.setState({disabled:true});
        
        const token = window.sessionStorage.token;
        if (token) {
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
          
          const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
          };
          fetch(host + this.props.postPath, requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;

              if (resultCode === 0) {
                this.close();
                this.props.history.push('/my-page');
                return;
              } else if (resultCode === 'expired') {
                this.props.history.push('/session-expired');
                return;
              } else {
                this.props.history.push('/sign-in');
                return;
              }
            }
            )
            .catch(error => {
                  this.setState({disabled:false});
              });
            
        } else {
          this.props.history.push('/sign-in');
          return;
        }
        this.setState({validated:true});
  }



render() {
    return (
        <>
<Button size="lg" type="button" variant="danger" onClick={this.open}>Delete this post</Button>

<Modal show={this.state.showModal} onHide={this.close} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
<Modal.Header closeButton>
    <Modal.Title as='h5' style={{margin:"0"}}>Permanently delete this post?</Modal.Title>
</Modal.Header>
<Modal.Body>This cannot be undone. Are you really sure?</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.close}>
  No, take me back
  </Button>
  <Button disabled={this.state.disabled} variant="danger" onClick={this.handleSubmit}>
  I understand, delete this post
  </Button>
</Modal.Footer>
</Modal>

    </>
    );

}
}
export default withRouter(DeletePostModal);