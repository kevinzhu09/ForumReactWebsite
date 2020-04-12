import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import EditPostModal from '../modals/EditPostModal.js';
import DeletePostModal from '../modals/DeletePostModal.js';
import LikeButton from '../other/LikeButton.js';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class ViewPostHeader extends Component {

	render() {
            return (
            <>
            {Boolean(this.props.guest) ?
                <Jumbotron>
                {this.props.children}
                <hr className="my-4"/>
                <OverlayTrigger key='top' placement='top' overlay=
                {
                    <Tooltip id={`tooltip-$sign-in`}>
                        You must sign in or register to like posts.
                    </Tooltip>
                }>
                    <span className="d-inline-block">
                        <Button size="lg" variant="outline-success" disabled style={{ pointerEvents: 'none' }}>Like this post</Button>
                    </span>
                </OverlayTrigger>
                </Jumbotron>
            :
                <Jumbotron>
                {this.props.children}
                <hr className="my-4"/>
                <LikeButton initialLiked={this.props.initialLiked} postID={this.props.postID} whatToLike='posts'/>

                {this.props.ownPost && <> 
                <a href={"/edit-post/".concat(this.props.postID)}><Button variant="primary" size="lg">Edit this post</Button></a>
            
                <EditPostModal initialTitle={this.props.initialTitle} initialContent={this.props.initialContent} postPath={this.props.postPath} /> <DeletePostModal postPath={this.props.postPath}/> 
            </>}

                </Jumbotron>
            }
            </>
		);
	}
}

export default ViewPostHeader;