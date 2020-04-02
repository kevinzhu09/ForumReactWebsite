import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import WelcomeForm from './WelcomeForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Welcome extends Component {

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
            <Row className="h-100 justify-content-center align-content-center">
                {
                    this.state.showForm
                    ?
                    <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <h1>Sign in</h1>
                    <a href="/Register">Or, create a new account</a>
                    <WelcomeForm onSubmit={this.handleFormSubmit}></WelcomeForm> 
                    </Col>
                    :
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <h1>Success!</h1>
                    <p>You signed in. You will be taken to the forum shortly.</p>
                    </Col>
                }
            </Row>
            </Container>
        );
    }
}
export default Welcome;
