import React, { Component } from 'react';

import RegisterForm from './RegisterForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Register extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {showForm: true};
    }

    handleFormSubmit() {
        this.setState({showForm: false})
    }

    render() {
        return (
            <Container>
            <Row className="h-100 align-content-center">
                {
                    this.state.showForm
                    ?
                    <Col xs="12" sm="11" md="11" lg="10" xl="10">
                    <h1>Register a new account</h1>
                    <a href='/sign-in'>Or, login if you have an account</a>
                    <RegisterForm onSubmit={this.handleFormSubmit}></RegisterForm> 
                    </Col>
                    :
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <h1>Success!</h1>
                    <p>You created a new account. You should receive an email with a verification link shortly. Please verify your account.</p>
                    </Col>
                }
            </Row>
            </Container>
        );
    }
}
export default Register;