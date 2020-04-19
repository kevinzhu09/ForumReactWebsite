import React, { Component } from 'react';

import PasswordResetForm from './PasswordResetForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {showForm: true};
    }

    handleFormSubmit() {
        this.setState({showForm: false});
      
    }

    render() {
        return (
            <Container>
            <Row className="h-100 align-content-center">
                {
                    this.state.showForm
                    ?
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <h1>Reset your password</h1>
                    <a href='/sign-in'>Or, login if you have an account</a>
                    <PasswordResetForm onSubmit={this.handleFormSubmit}></PasswordResetForm> 
                    </Col>
                    :
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <p>You should receive a password reset email from us shortly. Please check your email.</p>
                    </Col>
                }
            </Row>
            </Container>
        );
    }
}
export default PasswordReset;