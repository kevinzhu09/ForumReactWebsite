import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class MainPageHeader extends Component {
	render() {
		return (
            <>
            {Boolean(this.props.guest) ?
                <Jumbotron>
                    <h1 className="display-4">This is the main feed</h1>
                    <p className="lead">See what people are talking about</p>
                <hr className="my-4"/>
                <OverlayTrigger key='top' placement='top' overlay=
                {
                    <Tooltip id={`tooltip-$sign-in`}>
                        You must sign in or register to create posts.
                    </Tooltip>
                }>
                    <span className="d-inline-block">
                    <Button size="lg" variant="outline-success" disabled style={{ pointerEvents: 'none' }}>Create a new post</Button>
                    </span>
                </OverlayTrigger>
                </Jumbotron>
            :
                <Jumbotron>
                    {this.props.children}
                    <hr className="my-4"/>
                    <a href="/create-post"><Button variant="primary" size="lg" onClick={this.redirect}>Create a new post</Button></a>
                </Jumbotron>
            }
            </>
          
		);
	}
}

export default withRouter(MainPageHeader);