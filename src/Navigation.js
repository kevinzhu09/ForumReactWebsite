import React, { Component } from 'react'
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap'

import './css/Navigation.css';

class Navigation extends Component {
	render() {
		return (
            <Navbar className="navColor" variant="light" expand="lg">
                <Navbar.Brand href="/main-feed">Kevin's Forum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav activeKey={this.props.activeKey} className="mr-auto">
                    <Nav.Link href="/main-feed">Home</Nav.Link>
                    <Nav.Link href="/my-page">My Page</Nav.Link>
                    <Nav.Link href="/liked">Liked</Nav.Link>
                    <Nav.Link href="/account">Account</Nav.Link>
                    {this.props.post && <Nav.Link href="/posts/1">{this.props.children}</Nav.Link>}
                    {this.props.author && <Nav.Link href="/authors/1">{this.props.children}</Nav.Link>}
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
		);
	}
}

export default Navigation