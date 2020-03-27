import React, { Component } from 'react'

import VerificationForm from './VerificationForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import queryString from 'query-string'


class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {showForm: true, token: null};
    }

    handleFormSubmit() {
        this.setState({showForm: false})
        // can use this function to accept props passed up from the form, and do something with them
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({token:values.token})
    }

    render() {
        return (
            <Container>
            <Row className="h-100 justify-content-center align-content-center">
                {
                    this.state.showForm
                    ?
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <h1>Verify your new account</h1>
                    <VerificationForm token={this.state.token} onSubmit={this.handleFormSubmit}></VerificationForm> 
                    </Col>
                    :
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <h1>Success!</h1>
                    <p>You verified your account. You will be logged in shortly.</p>
                    </Col>
                }
            </Row>
            </Container>
        );
    }
}
export default Verification