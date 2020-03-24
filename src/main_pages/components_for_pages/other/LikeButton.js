import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'



class LikeButton extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          liked: this.props.liked
        };
      
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
      }

    getInitialState(){
    return { liked: this.props.liked };
    }

    like() {
        this.setState({liked: true});
    }
      
    unlike() {
        this.setState({liked: false});
    }


render() {
    return (
        <>
        {this.state.liked ?
        <>
        <OverlayTrigger key='top' placement='top' overlay=
        {
            <Tooltip id={`tooltip-$liked`}>
                Liked!
            </Tooltip>
        }>
            <Button size="lg" variant="success" onClick={this.unlike}>Unlike {this.props.whatToLike}</Button>
        </OverlayTrigger>{' '}
        </>
        :
        <Button size="lg" variant="outline-success" onClick={this.like}>Like {this.props.whatToLike}</Button>
        }
        {' '}
        </>
        );
    }
}
export default LikeButton