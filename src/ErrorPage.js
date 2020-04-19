import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class ErrorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          disabled: false
        };
      
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.target.disabled = true;
        this.setState({disabled:true});
    }

    render() {
        return (
            <Container>
            <Row className="h-100 align-content-center d-flex justify-content-center text-center">

                    <Col>
                    <h3 className="mb-3">There was an error.<br /></h3>
                    <h3 className="mb-3">You can try to sign in, or try to go to the main feed.</h3>
                    <a href="/sign-in"><Button disabled={this.state.disabled} onClick={this.handleClick} variant="primary" size="lg">Try to sign in</Button></a>{' '}
                    <a href="/main-feed"><Button disabled={this.state.disabled} onClick={this.handleClick} variant="primary" size="lg">Try to go to the main feed</Button></a>
                    </Col>

            </Row>
            </Container>
        );
    }
}
export default withRouter(ErrorPage);
