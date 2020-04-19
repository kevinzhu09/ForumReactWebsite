import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from 'react-router-dom';

import './css/Navigation.css';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
          disabled: false
        };
      
        this.handleClick = this.handleClick.bind(this);
        this.clearSession = this.clearSession.bind(this);
        
      }

    handleClick(event) {
        event.target.disabled = true;
        this.setState({disabled:true});
    }

    clearSession() {
        window.sessionStorage.clear();
    }

	render() {
		return (
            <>
{Boolean(this.props.guest) ?

<Navbar onClick={this.handleClick} className="navColor" variant="light" expand="lg">
<Navbar.Brand href="/main-feed">Kevin's Forum</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse>
<Nav activeKey={this.props.activeKey} className="mr-auto">
    <Nav.Link href="/main-feed">Home</Nav.Link>
    <Nav.Link href="/my-page" disabled={true}>My Page</Nav.Link>
    <Nav.Link href="/liked" disabled={true}>Liked</Nav.Link>
    <Nav.Link href="/account" disabled={true}>Account</Nav.Link>
    {this.props.post && <Nav.Link href={this.props.activeKey}>{this.props.children}</Nav.Link>}
    {this.props.author && <Nav.Link href={this.props.activeKey}>{this.props.children}</Nav.Link>}
    {this.props.createPost && <Nav.Link href={this.props.activeKey} disabled={true}>New Post</Nav.Link>}
    {this.props.editPost && <Nav.Link href={this.props.activeKey} disabled={true}>Editing Post</Nav.Link>}
</Nav>
<Navbar.Text onClick={this.clearSession}>
<Nav.Link href='/register'>Register</Nav.Link>
</Navbar.Text>
<Navbar.Text onClick={this.clearSession}>
<Nav.Link href='/sign-in'>Sign in</Nav.Link>
</Navbar.Text>
</Navbar.Collapse>
</Navbar>
:

            <Navbar onClick={this.handleClick} className="navColor" variant="light" expand="lg">
                <Navbar.Brand href="/main-feed">Kevin's Forum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                <Nav activeKey={this.props.activeKey} className="mr-auto">
                    <Nav.Link href="/main-feed">Home</Nav.Link>
                    <Nav.Link href="/my-page">My Page</Nav.Link>
                    <Nav.Link href="/liked">Liked</Nav.Link>
                    <Nav.Link href="/account">Account</Nav.Link>
                    {this.props.post && <Nav.Link href={this.props.activeKey}>{this.props.children}</Nav.Link>}
                    {this.props.author && <Nav.Link href={this.props.activeKey}>{this.props.children}</Nav.Link>}
                    {this.props.createPost && <Nav.Link href={this.props.activeKey} disabled={true}>New Post</Nav.Link>}
                    {this.props.editPost && <Nav.Link href={this.props.activeKey} disabled={true}>Editing Post</Nav.Link>}
                </Nav>
                {Boolean(this.props.userUsername) &&
                <>
                <Navbar.Text>Signed in as: {this.props.userUsername}</Navbar.Text>
                <Navbar.Text onClick={this.clearSession}>
                <Nav.Link href='/sign-in'>Sign out</Nav.Link>
                </Navbar.Text>
                </>
                }
                </Navbar.Collapse>
            </Navbar>

}
</>
		);
	}
}

export default withRouter(Navigation);