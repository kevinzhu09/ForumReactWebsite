import React, { Component } from 'react';
import { host } from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TextEditor from './components_for_pages/text_editor/TextEditor';
import Navigation from '../Navigation';

class EditPost extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          title: "",
          content: "",
          validated: false,
          noContent: null,
          edited: false,
          disabled: false,
          userUsername: null,
          postsRetrieved: false
        };
        this.postID = this.props.match.params.id;
        this.postPath =  "/posts/".concat(this.postID);
    
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }  


      componentDidMount() {
        const token = window.sessionStorage.token;
        if (token) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
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
              

                if (resultCode === 0) {
                    if (!result.own_post) {
                        this.props.history.push('sign-in');
                    }
                    const resultPost = result.post_details;
                    const { title, content } = resultPost;

                    this.setState({postsRetrieved:true, title:title, content:content})
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

    handleEditorChange(content, editor) {
      this.setState({ content });

      this.setState({
        noContent: false,
        edited: true
      });
    }
      
    handleSubmit(event) { 

        this.setState({disabled:true});
        const { content } = this.state;
        const token = window.sessionStorage.token;
        const containsContent = Boolean(content);

        if (containsContent) {
            
          // Make the put request:
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
        
          var raw = JSON.stringify({"content":content});
          
          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch(host + this.postPath, requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;

              if (resultCode === 0) {
                this.props.history.push(this.postPath);
              } else {
                this.props.history.push('sign-in');
              }
            }
            )
            .catch(error => {
                  this.setState({disabled:false});
              });
            
        } else {
          this.setState({noContent:true, disabled:false});
        }
        this.setState({validated:true});
  }
  render() {
    return (
        <>
        <Navigation activeKey={"/edit-post/".concat(this.postID)} editPost={true}></Navigation>
        <h1>Editing "{this.state.title}":</h1>
        
        {
        this.state.postsRetrieved &&
        <TextEditor initialValue={this.state.content} content={this.state.content} onChange={this.handleEditorChange}></TextEditor>
        }
        <p className={this.state.noContent ? "d-block text-danger" : "d-none"}>Please provide some content.</p>

        <a href={"/posts/".concat(this.postID)}><Button variant="secondary">Cancel my editing and take me back to the post</Button></a>                       

        <Button disabled={this.state.disabled} onClick={this.handleSubmit} type="submit" variant="primary">Edit this post</Button>
   

    </>
    );

}
}


export default withRouter(EditPost);
