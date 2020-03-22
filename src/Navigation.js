import React, { Component } from 'react'
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap'

class Navigation extends Component {
	render() {
		return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">Kevin's Forum</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="my-page">My Page</Nav.Link>
                    <Nav.Link href="bookmarked">Bookmarked</Nav.Link>
                    <Nav.Link href="account">Account</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>
		);
	}
}

export default Navigation