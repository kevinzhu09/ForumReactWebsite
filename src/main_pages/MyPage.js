import React, { Component } from 'react'
import Navigation from '../Navigation'
import MainPageHeader from './components_for_pages/headers/MainPageHeader'

class MyPage extends Component {
	render() {
		return (
            <>
                <Navigation></Navigation>
                <div class="container">
                    <MainPageHeader>
                        <h1 class="display-4">This is your page, Kevin Z.</h1>
                        <p class="lead">Create a new post, look over your post history, or edit and delete your posts</p>
                    </MainPageHeader>
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Date created</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row"><a href="#">This Week in Movies and Music</a></th>
                                <td><a href="#">Luis J.</a></td>
                                <td>February 14, 2020</td>
                            </tr>
                            <tr>
                                <th scope="row"><a href="#">The Healthiest Fruits</a></th>
                                <td><a href="#">Harry H.</a></td>
                                <td>July 24, 2019</td>
                            </tr>
                            <tr>
                                <th scope="row"><a href="#">How to Figure Skate</a></th>
                                <td><a href="#">Megan B.</a></td>
                                <td>April 5, 2019</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>



		);
	}
}

export default MyPage