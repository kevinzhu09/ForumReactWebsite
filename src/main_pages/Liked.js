import React, { Component } from 'react';
import Navigation from '../Navigation';
import MainPageHeader from './components_for_pages/headers/MainPageHeader';
import globalConstants from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class Liked extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           posts: null,
           postsRetrieved: false,
           userUsername: null,
           noPosts: false,
           authors: null,
           authorsRetrieved: false,
           noAuthors: false
        };
        this.renderTablePosts = this.renderTablePosts.bind(this);
        this.renderAuthors = this.renderAuthors.bind(this);
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

            fetch(globalConstants.host + '/posts/likes', requestOptions)
            .then(response => response.json())
            .then(result => {
                const resultCode = result.code;


                if (resultCode === 0) {
                    this.setState({posts:result.posts, postsRetrieved:true, userUsername:result.userUsername})
                } else if (resultCode === 1) {
                    this.setState({noPosts:true, userUsername:result.userUsername})
                } else {
                    this.props.history.push('/');
                }
            }
            )
            .catch(error => {
                  
              });
        
        // Make the second get request for authors with the same header and request options:
        

        fetch(globalConstants.host + '/authors/likes', requestOptions)
        .then(response => response.json())
        .then(result => {
            const resultCode = result.code;

            if (resultCode === 0) {
                this.setState({authors:result.authors, authorsRetrieved:true})
            } else if (resultCode === 1) {
                this.setState({noAuthors:true})
            } else {
                this.props.history.push('/');
            }
        }
        )
        .catch(error => {
                  
              });

        } else {
            this.props.history.push('/');
        }

    }

    renderTablePosts() {
        return this.state.posts.map((post, index) => {
            const { post_id, author_id, title, username, created_timestamp } = post; //destructuring
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

    renderAuthors() {
        return this.state.authors.map((author, index) => {
            const { author_id, username } = author; //destructuring
            const authorURL = "/authors/".concat(author_id);
            return (
            <ListGroup.Item style={{backgroundColor: "transparent"}}><a href={authorURL}>{username}</a></ListGroup.Item>
            )
        })
    }

	render() {
		return (
            <>
                <Navigation activeKey="/liked"></Navigation>
                <Container>
                    <MainPageHeader>
                        <h1 className="display-4">These are your liked posts and authors, {this.state.userUsername}</h1>
                        <p className="lead">Create a new post, or look over the posts and authors you liked</p>
                    </MainPageHeader>

                    <Tabs defaultActiveKey="liked-posts">
                    <Tab eventKey="liked-posts" title="Liked Posts">
                    {this.state.noPosts ?
                    <h2>You have no liked posts.</h2>
                    :
                    <Table bordered hover id='posts'>
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
                    </Tab>
                    <Tab eventKey="liked-authors" title="Liked Authors">
                    {this.state.noAuthors ?
                    <h2>You have no liked authors.</h2>
                    :
                    <ListGroup bordered hover id='authors'>
                            {this.state.authorsRetrieved && this.renderAuthors()}
                        </ListGroup>}
                    </Tab>
                    </Tabs>

                </Container>
            </>



		);
	}
}

export default withRouter(Liked);