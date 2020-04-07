import React, { Component} from 'react';
import Navigation from '../Navigation';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import DeleteAccount from './components_for_pages/other/DeleteAccount.js'
import ChangePassword from './components_for_pages/other/ChangePassword'


class Account extends Component {
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.state = {showChangePassword: true};
}

handleChangePassword() {
    this.setState({showChangePassword: false})
}


	render() {
		return (
    <>
                <Navigation activeKey="/account"></Navigation>

<Container>
  <Row className="justify-content-center">
    <Col>
      <Jumbotron>
        <h1 className="display-4">Manage your account</h1>
      </Jumbotron>

      
        <Tab.Container id="left-tabs-example" defaultActiveKey="#first">
          <Row>
            <Col md={4}>
              <ListGroup variant="pills" className="flex-column">
                <ListGroup.Item action href="#first">
                  Change my password
                </ListGroup.Item>
                <ListGroup.Item action href="#second">
                  Delete my account
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#first">
               
                    {
                    this.state.showChangePassword
                    ?
                    <ChangePassword onSubmit={this.handleChangePassword}/>
                    :
                    <>
                    <h2>Success!</h2>
                    <p>You changed your password.</p>
                    </>
                    }
                  
                </Tab.Pane>
                <Tab.Pane eventKey="#second">
                    <DeleteAccount/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
    </Row>
  </Container>


    </>

		);
	}
}

export default Account