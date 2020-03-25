import React, { Component} from 'react'
import Navigation from '../Navigation'

import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'


// import './DeleteAccountModal.js';
import DeleteAccountModal from './components_for_pages/modals/DeleteAccountModal.js'


class Account extends Component {
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
                    <h2>Change my password</h2>

                    <div class="form-group">
                        <label for="current-password">Current password:</label>
                        <input type="password" class="form-control" id="current-password" required/>
                    </div>

                    <div class="form-group">
                        <label for="new-password">New password:</label>
                        <input type="password" class="form-control" id="new-password" required/>
                    </div>

                    <div class="form-group">
                        <label for="confirm-password">Confirm new password:</label>
                        <input type="password" class="form-control" id="confirm-password" required/>
                    </div>
                    <Button type="button" variant="primary" class="btn">Change my password</Button>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#second">
                  
                <div class="tab-pane" id="delete-account" role="tabpanel">
                <h2>Delete my account</h2>

                    <div class="form-group">
                        <label for="verify-password">Current password:</label>
                        <input type="password" class="form-control" id="verify-password" required/>
                    </div>

                  <DeleteAccountModal></DeleteAccountModal>



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