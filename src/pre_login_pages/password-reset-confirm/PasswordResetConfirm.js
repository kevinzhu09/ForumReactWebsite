import React, { Component } from 'react';

import PasswordResetConfirmForm from './PasswordResetConfirmForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import queryString from 'query-string';


class PasswordResetConfirm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {showForm: true, token: null};
    }

    handleFormSubmit() {
        this.setState({showForm: false});
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({token:values.token})
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
                    <PasswordResetConfirmForm token={this.state.token} onSubmit={this.handleFormSubmit}></PasswordResetConfirmForm> 
                    </Col>
                    :
                    <Col xs="12" sm="11" md="10" lg="8" xl="6">
                    <h1>Success!</h1>
                    <p>You reset your password. You can now log in.</p>
                    </Col>
                }
            </Row>
            </Container>
        );
    }
}
export default PasswordResetConfirm;