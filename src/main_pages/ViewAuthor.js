import React, { Component } from 'react'
import Navigation from '../Navigation'
import ViewAuthorHeader from './components_for_pages/headers/ViewAuthorHeader'

class ViewAuthor extends Component {
	render() {
		return (
            <>
                <Navigation activeKey="/authors/1" author={true}>Luis J.</Navigation>
                <div class="container">
                    <ViewAuthorHeader>
                        <h1 class="display-4">This is Luis J.'s page</h1>
                        <p class="lead">Look over their posts, or like their page</p>
                    </ViewAuthorHeader>
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

export default ViewAuthor