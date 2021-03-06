import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import LikeButton from '../other/LikeButton.js'

class ViewAuthorHeader extends Component {
	render() {
            return (
            <>
            {Boolean(this.props.guest) ?
                <Jumbotron>
                    {this.props.children}
                    <p className="lead">Look over their posts</p>
                    <hr className="my-4"/>
                    <OverlayTrigger key='top' placement='top' overlay=
                {
                    <Tooltip>
                        You must sign in or register to like authors.
                    </Tooltip>
                }>
                    <span className="d-inline-block">
                        <Button size="lg" variant="outline-success" disabled style={{ pointerEvents: 'none' }}>Like this author's page</Button>
                    </span>
                </OverlayTrigger>
                </Jumbotron>
            :
                <Jumbotron>
                    {this.props.children}
                    <p className="lead">Look over their posts, or like their page</p>
                    <hr className="my-4"/>
                    <LikeButton initialLiked={this.props.initialLiked} authorID={this.props.authorID} whatToLike='authors'/>
                </Jumbotron>
            }
            </>
          
		);
	}
}

export default ViewAuthorHeader