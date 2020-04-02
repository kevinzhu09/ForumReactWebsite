import React, { Component} from 'react'
import Navigation from '../Navigation'

import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'


// import './DeleteAccountModal.js';
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

<div class="container">
  <div class="row justify-content-center">
    <div class="col">
      <div class="jumbotron rounded">
        <h1 class="display-4">Manage your account</h1>
      </div>
      {/* <div class="row"> */}
      
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
                <div class="tab-pane active" id="change-password" role="tabpanel">
               
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
                  
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#second">
                  
                <div class="tab-pane" id="delete-account" role="tabpanel">
                    <DeleteAccount/>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  </div>
{/* </div> */}

    </>

		);
	}
}

export default Account