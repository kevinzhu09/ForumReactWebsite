import React, { Component } from 'react';
import Navigation from '../Navigation';
import MainPageHeader from './components_for_pages/headers/MainPageHeader';
import globalConstants from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           posts: null,
           postsRetrieved: false,
           userUsername: null,
           authorID: null,
           authorPath: null,
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

            fetch(globalConstants.host + '/authors/0', requestOptions)
            .then(response => response.json())
            .then(result => {
                // next line is for debugging:
                // alert('result.message: ' + result.message);
                const resultCode = result.code;
                const resultID = result.id;

                if (resultCode === 0) {
                    this.setState({posts:result.posts, postsRetrieved:true, userUsername:result.authorUsername, authorID: resultID, authorPath:"/authors/".concat(resultID)})
                } else if (resultCode === 1) {
                    this.setState({noPosts:true, userUsername:result.authorUsername})
                } else {
                    this.props.history.push('/');
                }
            }
            )
            .catch(error => alert('error: ' + error));
        } else {
            this.props.history.push('/');
        }
    }

    renderTablePosts() {
        const userUsername = this.state.userUsername;
        const authorPath = this.state.authorPath;
        return this.state.posts.map((post, index) => {
            const { post_id, title, created_timestamp } = post; //destructuring
            const postUrl = "/posts/".concat(post_id);
            return (
                <tr key={post_id}>
                    <th scope="row"><a href={postUrl}>{title}</a></th>
                    <td><a href={authorPath}>{userUsername}</a></td>
                    <td>{created_timestamp}</td>
                </tr>
            )
        })
    }

	render() {
		return (
            <>
                <Navigation activeKey="/my-page"></Navigation>
                <Container>
                    <MainPageHeader>
                        <h1 class="display-4">This is your page, {this.state.userUsername}</h1>
                        <p class="lead">Create a new post, look over your post history, or edit and delete your posts</p>
                    </MainPageHeader>
                    {this.state.noPosts ?
                    <h2>You have no posts yet.</h2>
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

export default withRouter(MyPage);