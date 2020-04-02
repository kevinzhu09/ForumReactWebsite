import React, { Component } from 'react';
import Navigation from '../Navigation';
import ViewPostHeader from './components_for_pages/headers/ViewPostHeader';
import globalConstants from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

class ViewPost extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           postRetrieved: false,
           ownPost: false,
           authorID: null,
           title: null,
           username: null,
           createdTimestamp: null,
           content: null,
           initialLiked: null
        };
        this.postID = this.props.match.params.id;
        this.postPath =  "/posts/".concat(this.postID);
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
            
            const fetchURI = this.postPath;

            fetch(globalConstants.host + fetchURI, requestOptions)
            .then(response => response.json())
            .then(result => {
                // next line is for debugging:
                // alert('result.message: ' + result.message);
                const resultCode = result.code;


                if (resultCode === 0) {
                    const resultPost = result.post_details;
                    const { author_id, title, username, created_timestamp, content } = resultPost;
                    const ownPost = result.own_post;
                    const liked = result.liked_status;
                    this.setState({postsRetrieved:true, ownPost:ownPost, authorID:author_id, title:title, username:username, createdTimestamp:created_timestamp, content:content, initialLiked:liked})
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


	render() {          
        const authorUrl = "/authors/".concat(this.state.authorID);
		return (
            <>
                <Navigation activeKey={this.postPath} post={true}>{this.state.title}</Navigation>
                <Container>
                    <ViewPostHeader initialTitle={this.state.title} initialContent={this.state.content} initialLiked={this.state.initialLiked} postID={this.postID} ownPost={this.state.ownPost} postPath={this.postPath}>
                        <h1 class="display-4"><a href={this.postPath}>{this.state.title}</a></h1>
                        <p class="lead">By <a href={authorUrl}>{this.state.username}</a> | Created {this.state.createdTimestamp}</p>
                    </ViewPostHeader>
          <p>
              {this.state.content}
          </p>
                </Container>
            </>



		);
	}
}

export default withRouter(ViewPost);