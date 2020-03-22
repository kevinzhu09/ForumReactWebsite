import React, { Component } from 'react'
import {Jumbotron, Button, Modal} from 'react-bootstrap'

class Header extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          showModal: false
        };
      
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
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
                <Jumbotron>
                    <h1 class="display-4">{this.props.children}</h1>
                    <p class="lead">Create a new post, or see what people are talking about</p>
                    <hr class="my-4"/>
                    <Button variant="primary" size="lg" onClick={this.open}>Create a new post</Button>
                </Jumbotron>
                    <Modal className="modal-container" 
                        show={this.state.showModal} 
                        onHide={this.close}
                        animation={true} 
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header closeButton>
                            <input class="form-control" type="text" placeholder="Title of post:"></input>
                        </Modal.Header>

                        <Modal.Body>
                            <textarea class="form-control" rows="10" placeholder="Content of post:"></textarea>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button bsStyle="primary">Create post</Button>
                        </Modal.Footer>         
                    </Modal> 
            </>
          
		);
	}
}

export default Header