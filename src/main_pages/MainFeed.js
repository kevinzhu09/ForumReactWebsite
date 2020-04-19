import React, { Component } from 'react';
import Navigation from '../Navigation';
import MainPageHeader from './components_for_pages/headers/MainPageHeader';
import { host } from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainFeed extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           posts: null,
           loading: true,
           postsRetrieved: false,
           userUsername: null,
           noPosts: false,
           guest: null
        };
        this.renderTablePosts = this.renderTablePosts.bind(this);
     }

    componentDidMount() {
        const token = window.sessionStorage.token;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token) {
            myHeaders.append("Authorization", "Bearer " + token);
        }
        myHeaders.append("Accept", "application/json");

        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        fetch(host + "/posts", requestOptions)
        .then(response => response.json())
        .then(result => {
            const resultCode = result.code;
            if (token) {
            
            if (resultCode === 0) {
                this.setState({postsRetrieved:true, guest:false, posts:result.posts, userUsername:result.userUsername})
                
            } else if (resultCode === 1) {
                this.setState({guest:false, noPosts:true, userUsername:result.userUsername})
            } else if (resultCode === 'expired') {
                this.props.history.push('/session-expired');
                return;
            } else {
                
            }
        } else if (result.logged_in_as==='guest') {
            if (resultCode === 0) {this.setState({postsRetrieved:true, guest:true, posts:result.posts, userUsername:false})}
            else if (resultCode === 1) {this.setState({guest:true, noPosts:true, userUsername:false})}
            
        } else {window.location.reload();}
        this.setState({loading:false});
        }
        )
        .catch(error => {
                this.setState({loading:false});
            });
    }

    renderTablePosts() {
        return this.state.posts.map((post, index) => {
            const { post_id, author_id, title, username, created_timestamp } = post;
            const postURL = "/posts/".concat(post_id);
            const authorURL = "/authors/".concat(author_id);
            return (
                <tr key={post_id}>
                    <th scope="row"><a href={postURL}>{title}</a></th>
                    <td><a href={authorURL}>{username}</a></td>
                    <td>{created_timestamp}</td>
                </tr>
            )
        })
    }
  
	render() {
		return (
            <>
                <Navigation guest={this.state.guest} userUsername={this.state.userUsername} activeKey="/main-feed"></Navigation>
                <Container>
                {this.state.loading ?
                    <Row className="h-100 align-content-center">
                    <Col className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                    </Col>
                    </Row>
                    :
                    <>
                    <MainPageHeader guest={this.state.guest}>
                        {Boolean(this.state.userUsername) &&
                        <>
                            <h1 className="display-4">This is your feed, {this.state.userUsername}</h1>
                            <p className="lead">Create a new post, or see what people are talking about</p>
                        </>
                        }
                    </MainPageHeader>
                    {this.state.noPosts ?
                    <h2>There are no posts yet.</h2>
                    :
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Date created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.postsRetrieved && this.renderTablePosts()}
                        </tbody>
                    </Table>}
                    </>}
            </Container>
            </>



		);
	}
}

export default withRouter(MainFeed);