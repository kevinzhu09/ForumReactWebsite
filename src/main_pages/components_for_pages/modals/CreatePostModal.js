import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import globalConstants from '../../../globalConstants';

class CreatePostModal extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          showModal: false,
          title: null,
          content: null,
          validated: false,
          noTitleNorContent: null,
          disabled: false
        };
      
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      

    open() {
        this.setState({showModal: true});
    }
      
    close() {
        this.setState({showModal: false});
    }

    handleTitleChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
          title: value,
          noTitleNorContent: 0
        });
    }

    handleContentChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
          content: value,
          noTitleNorContent: 0
        });
    }


    handleSubmit(event) { 
        this.setState({disabled:true});
        const { title, content } = this.state;
        const token = window.sessionStorage.token;
        let validity = true;
        let missingCode = 0;
        if (!title) {
            missingCode += 1;
        }
        if (!content) {
            missingCode += 2;
        }
        validity = !Boolean(missingCode);
        this.setState({noTitleNorContent:missingCode});
        // event.preventDefault();
        // event.stopPropagation();
        if (validity) {
          // Make the post request:
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
        
          var raw = JSON.stringify({"title":title,"content":content});
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(globalConstants.host + "/posts", requestOptions)
            .then(response => response.json())
            .then(result => {
              // next line is for debugging:
              // alert('result.message: ' + result.message);
              const resultCode = result.code;


              if (resultCode === 0) {
                this.close();
                const postID = result.post_id
                const postURL = "/posts/".concat(postID);
                this.props.history.push(postURL);
              } else {
                this.props.history.push('/');
              }
            }
            )
            .catch(error => alert('error: ' + error));
            
        } else {
          this.setState({disabled:false});
        }
        this.setState({validated:true});
  }


render() {
    return (
        <>
<Button variant="primary" size="lg" onClick={this.open}>Create a new post</Button>

<Modal className="modal-container" 
                        show={this.state.showModal} 
                        onHide={this.close}
                        animation={true} 
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header closeButton>
                            <input tabIndex="1" minlength="1" maxlength="30" class="form-control" type="text" value={this.state.title} onChange={this.handleTitleChange} required placeholder="Title of post:"></input>
                        </Modal.Header>

                        <Modal.Body>
                            <textarea tabIndex="2" class="form-control" value={this.state.content} onChange={this.handleContentChange} required rows="10" placeholder="Content of post:"></textarea>
                        </Modal.Body>

                        <Modal.Footer>
                        
                        <p className={(this.state.noTitleNorContent === 1) ? "d-block text-danger" : "d-none"}>Please provide a title.</p>
                        <p className={(this.state.noTitleNorContent === 2) ? "d-block text-danger" : "d-none"}>Please provide some content.</p>
                        <p className={(this.state.noTitleNorContent === 3) ? "d-block text-danger" : "d-none"}>Please provide a title and some content.</p>
                        
                        <Button onClick={this.close}>Close</Button>
                        <Button disabled={this.state.disabled} tabIndex="3" onClick={this.handleSubmit} type="submit" variant="primary">Create post</Button>
                        </Modal.Footer>         
                    </Modal> 

    </>
    );

}
}
export default withRouter(CreatePostModal);