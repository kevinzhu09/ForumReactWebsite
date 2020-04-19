import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { host } from '../../../globalConstants';
import { withRouter } from 'react-router-dom';



class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          liked: null,
          disabled: false,
          pressed: false
        };
      
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.fetchRequest = this.fetchRequest.bind(this);

        this.fetchPath = null;
        if (this.props.whatToLike==='posts') {this.fetchPath = "/posts/likes/" + this.props.postID}
        if (this.props.whatToLike==='authors') {this.fetchPath = "/authors/likes/" + this.props.authorID}
      }

    like() {
        this.setState({disabled: true, pressed: true});
        this.fetchRequest(true);
    }
      
    unlike() {
        this.setState({disabled: true, pressed: true});
        this.fetchRequest(false);
    }

    fetchRequest(isLikeRequest) {
            const token = window.sessionStorage.token;

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Accept", "application/json");
            
            let requestMethod = null;
            if (isLikeRequest) {
                requestMethod = 'POST';
                
            } else {
                requestMethod = 'DELETE';
            }
            const requestOptions = {
              method: requestMethod,
              headers: myHeaders,
              redirect: 'follow'
            };
            fetch(host + this.fetchPath, requestOptions)
              .then(response => response.json())
              .then(result => {
                const resultCode = result.code;
  
                if (resultCode === 0) {
                    this.setState({liked: isLikeRequest, disabled: false});
                } else if (resultCode === 'expired') {
                    this.props.history.push('/session-expired');
                    return;
                } else {
                    this.props.history.push('/sign-in');
                    return;
                }
              }
              )
              .catch(error => 
                {
                  this.setState({disabled:false});
              });  
        }


render() {
    let whatToLike;
    if (this.props.whatToLike==='posts') {whatToLike = "this post"}
    if (this.props.whatToLike==='authors') {whatToLike = "this author's page"}

    let liked;
    if (this.state.pressed) {
        liked = this.state.liked;
    } else {
        liked = this.props.initialLiked;
    }
    return (
        <>
        {liked ?
        <>
        <OverlayTrigger key='top' placement='top' overlay=
        {
            <Tooltip>
                Liked!
            </Tooltip>
        }>
            <Button size="lg" variant="success" onClick={this.unlike} disabled={this.state.disabled} >Unlike {whatToLike}</Button>
        </OverlayTrigger>{' '}
        </>
        :
        <Button size="lg" variant="outline-success" onClick={this.like} disabled={this.state.disabled} >Like {whatToLike}</Button>
        }
        {' '}
        </>
        );
    }
}


export default withRouter(LikeButton);