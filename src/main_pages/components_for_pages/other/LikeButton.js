import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import globalConstants from '../../../globalConstants';
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

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Accept", "application/json");
            
            let requestMethod = null;
            if (isLikeRequest) {
                requestMethod = 'POST';
                
            } else {
                requestMethod = 'DELETE';
            }
            var requestOptions = {
              method: requestMethod,
              headers: myHeaders,
              redirect: 'follow'
            };
            fetch(globalConstants.host + "/posts/likes/" + this.props.postID, requestOptions)
              .then(response => response.json())
              .then(result => {
                // next line is for debugging:
                // alert('result.message: ' + result.message);
                const resultCode = result.code;
  
                if (resultCode === 0) {
                    this.setState({liked: isLikeRequest, disabled: false});
                } else {
                    this.props.history.push('/');
                }
              }
              )
              .catch(error => 
                alert('error: ' + error));  
        }


render() {
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
            <Tooltip id={`tooltip-$liked`}>
                Liked!
            </Tooltip>
        }>
            <Button size="lg" variant="success" onClick={this.unlike} disabled={this.state.disabled} >Unlike {this.props.whatToLike}</Button>
        </OverlayTrigger>{' '}
        </>
        :
        <Button size="lg" variant="outline-success" onClick={this.like} disabled={this.state.disabled} >Like {this.props.whatToLike} </Button>
        }
        {' '}
        </>
        );
    }
}


export default withRouter(LikeButton);