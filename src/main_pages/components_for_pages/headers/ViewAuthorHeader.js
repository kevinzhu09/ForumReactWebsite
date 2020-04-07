import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import LikeButton from '../other/LikeButton.js'

class ViewAuthorHeader extends Component {
	render() {
            return (
            <>
                <Jumbotron>
                    {this.props.children}
                    <hr className="my-4"/>
                    <LikeButton initialLiked={this.props.initialLiked} authorID={this.props.authorID} whatToLike='authors'/>
                </Jumbotron>
            </>
          
		);
	}
}

export default ViewAuthorHeader