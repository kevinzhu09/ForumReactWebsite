import React, { Component } from 'react';
import { host } from '../globalConstants';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import TextEditor from './components_for_pages/text_editor/TextEditor';
import Navigation from '../Navigation';

class EditPost extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          title: "",
          content: "",
          validated: false,
          noContent: false,
          edited: false,
          disabled: false,
          userUsername: null,
          postRetrieved: false,
          loading: true
        };
        this.postID = this.props.match.params.id;
        this.postPath =  "/posts/".concat(this.postID);
    
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }  


      componentDidMount() {
        const token = window.sessionStorage.token;
        if (token) {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Accept", "application/json");
            
            const requestOptions = {
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
                        this.props.history.push('/sign-in');
                        return;
                    }
                    const resultPost = result.post_details;
                    const { title, content } = resultPost;

                    this.setState({postRetrieved:true, title:title, content:content})
                } else if (resultCode === 'expired') {
                  this.props.history.push('/session-expired');
                  return;
                } else {
                    this.props.history.push('/sign-in');
                    return;
                }
                this.setState({loading:false});
            }
            )
            .catch(error => {
              this.setState({loading:false});
              });

            const requestOptionsPost = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
            };
            
            fetch(host + '/refresh', requestOptionsPost)
            .then(response => response.json())
            .then(result => {
                const resultCode = result.code;
                if (resultCode===0) {
                  this.setState({userUsername:result.userUsername})
                  const resultToken = result.access_token;
                  window.sessionStorage.token = resultToken;
                } else if (resultCode==='expired') {
                  this.props.history.push('/session-expired');
                  return;
                } else if (resultCode===1) {
                    this.props.history.push('/sign-in');
                    return;
                } else {
                  this.props.history.push('/main-feed');
                  return;
                }
            }
            )
            .catch(error => {
              
              });
            } else {
              this.props.history.push('/sign-in');
              return;
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
            
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          
        
          const raw = JSON.stringify({"content":content});
          
          const requestOptions = {
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
                return;
              } else if (resultCode === 'expired') {
                this.props.history.push('/session-expired');
                return;
              } else {
                this.props.history.push('/sign-in');
                return;
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
        <Navigation guest={false} userUsername={this.state.userUsername} activeKey={"/edit-post/".concat(this.postID)} editPost={true}></Navigation>
        
        {this.state.loading ?
                    <Container>
                    <Row className="h-100 align-content-center">
                    <Col className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                    </Col>
                    </Row>
                    </Container>
                    :
                    <>
        <Container>
        <Row className="d-flex justify-content-center">
        <Col>
        <h1 className="my-3">Editing "{this.state.title}":</h1>
        
        {
        this.state.postRetrieved &&
        <TextEditor initialValue={this.state.content} content={this.state.content} onChange={this.handleEditorChange}></TextEditor>
        }
        <p className={this.state.noContent ? "d-block text-danger" : "invisible"}>Please provide some content.</p>

        <a href={"/posts/".concat(this.postID)}><Button className="mb-5" variant="secondary">Cancel my editing and take me back to the post</Button></a>
        {' '}                       
        <Button className="mb-5" disabled={this.state.disabled} onClick={this.handleSubmit} type="submit" variant="primary">Edit this post</Button>
        </Col>
        </Row>
        </Container>   
   </>
      }
      
    </>
    );

}
}


export default withRouter(EditPost);
