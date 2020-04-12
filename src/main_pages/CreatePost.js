import React, { Component } from 'react';
import { host } from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TextEditor from './components_for_pages/text_editor/TextEditor';
import Navigation from '../Navigation';

class CreatePost extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          title: "",
          content: "",
          validated: false,
          noTitleNorContent: null,
          disabled: false
        };
    
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }  

      handleTitleChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
          title: value,
          noTitleNorContent: 0
        });
    }

    handleEditorChange(content, editor) {
      this.setState({ content });

      this.setState({
        noTitleNorContent: 0
      });
    }
      
    handleSubmit(event) { 
        this.setState({disabled:true});
        const { title, content } = this.state;
        const token = window.sessionStorage.token;
        let validity = true;
        let missingCode = 0;
        if (!title) {
            missingCode += 1;
        }
        if (!content) {
            missingCode += 2;
        }
        validity = !Boolean(missingCode);
        this.setState({noTitleNorContent:missingCode});
        // event.preventDefault();
        // event.stopPropagation();
        if (validity) {
          // Make the post request:
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
        
          var raw = JSON.stringify({"title":title,"content":content});
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(host + "/posts", requestOptions)
            .then(response => response.json())
            .then(result => {
              const resultCode = result.code;


              if (resultCode === 0) {
                const postID = result.post_id
                const postURL = "/posts/".concat(postID);
                this.props.history.push(postURL);
              } else {
                this.props.history.push('sign-in');
              }
            }
            )
            .catch(error => {
                  this.setState({disabled:false});
              });
            
        } else {
          this.setState({disabled:false});
        }
        this.setState({validated:true});
  }
  render() {
    return (
        <>
        <Navigation activeKey="/create-post" createPost={true}></Navigation>
        <h1>Create a new post</h1>
        
        <Form.Control minLength="1" maxLength="30" type="text" value={this.state.title} onChange={this.handleTitleChange} required placeholder="Title of post:"/>
        
        <TextEditor initialValue={this.state.content} content={this.state.content} onChange={this.handleEditorChange}></TextEditor>
                             
        <p className={(this.state.noTitleNorContent === 1) ? "d-block text-danger" : "d-none"}>Please provide a title.</p>         
        <p className={(this.state.noTitleNorContent === 2) ? "d-block text-danger" : "d-none"}>Please provide some content.</p>
        <p className={(this.state.noTitleNorContent === 3) ? "d-block text-danger" : "d-none"}>Please provide a title and some content.</p>
                        
        <Button disabled={this.state.disabled} onClick={this.handleSubmit} type="submit" variant="primary">Create post</Button>
   


    </>
    );

}
}


export default withRouter(CreatePost);
