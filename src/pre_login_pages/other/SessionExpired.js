import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class SessionExpired extends Component {

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

    clearSession(event) {
        event.target.disabled = true;
        this.setState({disabled:true});
        window.sessionStorage.clear();
    }

    render() {
        return (
            <Container>
            <Row className="h-100 align-content-center d-flex justify-content-center text-center">

                    <Col>
                    <h3 className="mb-3">It looks like your session has expired.<br />You can sign in again, or continue as a guest.</h3>
                    <a href="/sign-in"><Button disabled={this.state.disabled} onClick={this.handleClick} variant="primary" size="lg">Sign in</Button></a>{' '}
                    <a href="/main-feed"><Button disabled={this.state.disabled} onClick={this.clearSession} variant="primary" size="lg">Continue as a guest</Button></a>
                    </Col>

            </Row>
            </Container>
        );
    }
}
export default withRouter(SessionExpired);
