import React, { Component } from 'react';
import SignInForm from './SignInForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import googleSignIn from '../../static/btn_google_signin_dark_normal_web.png';
import { host } from '../../globalConstants';

class SignIn extends Component {

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
            <Row className="h-100 align-content-center d-flex justify-content-center">
                {
                    this.state.showForm
                    ?
                    <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <h1>Sign in</h1>
                    <a href="/register" style={{display: "block"}}>Or, create a new account</a>
                    <a href="/main-feed" style={{display: "block"}}>Or, continue as a guest without signing in</a>
                    <SignInForm onSubmit={this.handleFormSubmit}></SignInForm>
                    <a href={host.concat("/google/login")}><img className="mt-3" src={googleSignIn} alt="Google Sign In" /></a>
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
export default SignIn;
