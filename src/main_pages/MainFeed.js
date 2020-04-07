import React, { Component } from 'react';
import Navigation from '../Navigation';
import MainPageHeader from './components_for_pages/headers/MainPageHeader';
import globalConstants from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class MainFeed extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           posts: null,
           postsRetrieved: false,
           userUsername: null,
           noPosts: false
        };
        this.renderTablePosts = this.renderTablePosts.bind(this);
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
            
            fetch(globalConstants.host + "/posts", requestOptions)
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
  
	render() {
		return (
            <>
                <Navigation activeKey="/main-feed"></Navigation>
                <Container>
                    <MainPageHeader>
                        <h1 className="display-4">This is your feed, {this.state.userUsername}</h1>
                        <p className="lead">Create a new post, or see what people are talking about</p>
                    </MainPageHeader>
                    {this.state.noPosts ?
                    <h2>There are no posts yet.</h2>
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
                </Container>
            </>



		);
	}
}

export default withRouter(MainFeed);