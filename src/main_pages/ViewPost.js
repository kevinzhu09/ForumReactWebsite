import React, { Component } from 'react'
import Navigation from '../Navigation'
import ViewPostHeader from './components_for_pages/headers/ViewPostHeader'

class ViewPost extends Component {
	render() {
		return (
            <>
                <Navigation activeKey="/posts/1" post={true}>This Week in Movies and Music</Navigation>
                <div class="container">
                    <ViewPostHeader ownPost={true}>
                        <h1 class="display-4">This Week in Movies and Music</h1>
                        <p class="lead">By Luis J. | Created February 14, 2020</p>
                    </ViewPostHeader>
          <p>
              Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
              Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
          </p>
                </div>
            </>



		);
	}
}

export default ViewPost