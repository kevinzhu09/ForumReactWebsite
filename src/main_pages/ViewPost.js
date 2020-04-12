import React, { Component } from 'react';
import Navigation from '../Navigation';
import ViewPostHeader from './components_for_pages/headers/ViewPostHeader';
import { tinyAPIKey, host } from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Editor } from '@tinymce/tinymce-react';



class ViewPost extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           postRetrieved: false,
           ownPost: false,
           authorID: null,
           title: null,
           authorUsername: null,
           createdTimestamp: null,
           content: null,
           initialLiked: null,
           userUsername: null,
           guest: null
        };
        this.postID = this.props.match.params.id;
        this.postPath =  "/posts/".concat(this.postID);
     }



     componentDidMount() {
        const token = window.sessionStorage.token;
// Make the get request:
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token) {
            myHeaders.append("Authorization", "Bearer " + token);
        }
        
        myHeaders.append("Accept", "application/json");
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        


        fetch(host + this.postPath, requestOptions)
        .then(response => response.json())
        .then(result => {
            const resultCode = result.code;
            if (token) {
            if (resultCode === 0) {
                const resultPost = result.post_details;
                const { author_id, title, username, created_timestamp, content } = resultPost;
                this.setState({guest:false, userUsername:result.userUsername, postRetrieved:true, ownPost:result.own_post, authorID:author_id, title:title, authorUsername:username, createdTimestamp:created_timestamp, content:content, initialLiked:result.liked_status})
            } else {
                this.props.history.push('sign-in');
            }
        } else if (result.logged_in_as==='guest' && resultCode===0) {
            const resultPost = result.post_details;
            const { author_id, title, username, created_timestamp, content } = resultPost;
            this.setState({guest:true, postRetrieved:true, authorID:author_id, title:title, authorUsername:username, createdTimestamp:created_timestamp, content:content, userUsername:false})
        } else {window.location.reload();}
    }
        )
        .catch(error => {
                
            });
    }


	render() {          
        const authorUrl = "/authors/".concat(this.state.authorID);
		return (
            <>
                <Navigation guest={this.state.guest} userUsername={this.state.userUsername} activeKey={this.postPath} post={true}>{this.state.title}</Navigation>
                <Container>
                    <ViewPostHeader guest={this.state.guest} initialLiked={this.state.initialLiked} postID={this.postID} ownPost={this.state.ownPost}>
                        <h1 className="display-4"><a href={this.postPath}>{this.state.title}</a></h1>
                        <p className="lead">By <a href={authorUrl}>{this.state.authorUsername}</a> | Created {this.state.createdTimestamp}</p>
                    </ViewPostHeader>
          
             <Editor disabled={true} 
             apiKey={tinyAPIKey}
        initialValue={this.state.content}
        init={{
            height: 500,
            toolbar: false,
            menubar: false

            // plugins: [
            //     'advlist autolink lists link image charmap print preview anchor',
            //     'searchreplace visualblocks code fullscreen',
            //     'insertdatetime media table paste code help wordcount quickbars'
            // ],
        }}
        value={this.state.content}
      />
                </Container>
            </>



		);
	}
}

export default withRouter(ViewPost);