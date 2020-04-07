import React, { Component } from 'react';
import Navigation from '../Navigation';
import ViewAuthorHeader from './components_for_pages/headers/ViewAuthorHeader';
import globalConstants from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class ViewAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           posts: null,
           postsRetrieved: false,
           authorUsername: null,
           noPosts: false,
           initialLiked: null
        };
        this.authorID = this.props.match.params.id;
        this.authorPath =  "/authors/".concat(this.authorID);

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
            
            const fetchURI = this.authorPath

            fetch(globalConstants.host + fetchURI, requestOptions)
            .then(response => response.json())
            .then(result => {
                const resultCode = result.code;


                if (resultCode === 0) {
                    const resultPosts = result.posts;
                    const resultUsername = result.authorUsername;
                    if (result.ownPage === true) {this.props.history.push('/my-page');}
                    this.setState({posts:resultPosts, postsRetrieved:true, authorUsername:resultUsername, initialLiked: result.liked_status})
                } else if (resultCode === 1) {
                    this.setState({noPosts:true, authorUsername:result.authorUsername})
                } else if (resultCode === 2) {
                    // redirect to "author does not exist"?
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
        const authorUsername = this.state.authorUsername;
        return this.state.posts.map((post, index) => {
            const { post_id, title, created_timestamp } = post; //destructuring
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
                <Navigation activeKey={this.authorPath} author={true}>{this.state.authorUsername}</Navigation>
                <Container>
                    <ViewAuthorHeader initialLiked={this.state.initialLiked} authorID={this.authorID} authorPath={this.authorPath}>
                        <h1 className="display-4">This is {this.state.authorUsername}'s page</h1>
                        <p className="lead">Look over their posts, or like their page</p>
                    </ViewAuthorHeader>
                    {this.state.noPosts ?
                    <h2>This author has no posts.</h2>
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

export default withRouter(ViewAuthor);