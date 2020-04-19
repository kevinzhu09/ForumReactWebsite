import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class LoggedIn extends Component {

    componentDidMount() {
        const urlToken = queryString.parse(this.props.location.search).token;
        if (urlToken) {
            window.sessionStorage.token = urlToken;
            this.props.history.push('/main-feed');
            return;
        } else {
            alert('There was an issue signing in. Please try to sign in again.');
            this.props.history.push('/sign-in');
            return;
        }
        
    }

    render() {
        return (
            <Container>
            <Row className="h-100 align-content-center d-flex justify-content-center text-center">

                    <Col>
                    <h3 className="mb-3">Signing in...</h3>
                    </Col>

            </Row>
            </Container>
        );
    }
}
export default withRouter(LoggedIn);
