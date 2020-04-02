import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import EditPostModal from '../modals/EditPostModal.js';
import DeletePostModal from '../modals/DeletePostModal.js';
import LikeButton from '../other/LikeButton.js';

class ViewPostHeader extends Component {

	render() {
            return (
            
                <Jumbotron>
                    {this.props.children}
                    <hr class="my-4"/>
                    <LikeButton initialLiked={this.props.initialLiked} postID={this.props.postID} whatToLike='posts'/>

                    {this.props.ownPost && <> 
                    <EditPostModal initialTitle={this.props.initialTitle} initialContent={this.props.initialContent} postPath={this.props.postPath} /> <DeletePostModal postPath={this.props.postPath}/> 
                    </>}

                </Jumbotron>
            
          
		);
	}
}

export default ViewPostHeader;