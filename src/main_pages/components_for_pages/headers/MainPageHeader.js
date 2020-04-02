import React, { Component } from 'react'
import {Jumbotron, Button, Modal} from 'react-bootstrap'

import CreatePostModal from '../modals/CreatePostModal.js'

class MainPageHeader extends Component {

	render() {
		return (
            <>
                <Jumbotron>
                    {this.props.children}
                    <hr class="my-4"/>
                    <CreatePostModal></CreatePostModal>
                </Jumbotron>
            </>
          
		);
	}
}

export default MainPageHeader;