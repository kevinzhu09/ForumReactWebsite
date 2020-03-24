import React, { Component } from 'react'
import {Jumbotron, Button, Modal} from 'react-bootstrap'

import EditPostModal from '../modals/EditPostModal.js'
import DeletePostModal from '../modals/DeletePostModal.js'
import LikeButton from '../other/LikeButton.js'

class ViewPostHeader extends Component {
	render() {
            return (
            <>
                <Jumbotron>
                    {this.props.children}
                    <hr class="my-4"/>
                    <LikeButton liked={false} />

            {this.props.ownPost && <> 
            <EditPostModal/> <DeletePostModal/> 
            </>}

                </Jumbotron>
            </>
          
		);
	}
}

export default ViewPostHeader