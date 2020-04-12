import React, { Component} from 'react';
import Navigation from '../Navigation';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import DeleteAccount from './components_for_pages/other/DeleteAccount.js'
import ChangePassword from './components_for_pages/other/ChangePassword';

import { host } from '../globalConstants';
import { withRouter } from 'react-router-dom';


class Account extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userUsername: null,
      showChangePassword: true
   };

    this.handleChangePassword = this.handleChangePassword.bind(this);
}

componentDidMount() {
  const token = window.sessionStorage.token;
  if (token) {
// Make the get request:
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Accept", "application/json");
      
      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch(host + '/users/username', requestOptions)
      .then(response => response.json())
      .then(result => {
          const resultCode = result.code;


          if (resultCode === 0) {
              this.setState({userUsername:result.userUsername})
          } else if (resultCode === 1) {
            this.props.history.push('sign-in');
          } else {
            this.props.history.push('sign-in');
          }
      }
      )
      .catch(error => {
            
        });

      } else {
        this.props.history.push('sign-in');
    }
    }
handleChangePassword() {
    this.setState({showChangePassword: false})
}


	render() {
		return (
    <>
    <Navigation guest={false} userUsername={this.state.userUsername} activeKey="/account"></Navigation>

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

export default withRouter(Account)