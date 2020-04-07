import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import globalConstants from '../../../globalConstants';


class EditPostModal extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          showModal: false,
          content: null,
          validated: false,
          containsContent: null,
          edited: false,
          disabled: false
        };
      
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    open() {
        this.setState({showModal: true});
    }
      
    close() {
        this.setState({showModal: false});
    }

    handleContentChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
          content: value,
          containsContent: true,
          edited: true
        });
    }


    handleSubmit(event) {
        this.setState({disabled:true});
        
        const { content } = this.state;
        const token = window.sessionStorage.token;
        const containsContent = Boolean(content);
        // event.preventDefault();
        // event.stopPropagation();
        if (containsContent) {
          // Make the post request:
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
        
          var raw = JSON.stringify({"content":content});
          
          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(globalConstants.host + this.props.postPath, requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;


              if (resultCode === 0) {
                window.location.reload();
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
            this.setState({containsContent:false, disabled:false});
        }
        this.setState({validated:true});
  }



render() {

    let content;
    if (this.state.edited) {
        content = this.state.content;
    } else {
        content = this.props.initialContent;
    }

    return (
        <>
<Button variant="primary" size="lg" onClick={this.open}>Edit this post</Button>

<Modal show={this.state.showModal} onHide={this.close} animation={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
<Modal.Header closeButton>
    <Modal.Title as="h5" id="contained-modal-title-vcenter" style={{margin:"0"}}>Editing "{this.props.initialTitle}":</Modal.Title>
</Modal.Header>
<Modal.Body>
    <Form.Control tabIndex="1" elementType="textarea" value={this.state.content} onChange={this.handleContentChange} required rows="10" placeholder="Content of post:">{content}</Form.Control>
</Modal.Body>
<Modal.Footer>
<p className={this.state.containsContent===false ? "d-block text-danger" : "d-none"}>Please provide some content.</p>
  <Button variant="secondary" onClick={this.close}>
  Cancel my editing
  </Button>
  <Button disabled={this.state.disabled} tabIndex="2" variant="primary" onClick={this.handleSubmit}>
  Edit this post
  </Button>
</Modal.Footer>
</Modal>

    </>
    );

}
}
export default withRouter(EditPostModal);