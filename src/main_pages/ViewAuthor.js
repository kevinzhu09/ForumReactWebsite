import React, { Component } from 'react';
import Navigation from '../Navigation';
import ViewAuthorHeader from './components_for_pages/headers/ViewAuthorHeader';
import { host } from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ViewAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           posts: null,
           loading: true,
           postsRetrieved: false,
           authorUsername: null,
           noPosts: false,
           initialLiked: null,
           userUsername: null,
           guest: null
        };
        this.authorID = this.props.match.params.id;
        this.authorPath =  "/authors/".concat(this.authorID);

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
        
        const fetchURI = this.authorPath

        fetch(host + fetchURI, requestOptions)
        .then(response => response.json())
        .then(result => {
            const resultCode = result.code;
            if (token) {
            if (resultCode === 0) {
                if (result.ownPage === true) {
                    this.props.history.push('/my-page');
                    return;
                }
                this.setState({guest:false, userUsername:result.userUsername, posts:result.posts, postsRetrieved:true, authorUsername:result.authorUsername, initialLiked: result.liked_status})
            } else if (resultCode === 1) {
                this.setState({guest:false, userUsername:result.userUsername, noPosts:true, authorUsername:result.authorUsername})
            } else if (resultCode === 2) {
                this.props.history.push('/not-found');
                return;
            } else if (resultCode === 'expired') {
                this.props.history.push('/session-expired');
                return;
            } else {
                
            }
        } else if (result.logged_in_as==='guest') {
            if (resultCode === 0) {
                this.setState({guest:true, userUsername:false, posts:result.posts, postsRetrieved:true, authorUsername:result.authorUsername})
            } else if (resultCode === 1) {
                this.setState({guest:true, userUsername:false, noPosts:true, authorUsername:result.authorUsername})
            } else if (resultCode === 2) {
                this.props.history.push('/not-found');
                return;
            } else {
                
            }
        } else {window.location.reload();}
        this.setState({loading:false});
        }
        )
        .catch(error => {
            this.setState({loading:false});
            });
    }

    renderTablePosts() {
        const authorUsername = this.state.authorUsername;
        return this.state.posts.map((post, index) => {
            const { post_id, title, created_timestamp } = post;
            const postUrl = "/posts/".concat(post_id);
            return (
                <tr key={post_id}>
                    <th scope="row"><a href={postUrl}>{title}</a></th>
                    <td><a href={this.authorPath}>{authorUsername}</a></td>
                    <td>{created_timestamp}</td>
                </tr>
            )
        })
    }

	render() {
		return (
            <>
                <Navigation guest={this.state.guest} userUsername={this.state.userUsername} activeKey={this.authorPath} author={true}>{this.state.authorUsername}</Navigation>
                <Container>
                {this.state.loading ?
                    <Row className="h-100 align-content-center">
                    <Col className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                    </Col>
                    </Row>
                    :
                    <>
                    <ViewAuthorHeader guest={this.state.guest} initialLiked={this.state.initialLiked} authorID={this.authorID} authorPath={this.authorPath}>
                        {Boolean(this.state.authorUsername) &&
                        <>
                        <h1 className="display-4">This is {this.state.authorUsername}'s page</h1>
                        </>
                        }
                    </ViewAuthorHeader>
                    {this.state.noPosts ?
                    <h2>This author has no posts.</h2>
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

export default withRouter(ViewAuthor);