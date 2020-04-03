import React, { Component } from 'react';
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import './css/Navigation.css';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
          disabled: false
        };
      
        this.handleClick = this.handleClick.bind(this);
        this.signOut = this.signOut.bind(this);
        
      }

    handleClick(event) {
        event.target.disabled = true;
        this.setState({disabled:true});
    }

    signOut() {
        window.sessionStorage.clear();
        // this.props.history.push('/');
    }

	render() {
		return (
            <Navbar onClick={this.state.handleClick} className="navColor" variant="light" expand="lg">
                <Navbar.Brand href="/main-feed">Kevin's Forum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav activeKey={this.props.activeKey} className="mr-auto">
                    <Nav.Link href="/main-feed">Home</Nav.Link>
                    <Nav.Link href="/my-page">My Page</Nav.Link>
                    <Nav.Link href="/liked">Liked</Nav.Link>
                    <Nav.Link href="/account">Account</Nav.Link>
                    {this.props.post && <Nav.Link href={this.props.activeKey}>{this.props.children}</Nav.Link>}
                    {this.props.author && <Nav.Link href={this.props.activeKey}>{this.props.children}</Nav.Link>}
                </Nav>
                <Navbar.Text onClick={this.signOut}>
                <Nav.Link href="/">Sign out</Nav.Link>
                </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
		);
	}
}

export default withRouter(Navigation);