import React, { Component } from 'react'

import RegisterForm from './RegisterForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {showForm: true};
    }

    handleFormSubmit() {
        this.setState({showForm: false})
        // can use this function to accept props passed up from the form, and do something with them
    }

    render() {
        return (
            <Container>
            <Row className="h-100 justify-content-md-center align-content-center">
                {
                    this.state.showForm
                    ?
                    <Col xs="12" sm="11" md="11" lg="10" xl="10">
                    <h1>Register</h1>
                    <RegisterForm onSubmit={this.handleFormSubmit}></RegisterForm> 
                    </Col>
                    :
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <h1>Success!</h1>
                    <p>You should receive an email with a verification link shortly. Please verify your account.</p>
                    </Col>
                }
            </Row>
            </Container>
        );
    }
}
export default Register