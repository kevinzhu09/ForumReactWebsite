import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class Welcome extends Component {
    render() {
        return (
            <div class="container">
                <div class="row h-100 justify-content-center align-content-center">
                    <div class="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-6">
                        <h1>Sign in</h1>
                        <a href="/Register">Or, create a new account</a>
                        <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email:" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password:" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check custom type='checkbox' id='staySignedIn' label='Stay signed in?'/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Welcome